import { BigNumber } from 'cabloy-module-api-a-database';
import { __ThisModule__ } from '../../resource/this.js';
import { BeanAtomBase } from '../virtual.atomBase.js';
import { BeanAtom0Read } from './bean.atom_0_read.js';

export class BeanAtom0Select extends BeanAtom0Read {
  // count
  async count({ atomClass, options, user }: any): Promise<BigNumber> {
    return await this.select({ atomClass, options, user, count: 1 });
  }

  // select
  async select({ atomClass, options, user, pageForce = true, count = 0 }: any) {
    if (!options) options = {};
    if (!options.where) options.where = {};
    if (!options.orders) options.orders = [];
    // atomClass
    let atomClassBase;
    if (atomClass) {
      atomClass = await this.ctx.bean.atomClass.get(atomClass);
      atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
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
      if (atomClass) {
        const beanInstance: BeanAtomBase = this.ctx.bean._getBean(atomClassBase.beanFullName);
        await beanInstance.select({ atomClass, options, items, user });
      } else {
        await this.ctx.bean.atomBase.select({ atomClass, options, items, user });
      }
    }
    // ok
    return items;
  }

  async _list({ atomClass, options, user, pageForce = true, count = 0 }: any) {
    let {
      where,
      orders,
      page,
      star = 0,
      label = 0,
      comment = 0,
      file = 0,
      stage = 'formal',
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
    page = this.ctx.bean.util.page(page, pageForce);
    // stage
    stage = typeof stage === 'number' ? stage : this.ctx.constant.module(__ThisModule__).atom.stage[stage];
    // tableName
    let atomClassBase;
    let tableName = '';
    if (atomClass) {
      atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
      if (!atomClassBase) throw new Error(`atomClass not found: ${atomClass.module}:${atomClass.atomClassName}`);
      tableName = await this.getTableName({
        atomClass,
        atomClassBase,
        options,
        mode: options.mode,
        user,
        action: 'select',
        count,
      });
      // hold for subsequent usage
      options.tableName = tableName;
      // need not, moved to local.procedure
      // // 'where' should append atomClassId, such as article/post using the same table
      // if (!atomClassBase.itemOnly) {
      //   options.where['a.atomClassId'] = atomClass.id;
      // }
      // schema
      const atomSchema = await this.self._prepareAtomSchema({
        mode: options.containerMode || 'view',
        atomClass,
        options,
        user,
      });
      options.schema = atomSchema.schema;
    }
    // cms
    const cms = atomClassBase && atomClassBase.cms;
    // forAtomUser
    const forAtomUser = this.self._checkForAtomUser(atomClass);
    // options: maybe has another custom options
    options = Object.assign({}, options, {
      iid: this.ctx.instance.id,
      userIdWho: user ? user.id : 0,
      atomClass,
      atomClassBase,
      tableName,
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
    let sql;
    if (atomClass) {
      const beanInstance: BeanAtomBase = this.ctx.bean._getBean(atomClassBase.beanFullName);
      sql = await beanInstance.selectQuery({ atomClass, options, user });
    } else {
      sql = await this._selectQuery({ atomClass, options, user });
    }
    const debug = this.ctx.app.bean.debug.get('atom:sql');
    debug('===== selectAtoms =====\n%s', sql);
    // query
    let items;
    if (Array.isArray(sql)) {
      items = sql;
    } else {
      items = sql === false ? [] : await this.bean.model.query(sql);
    }
    // count
    if (count) {
      return items[0]._count;
    }
    // ok
    return items;
  }

  async _selectQuery({ /* atomClass, */ options, user: _user }: any) {
    return await this.sqlProcedure.selectAtoms({ options });
  }
}
