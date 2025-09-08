import type { VonaContext } from 'vona';
import type { IDecoratorPipeOptions, IDecoratorPipeOptionsArgument, IPipeTransform } from 'vona-module-a-aspect';
import type { ISchemaObjectExtensionField, RouteHandlerArgumentMeta } from 'vona-module-a-openapi';
import type { IQueryParams } from 'vona-module-a-orm';
import type { ValidatorOptions } from 'vona-module-a-validation';
import type z from 'zod';
import { isNil } from '@cabloy/utils';
import { ZodMetadata } from '@cabloy/zod-query';
import { BeanBase, cast, HttpStatus } from 'vona';
import { createArgumentPipe, Pipe } from 'vona-module-a-aspect';

export interface IPipeOptionsQuery extends IDecoratorPipeOptions, IDecoratorPipeOptionsArgument, ValidatorOptions {
  transformFn?: TypePipeOptionsQueryTransform | string;
}

export interface IPipeOptionsQueryTransformInfo {
  params: IQueryParams;
  query: any;
  options: IPipeOptionsQuery;
  originalName: string;
  fullName: string;
  key?: string;
  value?: any;
  schema?: z.ZodSchema;
  openapi?: ISchemaObjectExtensionField;
}
export type TypePipeOptionsQueryTransform =
  (ctx: VonaContext, info: IPipeOptionsQueryTransformInfo) => boolean | undefined;

const __FieldsSystem = ['columns', 'where', 'orders', 'pageNo', 'pageSize'];

@Pipe<IPipeOptionsQuery>({
  // ValidatorOptions
  disableErrorMessages: false,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  passthrough: false,
  strict: false,
})
export class PipeQuery extends BeanBase implements IPipeTransform<any> {
  async transform(value: any, metadata: RouteHandlerArgumentMeta, options: IPipeOptionsQuery) {
    if (!options.schema) throw new Error(`should specify the schema of pipeQuery: ${metadata.controller.name}.${metadata.method}#${metadata.index}`);
    // validateSchema
    value = await this.bean.validator.validateSchema(options.schema, value, options, metadata.field);
    // transform
    value = this._transform(value, options);
    // ok
    return value;
  }

  private _transform(value: any, options: IPipeOptionsQuery) {
    // 1. system: columns/where/orders/pageNo/pageSize
    const params = this._transformSystem(value);
    // 2. fields
    this._transformFields(params, value, options);
    // 3. system: orders
    this._transformOrders(params, options);
    // ok
    return params;
  }

  // system: columns/where/orders/pageNo/pageSize
  private _transformSystem(value: any) {
    const params: IQueryParams = {};
    // columns
    if (!isNil(value.columns)) params.columns = value.columns;
    // where
    params.where = value.where ?? {};
    // orders
    if (!isNil(value.orders)) {
      if (typeof value.orders === 'string') {
        if (value.orders.startsWith('[') && value.orders.endsWith(']')) {
          params.orders = JSON.parse(value.orders);
        } else {
          params.orders = [value.orders.split(',')];
        }
      } else {
        params.orders = value.orders;
      }
    }
    // pageNo/pageSize
    if (!isNil(value.pageNo) && !isNil(value.pageSize)) {
      params.offset = (value.pageNo - 1) * value.pageSize;
      params.limit = value.pageSize;
    }
    // ok
    return params;
  }

  private _transformOrders(params: IQueryParams, options: IPipeOptionsQuery) {
    if (!params.orders) return;
    // openapi
    const openapi: ISchemaObjectExtensionField | undefined = ZodMetadata.getOpenapiMetadata(options.schema);
    const table = openapi?.query?.table;
    // loop
    for (const order of params.orders) {
      const field = order[0] as string;
      if (field.includes('.')) continue;
      let tableCurrent = table;
      let fieldCurrent = field;
      const fieldSchema = ZodMetadata.unwrapChained(ZodMetadata.getFieldSchema(options.schema, field));
      if (fieldSchema) {
        const openapi: ISchemaObjectExtensionField | undefined = ZodMetadata.getOpenapiMetadata(fieldSchema);
        if (openapi?.query?.table) {
          tableCurrent = openapi?.query?.table;
        }
        if (openapi?.query?.originalName) {
          fieldCurrent = openapi?.query?.originalName;
        }
      }
      cast(order)[0] = tableCurrent ? `${tableCurrent}.${fieldCurrent}` : fieldCurrent;
    }
  }

  private _transformField(key: string, fieldValue: any, params: IQueryParams, value: any, options: IPipeOptionsQuery) {
    if (__FieldsSystem.includes(key)) return;
    const fieldSchema = ZodMetadata.unwrapChained(ZodMetadata.getFieldSchema(options.schema, key));
    if (!fieldSchema) return;
    // openapi
    const openapi: ISchemaObjectExtensionField | undefined = ZodMetadata.getOpenapiMetadata(fieldSchema);
    // name
    const originalName = openapi?.query?.originalName ?? key;
    let fullName: string;
    // joins
    let joinInfo;
    if (openapi?.query?.joinOn) {
      const joinType = openapi.query.joinType ?? 'innerJoin';
      const joinTable = openapi.query.table;
      const joinOn = openapi.query.joinOn;
      joinInfo = [joinType, joinTable, joinOn];
      fullName = `${joinTable}.${originalName}`;
    } else {
      fullName = originalName;
    }
    // check where
    if (Object.prototype.hasOwnProperty.call(params.where, fullName)) return;
    // custom transform
    const resTransform = this._performTransformFn(options, {
      params,
      query: value,
      options,
      originalName,
      fullName,
      key,
      value: fieldValue,
      schema: fieldSchema,
      openapi,
    });
    // res: ignore
    if (resTransform === false) return;
    // join
    if (joinInfo) {
      if (!params.joins) params.joins = [];
      if (params.joins.findIndex(item => item[1] === joinInfo.joinTable) === -1) {
        params.joins.push(joinInfo);
      }
    }
    // res: done
    if (resTransform === true) return;
    // default transform
    let op = openapi?.query?.op;
    if (!op) {
      const typeName = fieldSchema._def.typeName;
      if (typeName === 'ZodString') {
        op = '_includesI_';
      } else {
        op = '_eq_';
      }
    }
    if (op === '_eq_') {
      params.where![fullName] = fieldValue;
    } else {
      params.where![fullName] = { [op]: fieldValue };
    }
  }

  private _transformFields(params: IQueryParams, value: any, options: IPipeOptionsQuery) {
    // loop
    for (const key in value) {
      this._transformField(key, value[key], params, value, options);
    }
    // custom transform
    this._performTransformFn(options, { params, query: value, options } as IPipeOptionsQueryTransformInfo);
  }

  private _performTransformFn(options: IPipeOptionsQuery, info: IPipeOptionsQueryTransformInfo): boolean | undefined {
    if (options.transformFn) {
      if (typeof options.transformFn === 'string') {
        const controller = this.ctx.getControllerBean();
        if (!controller[options.transformFn]) {
          throw new Error(`transformFn not found: ${this.ctx.getControllerBeanFullName()}`);
        }
        return controller[options.transformFn](info);
      } else {
        return options.transformFn(this.ctx, info);
      }
    } else {
      const controller = this.ctx.getControllerBean();
      const transformFn = `${String(this.ctx.getHandlerName())}QueryTransform`;
      if (controller[transformFn]) {
        return controller[transformFn](info);
      }
    }
  }
}

export const ArgQueryPro = createArgumentPipe('a-web:query');
