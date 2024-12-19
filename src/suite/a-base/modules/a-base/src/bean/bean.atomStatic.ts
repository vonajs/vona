import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanModuleScopeBase } from 'vona';
import { BeanAtomBase } from './bean.atomBase_.js';

@Bean()
export class BeanAtomStatic extends BeanModuleScopeBase {
  async loadAllAtomStatics() {
    const modules = this._loadAllAtomStatics_prepare();
    const count = modules.length;
    const timeBegin = new Date();
    console.log(`load static begin, pid: ${process.pid}`);
    for (let index = 0; index < count; index++) {
      const { moduleName, statics2 } = modules[index];
      if (this.ctx.app.meta.isTest) {
        console.log(`load static ${index + 1}/${count}: ${moduleName}`);
      }
      for (const { moduleName, atomClass, items } of statics2) {
        await this.loadAtomStatics({ moduleName, atomClass, items });
      }
    }
    const timeEnd = new Date();
    console.log(`load static end, pid: ${process.pid}: ${(timeEnd.valueOf() - timeBegin.valueOf()) / 1000}s`);
  }

  _loadAllAtomStatics_prepare() {
    const modules: any[] = [];
    for (const module of this.ctx.app.meta.modulesArray) {
      const moduleName = module.info.relativeName;
      const statics = module.meta && module.meta.base && module.meta.base.statics;
      if (!statics) continue;
      const statics2: any[] = [];
      for (const atomClassKey in statics) {
        const atomClass = this.app.bean.util.parseAtomClass({
          module: null,
          atomClassName: atomClassKey,
        });
        const items = this._filterGate(statics[atomClassKey].items);
        if (!items || items.length === 0) continue;
        statics2.push({
          moduleName,
          atomClass,
          items,
        });
      }
      if (statics2.length === 0) continue;
      modules.push({
        module,
        moduleName,
        statics2,
      });
    }
    return modules;
  }

  async loadAtomStatics({ moduleName, atomClass, items }: any) {
    const atoms = await this._loadAtomStatics_prepare({ moduleName, atomClass, items });
    for (const item of items) {
      await this.loadAtomStatic({ moduleName, atomClass, item }, atoms);
    }
  }

  async _loadAtomStatics_prepare({ moduleName, atomClass, items }: any) {
    moduleName = moduleName || this.moduleScope;
    const atomStaticKeys: any[] = [];
    for (const item of items) {
      if (!this._checkGate(item)) continue;
      // key not empty
      if (!item.atomStaticKey) {
        throw new Error(`atomStaticKey cannot be empty for atom: ${moduleName}:${item.atomName}`);
      }
      const atomStaticKey = `${moduleName}:${item.atomStaticKey}`;
      atomStaticKeys.push(atomStaticKey);
    }
    if (atomStaticKeys.length === 0) return [];
    const atoms = await this.app.bean.atom.select({
      atomClass,
      options: {
        stage: 'formal',
        where: {
          'a.atomStaticKey': {
            op: 'in',
            val: atomStaticKeys,
          },
        },
      },
      user: undefined,
      pageForce: false,
    });
    return atoms;
  }

  _checkGate(_item) {
    return true;
    //return this.app.meta.util.checkGate(item.__gate__);
  }

  _filterGate(items?: any[]) {
    if (!items) return;
    return items.filter(item => this._checkGate(item));
  }

  async preloadAtomStatic({ atomStaticKey }: any) {
    const data = this._findAtomStatic({ atomStaticKey });
    if (!data) return null;
    const atomKey = await this.loadAtomStatic(data);
    return atomKey;
  }

  async loadAtomStatic({ moduleName, atomClass, item }, atoms?) {
    moduleName = moduleName || this.moduleScope;
    // key not empty
    if (!item.atomStaticKey) {
      throw new Error(`atomStaticKey cannot be empty for atom: ${moduleName}:${item.atomName}`);
    }
    const atomStaticKey = `${moduleName}:${item.atomStaticKey}`;
    const atomRevision = item.atomRevision || 0;
    // atomClassBase
    atomClass = await this.app.bean.atomClass.get(atomClass);
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // get by key
    let atom;
    if (atoms) {
      atom = atoms.find(item => item.atomStaticKey.toLowerCase() === atomStaticKey.toLowerCase());
    } else {
      atom = await this.app.bean.atom.readByStaticKey({
        atomClass,
        atomStaticKey,
        atomStage: 'formal',
      });
    }
    // exists
    if (atom) {
      // check atomClassId
      if (atom.atomClassId !== atomClass.id) {
        const message = `atomStaticKey of ${moduleName}:${item.atomName} conflict with ${moduleName}:${atom.atomName}`;
        throw new Error(message);
      }
      // check if need delete
      if (atomRevision === -1) {
        // delete
        const debug = this.ctx.app.bean.debug.get('static');
        debug('static delete: atomStaticKey:%s', atomStaticKey);
        await this.app.bean.atom.delete({ key: { atomId: atom.atomId } });
        return null;
      }
      // check revision: not use !==
      const changed = this._ifChanged({
        atomClassBase,
        atomRevisionWill: atomRevision,
        atomRevisionCurrent: atom.atomRevision,
      });
      if (changed) {
        const debug = this.ctx.app.bean.debug.get('static');
        debug('static change: atomStaticKey:%s, revision:%d', atomStaticKey, atomRevision);
        item = await this._adjustItem({ moduleName, atomClass, atomClassBase, item, register: false });
        await this._updateRevision({
          atomClassBase,
          atomClass,
          atomIdFormal: atom.atomId,
          item,
        });
        await this._addResourceRoles({ atomId: atom.atomId, roles: item.resourceRoles });
      }
      return { atomId: atom.atomId, itemId: atom.itemId };
    }
    // not exists
    if (atomRevision === -1) {
      // do nothing
      return null;
    }
    // register
    const debug = this.ctx.app.bean.debug.get('static');
    debug('static create: atomStaticKey:%s, revision:%d', atomStaticKey, atomRevision);
    item = await this._adjustItem({ moduleName, atomClass, atomClassBase, item, register: true });
    const atomKey = await this._register({ atomClassBase, atomClass, item });
    await this._addResourceRoles({ atomId: atomKey.atomId, roles: item.resourceRoles });
    return atomKey;
  }

  _ifChanged({ /* atomClassBase,*/ atomRevisionWill, atomRevisionCurrent }: any) {
    const changed = atomRevisionWill > atomRevisionCurrent;
    return changed;
  }

  async _addResourceRoles({ atomId, roles }: any) {
    if (!roles || !roles.length) return;
    for (const role of roles) {
      if (!role) continue;
      await this.app.bean.resource.addResourceRole({
        atomId,
        roleId: role.id,
      });
    }
  }

  // this.app.text is not good for resource
  //   so, support only for atomLanguage
  _getAtomFieldValueByLocale(item, field) {
    const value = item[field];
    if (value && item.atomLanguage) {
      return this.app.text.locale(item.atomLanguage, value);
    }
    return value;
  }

  _adjustItem_atomCategoryId({ atomClass, item }: any) {
    if (
      atomClass.module === 'a-base' &&
      atomClass.atomClassName === 'resource' &&
      ['a-base:menu', 'a-base:mine'].includes(item.resourceType)
    ) {
      const parts = item.atomCategoryId.split('.');
      if (parts[0] !== item.resourceType) {
        parts.unshift(item.resourceType);
      }
      parts.splice(1, 0, item.appKey || 'a-appbooster:appUnclassified');
      item.atomCategoryId = parts.join('.');
    }
  }

  async _adjustItem({ moduleName, atomClass, atomClassBase, item, register }: any) {
    // atom bean
    const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName);
    item = await beanInstance.prepareStaticItem({
      moduleName,
      atomClass,
      item,
      register,
    });
    return item;
  }

  async _adjustItem_base({ moduleName, atomClass, item, register }: any) {
    // item
    item = {
      ...item,
      atomStatic: 1,
      atomStaticKey: `${moduleName}:${item.atomStaticKey}`,
      atomRevision: item.atomRevision || 0,
      atomName: this._getAtomFieldValueByLocale(item, 'atomName'),
    };
    if (item.description !== undefined) {
      item.description = this._getAtomFieldValueByLocale(item, 'description');
    }
    // atomLanguage,atomCategoryId,atomTags
    if (typeof item.atomCategoryId === 'string') {
      this._adjustItem_atomCategoryId({ atomClass, item });
      const category = await this.app.bean.category.parseCategoryName({
        atomClass,
        language: item.atomLanguage,
        categoryName: item.atomCategoryId,
        force: true,
      });
      item.atomCategoryId = category.id;
    }
    if (typeof item.atomTags === 'string') {
      const tagIds = await this.app.bean.tag.parseTags({
        atomClass,
        language: item.atomLanguage,
        tagName: item.atomTags,
        force: true,
      });
      item.atomTags = JSON.stringify(tagIds);
    }
    // only valid for register
    if (register) {
      // roleIdOwner
      if (!item.roleIdOwner || typeof item.roleIdOwner === 'string') {
        const roleName = item.roleIdOwner || 'authenticated.builtIn';
        const role = await this.app.bean.role.parseRoleName({ roleName });
        item.roleIdOwner = role.id;
      }
    }
    // resourceRoles
    if (item.resourceRoles) {
      item.resourceRoles = await this.app.bean.role.parseRoleNames({ roleNames: item.resourceRoles, force: true });
    }
    // ok
    return item;
  }

  _findAtomStatic({ atomStaticKey }: any) {
    const [_moduleName, _atomStaticKey] = atomStaticKey.split(':');
    for (const module of this.ctx.app.meta.modulesArray) {
      const moduleName = module.info.relativeName;
      if (moduleName !== _moduleName) continue;
      const statics = module.meta && module.meta.base && module.meta.base.statics;
      if (!statics) continue;
      for (const atomClassKey in statics) {
        const atomClass = this.app.bean.util.parseAtomClass({
          module: null,
          atomClassName: atomClassKey,
        });
        const items = statics[atomClassKey].items;
        if (!items) continue;
        for (const item of items) {
          if (item.atomStaticKey === _atomStaticKey) {
            return { moduleName, atomClass, item };
          }
        }
      }
    }
    return null;
  }

  async _updateRevision({ atomClassBase, atomClass, atomIdFormal, item }: any) {
    return await this.scope.redlock.lockIsolate(
      `atomStatic.register.${item.atomStaticKey}`,
      async () => {
        return await this._updateRevisionLock({ atomClassBase, atomClass, atomIdFormal, item });
      },
      { transaction: true },
    );
  }

  async _updateRevisionLock({ atomClassBase, atomClass, atomIdFormal, item }: any) {
    // atomCurrent
    const atomCurrent = await this.app.bean.atom.modelAtom.get({ id: atomIdFormal });
    if (!atomCurrent) return;
    // check changed again
    const changed = this._ifChanged({
      atomClassBase,
      atomRevisionWill: item.atomRevision,
      atomRevisionCurrent: atomCurrent.atomRevision,
    });
    if (!changed) return;
    // get atom/atomKey
    let atomKey;
    if (atomClassBase.simple) {
      atomKey = { atomId: atomIdFormal };
    } else {
      if (atomCurrent.atomIdDraft === 0) {
        const res = await this.app.bean.atom.openDraft({ key: { atomId: atomIdFormal }, atomClass, user: null });
        atomKey = res.draft.key;
      } else {
        atomKey = { atomId: atomCurrent.atomIdDraft };
      }
    }
    // simple/normal
    if (atomClassBase.simple) {
      // write
      await this.app.bean.atom.write({
        key: atomKey,
        item,
        user: null,
      });
      // update
      await this.app.bean.atom.modelAtom.update({
        id: atomKey.atomId,
        atomName: item.atomName,
        atomStatic: item.atomStatic,
        atomRevision: item.atomRevision,
      });
    } else {
      // update
      await this.app.bean.atom.modelAtom.update({
        id: atomKey.atomId,
        atomName: item.atomName,
        atomStatic: item.atomStatic,
        atomRevision: item.atomRevision,
      });
      // write
      await this.app.bean.atom.write({
        key: atomKey,
        item,
        user: null,
      });
      // submit
      await this.app.bean.atom.submit({
        key: atomKey,
        options: { ignoreFlow: true },
        user: null,
      });
    }
  }

  async _register({ atomClassBase, atomClass, item }: any) {
    return await this.scope.redlock.lockIsolate(
      `atomStatic.register.${item.atomStaticKey}`,
      async () => {
        return await this._registerLock({ atomClassBase, atomClass, item });
      },
      { transaction: true },
    );
  }

  async _registerLock({ /* atomClassBase,*/ atomClass, item }: any) {
    // get again
    const atom = await this.app.bean.atom.readByStaticKey({
      atomClass,
      atomStaticKey: item.atomStaticKey,
      atomStage: 'formal',
    });
    if (atom) {
      return { atomId: atom.atomId, itemId: atom.itemId };
    }
    // write
    const atomKey = await this.app.bean.atom.write({
      atomClass,
      atomStage: 1,
      roleIdOwner: item.roleIdOwner,
      item,
      user: null,
    });
    // update
    await this.app.bean.atom.modelAtom.update({
      id: atomKey.atomId,
      atomStatic: item.atomStatic,
      atomRevision: item.atomRevision,
    });
    // // submit
    // if (!atomClassBase.simple) {
    //   const res = await this.app.bean.atom.submit({
    //     key: atomKey,
    //     options: { ignoreFlow: true },
    //     user: null,
    //   });
    //   atomKey = res.formal.key;
    // }
    return atomKey;
  }
}
