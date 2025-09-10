import type { IZodRefineExecute, IZodRefineRecord } from 'vona-module-a-zod';
import type z from 'zod';
import { beanFullNameFromOnionName, useApp } from 'vona';

export function schemaZodRefine<T extends keyof IZodRefineRecord>(zodRefineName: T, options?: Partial<IZodRefineRecord[T]>) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.superRefine(async (value, refinementCtx) => {
      const app = useApp();
      const options2 = app.bean.onion.zodRefine.getOnionOptionsDynamic(zodRefineName, options);
      // execute
      const beanFullName = beanFullNameFromOnionName(zodRefineName, 'zodRefine');
      const beanInstance = app.bean._getBean<IZodRefineExecute>(beanFullName as any);
      if (!beanInstance) {
        throw new Error(`zodRefine bean not found: ${beanFullName}`);
      }
      return await beanInstance.execute(value, refinementCtx, options2);
    });
  };
}
