import { Aop, BeanBase } from 'vona';
import { ScopeModule } from '../resource/this.js';

const __atomClassApp = {
  module: 'a-app',
  atomClassName: 'app',
};

@Aop({ match: 'category' })
export class AopCategory extends BeanBase<ScopeModule> {
  async children(context, next) {
    // next
    await next();
    // check atomClass
    const params = context.arguments[0];
    const categoryIdParent = params.categoryId;
    const atomClass = params.atomClass;
    if (!atomClass) return;
    // check if resource
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    if (!atomClassBase.resource) return;

    // locale
    const list = context.result;
    if (list.length === 0) return;
    // resourceType
    let res = this._checkResourceType({ list, categoryIdParent, atomClass });
    if (res) return;
    // appKey
    res = await this._checkAppKey({ list, categoryIdParent, atomClass });
    if (res) return;
    // general
    this._checkGeneral({ list });
  }

  _checkGeneral({ list }: any) {
    for (const item of list) {
      item.categoryNameLocale = this.ctx.text(item.categoryName);
    }
    return true;
  }

  _checkResourceType({ list, categoryIdParent, atomClass }: any) {
    if (atomClass.module !== 'a-base' || atomClass.atomClassName !== 'resource') return false;
    if (categoryIdParent !== 0) return false;
    // resourceTypes for a-base:resource
    const resourceTypes = this.ctx.bean.base.resourceTypes();
    for (const item of list) {
      // resource type
      const resourceType = resourceTypes[item.categoryName];
      if (resourceType) {
        item.categoryNameLocale = resourceType.titleLocale;
      }
    }
    return true;
  }

  async _checkAppKey({ list, categoryIdParent, atomClass }: any) {
    if (atomClass.module !== 'a-base' || atomClass.atomClassName !== 'resource') return false;
    if (categoryIdParent === 0) return false;
    // categoryIdParent
    const categoryParent = await this.ctx.bean.category.get({ categoryId: categoryIdParent });
    if (!categoryParent) return false;
    if (!['a-base:menu', 'a-base:mine'].includes(categoryParent.categoryName)) return false;
    const appKeys = list.map(item => item.categoryName);
    const apps = await this.ctx.bean.resource.select({
      atomClass: __atomClassApp,
      options: {
        where: {
          atomStaticKey: appKeys,
        },
      },
    });
    for (const item of list) {
      const app = apps.find(_item => _item.atomStaticKey === item.categoryName);
      if (app) {
        item.categoryNameLocale = `(${this.scope.locale.App()})${app.atomNameLocale}`;
      }
    }
    return true;
  }
}
