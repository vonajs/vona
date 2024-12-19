import { Atom } from '../lib/atom.js';
import { BeanAtomBase } from '../bean/bean.atomBase.js';

@Atom()
export class AtomRole extends BeanAtomBase {
  get model() {
    return this.scope.model.role;
  }

  get modelAtom() {
    return this.scope.model.atom;
  }

  get beanRole() {
    return this.app.bean.role;
  }

  async default({ atomClass, item, options, user }: any) {
    // role default
    const data = await this.model.default();
    // super
    return await super.default({ atomClass, data, item, options, user });
  }

  async read({ atomClass, options, key, user }: any) {
    // super
    const item = await super.read({ atomClass, options, key, user });
    if (!item) return null;
    // meta
    await this._getMeta(options, item, true);
    // ok
    return item;
  }

  async select({ atomClass, options, items, user }: any) {
    // super
    await super.select({ atomClass, options, items, user });
    // meta
    const showSorting = !!(options && options.category);
    for (const item of items) {
      await this._getMeta(options, item, showSorting);
    }
  }

  async create({ atomClass, item, options, user }: any) {
    // only support atomStage=1
    if (item.atomStage !== 1) throw new Error('role only support atomStage=1');
    // fields
    const catalog = item.catalog || 0;
    const system = item.system || 0;
    let roleIdParent = item.roleIdParent || 0;
    // is 0 when clone
    if (roleIdParent !== 0) {
      // roleIdParent maybe string
      roleIdParent = await this._prepareRoleIdFromName(roleIdParent);
      // check if addChild right of roleIdParent
      const addChildRight = await this.beanRole._checkRightActionOfRole({
        roleId: roleIdParent,
        action: 'addChild',
        user,
      });
      if (!addChildRight) this.app.throw(403);
    }
    // super
    let data = await super.create({ atomClass, item, options, user });
    const atomId = data.atomId;
    // add role
    //   item.itemId only be set from inner access
    let itemId = item.itemId;
    if (!itemId) {
      data = Object.assign(data, {
        catalog,
        system,
        roleIdParent,
        roleName: data.atomName,
      });
      itemId = data.itemId = await this.model.create(data);
    } else {
      data = Object.assign(data, {
        id: itemId,
        catalog,
        system,
        roleIdParent,
        roleName: undefined,
      });
      await this.model.write(data);
    }
    // update roleIdOwner
    await this.modelAtom.update({ id: atomId, roleIdOwner: itemId });
    // adjust catalog
    await this.beanRole.adjustCatalog(roleIdParent);
    // set dirty
    await this.beanRole.setDirty(true);
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }: any) {
    // check demo
    this.app.bean.util.checkDemoForAtomWrite();
    // roleIdParent
    if (key.atomId !== 0) {
      // donnot change if update
      delete item.roleIdParent;
    } else {
      // roleIdParent maybe string, so cause validate error
      item.roleIdParent = await this._prepareRoleIdFromName(item.roleIdParent);
    }
    // super
    const data = await super.write({ atomClass, target, key, item, options, user });
    // update role
    if (key.atomId !== 0) {
      if (data.atomName) data.roleName = data.atomName;
      await this.model.write(data);
    }
    // clear summer: for roleName or roleTypeCode maybe changed
    await this.app.bean.atomRightAux.clearSummersOfUser();
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }: any) {
    const roleId = key.itemId;
    // force
    const force = options && options.force;
    // role
    const role = await this.beanRole.get({ id: roleId });
    if (!role) return;
    // parent
    const roleIdParent = role.roleIdParent;

    // check if system
    if (role.system) this.app.throw(403);
    // check if children
    if (role.catalog && !force) {
      const children = await this.beanRole.children({ roleId });
      if (children.length > 0) this.scope.error.ShouldDeleteChildrenFirst.throw();
    }

    // delete all includes
    await this.beanRole.modelRoleInc.delete({ roleId });
    await this.beanRole.modelRoleInc.delete({ roleIdInc: roleId });

    // delete all users
    await this.beanRole.modelUserRole.delete({ roleId });

    // delete all atom rights
    await this.beanRole.modelRoleRight.delete({ roleId });
    await this.beanRole.modelRoleRightRef.delete({ roleId });

    // super
    await super.delete({ atomClass, key, options, user });
    // delete role
    await this.model.delete({
      id: key.itemId,
    });

    // adjust catalog
    await this.beanRole.adjustCatalog(roleIdParent);

    // set dirty
    await this.beanRole.setDirty(true);
  }

  async copy({ atomClass, target, srcKey, srcItem, destKey, destItem, options, user }: any) {
    await super.copy({ atomClass, target, srcKey, srcItem, destKey, destItem, options, user });
    if (target === 'clone') {
      await this.model.update({
        id: destKey.itemId,
        catalog: 0, // srcItem.catalog,
        system: 0, // srcItem.system,
        roleIdParent: srcItem.roleIdParent,
      });
    }
  }

  async checkRightAction({ atom, atomClass, action, options, user }: any) {
    // super
    const res = await super.checkRightAction({ atom, atomClass, action, options, user });
    if (!res) return res;
    if (atom.atomStage !== 1) return res;
    // delete/clone/move/addChild/roleUsers/includes/resourceAuthorizations/atomAuthorizations/fieldsAuthorizations
    if (![4, 5, 101, 102, 103, 104, 105, 106, 107].includes(action)) return res;
    // role
    let role = await this.model.get({ id: atom.itemId });
    if (!role) this.app.throw(403);
    role = role!;
    // delete
    if (action === 4) {
      if (role.system === 1) return null;
    }
    // clone
    if (action === 5) {
      if (role.roleIdParent === 0) return null;
      if (atom.atomName === 'OpenAuthScope' && role.roleTypeCode === 6) return null;
    }
    // move
    if (action === 101) {
      if (role.system === 1) return null;
    }
    // addChild
    if (action === 102) {
      if (atom.atomName !== 'OpenAuthScope' && role.roleTypeCode === 6) return null;
    }
    // roleUsers
    if (action === 103) {
      if (role.catalog === 1) return null;
      if (role.roleTypeCode === 6) return null;
    }
    // includes
    if (action === 104) {
      // if (role.roleTypeCode === 6) return null;
    }
    // resourceAuthorizations
    if (action === 105) {
      if (['OpenAuthScope', 'RoleScopeFull'].includes(atom.atomName) && role.roleTypeCode === 6) return null;
    }
    // atomAuthorizations
    if (action === 106) {
      if (['OpenAuthScope', 'RoleScopeFull'].includes(atom.atomName) && role.roleTypeCode === 6) return null;
    }
    // fieldsAuthorizations
    if (action === 107) {
      if (role.roleTypeCode === 6) return null;
    }
    // default
    return res;
  }

  async _getMeta(_options, item, showSorting) {
    // meta
    const meta = this._ensureItemMeta(item);
    // meta.flags
    if (showSorting) {
      meta.flags.push(item.sorting);
    }
    // meta.summary
    meta.summary = item.description;
    // translate
    await this._getMetaTranslate({ item });
    // roleNameParent
    if (item.roleNameParent) {
      item.roleNameParentLocale = this.app.text(item.roleNameParent);
    }
  }

  async _getMetaTranslate({ item }: any) {
    const dictKey = 'a-base:dictRoleType';
    const atomDict = await this.modelAtom.get({
      atomStaticKey: dictKey,
      atomStage: 1,
    });
    if (!atomDict) {
      // do nothing
      return;
    }
    // translate
    await this._dictTranslateField({
      item,
      fieldName: 'roleTypeCode',
      code: item.roleTypeCode,
      field: {
        dictKey: 'a-base:dictRoleType',
      },
    });
  }

  async _prepareRoleIdFromName(roleId) {
    if (roleId === 0 || typeof roleId !== 'string') return roleId;
    const role = await this.beanRole.parseRoleName({ roleName: roleId, force: false });
    return role.id;
  }
}
