import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import type { ISchemaObjectExtensionField } from 'vona-module-a-openapi';
import type z from 'zod';
import { isEmptyObject } from '@cabloy/utils';
import { ZodMetadata } from '@cabloy/zod-openapi';
import { BeanBase } from 'vona';
import { Interceptor } from 'vona-module-a-aspect';

export interface IInterceptorOptionsSerializerTransform extends IDecoratorInterceptorOptionsGlobal {}

@Interceptor<IInterceptorOptionsSerializerTransform>({
  global: true,
  dependencies: 'a-body:bodyRes',
})
export class InterceptorSerializerTransform extends BeanBase implements IInterceptorExecute {
  async execute(_options: IInterceptorOptionsSerializerTransform, next: Next) {
    this.bean.onion.interceptor.inspect();
    // next
    const body = await next();
    // schema
    const schema = this.bean.bodyRes.getResponseBodySchema();
    // transform
    return await this._transform(body, schema);
  }

  async _transform(data: object, schema: z.ZodType | undefined) {
    // only support array/object
    if (!data || typeof data !== 'object' || !schema) return data;
    // schema
    const innerSchema = ZodMetadata.unwrapChained(schema);
    // array
    if (Array.isArray(data) && innerSchema.type === 'array') {
      return await this._transformArray(data, innerSchema as z.ZodArray);
    }
    // object
    if (!Array.isArray(data) && innerSchema.type === 'object') {
      return await this._transformObject(data, innerSchema as z.ZodObject);
    }
    // others
    return data;
  }

  async _transformArray(data: object[], schema: z.ZodArray) {
    const res: any[] = [];
    for (const item of data) {
      res.push(await this._transform(item, schema.def.element as any));
    }
    return res;
  }

  async _transformObject(data: object, schema: z.ZodObject) {
    const dataPatch = {};
    for (const key in schema.shape) {
      const keySchema = schema.shape[key];
      const metadata: ISchemaObjectExtensionField | undefined = ZodMetadata.getOpenapiMetadata(keySchema);
      if (!metadata) continue;
      // exclude
      if (metadata.exclude) {
        dataPatch[key] = undefined;
        continue;
      }
      // valuePatch
      let valuePatch = data[key];
      // inner
      valuePatch = await this._transform(valuePatch, keySchema);
      // serializerTransforms
      if (metadata.serializerTransforms) {
        // loop
      }
      // patch
      if (valuePatch !== data[key]) {
        dataPatch[key] = valuePatch;
      }
    }
    if (!isEmptyObject(dataPatch)) {
      data = { ...data, ...dataPatch };
    }
    return data;
  }
}
