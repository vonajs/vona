let __atomClassesResource = null;

const moduleInfo = module.info;
const __atomClass = {
  module: moduleInfo.relativeName,
  atomClassName: 'resource',
};
module.exports = class Resource extends module.meta.class.BeanModuleBase {
  get model() {
    return this.ctx.model.module(moduleInfo.relativeName).resource;
  }

  get modelResourceLocale() {
    return this.ctx.model.module(moduleInfo.relativeName).resourceLocale;
  }

  get modelResourceRole() {
    return this.ctx.model.module(moduleInfo.relativeName).resourceRole;
  }

  get sqlProcedure() {
    return this.ctx.bean._getBean('a-base.local.procedure');
  }

  // count
  async count({ options, user }) {
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
  }) {
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
    return await this.ctx.bean.atom.select({
      atomClass,
      options,
      user,
      pageForce,
      count,
    });
  }

  async readByStaticKey({ atomStaticKey, options, user }) {
    if (!atomStaticKey) return this.ctx.throw.module('a-base', 1002);
    // get atomId
    const atom = await this.ctx.bean.atom.modelAtom.get({
      atomStaticKey,
      atomStage: 1,
    });
    if (!atom) return this.ctx.throw.module('a-base', 1016, atomStaticKey);
    const atomId = atom.id;
    // check resource right
    const res = await this.checkRightResource({ resourceAtomId: atomId, user });
    if (!res) this.ctx.throw(403);
    // read
    return await this.read({ key: { atomId }, options, user });
  }

  // read
  async read({ key, options, user }) {
    options = Object.assign({ resource: 1 }, options);
    // locale
    let locale = options.locale;
    if (locale !== false) {
      locale = locale || this.ctx.locale;
    }
    options.resourceLocale = locale;
    return await this.ctx.bean.atom.read({ key, options, user });
  }

  async setLocales({ atomId, atomName }) {
    // select
    const items = await this.modelResourceLocale.select({ where: { atomId } });
    // setLocales
    const locales = this.ctx.config.module(moduleInfo.relativeName).locales;
    for (const locale in locales) {
      const atomNameLocale = this.ctx.text.locale(locale, atomName);
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
    const locales = this.ctx.config.module(moduleInfo.relativeName).locales;
    for (const locale in locales) {
      await this._checkLocale({ locale });
    }
  }

  async _checkLocale({ locale }) {
    const resources = await this._checkResourceLocales({ locale });
    if (resources.length === 0) return;
    // insert locales
    for (const resource of resources) {
      await this.modelResourceLocale.insert({
        atomId: resource.atomId,
        locale,
        atomNameLocale: this.ctx.text.locale(locale, resource.atomName),
      });
    }
  }

  async _checkResourceLocales({ locale }) {
    const atomClasses = await this._getAtomClassesResource();
    const atomClassIds = atomClasses.map(item => item.id);
    const sql = this.sqlProcedure._checkResourceLocales({
      iid: this.ctx.instance.id,
      locale,
      atomClassIds,
    });
    return await this.ctx.model.query(sql);
  }

  // check
  async check({ atomStaticKeys, user }) {
    const output = [];
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

  async checkRightResource({ resourceAtomId, atomStaticKey, user }) {
    // normal check
    const res = await this._checkRightResource_normal({ resourceAtomId, atomStaticKey, user });
    if (!res) return res;
    // auth open check
    const resAuthOpenCheck = await this.ctx.bean.authOpen.checkRightResource({ resourceAtomId: res.atomId });
    if (!resAuthOpenCheck) return null;
    // ok
    return res;
  }

  async _checkRightResource_normal({ resourceAtomId, atomStaticKey, user }) {
    if (!resourceAtomId) {
      const atom = await this.ctx.bean.atom.modelAtom.get({ atomStaticKey, atomDisabled: 0, atomStage: 1 });
      if (!atom) return null;
      resourceAtomId = atom.id;
    }
    const sql = this.sqlProcedure.checkRightResource({
      iid: this.ctx.instance.id,
      userIdWho: user && user.id,
      resourceAtomId,
    });
    return await this.ctx.model.queryOne(sql);
  }

  async resourceRoles({ key /* , user */ }) {
    const items = await this.ctx.model.query(
      `
        select a.*,b.roleName from aResourceRole a
          left join aRole b on a.roleId=b.id
            where a.iid=? and a.atomId=?
            order by b.roleName
        `,
      [this.ctx.instance.id, key.atomId],
    );
    // locale
    for (const item of items) {
      item.roleNameLocale = this.ctx.text(item.roleName);
    }
    // ok
    return items;
  }

  // add resource role
  async addResourceRole({ roleAtomId, roleId, atomId, atomStaticKey, user }) {
    if (!atomId && !atomStaticKey) return null;
    // atomId
    atomId = await this._forceResourceAtomIdAndCheckRight({ atomId, atomStaticKey, user });
    // role
    const _role = await this.ctx.bean.role._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role.id;
    roleAtomId = _role.atomId;
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
    return res.insertId;
  }

  // delete resource role
  async deleteResourceRole({ roleAtomId, roleId, atomId, atomStaticKey, user }) {
    if (!atomId && !atomStaticKey) return null;
    // atomId
    atomId = await this._forceResourceAtomIdAndCheckRight({ atomId, atomStaticKey, user });
    // role
    const _role = await this.ctx.bean.role._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role.id;
    // delete
    await this.modelResourceRole.delete({
      atomId,
      roleId,
    });
  }

  async deleteByResource({ atomId, atomStaticKey, user }) {
    if (!atomId && !atomStaticKey) return null;
    // atomId
    atomId = await this._forceResourceAtomIdAndCheckRight({ atomId, atomStaticKey, user });
    // delete
    await this.modelResourceRole.delete({
      atomId,
    });
  }

  async deleteByRole({ roleAtomId, roleId, user }) {
    // role
    const _role = await this.ctx.bean.role._forceRoleAndCheckRightRead({ roleAtomId, roleId, user });
    roleId = _role.id;
    // delete
    await this.modelResourceRole.delete({
      roleId,
    });
  }

  // const roleResources = [
  //   { roleName: 'root', atomStaticKey: 'a-base:listComment' },
  //   { roleName: 'root', name: 'listComment' },
  // ];
  async addRoleResourceBatch({ module, roleResources }) {
    // module
    module = module || this.moduleName;
    // roleResources
    if (!roleResources || !roleResources.length) return;
    for (const roleResource of roleResources) {
      // role
      const role = await this.ctx.bean.role.parseRoleName({ roleName: roleResource.roleName, force: true });
      // atomStaticKey
      const atomStaticKey = roleResource.atomStaticKey || `${module}:${roleResource.name}`;
      await this.addResourceRole({ atomStaticKey, roleId: role.id });
    }
  }

  // add resource roles
  async addResourceRoles({ roleAtomId, roleId, atomIds, user }) {
    for (const atomId of atomIds) {
      await this.addResourceRole({ roleAtomId, roleId, atomId, atomStaticKey: null, user });
    }
  }

  async _getAtomClassesResource() {
    if (__atomClassesResource) return __atomClassesResource;
    const atomClassesResource = [];
    const atomClasses = this.ctx.bean.base.atomClasses();
    for (const module in atomClasses) {
      const atomClassesModule = atomClasses[module];
      for (const atomClassName in atomClassesModule) {
        const atomClass = atomClassesModule[atomClassName];
        if (atomClass.resource) {
          const item = await this.ctx.bean.atomClass.get({ module, atomClassName });
          atomClassesResource.push(item);
        }
      }
    }
    __atomClassesResource = atomClassesResource;
    return __atomClassesResource;
  }

  // admin

  async resourceRights({ roleAtomId, roleId, page }) {
    // check locale
    const locale = this.ctx.locale;
    // items
    roleId = await this.ctx.bean.role._forceRoleId({ roleAtomId, roleId });
    page = this.ctx.bean.util.page(page, false);
    const _limit = this.ctx.model._limit(page.size, page.index);
    const items = await this.ctx.model.query(
      `
        select a.*,
               b.atomName,b.atomDisabled,b.atomCategoryId,
               f.categoryName as atomCategoryName,
               c.module,c.atomClassName,
               d.atomNameLocale,e.resourceType
          from aResourceRole a
            inner join aAtom b on a.atomId=b.id
            inner join aAtomClass c on b.atomClassId=c.id
            left join aResourceLocale d on a.atomId=d.atomId and d.locale=?
            left join aResource e on a.atomId=e.atomId
            left join aCategory f on b.atomCategoryId=f.id
          where a.iid=? and a.deleted=0 and a.roleId=? and b.deleted=0 and b.atomStage=1
            order by c.module,b.atomClassId,e.resourceType,b.atomCategoryId
            ${_limit}
        `,
      [locale, this.ctx.instance.id, roleId],
    );
    // locale
    this._resourceRightsLocale({ items });
    // ok
    return items;
  }

  async resourceSpreads({ roleAtomId, roleId, page }) {
    // check locale
    const locale = this.ctx.locale;
    // items
    roleId = await this.ctx.bean.role._forceRoleId({ roleAtomId, roleId });
    page = this.ctx.bean.util.page(page, false);
    const _limit = this.ctx.model._limit(page.size, page.index);
    const items = await this.ctx.model.query(
      `
        select g.*,g.id as roleExpandId, a.id as resourceRoleId,
               b.atomName,b.atomDisabled,b.atomCategoryId,
               f.categoryName as atomCategoryName,
               c.module,c.atomClassName,
               d.atomNameLocale,e.resourceType,
               h.roleName as roleNameBase
          from aResourceRole a
            inner join aAtom b on a.atomId=b.id
            inner join aAtomClass c on b.atomClassId=c.id
            left join aResourceLocale d on a.atomId=d.atomId and d.locale=?
            left join aResource e on a.atomId=e.atomId
            left join aCategory f on b.atomCategoryId=f.id
            left join aRoleExpand g on a.roleId=g.roleIdBase
            left join aRole h on g.roleIdBase=h.id
          where g.iid=? and g.deleted=0 and g.roleId=? and b.deleted=0 and b.atomStage=1
            order by c.module,b.atomClassId,e.resourceType,b.atomCategoryId
            ${_limit}
        `,
      [locale, this.ctx.instance.id, roleId],
    );
    // locale
    this._resourceRightsLocale({ items });
    // ok
    return items;
  }

  async resourceRightsOfUser({ userAtomId, userId, page }) {
    userId = await this.ctx.bean.user._forceUserId({ userAtomId, userId });
    // check locale
    const locale = this.ctx.locale;
    // items
    page = this.ctx.bean.util.page(page, false);
    const _limit = this.ctx.model._limit(page.size, page.index);
    const items = await this.ctx.model.query(
      `
        select a.*,
               b.atomName,b.atomDisabled,b.atomCategoryId,
               f.categoryName as atomCategoryName,
               c.module,c.atomClassName,
               d.atomNameLocale,e.resourceType,
               h.roleName as roleNameBase
          from aViewUserRightResource a
            inner join aAtom b on a.resourceAtomId=b.id
            inner join aAtomClass c on b.atomClassId=c.id
            left join aResourceLocale d on a.resourceAtomId=d.atomId and d.locale=?
            left join aResource e on a.resourceAtomId=e.atomId
            left join aCategory f on b.atomCategoryId=f.id
            left join aRole h on a.roleIdBase=h.id
          where a.iid=? and a.userIdWho=? and b.deleted=0 and b.atomStage=1
            order by c.module,b.atomClassId,e.resourceType,b.atomCategoryId
            ${_limit}
        `,
      [locale, this.ctx.instance.id, userId],
    );
    // locale
    this._resourceRightsLocale({ items });
    // ok
    return items;
  }

  _resourceRightsLocale({ items }) {
    // resourceTypes for a-base:resource
    const resourceTypes = this.ctx.bean.base.resourceTypes();
    // locale
    for (const item of items) {
      // resource type
      const resourceType = resourceTypes[item.resourceType];
      if (resourceType) {
        item.resourceTypeLocale = resourceType.titleLocale;
      }
      // category name
      item.atomCategoryNameLocale = this.ctx.text(item.atomCategoryName);
      // roleNameBase
      if (item.roleNameBase) {
        item.roleNameBaseLocale = this.ctx.text(item.roleNameBase);
      }
    }
  }

  async _forceResourceAtomId({ atomId, atomStaticKey }) {
    if (!atomId) {
      const atom = await this.ctx.bean.atom.modelAtom.get({
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

  async _forceResourceAtomIdAndCheckRight({ atomId, atomStaticKey, user }) {
    atomId = await this._forceResourceAtomId({ atomId, atomStaticKey });
    if (!user || user.id === 0) return atomId;
    // check
    const res = await this.checkRightResource({ resourceAtomId: atomId, user });
    if (!res) this.ctx.throw(403);
    return atomId;
  }

  // /* backup */

  // // function rights
  // async functionRights({ menu, roleId, page }) {
  //   // check locale
  //   const locale = this.ctx.locale;
  //   // list
  //   page = this.ctx.bean.util.page(page, false);
  //   const _limit = this.ctx.model._limit(page.size, page.index);
  //   const list = await this.ctx.model.query(`
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
  // async functionSpreads({ menu, roleId, page }) {
  //   // check locale
  //   const locale = this.ctx.locale;
  //   // list
  //   page = this.ctx.bean.util.page(page, false);
  //   const _limit = this.ctx.model._limit(page.size, page.index);
  //   const list = await this.ctx.model.query(`
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
  // async functionRightsOfUser({ menu, userId, page }) {
  //   // check locale
  //   const locale = this.ctx.locale;
  //   // list
  //   page = this.ctx.bean.util.page(page, false);
  //   const _limit = this.ctx.model._limit(page.size, page.index);
  //   const list = await this.ctx.model.query(`
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
};
