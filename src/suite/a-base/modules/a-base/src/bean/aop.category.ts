import { BeanBase } from 'vona';
import { Aop } from 'vona-module-a-aspect';

const __atomClassApp = {
  module: 'a-app',
  atomClassName: 'app',
};

@Aop({ match: 'category' })
export class AopCategory extends BeanBase {
  async children(context, next) {
    // next
    const list = await next();
    // check atomClass
    const params = context.arguments[0];
    const categoryIdParent = params.categoryId;
    const atomClass = params.atomClass;
    if (!atomClass) return list;
    // check if resource
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    if (!atomClassBase.resource) return list;

    // locale
    //const list = context.result;
    if (list.length === 0) return list;
    // resourceType
    let res = this._checkResourceType({ list, categoryIdParent, atomClass });
    if (res) return list;
    // appKey
    res = await this._checkAppKey({ list, categoryIdParent, atomClass });
    if (res) return list;
    // general
    this._checkGeneral({ list });
    // ok
    return list;
  }

  _checkGeneral({ list }: any) {
    for (const item of list) {
      item.categoryNameLocale = this.app.text(item.categoryName);
    }
    return true;
  }

  _checkResourceType({ list, categoryIdParent, atomClass }: any) {
    if (atomClass.module !== 'a-base' || atomClass.atomClassName !== 'resource') return false;
    if (categoryIdParent !== 0) return false;
    // resourceTypes for a-base:resource
    const resourceTypes = this.app.bean.base.resourceTypes();
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
    const categoryParent = await this.app.bean.category.get({ categoryId: categoryIdParent });
    if (!categoryParent) return false;
    if (!['a-base:menu', 'a-base:mine'].includes(categoryParent.categoryName)) return false;
    const appKeys = list.map(item => item.categoryName);
    const apps = await this.app.bean.resource.select({
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
