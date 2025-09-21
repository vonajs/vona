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

  async _transform(body: object, schema: z.ZodType | undefined) {
    // only support array/object
    if (!body || typeof body !== 'object' || !schema) return body;
    // schema
    const innerSchema = ZodMetadata.unwrapChained(schema);
    // array
    if (Array.isArray(body) && innerSchema.type === 'array') {
      return await this._transformArray(body, innerSchema as z.ZodArray);
    }
    // body
    if (!Array.isArray(body) && innerSchema.type === 'object') {
      return await this._transformObject(body, innerSchema as z.ZodObject);
    }
    // others
    return body;
  }

  async _transformArray(body: object[], schema: z.ZodArray) {
    const res: any[] = [];
    for (const item of body) {
      res.push(await this._transform(item, schema.def.element as any));
    }
    return res;
  }

  async _transformObject(body: object, schema: z.ZodObject) {
    const bodyPatch = {};
    for (const key in schema.shape) {
      const keySchema = schema.shape[key];
      const metadata: ISchemaObjectExtensionField | undefined = ZodMetadata.getOpenapiMetadata(keySchema);
      if (!metadata) continue;
      // exclude
      if (metadata.exclude) {
        bodyPatch[key] = undefined;
        continue;
      }
      // value
      const value = body[key];
      // inner
      const valuePatch = await this._transform(value, keySchema);
      if (valuePatch !== value) {
        bodyPatch[key] = valuePatch;
      }
      // serializerTransforms
      if (!metadata.serializerTransforms) continue;
    }
    if (!isEmptyObject(bodyPatch)) {
      body = { ...body, ...bodyPatch };
    }
    return body;
  }
}
