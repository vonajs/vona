import { BeanAtom0Import } from './bean.atom_0_import.js';
import { BeanAtomSchema } from './bean.atom_schema.js';
import { BeanAtomUtils } from './bean.atom_utils.js';

const mparse = require('@cabloy/module-parse').default;

export class BeanAtom0Read extends BeanAtom0Import {
  // read
  async read({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user }: any) {
    // atomClass
    const { key, atom, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
      throwWhenEmpty: false,
    });
    if (!atom) return null;
    // atom bean
    const _moduleInfo = mparse.parseInfo(atomClass.module);
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    const item = await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, options, key, user },
      fn: 'read',
    });
    // ok
    const returnSchema = options.returnSchema;
    if (!returnSchema) return item;
    return { item, schema: options.schema };
  }

  // readByStaticKey
  async readByStaticKey({ atomClass, atomStaticKey, atomRevision, atomStage }: any) {
    const options = {
      mode: 'full',
      stage: atomStage,
      where: {
        'a.atomStaticKey': atomStaticKey,
      },
    };
    if (atomRevision !== undefined) {
      options.where['a.atomRevision'] = atomRevision;
    }
    const list = await this.select({ atomClass, options });
    return list[0];
  }

  async _get({ atomClass, options, key, mode, user }: any) {
    if (!options) options = {};
    const resource = options.resource || 0;
    const resourceLocale = options.resourceLocale === false ? false : options.resourceLocale || this.ctx.locale;
    // atomClass
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // tableName
    const tableName = await this.getTableName({
      atomClass,
      atomClassBase,
      options,
      mode,
      user,
      action: 'read',
      key,
    });
    // hold for subsequent usage
    options.tableName = tableName;
    // schema
    const atomSchema = await (this as unknown as BeanAtomSchema)._prepareAtomSchema({
      mode: options.containerMode || 'view',
      atomClass,
      options,
      user,
    });
    options.schema = atomSchema.schema;
    // cms
    const cms = atomClassBase && atomClassBase.cms;
    // forAtomUser
    const forAtomUser = (this as unknown as BeanAtomUtils)._checkForAtomUser(atomClass);
    // options: maybe has another custom options
    options = Object.assign({}, options, {
      iid: this.ctx.instance.id,
      userIdWho: user ? user.id : 0,
      atomClass,
      atomClassBase,
      tableName,
      atomId: key.atomId,
      resource,
      resourceLocale,
      mode,
      cms,
      forAtomUser,
    });
    // readQuery
    const _moduleInfo = mparse.parseInfo(atomClass.module);
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    const sql = await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, options, user },
      fn: 'readQuery',
    });
    const debug = this.ctx.app.bean.debug.get('atom:sql');
    debug('===== getAtom =====\n%s', sql);
    // query
    const item = sql === false ? null : await this.ctx.model.queryOne(sql);
    // ok
    return item;
  }

  async _readQuery({ /* atomClass, */ options, user: _user }: any) {
    return await this.sqlProcedure.getAtom({ options });
  }
}
