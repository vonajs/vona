import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import assert from 'assert';

const __testData_allowAllFieldsRead = {
  mode: 'allowAllFieldsRead',
};
const __testData_allowAllFieldsReadWrite = {
  mode: 'allowAllFieldsReadWrite',
};
const __testData_allowSpecificFields_1 = {
  mode: 'allowSpecificFields',
  basic: { read: true, write: true },
  fields: ['atomName', { name: 'detailsAmount', read: true, write: false }],
};
const __testData_allowSpecificFields_2 = {
  mode: 'allowSpecificFields',
  basic: { read: true, write: false },
  fields: ['atomName', { name: 'detailsAmount', read: true, write: true }, 'details'],
};
const __testData_allowSpecificFields_3 = {
  mode: 'allowSpecificFields',
  basic: { read: false, write: false },
  fields: [
    'atomName',
    { name: 'detailsAmount', read: true, write: true },
    { name: 'details', read: true, write: false },
  ],
};
const __testData_custom_array = {
  mode: 'custom',
  custom: [
    // 'atomName',
    {
      name: 'detailsAmount',
      property: {
        type: 'number',
        ebType: 'detailsStat',
        ebTitle: 'Amount',
        ebParams: {
          detailClass: {
            module: 'test-flow',
            atomClassName: 'purchaseOrderDetail',
          },
          summary: {
            type: 'sum',
            field: 'amount',
          },
          currency: true,
        },
        ebAutoSubmit: true,
      },
    },
    'details',
  ],
};
const __testData_custom_object = {
  mode: 'custom',
  custom: {
    module: 'test-flow',
    validator: 'purchaseOrder',
  },
};

@Controller()
export class ControllerTestFeatFieldsRight extends BeanBase {
  async parseSchema() {
    const moduleTestFlow = this.app.meta.modules['test-flow'];
    if (!moduleTestFlow) {
      // do nothing
      this.app.success();
      return;
    }
    // atomClass
    const atomClass = { module: 'test-flow', atomClassName: 'purchaseOrder' };
    // mode: allowAllFieldsRead
    await this._parseSchema_mode_allowAllFieldsRead({ atomClass });
    // mode: allowAllFieldsReadWrite
    await this._parseSchema_mode_allowAllFieldsReadWrite({ atomClass });
    // mode: allowSpecificFields_1
    await this._parseSchema_mode_allowSpecificFields_1({ atomClass });
    // mode: allowSpecificFields_2
    await this._parseSchema_mode_allowSpecificFields_2({ atomClass });
    // mode: allowSpecificFields_3
    await this._parseSchema_mode_allowSpecificFields_3({ atomClass });
    // mode: custom_array
    await this._parseSchema_mode_custom_array({ atomClass });
    // mode: custom_object
    await this._parseSchema_mode_custom_object({ atomClass });
    // ok
    this.app.success();
  }

  // mode: allowAllFieldsRead
  async _parseSchema_mode_allowAllFieldsRead({ atomClass }: any) {
    const schemaBase = await this.app.bean.fields.parseSchema({
      atomClass,
      fieldsRight: __testData_allowAllFieldsRead,
    });
    assert.equal(schemaBase!.schema.properties.atomName.ebReadOnly, true);
    assert.equal(schemaBase!.schema.properties.detailsAmount.ebReadOnly, true);
    assert.equal(schemaBase!.schema.properties.details.ebReadOnly, true);
  }

  // mode: allowAllFieldsReadWrite
  async _parseSchema_mode_allowAllFieldsReadWrite({ atomClass }: any) {
    const schemaBase = await this.app.bean.fields.parseSchema({
      atomClass,
      fieldsRight: __testData_allowAllFieldsReadWrite,
    });
    assert.equal(schemaBase!.schema.properties.atomName.ebReadOnly, undefined);
    assert.equal(schemaBase!.schema.properties.detailsAmount.ebReadOnly, undefined);
    assert.equal(schemaBase!.schema.properties.details.ebReadOnly, undefined);
    assert.equal(schemaBase!.isSchemaBase, true);
  }

  // mode: allowSpecificFields_1
  async _parseSchema_mode_allowSpecificFields_1({ atomClass }: any) {
    const schemaBase = await this.app.bean.fields.parseSchema({
      atomClass,
      fieldsRight: __testData_allowSpecificFields_1,
    });
    assert.equal(schemaBase!.schema.properties.atomName, undefined);
    assert.equal(schemaBase!.schema.properties.detailsAmount.ebReadOnly, true);
    assert.equal(schemaBase!.schema.properties.details.ebReadOnly, undefined);
  }

  // mode: allowSpecificFields_2
  async _parseSchema_mode_allowSpecificFields_2({ atomClass }: any) {
    const schemaBase = await this.app.bean.fields.parseSchema({
      atomClass,
      fieldsRight: __testData_allowSpecificFields_2,
    });
    assert.equal(schemaBase!.schema.properties.atomName, undefined);
    assert.equal(schemaBase!.schema.properties.detailsAmount.ebReadOnly, false);
    assert.equal(schemaBase!.schema.properties.details, undefined);
  }

  // mode: allowSpecificFields_3
  async _parseSchema_mode_allowSpecificFields_3({ atomClass }: any) {
    const schemaBase = await this.app.bean.fields.parseSchema({
      atomClass,
      fieldsRight: __testData_allowSpecificFields_3,
    });
    assert.equal(schemaBase!.schema.properties.atomName, undefined);
    assert.equal(schemaBase!.schema.properties.detailsAmount.ebReadOnly, false);
    assert.equal(schemaBase!.schema.properties.details.ebReadOnly, true);
  }
  // mode: custom_array
  async _parseSchema_mode_custom_array({ atomClass }: any) {
    const schemaBase = await this.app.bean.fields.parseSchema({
      atomClass,
      fieldsRight: __testData_custom_array,
    });
    assert.equal(schemaBase!.schema.properties.atomName, undefined);
    assert.equal(schemaBase!.schema.properties.detailsAmount.ebReadOnly, undefined);
    assert.equal(schemaBase!.schema.properties.details.ebReadOnly, undefined);
  }
  // mode: custom_array
  async _parseSchema_mode_custom_object({ atomClass }: any) {
    const schemaBase = await this.app.bean.fields.parseSchema({
      atomClass,
      fieldsRight: __testData_custom_object,
    });
    assert.equal(schemaBase!.schema.properties.atomName.ebReadOnly, undefined);
    assert.equal(schemaBase!.schema.properties.detailsAmount.ebReadOnly, undefined);
    assert.equal(schemaBase!.schema.properties.details.ebReadOnly, undefined);
  }
}
