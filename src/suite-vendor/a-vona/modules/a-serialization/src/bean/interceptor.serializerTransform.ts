import type { Next } from 'vona';
import type { IDecoratorInterceptorOptionsGlobal, IInterceptorExecute } from 'vona-module-a-aspect';
import type { ISchemaObjectExtensionField } from 'vona-module-a-openapi';
import type z from 'zod';
import type { ZodArray } from 'zod';
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
    // only support array/object
    if (!body || typeof body !== 'object') return body;
    // schema
    const schema = this.bean.bodyRes.getResponseBodySchema();
    // transform
    return await this._transform(body, schema);
  }

  async _transform(body: object, schema: z.ZodType | undefined) {
    if (!schema) return body;
    const innerSchema = ZodMetadata.unwrapChained(schema);
    // array
    if (innerSchema.type === 'array') {
      if (!Array.isArray(body)) return body;
      const res: any[] = [];
      for (const item of body) {
        res.push(await this._transform(item, (innerSchema as ZodArray).def.element as any));
      }
      return res;
    }
    // body
    if (innerSchema.type !== 'object') return body;
    const innerSchemaObj = innerSchema as z.ZodObject;
    const bodyPatch = {};
    for (const key in innerSchemaObj.shape) {
      const keySchema = innerSchemaObj.shape[key];
      const metadata: ISchemaObjectExtensionField | undefined = ZodMetadata.getOpenapiMetadata(keySchema);
      if (!metadata) continue;
      // exclude
      if (metadata.exclude) {
        bodyPatch[key] = undefined;
        continue;
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
