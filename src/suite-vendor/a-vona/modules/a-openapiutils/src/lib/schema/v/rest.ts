import type { CurrencyOptions } from '@zhennann/currency';
import type { ISchemaObjectExtensionFieldCaptcha, TypeDateFormat, TypeRenderComponent, TypeSchemaScene } from 'vona-module-a-openapi';
import type z from 'zod';
import type { TypeSchemaOrderLevel } from '../../../types/order.ts';
import { OrderLevelBaseMap } from '../../const/database.ts';

export function schemaOrder<T extends z.ZodType>(order: number, level?: TypeSchemaOrderLevel, scene?: TypeSchemaScene) {
  const levelBase = OrderLevelBaseMap[level ?? 'business'];
  const orderReal = levelBase + order;
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

export function schemaCaptcha<T extends z.ZodType>(captcha?: ISchemaObjectExtensionFieldCaptcha, scene?: TypeSchemaScene) {
  return function (schema: T): T {
    const options = captcha !== undefined ? { render: 'captcha', captcha } : { render: 'captcha' };
    return schema.openapi(scene
      ? { rest: { [scene]: options as any } }
      : { rest: options as any });
  };
}
