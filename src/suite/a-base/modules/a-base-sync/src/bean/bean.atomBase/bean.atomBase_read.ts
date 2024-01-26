import { BeanAtomBaseSelect } from './bean.atomBase_select.js';

const __itemBasicFieldsRead = [
  'id',
  'iid',
  'deleted',
  'createdAt',
  'updatedAt',
  'atomId',
  'itemId',
  'atomStage',
  'atomIdMain',
  'atomIdParent',
];

export class BeanAtomBaseRead extends BeanAtomBaseSelect {
  async readQuery({ atomClass, options, user }) {
    return await this.ctx.bean.atom._readQuery({ atomClass, options, user });
  }

  async read({ atomClass, options, key, user }) {
    // get
    let item = await this.ctx.bean.atom._get({ atomClass, options, key, mode: 'full', user });
    if (!item) return item;
    // validate
    item = await this._readValidate({ atomClass, item, options, user });
    // translate
    await this._read_handleTranslate({ item, atomClass, options, user });
    // ok
    return item;
  }

  async _read_handleTranslate({ item, atomClass, options: _options, user: _user }) {
    // atomClass
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // patchAtomClassInfo
    await this._patchAtomClassInfo({ item, atomClass });
    // dict translate
    await this._dictTranslate({ item, atomClassBase });
    // atomCategoryName
    await this._atomCategoryIdTranslate({ item, atomClassBase });
    // revision
    this._appendRevisionToHistory({ item, atomClassBase });
    // atomLanguage
    this._atomLanguageLocaleTranslate({ item, atomClassBase });
    // atomDisabled
    this._atomDisabledTranslate({ item, atomClassBase });
    // atomState
    await this._atomStateTranslate({ item, atomClassBase });
    // userIds
    await this._userIdsTranslate({ item, atomClassBase });
    // atomNameLocale for resource
    this._atomNameLocaleTranslate({ item, atomClassBase });
  }

  async _readValidate({ /* atomClass,*/ item, options, user: _user }) {
    // schema/tableName: see also: _prepare_fieldsRight
    if (!options.schema || options.schema.isSchemaBase || options.tableName.indexOf(' ') === -1) return item;
    // validate
    await this._readValidate_schema({ schema: options.schema, item });
    // item
    return item;
  }

  async _readValidate_schema({ schema, item }) {
    // schema
    schema = this.ctx.bean.validation.getSchema(schema);
    const properties = schema.schema.properties;
    // filter
    for (const fieldName of Object.keys(item)) {
      if (fieldName === 'itemId') break;
      if (!__itemBasicFieldsRead.includes(fieldName) && !properties[fieldName]) {
        delete item[fieldName];
      }
    }
    return item;
  }
}
