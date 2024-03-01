import { BeanModel } from 'cabloy-module-api-a-database';

const tables = {
  aUser(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.integer('disabled').defaultTo(0);
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
      table.integer('userId').defaultTo(0);
      table.integer('userIdAgent').defaultTo(0);
    });
  },
  aAuthProvider(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.integer('disabled').defaultTo(0);
      table.string('module', 255);
      table.string('providerName', 50);
      table.json('config');
    });
  },
  aAuth(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.userId();
      table.integer('providerId').defaultTo(0);
      table.string('profileId', 255);
      table.json('profile');
    });
  },
  aRole(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.string('roleName', 50);
      table.integer('leader').defaultTo(0);
      table.integer('catalog').defaultTo(0);
      table.integer('system').defaultTo(0);
      table.integer('sorting').defaultTo(0);
      table.integer('roleIdParent').defaultTo(0);
    });
  },
  aRoleRef(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.integer('roleId').defaultTo(0);
      table.integer('roleIdParent').defaultTo(0);
      table.integer('level').defaultTo(0);
    });
  },
  aRoleInc(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.integer('roleId').defaultTo(0);
      table.integer('roleIdInc').defaultTo(0);
    });
  },
  aRoleIncRef(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.integer('roleId').defaultTo(0);
      table.integer('roleIdInc').defaultTo(0);
      table.integer('roleIdSrc').defaultTo(0);
    });
  },
  aRoleExpand(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.integer('roleId').defaultTo(0);
      table.integer('roleIdBase').defaultTo(0);
    });
  },
  aUserRole(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.userId();
      table.integer('roleId').defaultTo(0);
    });
  },
  aAtomClass(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.string('module', 255);
      table.string('atomClassName', 255);
      table.integer('atomClassIdParent').defaultTo(0);
    });
  },
  aAtom(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.itemId();
      table.integer('atomEnabled').defaultTo(0);
      table.integer('atomFlow').defaultTo(0);
      table.integer('atomClassId').defaultTo(0);
      table.string('atomName', 255);
      table.integer('userIdCreated').defaultTo(0);
      table.integer('userIdUpdated').defaultTo(0);
    });
  },
  aAtomAction(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.integer('atomClassId').defaultTo(0);
      table.integer('code').defaultTo(0);
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
      table.integer('labelId').defaultTo(0);
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
      table.integer('roleId').defaultTo(0);
      table.integer('atomClassId').defaultTo(0);
      table.integer('action').defaultTo(0);
      table.json('scope');
    });
  },
  aRoleRightRef(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.integer('roleRightId').defaultTo(0);
      table.integer('roleId').defaultTo(0);
      table.integer('atomClassId').defaultTo(0);
      table.integer('action').defaultTo(0);
      table.integer('roleIdScope').defaultTo(0);
    });
  },
  aFunction(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.string('module', 255);
      table.string('name', 255);
      table.string('title', 255);
      table.integer('scene').defaultTo(0);
      table.integer('autoRight').defaultTo(0);
      table.integer('atomClassId').defaultTo(0);
      table.integer('action').defaultTo(0);
      table.integer('sorting').defaultTo(0);
      table.integer('menu').defaultTo(0);
      table.integer('public').defaultTo(0);
    });
  },
  aFunctionStar(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.userId();
      table.integer('functionId').defaultTo(0);
      table.integer('star').defaultTo(1);
    });
  },
  aFunctionLocale(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.integer('functionId').defaultTo(0);
      table.string('locale', 50);
      table.string('titleLocale', 255);
    });
  },
  aRoleFunction(tableName: string, model: BeanModel): any {
    return model.schema.createTable(tableName, function (table) {
      table.basicFields();
      table.integer('roleId').defaultTo(0);
      table.integer('functionId').defaultTo(0);
      table.integer('roleRightId').defaultTo(0);
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
