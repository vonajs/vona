import { EntityCategory } from '../../../index.js';
import { ScopeModule, __ThisModule__ } from '../../../.metadata/this.js';
import { BeanBase } from 'vona';

const __atomClassResource = {
  module: 'a-base',
  atomClassName: 'resource',
};

export class VersionUpdate extends BeanBase {
  constructor() {
    super(__ThisModule__);
  }

  get modelAtom() {
    return this.scope.model.atom;
  }

  async run() {
    // adjustCategories
    await this._adjustCategories({ resourceType: 'a-base:menu' });
    await this._adjustCategories({ resourceType: 'a-base:mine' });
  }

  async _adjustCategories({ resourceType }: any) {
    // all instances
    const instances = await this.app.bean.instance.list();
    for (const instance of instances) {
      await this.bean.executor.newCtx(
        async () => {
          await this._adjustCategoriesInstance({ resourceType });
        },
        {
          subdomain: instance.name,
        },
      );
    }
  }

  async _adjustCategoriesInstance({ resourceType }: any) {
    // select all resources
    const list = await this.app.bean.resource.select({
      options: {
        where: {
          resourceType,
        },
        orders: [['a.id', 'asc']],
        page: { index: 0, size: 0 },
        locale: false,
      },
    });
    // patch
    for (const item of list) {
      const appKey = item.appKey || 'a-appbooster:appUnclassified';
      const categoryNames = [resourceType, appKey, item.atomCategoryName].join('.');
      const category = await this.app.bean.category.parseCategoryName({
        atomClass: __atomClassResource,
        language: item.atomLanguage,
        categoryName: categoryNames,
        force: true,
      });
      if (category.id !== item.atomCategoryId) {
        // formal
        await this.modelAtom.update({
          id: item.atomId,
          atomCategoryId: category.id,
        });
        // draft/history
        await this.modelAtom.update(
          {
            atomCategoryId: category.id,
          },
          {
            where: {
              atomIdFormal: item.atomId,
            },
          },
        );
      }
    }
    // delete all old categories
    const categoryTop = (await this.app.bean.category.child({
      atomClass: __atomClassResource,
      categoryId: 0,
      categoryName: resourceType,
    })) as EntityCategory;
    const children = (await this.app.bean.category.children({
      atomClass: __atomClassResource,
      categoryId: categoryTop.id,
      setLocale: false,
    })) as any[];
    for (const child of children) {
      if (child.categoryName.indexOf(':') === -1) {
        await this._deleteCategory(child);
      }
    }
  }

  async _deleteCategory(category) {
    try {
      await this.app.bean.category.delete({ categoryId: category.id });
    } catch (_err) {
      // donot throw error
      this.ctx.logger.info(`categoryId: ${category.id}, categoryName: ${category.categoryName}`);
    }
  }
}
