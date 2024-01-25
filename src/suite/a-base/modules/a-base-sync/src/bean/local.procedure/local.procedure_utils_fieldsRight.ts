import { LocalProcedureResource } from './local.procedure_resource.js';

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

export class LocalProcedureUtilsFieldsRight extends LocalProcedureResource {
  // see also: _readValidate
  async _prepare_fieldsRight({ options }) {
    if (!options.schema || options.schema.isSchemaBase || options.tableName.indexOf(' ') > -1) return 'f.*';
    const schema = this.ctx.bean.validation.getSchema(options.schema);
    const properties = schema.schema.properties;
    const columns = await this.ctx.model.columns(options.tableName);
    const fieldNames = [];
    for (const columnName in columns) {
      if (__itemBasicFieldsRead.includes(columnName) || properties[columnName]) {
        fieldNames.push(columnName);
      }
    }
    return fieldNames.map(item => `f.${item}`).join(',');
  }
}
