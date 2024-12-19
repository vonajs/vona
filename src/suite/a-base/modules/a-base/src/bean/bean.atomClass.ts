import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanModuleScopeBase } from 'vona';
import { AtomClass, AtomClassBase, AtomClassParams } from '../types.js';
import { EntityAtomClass } from '../index.js';
import { IModelSelectParamsJoin } from 'vona-module-a-database';

@Bean()
export class BeanAtomClass extends BeanModuleScopeBase {
  get model() {
    return this.scope.model.atomClass;
  }

  async atomClass(atomClass: AtomClass): Promise<AtomClassBase> {
    return this.app.bean.base.atomClass({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
    });
  }

  async get(params: AtomClassParams): Promise<EntityAtomClass> {
    return await this.__getRaw(params);
  }

  async getAtomClassIdsInner({ inner }: any) {
    // cache
    const cache = this.scope.summerCache.atomClassInner;
    // key
    const key = inner ? 'in' : 'notin';
    const atomClasses = await cache.get(key);
    return atomClasses.map(item => item.id);
  }

  async __getRaw(params: AtomClassParams): Promise<EntityAtomClass> {
    const id = params.id;
    if (id) {
      const res = await this.model.get({ id });
      if (!res) throw new Error(`atomClass not found: ${id}`);
      return res;
    }
    const module = params.module || this.moduleScope;
    const atomClassName = params.atomClassName;
    if (!module || !atomClassName) this.scope.error.InvalidArguments.throw();
    const data = { module, atomClassName };
    const res = await this.model.get(data);
    if (res) return res;
    // lock
    return await this.scope.redlock.lockIsolate('atomClass.register', async () => {
      return await this._registerLock({ module, atomClassName });
    });
  }

  async _registerLock({ module, atomClassName }: any) {
    // atomClassBase
    const atomClassBase = this.app.bean.base.atomClass({ module, atomClassName });
    if (!atomClassBase) throw new Error(`atomClass ${module}:${atomClassName} not found!`);
    // atom class
    const data = await this._registerLock_inner({ module, atomClassName });
    // atom action: basics
    //  only for !itemOnly
    if (!atomClassBase.itemOnly) {
      for (const code of [1, 2, 3, 4]) {
        await this.app.bean.atomAction._registerLock_inner({ atomClassId: data.id, code });
      }
    }
    // ok
    return data;
  }

  async _registerLock_inner({ module, atomClassName }: any) {
    // get
    const res = await this.model.get({ module, atomClassName });
    if (res) return res;
    // data
    const data: any = {
      module,
      atomClassName,
    };
    // insert
    const res2 = await this.model.insert(data);
    data.id = res2[0];
    return data;
  }

  async getAtomClassId(atomClass) {
    if (atomClass.id) return atomClass.id;
    const res = await this.get(atomClass);
    return res.id;
  }

  async getByAtomId({ atomId }: any) {
    const atom = await this.app.bean.atom.get({ atomId });
    if (!atom) return null;
    return await this.get({ id: atom.atomClassId });
    // const res = await this.model.query(
    //   `
    //   select a.*,b.id as atomId,b.itemId from aAtomClass a
    //     left join aAtom b on a.id=b.atomClassId
    //       where b.iid=? and b.id=?
    //   `,
    //   [this.ctx.instance.id, atomId]
    // );
    // return res[0];
  }

  async validator({ atomClass }: any) {
    // default
    const _module = this.ctx.app.meta.modules[atomClass.module];
    const validator = _module.meta.base.atoms[atomClass.atomClassName].validator;
    if (!validator) return null;
    if (typeof validator === 'string') {
      return { module: atomClass.module, validator };
    }
    return {
      module: validator.module,
      validator: validator.name,
    };
  }

  async validatorSearch({ atomClass }: any) {
    const _module = this.ctx.app.meta.modules[atomClass.module];
    const validator = _module.meta.base.atoms[atomClass.atomClassName].search.validator;
    if (!validator) return null;
    if (typeof validator === 'string') {
      return { module: atomClass.module, validator };
    }
    return {
      module: validator.module,
      validator: validator.name,
    };
  }

  async atomClassesUser({ user }: any) {
    // items
    const items = await this.bean.model.select(
      'aViewUserRightAtomClass as a',
      {
        distinct: true,
        columns: ['a.atomClassId', 'b.module', 'b.atomClassName'],
        joins: [['innerJoin', 'aAtomClass as b', { 'a.atomClassId': 'b.id' }]] as IModelSelectParamsJoin[],
        where: {
          'a.userIdWho': user.id,
        },
      },
      { disableDeleted: true },
    );
    const itemsMap: any = {};
    for (const item of items) {
      itemsMap[`${item.module}:${item.atomClassName}`] = item.atomClassId;
    }
    // atomClasses
    const _atomClasses = this.app.bean.base.atomClasses();
    // atomClassesNew
    const atomClassesNew: any = {};
    for (const _moduleName in _atomClasses) {
      const atomClassesModuleNew: any = {};
      const _atomClassesModule = _atomClasses[_moduleName];
      for (const _atomClassName in _atomClassesModule) {
        const _atomClass = _atomClassesModule[_atomClassName];
        const _atomClassId = itemsMap[`${_moduleName}:${_atomClassName}`];
        if (_atomClassId) {
          atomClassesModuleNew[_atomClassName] = {
            id: _atomClassId,
            ..._atomClass,
          };
        }
      }
      if (Object.keys(atomClassesModuleNew).length > 0) {
        atomClassesNew[_moduleName] = atomClassesModuleNew;
      }
    }
    // ok
    return atomClassesNew;
  }

  async actionsUser({ atomClass, user }: any) {
    const atomClassId = await this.getAtomClassId(atomClass);
    // items
    const items = await this.bean.model.select(
      'aViewUserRightAtomClass as a',
      {
        distinct: true,
        columns: [
          'a.atomClassId',
          'a.action',
          'b.id as actionId',
          'b.name',
          'b.bulk',
          'b.actionMode',
          'c.atomName as flowDefName',
        ],
        joins: [
          ['innerJoin', 'aAtomAction as b', { 'a.atomClassId': 'b.atomClassId', 'a.action': 'b.code' }],
          ['leftJoin', 'aAtom as c', { 'b.flowKey': 'c.atomStaticKey', 'c.atomStage': this.bean.model.raw('?', 1) }],
        ],
        where: {
          'a.atomClassId': atomClassId,
          'a.userIdWho': user.id,
        },
      },
      { disableDeleted: true },
    );
    // locale
    await this.app.bean.role._adjustFlowActionsLocale({ items, actionNameKey: 'name' });
    // ok
    return items;
  }

  async checkRightAtomClassActionOfRole({ atomClass, action, roleId, excludeMine, onlyMine }: any) {
    const atomClassId = await this.getAtomClassId(atomClass);
    const where: any = {
      atomClassId,
      action,
      roleIdWho: roleId,
    };
    if (excludeMine) where.scope = { op: '<>', val: '0' };
    if (onlyMine) where.scope = { op: '=', val: '0' };
    const res = await this.bean.model.get('aViewRoleRightAtomClass', where, { disableDeleted: true });
    return !!res;
  }

  async checkRightAtomClassActionOfUser({ atomClass, action, user, excludeMine, onlyMine }: any) {
    if (!user || user.id === 0) return true;
    const atomClassId = await this.getAtomClassId(atomClass);
    const where: any = {
      atomClassId,
      action,
      userIdWho: user.id,
    };
    if (excludeMine) where.scope = { op: '<>', val: '0' };
    if (onlyMine) where.scope = { op: '=', val: '0' };
    const res = await this.bean.model.get('aViewUserRightAtomClass', where, { disableDeleted: true });
    return !!res;
  }

  async checkRightAtomClass({ atomClass, user }: any) {
    if (!user || user.id === 0) return true;
    const atomClassId = await this.getAtomClassId(atomClass);
    const where = {
      atomClassId,
      userIdWho: user.id,
    };
    const res = await this.bean.model.get('aViewUserRightAtomClass', where, { disableDeleted: true });
    return !!res;
  }
}
