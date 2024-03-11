import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { Bean, BeanModuleScopeBase } from '@cabloy/core';

@Bean()
export class BeanAtomClass extends BeanModuleScopeBase<ScopeModule> {
  get model() {
    return this.scope.model.atomClass;
  }

  async atomClass(atomClass) {
    return this.ctx.bean.base.atomClass({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
    });
  }

  async get({ id, module, atomClassName }: any) {
    return await this.__getRaw({ id, module, atomClassName });
  }

  async getAtomClassIdsInner({ inner }: any) {
    // cache
    const cache = this.ctx.bean.summer.getCache({ module: __ThisModule__, name: 'atomClassInner' });
    // key
    const key = inner ? 'in' : 'notin';
    const atomClasses = await cache.get(key);
    return atomClasses.map(item => item.id);
  }

  async __getRaw({ id, module, atomClassName }: any) {
    module = module || this.moduleScope;
    const data = id ? { id } : { module, atomClassName };
    const res = await this.model.get(data);
    if (res) return res;
    if (!module || !atomClassName) this.scope.error.InvalidArguments.throw();
    // lock
    return await this.ctx.meta.util.lock({
      resource: `${__ThisModule__}.atomClass.register`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          beanFullName: 'atomClass',
          context: { module, atomClassName },
          fn: '_registerLock',
        });
      },
    });
  }

  async _registerLock({ module, atomClassName }: any) {
    // atomClassBase
    const atomClassBase = this.ctx.bean.base.atomClass({ module, atomClassName });
    if (!atomClassBase) throw new Error(`atomClass ${module}:${atomClassName} not found!`);
    // atom class
    const data = await this._registerLock_inner({ module, atomClassName });
    // atom action: basics
    //  only for !itemOnly
    if (!atomClassBase.itemOnly) {
      for (const code of [1, 2, 3, 4]) {
        await this.ctx.bean.atomAction._registerLock_inner({ atomClassId: data.id, code });
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
    const atom = await this.ctx.bean.atom.get({ atomId });
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
    const items = await this.bean.model.query(
      `
        select distinct a.atomClassId,b.module,b.atomClassName from aViewUserRightAtomClass a
          inner join aAtomClass b on a.atomClassId=b.id
            where a.iid=? and a.userIdWho=?
      `,
      [this.ctx.instance.id, user.id],
    );
    const itemsMap: any = {};
    for (const item of items) {
      itemsMap[`${item.module}:${item.atomClassName}`] = item.atomClassId;
    }
    // atomClasses
    const _atomClasses = this.ctx.bean.base.atomClasses();
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
    const items = await this.bean.model.query(
      `
          select distinct a.atomClassId,a.action,b.id as actionId,b.name,b.bulk,b.actionMode,c.atomName as flowDefName from aViewUserRightAtomClass a
            inner join aAtomAction b on a.atomClassId=b.atomClassId and a.action=b.code
            left join aAtom c on b.flowKey=c.atomStaticKey and c.atomStage=1
              where a.iid=? and a.atomClassId=? and a.userIdWho=?
        `,
      [this.ctx.instance.id, atomClassId, user.id],
    );
    // locale
    await this.ctx.bean.role._adjustFlowActionsLocale({ items, actionNameKey: 'name' });
    // ok
    return items;
  }

  async checkRightAtomClassActionOfRole({ atomClass, action, roleId, excludeMine, onlyMine }: any) {
    const atomClassId = await this.getAtomClassId(atomClass);
    const clauseExcludeMine = excludeMine ? 'and scope<>0' : '';
    const clauseOnlyMine = onlyMine ? 'and scope=0' : '';
    const res = await this.bean.model.queryOne(
      `
        select * from aViewRoleRightAtomClass 
          where iid=? and atomClassId=? and action=? ${clauseExcludeMine} ${clauseOnlyMine} and roleIdWho=?
      `,
      [this.ctx.instance.id, atomClassId, action, roleId],
    );
    return !!res;
  }

  async checkRightAtomClassActionOfUser({ atomClass, action, user, excludeMine, onlyMine }: any) {
    if (!user || user.id === 0) return true;
    const atomClassId = await this.getAtomClassId(atomClass);
    const clauseExcludeMine = excludeMine ? 'and scope<>0' : '';
    const clauseOnlyMine = onlyMine ? 'and scope=0' : '';
    const res = await this.bean.model.queryOne(
      `
        select * from aViewUserRightAtomClass 
          where iid=? and atomClassId=? and action=? ${clauseExcludeMine} ${clauseOnlyMine} and userIdWho=?
      `,
      [this.ctx.instance.id, atomClassId, action, user.id],
    );
    return !!res;
  }

  async checkRightAtomClass({ atomClass, user }: any) {
    if (!user || user.id === 0) return true;
    const atomClassId = await this.getAtomClassId(atomClass);
    const res = await this.bean.model.queryOne(
      `
        select * from aViewUserRightAtomClass 
          where iid=? and atomClassId=? and userIdWho=?
      `,
      [this.ctx.instance.id, atomClassId, user.id],
    );
    return !!res;
  }
}
