import type { CurrencyOptions } from '@zhennann/currency';
import type { ICaptchaOptions, IResourcePickerOptions, ISelectOptions, ITextareaOptions, IToggleOptions, TypeDateFormat, TypeSchemaScene } from 'vona-module-a-openapi';
import type z from 'zod';
import type { ISchemaComponentRecord } from '../../../types/component.ts';
import { _generalSchemaRest } from './utils.ts';

const __schemaComponents = {
  captcha: schemaCaptcha,
  currency: schemaCurrency,
  date: schemaDate,
  toggle: schemaToggle,
  select: schemaSelect,
  resourcePicker: schemaResourcePicker,
  textarea: schemaTextarea,
};

export function schemaComponent<K extends keyof ISchemaComponentRecord>(
  name: K,
  options: ISchemaComponentRecord[K],
  scene?: TypeSchemaScene,
) {
  return __schemaComponents[name](options, scene);
}

function schemaCurrency<T extends z.ZodType>(currency?: CurrencyOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = currency !== undefined ? { render: 'currency', currency } : { render: 'currency' };
    return _generalSchemaRest(schema, options, scene);
  };
}

function schemaDate<T extends z.ZodType>(dateFormat?: TypeDateFormat, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = dateFormat !== undefined ? { render: 'date', dateFormat } : { render: 'date' };
    return _generalSchemaRest(schema, options, scene);
  };
}

function schemaCaptcha<T extends z.ZodType>(captcha?: ICaptchaOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = captcha !== undefined ? { render: 'captcha', captcha } : { render: 'captcha' };
    return _generalSchemaRest(schema, options, scene);
  };
}

function schemaToggle<T extends z.ZodType>(toggle?: IToggleOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = toggle !== undefined ? { render: 'toggle', toggle } : { render: 'toggle' };
    return _generalSchemaRest(schema, options, scene);
  };
}

function schemaSelect<T extends z.ZodType>(select?: ISelectOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = select !== undefined ? { render: 'select', select } : { render: 'select' };
    return _generalSchemaRest(schema, options, scene);
  };
}

function schemaResourcePicker<T extends z.ZodType>(resourcePicker?: IResourcePickerOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = resourcePicker !== undefined ? { render: 'resourcePicker', resourcePicker } : { render: 'resourcePicker' };
    return _generalSchemaRest(schema, options, scene);
  };
}

function schemaTextarea<T extends z.ZodType>(textarea?: ITextareaOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = textarea !== undefined ? { render: 'textarea', textarea } : { render: 'textarea' };
    return _generalSchemaRest(schema, options, scene);
  };
}
