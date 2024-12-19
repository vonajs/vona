import { AtomReadQueryParams, ReadOptionsPro, ReadParams } from '../../types.js';
import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtom0Import } from './bean.atom_0_import.js';

export class BeanAtom0Read extends BeanAtom0Import {
  // read
  async read({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, user }: ReadParams) {
    // atomClass
    const { key, atom, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
      throwWhenEmpty: false,
    });
    if (!atom || !atomClassBase) return null;
    // atom bean
    const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName as any);
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

  async _get({ atomClass, options, key, mode, user }: ReadParams & { mode?: string }) {
    if (!atomClass) this.app.throw(403);
    if (!options) options = {};
    if (!user) user = { id: 0 };
    const resource = options.resource || 0;
    const resourceLocale = options.resourceLocale === false ? false : options.resourceLocale || this.ctx.locale;
    // atomClass
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass!);
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
    // options.tableName = tableName;
    // schema
    const atomSchema = await this.self._prepareAtomSchema({
      mode: options.containerMode || 'view',
      atomClass,
      options,
      user,
    });
    const schema = atomSchema!.schema;
    // cms
    const cms = atomClassBase && atomClassBase.cms;
    // forAtomUser
    const forAtomUser = this.self._checkForAtomUser(atomClass);
    // options: maybe has another custom options
    const options2: ReadOptionsPro = Object.assign({}, options, {
      iid: this.ctx.instance.id,
      userIdWho: user.id,
      atomId: key.atomId,
      atomClass,
      atomClassBase,
      tableName,
      schema,
      resource,
      resourceLocale,
      mode,
      cms,
      forAtomUser,
    }) as any;

    // readQuery
    const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName as any);
    const item = await beanInstance.readQuery({ atomClass: atomClass!, options: options2, key, user });
    // ok
    return item;
  }

  async _readQuery({ atomClass, options, key, user }: AtomReadQueryParams) {
    return await this.sqlProcedure.getAtom({ atomClass, options, key, user });
  }
}
