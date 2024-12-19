import { Bean } from 'vona-module-a-bean';
import { BeanModuleScopeBase } from 'vona';

@Bean()
export class BeanValidation extends BeanModuleScopeBase {
  getSchema({ module, validator, schema }: any) {
    // for flexible
    if (schema && typeof schema === 'object') {
      return { module, validator, schema };
    }
    module = module || this.moduleScope;
    const meta = this.ctx.app.meta.modules[module].meta;
    if (!schema) {
      const _validator = this.getValidator({ module, validator });
      if (!_validator) throw new Error(`validator not found: ${module}:${validator}`);
      const schemas = this._adjustSchemas(_validator.schemas);
      schema = schemas[0];
    }
    return {
      module,
      validator,
      schema: this.app.bean.util.getProperty(meta, `validation.schemas.${schema}`),
    };
  }

  getValidator({ module, validator }: any) {
    module = module || this.moduleScope;
    const meta = this.ctx.app.meta.modules[module].meta;
    let _validator = this.app.bean.util.getProperty(meta, `validation.validators.${validator}`);
    if (!_validator) {
      const _schema = this.app.bean.util.getProperty(meta, `validation.schemas.${validator}`);
      if (!_schema) return null;
      _validator = {
        schemas: validator,
      };
      this.app.bean.util.setProperty(meta, `validation.validators.${validator}`, _validator);
    }
    return _validator;
  }

  async validate({ module, validator, schema, data, filterOptions }: any) {
    // validator
    const _validator = this._checkValidator({ module, validator, filterOptions });
    // ignoreRules
    const ignoreRules = filterOptions && filterOptions.ignoreRules;
    // cache key
    const cacheKey = ignoreRules ? 'ajv_ignoreRules' : 'ajv';
    return await _validator[cacheKey].v({ ctx: this.ctx, schema, data, filterOptions });
  }

  async ajvFromSchemaAndValidate({ module, schema, data, filterOptions }: any) {
    if (typeof schema === 'string') {
      const _schema = this.getSchema({ module, schema });
      schema = _schema.schema;
    }
    const ajv = this.ajvFromSchema({ module, schema, filterOptions });
    return await this.ajvValidate({ ajv, schema: null, data, filterOptions });
  }

  async ajvValidate({ ajv, schema, data, filterOptions }: any) {
    return await ajv.v({ ctx: this.ctx, schema, data, filterOptions });
  }

  ajvFromSchema({ module, schema, filterOptions }: any) {
    // ignoreRules
    const ignoreRules = filterOptions && filterOptions.ignoreRules;
    // params
    let options;
    if (ignoreRules) {
      options = { coerceTypes: false, useDefaults: true }; // not use _validator.options
    } else {
      options = {};
    }
    const params = {
      options,
    } as any;
    // keywords
    if (module) {
      module = module || this.moduleScope;
      const meta = this.ctx.app.meta.modules[module].meta;
      params.keywords = meta.validation.keywords;
    }
    // schemas
    params.schemaRoot = this.app.bean.util.uuid.v4();
    const schemas = {
      [params.schemaRoot]: { ...schema, $async: true },
    };
    if (ignoreRules) {
      params.schemas = this._prepareSchemas_ignoreRules({ schemas });
    } else {
      params.schemas = schemas;
    }
    // create
    return this.bean.ajv.create(params);
  }

  _checkValidator({ module, validator }: any) {
    // check ajv cache
    module = module || this.moduleScope;
    const meta = this.ctx.app.meta.modules[module].meta;
    const _validator = this.getValidator({ module, validator });
    if (!_validator) throw new Error(`validator not found: ${module}:${validator}`);
    if (_validator.ajv) return _validator;
    // create ajv
    const _schemas = this._adjustSchemas(_validator.schemas);
    const schemas: any = {};
    for (const _schema of _schemas) {
      schemas[_schema] = meta.validation.schemas[_schema];
      if (!schemas[_schema]) throw new Error(`schema not found: ${module}:${_schema}`);
      schemas[_schema].$async = true;
    }
    _validator.ajv = this.bean.ajv.create({
      options: _validator.options,
      keywords: meta.validation.keywords,
      schemas,
      schemaRoot: _schemas[0],
    });
    // create ajv_ignoreRules
    const schemas2 = this._prepareSchemas_ignoreRules({ schemas });
    _validator.ajv_ignoreRules = this.bean.ajv.create({
      options: { coerceTypes: false, useDefaults: true }, // not use _validator.options
      keywords: meta.validation.keywords,
      schemas: schemas2,
      schemaRoot: _schemas[0],
    });
    // ok
    return _validator;
  }

  _prepareSchemas_ignoreRules({ schemas }: any) {
    const schemas2: any = {};
    for (const schemaName in schemas) {
      const schema = schemas[schemaName];
      const schema2 = { type: 'object', properties: {} };
      this._prepareProperties_ignoreRules({ propertiesFrom: schema.properties, propertiesTo: schema2.properties });
      schemas2[schemaName] = schema2;
    }
    return schemas2;
  }

  _prepareProperties_ignoreRules({ propertiesFrom, propertiesTo }: any) {
    const __basicRuleNames = ['type', 'ebType', 'ebCopy', 'ebReadOnly', '$async'];
    for (const key in propertiesFrom) {
      const propertyFrom = propertiesFrom[key];
      const propertyTo: any = {};
      propertiesTo[key] = propertyTo;
      for (const ruleName in propertyFrom) {
        if (__basicRuleNames.includes(ruleName)) {
          propertyTo[ruleName] = propertyFrom[ruleName];
        }
        if (ruleName === 'properties') {
          propertyTo.properties = {};
          this._prepareProperties_ignoreRules({
            propertiesFrom: propertyFrom.properties,
            propertiesTo: propertyTo.properties,
          });
        }
      }
    }
  }

  _adjustSchemas(schemas) {
    if (typeof schemas === 'string') return schemas.split(',');
    return schemas;
  }

  async _validate({ atomClass, data, options, filterOptions }: any) {
    // validator
    const optionsSchema = options && options.schema;
    if (optionsSchema) {
      if (
        optionsSchema.validator &&
        (!optionsSchema.schema || typeof optionsSchema.schema === 'string' || optionsSchema.isSchemaBase)
      ) {
        const schema = optionsSchema.isSchemaBase ? null : optionsSchema.schema;
        // use validator directly
        await this.validate({
          module: optionsSchema.module,
          validator: optionsSchema.validator,
          schema,
          data,
          filterOptions,
        });
      } else {
        // create validator dynamicly
        await this.ajvFromSchemaAndValidate({
          module: optionsSchema.module,
          schema: optionsSchema.schema,
          data,
          filterOptions,
        });
      }
    } else if (atomClass) {
      const validator = await this.app.bean.atom.validator({ atomClass });
      if (validator) {
        // if error throw 422
        await this.validate({
          module: validator.module,
          validator: validator.validator,
          schema: null, // validator.schema,
          data,
          filterOptions,
        });
      }
    }
  }
}
