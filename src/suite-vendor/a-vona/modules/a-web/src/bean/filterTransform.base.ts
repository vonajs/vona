import type { IDecoratorFilterTransformOptions, IFilterTransformWhere, IPipeOptionsFilterTransformInfo } from '../types/filterTransform.ts';
import { BeanBase } from 'vona';
import { FilterTransform } from '../lib/decorator/filterTransform.ts';

export interface IFilterTransformOptionsBase extends IDecoratorFilterTransformOptions {
  test: boolean;
}

@FilterTransform<IFilterTransformOptionsBase>()
export class FilterTransformBase extends BeanBase implements IFilterTransformWhere {
  async where(info: IPipeOptionsFilterTransformInfo, _options: IFilterTransformOptionsBase): Promise<boolean> {
    const { params, fullName, value, schema, openapi } = info;
    let op = openapi?.filter?.op;
    if (!op) {
      const typeName = schema?.type;
      if (typeName === 'string') {
        op = '_includesI_';
      } else {
        op = '_eq_';
      }
    }
    if (op === '_eq_') {
      params.where![fullName] = value;
    } else {
      params.where![fullName] = { [op]: value };
    }
    return true;
  }
}
