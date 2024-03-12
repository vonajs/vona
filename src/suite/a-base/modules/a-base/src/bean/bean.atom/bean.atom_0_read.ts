import { BeanAtomBase } from '../virtual.atomBase.js';
import { BeanAtom0Import } from './bean.atom_0_import.js';

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
    if (!atom || !atomClassBase) return null;
    // atom bean
    const beanInstance: BeanAtomBase = this.ctx.bean._getBean(atomClassBase.beanFullName);
    const item = await beanInstance.read({ atomClass, options, key, user });
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
    const list = await this.self.select({ atomClass, options });
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
    const atomSchema = await this.self._prepareAtomSchema({
      mode: options.containerMode || 'view',
      atomClass,
      options,
      user,
    });
    options.schema = atomSchema.schema;
    // cms
    const cms = atomClassBase && atomClassBase.cms;
    // forAtomUser
    const forAtomUser = this.self._checkForAtomUser(atomClass);
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
    const beanInstance: BeanAtomBase = this.ctx.bean._getBean(atomClassBase.beanFullName);
    const sql = await beanInstance.readQuery({ atomClass, options, user });
    const debug = this.ctx.app.bean.debug.get('atom:sql');
    debug('===== getAtom =====\n%s', sql);
    // query
    const item = sql === false ? null : await this.bean.model.queryOne(sql);
    // ok
    return item;
  }

  async _readQuery({ /* atomClass, */ options, user: _user }: any) {
    return await this.sqlProcedure.getAtom({ options });
  }
}
