import { Bean } from 'vona-module-a-bean';
import Ajv from 'ajv';
import AjvLocalize from 'ajv-i18n';
import AjvKeywords from 'ajv-keywords';
import jsBeautify from 'js-beautify';
import systemKeywords from '../ajv/keywords.js';
import { BeanBase } from 'vona';

@Bean()
export class BeanAjv extends BeanBase {
  get Ajv() {
    return Ajv;
  }

  create({ options, keywords, schemas, schemaRoot }: { options?; keywords?; schemas?; schemaRoot? }) {
    // default
    const _options = {
      $data: true,
      allErrors: true,
      verbose: false,
      jsonPointers: true,
      format: 'full',
      unknownFormats: true,
      useDefaults: true,
      coerceTypes: true,
      transpile: false,
      passContext: true,
      removeAdditional: 'all',
    } as any;
    // processCode
    if (this.app.meta.isTest || this.app.meta.isLocal) {
      _options.processCode = jsBeautify.js_beautify;
    }
    // override
    Object.assign(_options, options);
    // ajv
    const ajv = new Ajv(_options);
    AjvKeywords(ajv);
    (<any>ajv).v = createValidate(schemaRoot);
    // systemKeywords
    for (const _keyword in systemKeywords) {
      ajv.addKeyword(_keyword, systemKeywords[_keyword]);
    }
    // keywords
    if (keywords) {
      for (const key in keywords) {
        const _key = key.indexOf('x-') === 0 ? key : `x-${key}`;
        ajv.addKeyword(_key, keywords[key]);
      }
    }
    // schemas
    if (schemas) {
      for (const key in schemas) {
        ajv.addSchema(schemas[key], key);
      }
    }
    return ajv;
  }
}

function createValidate(schemaRoot) {
  return async function (this: any, { ctx, schema, data, filterOptions }) {
    const validate = this.getSchema(schema || schemaRoot);
    try {
      const res = await validate.call(ctx, data);
      if (filterOptions) {
        _filterResult({ ajv: this, validate, data, filterOptions });
      }
      return res;
    } catch (e: any) {
      if (!Array.isArray(e.errors)) throw e;
      const locale = ctx.locale.split('-')[0];
      if (locale !== 'en' && AjvLocalize[locale]) AjvLocalize[locale](e.errors);
      // need not output error
      // ctx.logger.error(e);
      // error
      throw ctx.app.meta.util.createError({
        ...e,
        code: 422,
        message: e.errors,
      });
    }
  };
}

function _filterResult({ ajv, validate, data, filterOptions }) {
  if (filterOptions === true) {
    filterOptions = { type: true, ebCopy: true, ebReadOnly: true };
  }
  _filterSchema({ ajv, schema: validate.schema, data, filterOptions });
}

function _filterSchema({ ajv, schema, data, filterOptions }) {
  _filterProperties({ ajv, properties: schema.properties, data, filterOptions });
}

function _filterProperties({ ajv, properties, data, filterOptions }) {
  if (!data) return;
  for (const key in properties) {
    const property = properties[key];
    if (data[key] === undefined) continue;
    // special for json
    if (property.ebType === 'json' && property.type === 'string' && data[key] === '') {
      data[key] = null;
    }
    if (filterOptions.type && !property.type) {
      delete data[key];
    } else if (filterOptions.ebCopy && property.ebCopy === false) {
      delete data[key];
    } else if (filterOptions.ebReadOnly && property.ebReadOnly === true) {
      delete data[key];
    } else if (property.type === 'object' && property.properties) {
      _filterProperties({ ajv, properties: property.properties, data: data[key], filterOptions });
    } else if (property.type === 'object' && property.$ref) {
      const validate = ajv.getSchema(property.$ref);
      _filterSchema({ ajv, schema: validate.schema, data: data[key], filterOptions });
    }
  }
}
