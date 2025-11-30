import type { IDecoratorFilterTransformOptions, IFilterTransformWhere, IPipeOptionsFilterTransformInfo } from '../types/filterTransform.ts';
import { BeanBase } from 'vona';
import { FilterTransform } from '../lib/decorator/filterTransform.ts';

export interface IFilterTransformOptionsBase extends IDecoratorFilterTransformOptions {}

@FilterTransform<IFilterTransformOptionsBase>()
export class SerializerTransformBase extends BeanBase implements IFilterTransformWhere {
  async where(_info: IPipeOptionsFilterTransformInfo, _options: IFilterTransformOptionsBase): Promise<boolean> {
    return false;
  }
}
