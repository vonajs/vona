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
  aAtom: `
          CREATE TABLE aAtom (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            itemId int(11) DEFAULT '0',
            atomEnabled int(11) DEFAULT '0',
            atomFlow int(11) DEFAULT '0',
            atomClassId int(11) DEFAULT '0',
            atomName varchar(255) DEFAULT NULL,
            userIdCreated int(11) DEFAULT '0',
            userIdUpdated int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `,
  aAtomAction: `
          CREATE TABLE aAtomAction (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomClassId int(11) DEFAULT '0',
            code int(11) DEFAULT '0',
            name varchar(50) DEFAULT NULL,
            PRIMARY KEY (id)
          )
        `,
  aLabel: `
          CREATE TABLE aLabel (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            userId int(11) DEFAULT '0',
            labels JSON DEFAULT NULL,
            PRIMARY KEY (id)
          )
        `,
  aAtomLabel: `
          CREATE TABLE aAtomLabel (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            userId int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            labels JSON DEFAULT NULL,
            PRIMARY KEY (id)
          )
        `,
  aAtomLabelRef: `
          CREATE TABLE aAtomLabelRef (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            userId int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            labelId int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `,
  aAtomStar: `
          CREATE TABLE aAtomStar (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            userId int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            star int(11) DEFAULT '1',
            PRIMARY KEY (id)
          )
        `,
  aRoleRight: `
          CREATE TABLE aRoleRight (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            roleId int(11) DEFAULT '0',
            atomClassId int(11) DEFAULT '0',
            action int(11) DEFAULT '0',
            scope JSON DEFAULT NULL,
            PRIMARY KEY (id)
          )
        `,
  aRoleRightRef: `
          CREATE TABLE aRoleRightRef (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            roleRightId int(11) DEFAULT '0',
            roleId int(11) DEFAULT '0',
            atomClassId int(11) DEFAULT '0',
            action int(11) DEFAULT '0',
            roleIdScope int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `,
  aFunction: `
          CREATE TABLE aFunction (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            module varchar(255) DEFAULT NULL,
            name varchar(255) DEFAULT NULL,
            title varchar(255) DEFAULT NULL,
            scene int(11) DEFAULT '0',
            autoRight int(11) DEFAULT '0',
            atomClassId int(11) DEFAULT '0',
            action int(11) DEFAULT '0',
            sorting int(11) DEFAULT '0',
            menu int(11) DEFAULT '0',
            public int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `,
  aFunctionStar: `
          CREATE TABLE aFunctionStar (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            userId int(11) DEFAULT '0',
            functionId int(11) DEFAULT '0',
            star int(11) DEFAULT '1',
            PRIMARY KEY (id)
          )
        `,
  aFunctionLocale: `
          CREATE TABLE aFunctionLocale (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            functionId int(11) DEFAULT '0',
            locale varchar(50) DEFAULT NULL,
            titleLocale varchar(255) DEFAULT NULL,
            PRIMARY KEY (id)
          )
        `,
  aRoleFunction: `
          CREATE TABLE aRoleFunction (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            roleId int(11) DEFAULT '0',
            functionId int(11) DEFAULT '0',
            roleRightId int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `,
};

const views = {
  aViewUserRoleRef: `
create view aViewUserRoleRef as
  select a.iid,a.userId,a.roleId,b.roleIdParent,b.level from aUserRole a
    inner join aRoleRef b on a.roleId=b.roleId
  `,
  aViewUserRoleExpand: `
create view aViewUserRoleExpand as
  select a.iid,a.userId,a.roleId,b.roleIdBase,b.id as roleExpandId from aUserRole a
    left join aRoleExpand b on a.roleId=b.roleId
  `,
  aViewUserRightAtomClass: `
create view aViewUserRightAtomClass as
  select a.iid,a.userId as userIdWho,a.roleExpandId,a.roleId,a.roleIdBase,b.id as roleRightId,b.atomClassId,b.action,b.scope from aViewUserRoleExpand a
    inner join aRoleRight b on a.roleIdBase=b.roleId
  `,
  aViewUserRightAtomClassUser: `
create view aViewUserRightAtomClassUser as
  select a.iid,a.userId as userIdWho,b.atomClassId,b.action,c.userId as userIdWhom from aViewUserRoleExpand a
    inner join aRoleRightRef b on a.roleIdBase=b.roleId
    inner join aViewUserRoleRef c on b.roleIdScope=c.roleIdParent
  `,
  aViewUserRightAtom: `
create view aViewUserRightAtom as
  select a.iid, a.id as atomId,a.userIdCreated as userIdWhom,b.userIdWho,b.action from aAtom a,aViewUserRightAtomClassUser b
    where a.deleted=0 and a.atomEnabled=1
      and a.atomClassId=b.atomClassId
      and a.userIdCreated=b.userIdWhom
  `,
  aViewUserRightFunction: `
create view aViewUserRightFunction as
  select a.iid,a.userId as userIdWho,a.roleExpandId,a.roleId,a.roleIdBase,b.id as roleFunctionId,b.functionId from aViewUserRoleExpand a
    inner join aRoleFunction b on a.roleIdBase=b.roleId
  `,
};

export default {
  tables,
  views,
};
