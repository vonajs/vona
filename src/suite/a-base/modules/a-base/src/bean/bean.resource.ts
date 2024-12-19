import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanModuleScopeBase } from 'vona';

let __atomClassesResource: any = null;

const __atomClass = {
  module: __ThisModule__,
  atomClassName: 'resource',
};

@Bean()
export class BeanResource extends BeanModuleScopeBase {
  get model() {
    return this.scope.model.resource;
  }

  get modelResourceLocale() {
    return this.scope.model.resourceLocale;
  }

  get modelResourceRole() {
    return this.scope.model.resourceRole;
  }

  get sqlProcedure() {
    return this.scope.service.procedure;
  }

  // count
  async count({ options, user }: any) {
    return await this.select({ options, user, count: 1 });
  }

  // select
  //   donot set atomDisabled
  async select({
    atomClass,
    options: {
      where,
      orders,
      page,
      resourceType,
      appKey,
      star = 0,
      label = 0,
      stage = 'formal',
      category = 0,
      tag = 0,
      locale,
    },
    user,
    pageForce = false,
    count = 0,
  }: any) {
    // atomClass
    atomClass = atomClass || __atomClass;
    // locale
    if (locale !== false) {
      locale = locale || this.ctx.locale;
    }
    // where
    if (!where) where = {};
    if (resourceType) {
      where['f.resourceType'] = resourceType;
    }
    // need not handle as this
    // if (appKey === 'a-appbooster:appUnclassified') {
    //   appKey = null;
    // }
    if (appKey !== undefined) {
      // appKey maybe null/empty string
      where['f.appKey'] = appKey ? appKey : null;
    }
    // options
    const options = {
      where,
      orders,
      page,
      star,
      label,
      stage,
      category,
      tag,
      resource: 1,
      resourceLocale: locale,
    };
    return await this.app.bean.atom._select({
      atomClass,
      options,
      user,
      pageForce,
      count,
    });
  }

  async readByStaticKey({ atomStaticKey, options, user }: any) {
    if (!atomStaticKey) return this.scope.error.ElementDoesNotExist.throw();
    // get atomId
    const atom = await this.app.bean.atom.modelAtom.get({
      atomStaticKey,
      atomStage: 1,
    });
    if (!atom) return this.scope.error.ResourceDoesNotExist__.throw(atomStaticKey);
    const atomId = atom.id;
    // check resource right
    const res = await this.checkRightResource({ resourceAtomId: atomId, user });
    if (!res) this.app.throw(403);
    // read
    return await this.read({ key: { atomId }, options, user });
  }

  // read
  async read({ key, options, user }: any) {
    options = Object.assign({ resource: 1 }, options);
    // locale
    let locale = options.locale;
    if (locale !== false) {
      locale = locale || this.ctx.locale;
    }
    options.resourceLocale = locale;
    return await this.app.bean.atom.read({ key, options, user });
  }

  async setLocales({ atomId, atomName }: any) {
    // select
    const items = await this.modelResourceLocale.select({ where: { atomId } });
    // setLocales
    const locales = this.scope.config.locales;
    for (const locale in locales) {
      const atomNameLocale = this.app.text.locale(locale as any, atomName);
      const item = items.find(_item => _item.locale === locale);
      if (item) {
        if (atomNameLocale !== item.atomNameLocale) {
          await this.modelResourceLocale.update({
            id: item.id,
            atomNameLocale,
          });
        }
      } else {
        await this.modelResourceLocale.insert({
          atomId,
          locale,
          atomNameLocale,
        });
      }
    }
  }

  async checkLocales() {
    // setLocales
    const locales = this.scope.config.locales;
    for (const locale in locales) {
      await this._checkLocale({ locale });
    }
  }

  async _checkLocale({ locale }: any) {
    const resources = await this._checkResourceLocales({ locale });
    if (resources.length === 0) return;
    // insert locales
    for (const resource of resources) {
      await this.modelResourceLocale.insert({
        atomId: resource.atomId,
        locale,
        atomNameLocale: this.app.text.locale(locale, resource.atomName),
      });
    }
  }

  async _checkResourceLocales({ locale }: any) {
    const atomClasses = await this._getAtomClassesResource();
    const atomClassIds = atomClasses.map(item => item.id);
    const res = await this.sqlProcedure._checkResourceLocales({
      locale,
      atomClassIds,
    });
    return res;
  }

  // check
  async check({ atomStaticKeys, user }: any) {
    const output: any[] = [];
    for (const atomStaticKey of atomStaticKeys) {
      const res = await this.checkRightResource({ atomStaticKey, user });
      if (res) {
        output.push({
          passed: true,
          atomId: res.atomId,
          atomStaticKey,
        });
      } else {
        output.push({
          passed: false,
          atomStaticKey,
        });
      }
    }
    return output;
  }

  async checkRightResource({ resourceAtomId, atomStaticKey, user }: any) {
    // normal check
    const res = await this._checkRightResource_normal({ resourceAtomId, atomStaticKey, user });
    if (!res) return res;
    // auth open check
    const resAuthOpenCheck = await this.app.bean.authOpen.checkRightResource({ resourceAtomId: res.atomId });
    if (!resAuthOpenCheck) return null;
    // ok
    return res;
  }

  async _checkRightResource_normal({ resourceAtomId, atomStaticKey, user }: any) {
    if (!resourceAtomId) {
      const atom = await this.app.bean.atom.modelAtom.get({ atomStaticKey, atomDisabled: 0, atomStage: 1 });
      if (!atom) return null;
      resourceAtomId = atom.id;
    }
    const res = await this.sqlProcedure.checkRightResource({
      userIdWho: user && user.id,
      resourceAtomId,
    });
    return res;
  }

  async resourceRoles({ key /* , user */ }: any) {
    const items = await this.bean.model.select('aResourceRole as a', {
      columns: ['a.*', 'b.roleName'],
      joins: [['leftJoin', 'aRole as b', { 'a.roleId': 'b.id' }]],
      where: {
        'a.atomId': key.atomId,
      },
      orders: [['b.roleName']],
    });
    // locale
    for (const item of items) {
      item.roleNameLocale = this.app.text(item.roleName);
    }
    // ok
    return items;
  }

  // add resource role
  async addResourceRole({ roleAtomId, roleId, atomId, atomStaticKey, user }: any) {
    if (!atomId && !atomStaticKey) return null;
    // atomId
    atomId = await this._forceResourceAtomIdAndCheckRight({ atomId, atomStaticKey, user });
    // role
    const _role = await this.app.bean.role._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role!.id;
    roleAtomId = _role!.atomId;
    // check if exists
    const item = await this.modelResourceRole.get({
      atomId,
      roleId,
    });
    if (item) return item.id;
    // insert
    const res = await this.modelResourceRole.insert({
      atomId,
      roleId,
      roleAtomId,
    });
    return res[0];
  }

  // delete resource role
  async deleteResourceRole({ roleAtomId, roleId, atomId, atomStaticKey, user }: any) {
    if (!atomId && !atomStaticKey) return null;
    // atomId
    atomId = await this._forceResourceAtomIdAndCheckRight({ atomId, atomStaticKey, user });
    // role
    const _role = await this.app.bean.role._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role!.id;
    // delete
    await this.modelResourceRole.delete({
      atomId,
      roleId,
    });
  }

  async deleteByResource({ atomId, atomStaticKey, user }: any) {
    if (!atomId && !atomStaticKey) return null;
    // atomId
    atomId = await this._forceResourceAtomIdAndCheckRight({ atomId, atomStaticKey, user });
    // delete
    await this.modelResourceRole.delete({
      atomId,
    });
  }

  async deleteByRole({ roleAtomId, roleId, user }: any) {
    // role
    const _role = await this.app.bean.role._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role!.id;
    // delete
    await this.modelResourceRole.delete({
      roleId,
    });
  }

  // const roleResources = [
  //   { roleName: 'root', atomStaticKey: 'a-base:listComment' },
  //   { roleName: 'root', name: 'listComment' },
  // ];
  async addRoleResourceBatch({ module, roleResources }: any) {
    // module
    module = module || this.moduleScope;
    // roleResources
    if (!roleResources || !roleResources.length) return;
    for (const roleResource of roleResources) {
      // role
      const role = await this.app.bean.role.parseRoleName({ roleName: roleResource.roleName, force: true });
      // atomStaticKey
      const atomStaticKey = roleResource.atomStaticKey || `${module}:${roleResource.name}`;
      await this.addResourceRole({ atomStaticKey, roleId: role.id });
    }
  }

  // add resource roles
  async addResourceRoles({ roleAtomId, roleId, atomIds, user }: any) {
    for (const atomId of atomIds) {
      await this.addResourceRole({ roleAtomId, roleId, atomId, atomStaticKey: null, user });
    }
  }

  async _getAtomClassesResource() {
    if (__atomClassesResource) return __atomClassesResource;
    const atomClassesResource: any[] = [];
    const atomClasses = this.app.bean.base.atomClasses();
    for (const module in atomClasses) {
      const atomClassesModule = atomClasses[module];
      for (const atomClassName in atomClassesModule) {
        const atomClass = atomClassesModule[atomClassName];
        if (atomClass.resource) {
          const item = await this.app.bean.atomClass.get({ module, atomClassName });
          atomClassesResource.push(item);
        }
      }
    }
    __atomClassesResource = atomClassesResource;
    return __atomClassesResource;
  }

  // admin

  async resourceRights({ roleAtomId, roleId, page }: any) {
    // check locale
    const locale = this.ctx.locale;
    // items
    roleId = await this.app.bean.role._forceRoleId({ roleAtomId, roleId });
    page = this.app.bean.util.page(page, false);
    const builder = this.bean.model
      .builderSelect('aResourceRole as a')
      .select([
        'a.*',
        'b.atomName',
        'b.atomDisabled',
        'b.atomCategoryId',
        'f.categoryName as atomCategoryName',
        'c.module',
        'c.atomClassName',
        'd.atomNameLocale',
        'e.resourceType',
      ])
      .innerJoin('aAtom as b', { 'a.atomId': 'b.id' })
      .innerJoin('aAtomClass as c', { 'b.atomClassId': 'c.id' })
      .leftJoin('aResourceLocale as d', { 'a.atomId': 'd.atomId', 'd.locale': this.bean.model.raw('?', locale) })
      .leftJoin('aResource as e', { 'a.atomId': 'e.atomId' })
      .leftJoin('aCategory as f', { 'b.atomCategoryId': 'f.id' })
      .where({
        'a.roleId': roleId,
        'b.deleted': 0,
        'b.atomStage': 1,
      })
      .orderBy('c.module')
      .orderBy('b.atomClassId')
      .orderBy('e.resourceType')
      .orderBy('b.atomCategoryId');
    this.bean.model.buildPage(builder, page);
    const items = await builder;
    // locale
    this._resourceRightsLocale({ items });
    // ok
    return items;
  }

  async resourceSpreads({ roleAtomId, roleId, page }: any) {
    // check locale
    const locale = this.ctx.locale;
    // items
    roleId = await this.app.bean.role._forceRoleId({ roleAtomId, roleId });
    page = this.app.bean.util.page(page, false);
    const builder = this.bean.model
      .builderSelect('aResourceRole as a')
      .select([
        'g.*',
        'g.id as roleExpandId',
        'a.id as resourceRoleId',
        'b.atomName',
        'b.atomDisabled',
        'b.atomCategoryId',
        'f.categoryName as atomCategoryName',
        'c.module',
        'c.atomClassName',
        'd.atomNameLocale',
        'e.resourceType',
        'h.roleName as roleNameBase',
      ])
      .innerJoin('aAtom as b', { 'a.atomId': 'b.id' })
      .innerJoin('aAtomClass as c', { 'b.atomClassId': 'c.id' })
      .leftJoin('aResourceLocale as d', { 'a.atomId': 'd.atomId', 'd.locale': this.bean.model.raw('?', locale) })
      .leftJoin('aResource as e', { 'a.atomId': 'e.atomId' })
      .leftJoin('aCategory as f', { 'b.atomCategoryId': 'f.id' })
      .leftJoin('aRoleExpand as g', { 'a.roleId': 'g.roleIdBase' })
      .leftJoin('aRole as h', { 'g.roleIdBase': 'h.id' })
      .where({
        'g.iid': this.ctx.instance.id,
        'g.deleted': 0,
        'g.roleId': roleId,
        'b.deleted': 0,
        'b.atomStage': 1,
      })
      .orderBy('c.module')
      .orderBy('b.atomClassId')
      .orderBy('e.resourceType')
      .orderBy('b.atomCategoryId');
    this.bean.model.buildPage(builder, page);
    const items = await builder;
    // locale
    this._resourceRightsLocale({ items });
    // ok
    return items;
  }

  async resourceRightsOfUser({ userAtomId, userId, page }: any) {
    userId = await this.app.bean.user._forceUserId({ userAtomId, userId });
    // check locale
    const locale = this.ctx.locale;
    // items
    page = this.app.bean.util.page(page, false);
    const builder = this.bean.model
      .builderSelect('aViewUserRightResource as a', { disableDeleted: true })
      .select([
        'a.*',
        'b.atomName',
        'b.atomDisabled',
        'b.atomCategoryId',
        'f.categoryName as atomCategoryName',
        'c.module',
        'c.atomClassName',
        'd.atomNameLocale',
        'e.resourceType',
        'h.roleName as roleNameBase',
      ])
      .innerJoin('aAtom as b', { 'a.resourceAtomId': 'b.id' })
      .innerJoin('aAtomClass as c', { 'b.atomClassId': 'c.id' })
      .leftJoin('aResourceLocale as d', {
        'a.resourceAtomId': 'd.atomId',
        'd.locale': this.bean.model.raw('?', locale),
      })
      .leftJoin('aResource as e', { 'a.resourceAtomId': 'e.atomId' })
      .leftJoin('aCategory as f', { 'b.atomCategoryId': 'f.id' })
      .leftJoin('aRole as h', { 'a.roleIdBase': 'h.id' })
      .where({ 'a.userIdWho': userId, 'b.deleted': 0, 'b.atomStage': 1 })
      .orderBy('c.module')
      .orderBy('b.atomClassId')
      .orderBy('e.resourceType')
      .orderBy('b.atomCategoryId');
    this.bean.model.buildPage(builder, page);
    const items = await builder;
    // locale
    this._resourceRightsLocale({ items });
    // ok
    return items;
  }

  _resourceRightsLocale({ items }: any) {
    // resourceTypes for a-base:resource
    const resourceTypes = this.app.bean.base.resourceTypes();
    // locale
    for (const item of items) {
      // resource type
      const resourceType = resourceTypes[item.resourceType];
      if (resourceType) {
        item.resourceTypeLocale = resourceType.titleLocale;
      }
      // category name
      item.atomCategoryNameLocale = this.app.text(item.atomCategoryName);
      // roleNameBase
      if (item.roleNameBase) {
        item.roleNameBaseLocale = this.app.text(item.roleNameBase);
      }
    }
  }

  async _forceResourceAtomId({ atomId, atomStaticKey }: any) {
    if (!atomId) {
      const atom = await this.app.bean.atom.modelAtom.get({
        atomStaticKey,
        atomStage: 1, // formal
      });
      if (!atom) {
        throw new Error(`resource not found: ${atomStaticKey}`);
      }
      atomId = atom.id;
    }
    return atomId;
  }

  async _forceResourceAtomIdAndCheckRight({ atomId, atomStaticKey, user }: any) {
    atomId = await this._forceResourceAtomId({ atomId, atomStaticKey });
    if (!user || user.id === 0) return atomId;
    // check
    const res = await this.checkRightResource({ resourceAtomId: atomId, user });
    if (!res) this.app.throw(403);
    return atomId;
  }

  // /* backup */

  // // function rights
  // async functionRights({ menu, roleId, page }: any) {
  //   // check locale
  //   const locale = this.ctx.locale;
  //   // list
  //   page = this.app.bean.util.page(page, false);
  //   const _limit = this.bean.model._limit(page.size, page.index);
  //   const list = await this.bean.model.query(`
  //     select a.*,b.module,b.name,b.title,b.sceneId,g.sceneName,b.sorting,f.titleLocale from aRoleFunction a
  //       left join aFunction b on a.functionId=b.id
  //       left join aFunctionLocale f on a.functionId=f.functionId
  //       left join aFunctionScene g on g.id=b.sceneId
  //         where a.iid=? and a.roleId=? and b.menu=? and f.locale=?
  //         order by b.module,g.sceneSorting,b.sorting
  //         ${_limit}
  //     `, [ this.ctx.instance.id, roleId, menu, locale ]);
  //   return list;
  // }

  // // function spreads
  // async functionSpreads({ menu, roleId, page }: any) {
  //   // check locale
  //   const locale = this.ctx.locale;
  //   // list
  //   page = this.app.bean.util.page(page, false);
  //   const _limit = this.bean.model._limit(page.size, page.index);
  //   const list = await this.bean.model.query(`
  //     select d.*,d.id as roleExpandId,a.id as roleFunctionId,b.module,b.name,b.title,b.sceneId,g.sceneName,e.roleName,f.titleLocale from aRoleFunction a
  //       left join aFunction b on a.functionId=b.id
  //       left join aRoleExpand d on a.roleId=d.roleIdBase
  //       left join aRole e on d.roleIdBase=e.id
  //       left join aFunctionLocale f on a.functionId=f.functionId
  //       left join aFunctionScene g on g.id=b.sceneId
  //         where d.iid=? and d.roleId=? and b.menu=? and f.locale=?
  //         order by b.module,g.sceneSorting,b.sorting
  //         ${_limit}
  //     `, [ this.ctx.instance.id, roleId, menu, locale ]);
  //   return list;
  // }

  // // function rights of user
  // async functionRightsOfUser({ menu, userId, page }: any) {
  //   // check locale
  //   const locale = this.ctx.locale;
  //   // list
  //   page = this.app.bean.util.page(page, false);
  //   const _limit = this.bean.model._limit(page.size, page.index);
  //   const list = await this.bean.model.query(`
  //     select a.*,b.module,b.name,b.title,b.sceneId,g.sceneName,b.sorting,f.titleLocale,e.roleName from aViewUserRightFunction a
  //       left join aFunction b on a.functionId=b.id
  //       left join aFunctionLocale f on a.functionId=f.functionId
  //       left join aFunctionScene g on g.id=b.sceneId
  //       left join aRole e on a.roleIdBase=e.id
  //         where a.iid=? and a.userIdWho=? and b.menu=? and f.locale=?
  //         order by b.module,g.sceneSorting,b.sorting
  //         ${_limit}
  //     `, [ this.ctx.instance.id, userId, menu, locale ]);

  //   return list;
  // }
}
