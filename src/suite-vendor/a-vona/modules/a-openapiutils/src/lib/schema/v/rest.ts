import type { CurrencyOptions } from '@zhennann/currency';
import type { ICaptchaOptions, IResourcePickerOptions, ISchemaObjectExtensionFieldRest, ISchemaObjectExtensionFieldRestScene, ISelectOptions, ITextareaOptions, IToggleOptions, TypeDateFormat, TypeRenderComponent, TypeSchemaScene } from 'vona-module-a-openapi';
import type z from 'zod';
import type { TypeSchemaOrderLevel } from '../../../types/order.ts';
import { $order } from '../../utils.ts';

export function schemaRest<T extends z.ZodType>(
  rest?: ISchemaObjectExtensionFieldRestScene | ISchemaObjectExtensionFieldRest,
  scene?: TypeSchemaScene,
) {
  return function (schema: T): T {
    return schema.openapi(scene
      ? { rest: { [scene]: rest } }
      : { rest: rest as any });
  };
}

export function schemaCustomKey<T extends z.ZodType>(customKey: string, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    return schema.openapi(scene
      ? { rest: { [scene]: { customKey } } }
      : { rest: { customKey } });
  };
}

export function schemaOrder<T extends z.ZodType>(order: number, level?: TypeSchemaOrderLevel, scene?: TypeSchemaScene) {
  const orderReal = $order(order, level);
  return function (schema: T): T {
    return schema.openapi(scene
      ? { rest: { [scene]: { order: orderReal } } }
      : { rest: { order: orderReal } },
    );
  };
}

export function schemaRender<T extends z.ZodType>(render: TypeRenderComponent, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    return schema.openapi(scene
      ? { rest: { [scene]: { render: render as any } } }
      : { rest: { render: render as any } });
  };
}

export function schemaVisible<T extends z.ZodType>(visible?: boolean, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    return schema.openapi(scene
      ? { rest: { [scene]: { visible } } }
      : { rest: { visible } });
  };
}

export function schemaCurrency<T extends z.ZodType>(currency?: CurrencyOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = currency !== undefined ? { render: 'currency', currency } : { render: 'currency' };
    return schema.openapi(scene
      ? { rest: { [scene]: options as any } }
      : { rest: options as any });
  };
}

export function schemaDate<T extends z.ZodType>(dateFormat?: TypeDateFormat, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = dateFormat !== undefined ? { render: 'date', dateFormat } : { render: 'date' };
    return schema.openapi(scene
      ? { rest: { [scene]: options as any } }
      : { rest: options as any });
  };
}

export function schemaCaptcha<T extends z.ZodType>(captcha?: ICaptchaOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = captcha !== undefined ? { render: 'captcha', captcha } : { render: 'captcha' };
    return schema.openapi(scene
      ? { rest: { [scene]: options as any } }
      : { rest: options as any });
  };
}

export function schemaToggle<T extends z.ZodType>(toggle?: IToggleOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = toggle !== undefined ? { render: 'toggle', toggle } : { render: 'toggle' };
    return schema.openapi(scene
      ? { rest: { [scene]: options as any } }
      : { rest: options as any });
  };
}

export function schemaSelect<T extends z.ZodType>(select?: ISelectOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = select !== undefined ? { render: 'select', select } : { render: 'select' };
    return schema.openapi(scene
      ? { rest: { [scene]: options as any } }
      : { rest: options as any });
  };
}

export function schemaResourcePicker<T extends z.ZodType>(resourcePicker?: IResourcePickerOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = resourcePicker !== undefined ? { render: 'resourcePicker', resourcePicker } : { render: 'resourcePicker' };
    return schema.openapi(scene
      ? { rest: { [scene]: options as any } }
      : { rest: options as any });
  };
}

export function schemaTextarea<T extends z.ZodType>(textarea?: ITextareaOptions, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = textarea !== undefined ? { render: 'textarea', textarea } : { render: 'textarea' };
    return schema.openapi(scene
      ? { rest: { [scene]: options as any } }
      : { rest: options as any });
  };
}
