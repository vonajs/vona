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
  async _prepare_fieldsRight({ options }: any): Promise<string[]> {
    if (!options.schema || options.schema.isSchemaBase || options.tableName.indexOf(' ') > -1) return ['f.*'];
    const schema = this.app.bean.validation.getSchema(options.schema);
    const properties = schema.schema.properties;
    const columns = await this.bean.model.columns(options.tableName);
    const fieldNames: string[] = [];
    for (const columnName in columns) {
      if (__itemBasicFieldsRead.includes(columnName) || properties[columnName]) {
        fieldNames.push(columnName);
      }
    }
    return fieldNames.map(item => `f.${item}`);
  }
}
