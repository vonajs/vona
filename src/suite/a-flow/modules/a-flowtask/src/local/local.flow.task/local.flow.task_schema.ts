import { LocalFlowTaskSubstitute } from './local.flow.task_substitute.js';

export class LocalFlowTaskSchema extends LocalFlowTaskSubstitute {
  async _viewAtom() {
    return await this._getAtomAndSchema({ mode: 'read' });
  }

  async _editAtom() {
    return await this._getAtomAndSchema({ mode: 'write' });
  }

  async _getSchemaSafe({ mode }: any) {
    // fieldsRight: null means readOnly
    const fieldsRight = await this._getFieldsRightSafe({ mode });
    // schema
    const atomClassId = this.context._atom.atomClassId;
    const schema = await this.ctx.bean.fields.parseSchema({
      atomClass: { id: atomClassId }, // { module, atomClassName },
      fieldsRight,
    });
    return schema;
  }

  async _getFieldsRightSafe({ mode }: any) {
    // user/atom
    const user = this.contextTask._user;
    const atom = this.context._atom;
    // flowTask
    const flowTask = this.contextTask._flowTaskHistory;
    // must be the same flowId, means not outdated
    if (atom.atomFlowId !== this.context._flowId) {
      this.getScope('a-flow').error.FlowOutdated__.throw(this.context._flowId);
    }
    // check right
    if (mode === 'write' || mode === 'edit') {
      // special for write
      await this.localRight.editAtom({ flowTask, user });
    } else {
      await this.localRight.viewAtom({ flowTask, user });
    }
    // fieldsRight
    return await this._getFieldsRight();
  }

  async _getAtomAndSchema({ mode }: any) {
    // user/atom
    const atom = this.context._atom;
    // schema
    const schema = await this._getSchemaSafe({ mode });
    if (!schema) return null;
    // read
    const item = await this.ctx.bean.atom.read({
      key: { atomId: atom.atomId },
      options: {
        schema: {
          module: schema.module,
          schema: schema.schema,
        },
      },
      user: null,
    });
    // ** old solution
    // const fields = await this._combineFields({ schema: schema.schema });
    // const item = this._combineFieldsData({ fields, atom });
    // ok
    return { schema, item };
  }

  // _combineFieldsData({ fields, atom }: any) {
  //   const item: any = {};
  //   for (const field of fields) {
  //     // support dict/userId
  //     const names = [field, `_${field}Title`, `_${field}TitleLocale`, `_${field}Name`, `_${field}Avatar`];
  //     for (const name of names) {
  //       if (atom[name] !== undefined) {
  //         item[name] = atom[name];
  //       }
  //     }
  //   }
  //   return item;
  // }

  // async _combineFields({ schema }: any) {
  //   let fields = [
  //     'atomId',
  //     'module',
  //     'atomClassName',
  //     'atomNameLocale',
  //     'atomCategoryName',
  //     'atomCategoryNameLocale',
  //     'flowNodeNameCurrent',
  //     'flowNodeNameCurrentLocale',
  //     '_meta',
  //   ];
  //   // columnsAtom
  //   const columnsAtom = await this.ctx.bean.atom.modelAtom.columns();
  //   fields = fields.concat(Object.keys(columnsAtom));
  //   // schema
  //   fields = fields.concat(Object.keys(schema.properties));
  //   // unique
  //   const set = new Set(fields);
  //   set.delete('roleIdOwner');
  //   fields = Array.from(set);
  //   // ok
  //   return fields;
  // }

  async _getFieldsRight() {
    return await this.nodeInstance._getFieldsRight();
  }

  // mode: read/write
  async _getSchema() {
    // const module = this.context._atom.module;
    // const atomClassName = this.context._atom.atomClassName;
    const atomClassId = this.context._atom.atomClassId;
    // fieldsRight
    const fieldsRight = await this._getFieldsRight();
    const schema = await this.ctx.bean.fields.parseSchema({
      atomClass: { id: atomClassId }, // { module, atomClassName },
      fieldsRight,
    });
    return schema;
  }
}
