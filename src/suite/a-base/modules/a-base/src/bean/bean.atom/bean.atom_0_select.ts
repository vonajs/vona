import { BigNumber } from 'bignumber.js';
import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtom0Read } from './bean.atom_0_read.js';
import {
  AtomClass,
  AtomClassBase,
  AtomClassParams,
  AtomSelectQueryParams,
  CountParams,
  SelectOptions,
  SelectOptionsPro,
  SelectParams,
} from '../../types.js';

export class BeanAtom0Select extends BeanAtom0Read {
  // count
  async count({ atomClass, options, user }: CountParams): Promise<BigNumber> {
    return await this._select({ atomClass, options, user, count: 1 });
  }

  // select
  async select({ atomClass, options, user, pageForce = true }: SelectParams) {
    return await this._select({ atomClass, options, user, pageForce, count: 0 });
  }

  async _select({ atomClass, options, user, pageForce = true, count = 0 }: SelectParams & { count: number }) {
    if (!options) options = {} as SelectOptions;
    if (!options.where) options.where = {};
    if (!options.orders) options.orders = [];
    // atomClass
    let atomClassBase: AtomClassBase | undefined;
    if (atomClass) {
      atomClass = await this.app.bean.atomClass.get(atomClass);
      atomClassBase = await this.app.bean.atomClass.atomClass(atomClass as AtomClass);
    }
    // select
    const items = await this._list({
      atomClass,
      options,
      user,
      pageForce,
      count,
    });
    // select items
    if (!count) {
      if (atomClassBase) {
        const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName as any);
        await beanInstance.select({ atomClass, options, items, user });
      } else {
        await this.app.bean.atomBase.select({ atomClass, options, items, user });
      }
    }
    // ok
    return items;
  }

  async _list({ atomClass: _atomClass, options, user, pageForce = true, count = 0 }: SelectParams & { count: number }) {
    if (!options) options = {};
    if (!user) user = { id: 0 };
    const {
      where,
      orders,
      page: _page,
      star = 0,
      label = 0,
      comment = 0,
      file = 0,
      stage: _stage = 'formal',
      language,
      category = 0,
      tag = 0,
      mine = 0,
      resource = 0,
      resourceLocale,
      role = 0,
      mode,
    } = options;
    // page
    const page = this.app.bean.util.page(_page, pageForce);
    // stage
    const stage = typeof _stage === 'number' ? _stage : this.self.scope.constant.atom.stage[_stage];
    // tableName
    let atomClass: AtomClassParams | undefined;
    let atomClassBase;
    let tableName = '';
    let schema;
    if (_atomClass) {
      atomClass = _atomClass;
      atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
      if (!atomClassBase) throw new Error(`atomClass not found: ${atomClass.module}:${atomClass.atomClassName}`);
      tableName = await this.getTableName({
        atomClass,
        atomClassBase,
        options,
        mode: options!.mode,
        user,
        action: 'select',
        count,
      });
      // hold for subsequent usage
      // options.tableName = tableName;
      // need not, moved to local.procedure
      // // 'where' should append atomClassId, such as article/post using the same table
      // if (!atomClassBase.itemOnly) {
      //   options.where['a.atomClassId'] = atomClass.id;
      // }
      // schema
      const atomSchema = await this.self._prepareAtomSchema({
        mode: options!.containerMode || 'view',
        atomClass,
        options,
        user,
      });
      schema = atomSchema!.schema;
    }
    // cms
    const cms = atomClassBase && atomClassBase.cms;
    // forAtomUser
    const forAtomUser = this.self._checkForAtomUser(atomClass);
    // options: maybe has another custom options
    const options2: SelectOptionsPro = Object.assign({}, options, {
      iid: this.ctx.instance.id,
      userIdWho: user.id,
      atomClass,
      atomClassBase,
      tableName,
      schema,
      where,
      orders,
      page,
      star,
      label,
      comment,
      file,
      count,
      stage,
      language,
      category,
      tag,
      mine,
      resource,
      resourceLocale,
      mode,
      cms,
      forAtomUser,
      role,
    });
    // selectQuery
    let items;
    if (atomClass) {
      const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName);
      items = await beanInstance.selectQuery({ atomClass, options: options2, user });
    } else {
      items = await this._selectQuery({ atomClass, options: options2, user });
    }
    // ok
    return count ? this.bean.model.extractCount(items) : items;
  }

  async _selectQuery({ atomClass, options, user }: AtomSelectQueryParams) {
    return await this.sqlProcedure.selectAtoms({ atomClass, options, user });
  }
}
