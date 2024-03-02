import { BeanModel } from 'cabloy-module-api-a-database';

const tables = {
  aUser(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('disabled');
      table.string('userName', 50);
      table.string('realName', 50);
      table.string('email', 50);
      table.string('mobile', 50);
      table.string('avatar', 255);
      table.string('motto', 255);
      table.string('locale', 255);
      table.integer('anonymous', 0);
    });
  },
  aUserAgent(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('userId');
      table.int0('userIdAgent');
    });
  },
  aAuthProvider(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('disabled');
      table.string('module', 255);
      table.string('providerName', 50);
      table.json('config');
    });
  },
  aAuth(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.userId();
      table.int0('providerId');
      table.string('profileId', 255);
      table.json('profile');
    });
  },
  aRole(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.string('roleName', 50);
      table.int0('leader');
      table.int0('catalog');
      table.int0('system');
      table.int0('sorting');
      table.int0('roleIdParent');
    });
  },
  aRoleRef(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('roleId');
      table.int0('roleIdParent');
      table.int0('level');
    });
  },
  aRoleInc(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('roleId');
      table.int0('roleIdInc');
    });
  },
  aRoleIncRef(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('roleId');
      table.int0('roleIdInc');
      table.int0('roleIdSrc');
    });
  },
  aRoleExpand(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('roleId');
      table.int0('roleIdBase');
    });
  },
  aUserRole(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.userId();
      table.int0('roleId');
    });
  },
  aAtomClass(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.string('module', 255);
      table.string('atomClassName', 255);
      table.int0('atomClassIdParent');
    });
  },
  aAtom(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.itemId();
      table.int0('atomEnabled');
      table.int0('atomFlow');
      table.int0('atomClassId');
      table.string('atomName', 255);
      table.int0('userIdCreated');
      table.int0('userIdUpdated');
    });
  },
  aAtomAction(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('atomClassId');
      table.int0('code');
      table.string('name', 50);
    });
  },
  aLabel(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.userId();
      table.json('labels');
    });
  },
  aAtomLabel(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.userId();
      table.atomId();
      table.json('labels');
    });
  },
  aAtomLabelRef(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.userId();
      table.atomId();
      table.int0('labelId');
    });
  },
  aAtomStar(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.userId();
      table.atomId();
      table.integer('star').defaultTo(1);
    });
  },
  aRoleRight(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('roleId');
      table.int0('atomClassId');
      table.int0('action');
      table.json('scope');
    });
  },
  aRoleRightRef(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('roleRightId');
      table.int0('roleId');
      table.int0('atomClassId');
      table.int0('action');
      table.int0('roleIdScope');
    });
  },
  aFunction(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.string('module', 255);
      table.string('name', 255);
      table.string('title', 255);
      table.int0('scene');
      table.int0('autoRight');
      table.int0('atomClassId');
      table.int0('action');
      table.int0('sorting');
      table.int0('menu');
      table.int0('public');
    });
  },
  aFunctionStar(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.userId();
      table.int0('functionId');
      table.integer('star').defaultTo(1);
    });
  },
  aFunctionLocale(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('functionId');
      table.string('locale', 50);
      table.string('titleLocale', 255);
    });
  },
  aRoleFunction(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.int0('roleId');
      table.int0('functionId');
      table.int0('roleRightId');
    });
  },
};

const views = {
  aViewUserRoleRef(viewName: string, model: BeanModel): any {
    return model.schema.createView(viewName, function (view) {
      view.columns(['iid', 'userId', 'roleId', 'roleIdParent', 'level']);
      view.as(
        model
          .builder('aUserRole as a')
          .select(['a.iid', 'a.userId', 'a.roleId', 'b.roleIdParent', 'b.level'])
          .innerJoin('aRoleRef as b', { 'a.roleId': 'b.roleId' }),
      );
    });
  },
  aViewUserRoleExpand(viewName: string, model: BeanModel): any {
    return model.schema.createView(viewName, function (view) {
      view.columns(['iid', 'userId', 'roleId', 'roleIdBase', 'roleExpandId']);
      view.as(
        model
          .builder('aUserRole as a')
          .select(['a.iid', 'a.userId', 'a.roleId', 'b.roleIdBase', 'b.id as roleExpandId'])
          .leftJoin('aRoleExpand as b', { 'a.roleId': 'b.roleId' }),
      );
    });
  },
  aViewUserRightAtomClass(viewName: string, model: BeanModel): any {
    return model.schema.createView(viewName, function (view) {
      view.columns([
        'iid',
        'userIdWho',
        'roleExpandId',
        'roleId',
        'roleIdBase',
        'roleRightId',
        'atomClassId',
        'action',
        'scope',
      ]);
      view.as(
        model
          .builder('aViewUserRoleExpand as a')
          .select([
            'a.iid',
            'a.userId as userIdWho',
            'a.roleExpandId',
            'a.roleId',
            'a.roleIdBase',
            'b.id as roleRightId',
            'b.atomClassId',
            'b.action',
            'b.scope',
          ])
          .innerJoin('aRoleRight as b', { 'a.roleIdBase': 'b.roleId' }),
      );
    });
  },
  aViewUserRightAtomClassUser(viewName: string, model: BeanModel): any {
    return model.schema.createView(viewName, function (view) {
      view.columns(['iid', 'userIdWho', 'atomClassId', 'action', 'userIdWhom']);
      view.as(
        model
          .builder('aViewUserRoleExpand as a')
          .select(['a.iid', 'a.userId as userIdWho', 'b.atomClassId', 'b.action', 'c.userId as userIdWhom'])
          .innerJoin('aRoleRightRef as b', { 'a.roleIdBase': 'b.roleId' })
          .innerJoin('aViewUserRoleRef as c', { 'b.roleIdScope': 'c.roleIdParent' }),
      );
    });
  },
  aViewUserRightAtom(viewName: string, model: BeanModel): any {
    return model.schema.createView(viewName, function (view) {
      view.columns(['iid', 'atomId', 'userIdWhom', 'userIdWho', 'action']);
      view.as(
        model
          .builder('aAtom as a')
          .select(['a.iid', 'a.id as atomId', 'a.userIdCreated as userIdWhom', 'b.userIdWho', 'b.action'])
          .innerJoin('aViewUserRightAtomClassUser as b', {
            'a.atomClassId': 'b.atomClassId',
            'a.userIdCreated': 'b.userIdWhom',
          })
          .where({
            'a.deleted': 0,
            'a.atomEnabled': 1,
          }),
      );
    });
  },
  aViewUserRightFunction(viewName: string, model: BeanModel): any {
    return model.schema.createView(viewName, function (view) {
      view.columns(['iid', 'userIdWho', 'roleExpandId', 'roleId', 'roleIdBase', 'roleFunctionId', 'functionId']);
      view.as(
        model
          .builder('aViewUserRoleExpand as a')
          .select([
            'a.iid',
            'a.userId as userIdWho',
            'a.roleExpandId',
            'a.roleId',
            'a.roleIdBase',
            'b.id as roleFunctionId',
            'b.functionId',
          ])
          .innerJoin('aRoleFunction as b', { 'a.roleIdBase': 'b.roleId' }),
      );
    });
  },
};

export default {
  tables,
  views,
};
