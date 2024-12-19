import { Bean } from 'vona-module-a-bean';
import { BeanModuleScopeBase } from 'vona';

import { constants } from '../config/constants.js';

@Bean()
export class BeanSettings extends BeanModuleScopeBase {
  get modelSettings() {
    return this.scope.model.settings;
  }

  get modelSettingsRef() {
    return this.scope.model.settingsRef;
  }

  // get

  async getUser({ module, name }: any) {
    return await this._get({ scene: 'user', module, name });
  }

  async getInstance({ module, name }: any) {
    return await this._get({ scene: 'instance', module, name });
  }

  // user

  async loadSettingsUser(ops?) {
    ops = ops || {};
    return await this._loadSettings({ scene: 'user', module: ops.module });
  }

  async loadValidatorUser(ops) {
    ops = ops || {};
    return this._getValidator({ scene: 'user', module: ops.module });
  }

  async saveSettingsUser({ module, data }: any) {
    return await this._saveSettings({ scene: 'user', module, data });
  }

  // instance

  async loadSettingsInstance(ops?) {
    ops = ops || {};
    return await this._loadSettings({ scene: 'instance', module: ops.module });
  }

  async loadValidatorInstance(ops) {
    ops = ops || {};
    return this._getValidator({ scene: 'instance', module: ops.module });
  }

  async saveSettingsInstance({ module, data }: any) {
    return await this._saveSettings({ scene: 'instance', module, data });
  }

  // function

  async _get({ scene, module, name }: any) {
    module = module || this.moduleScope;
    const res = await this.modelSettingsRef.get({
      module,
      scene: constants.scene[scene],
      userId: scene === 'user' ? this.ctx.state.user.op.id : 0,
      name,
    });
    return res ? JSON.parse(res.value) : this._parse(this.getScope(module).config.settings[scene], name);
  }

  _parse(data, path) {
    for (const name of path.split('/')) {
      if (name) data = data[name];
    }
    return data;
  }

  async _loadSettings({ scene, module }: any) {
    module = module || this.moduleScope;
    const res = await this.modelSettings.get({
      module,
      scene: constants.scene[scene],
      userId: scene === 'user' ? this.ctx.state.user.op.id : 0,
    });
    // always extend config, as maybe has new values
    const config = this.getScope(module).config.settings[scene];
    return res ? this.app.bean.util.extend({}, config, JSON.parse(res.value)) : config;
  }

  async _saveSettings({ scene, module, data }: any) {
    module = module || this.moduleScope;
    let validator = this._getValidator({ scene, module });
    if (!validator) this.app.throw(404); // not found
    validator = validator!;
    await this.app.bean.validation.validate({
      module: validator.module,
      validator: validator.validator,
      schema: null,
      data,
      filterOptions: true,
    });
    // update aSettings
    const _data = await this.modelSettings.get({
      module,
      scene: constants.scene[scene],
      userId: scene === 'user' ? this.ctx.state.user.op.id : 0,
    });
    if (!_data) {
      // new
      await this.modelSettings.insert({
        module,
        scene: constants.scene[scene],
        userId: scene === 'user' ? this.ctx.state.user.op.id : 0,
        value: JSON.stringify(data),
      });
    } else {
      await this.modelSettings.update({
        id: _data.id,
        value: JSON.stringify(data),
      });
    }
    // save aSettingsRef
    await this._saveSettingsRef({ scene, module, data });
  }

  async _saveSettingsRef({ scene, module, data }: any) {
    // remove aSettingsRef
    await this.modelSettingsRef.delete({
      module,
      scene: constants.scene[scene],
      userId: scene === 'user' ? this.ctx.state.user.op.id : 0,
    });
    // update aSettingsRef
    await this._saveSettingsRef1({ scene, module, data, schemaName: null, path: '' });
  }

  async _saveSettingsRef1({ scene, module, data, schemaName, path }: any) {
    const schema = this._getSchema({ scene, module, schemaName });
    await this._saveSettingsRef2({ scene, module, data, schema: schema.schema, path });
  }

  async _saveSettingsRef2({ scene, module, data, schema, path }: any) {
    for (const key in schema.properties) {
      const subSchema = schema.properties[key];
      if (!subSchema.type) continue;
      const subPath = `${path}/${key}`;
      const subData = data[key];
      if (subSchema.$ref) {
        await this._saveSettingsRef1({ scene, module, data: subData, schemaName: subSchema.$ref, path: subPath });
      } else if (subSchema.ebType === 'group') {
        await this._saveSettingsRef2({ scene, module, data: subData, schema: subSchema, path: subPath });
      } else {
        await this.modelSettingsRef.insert({
          module,
          scene: constants.scene[scene],
          userId: scene === 'user' ? this.ctx.state.user.op.id : 0,
          name: subPath,
          value: JSON.stringify(subData),
        });
      }
    }
  }

  _getValidator({ scene, module }: any) {
    module = module || this.moduleScope;
    const validator = this.ctx.app.meta.modules[module].meta.settings[scene].validator;
    return validator ? { module, scene, validator } : null;
  }

  _getSchema({ scene, module, schemaName }: any) {
    const validator = this._getValidator({ scene, module });
    if (!validator) return null;
    const schema = this.app.bean.validation.getSchema({
      module: validator.module,
      validator: validator.validator,
      schema: schemaName,
    });
    return this.app.bean.util.extend({}, schema);
  }
}
