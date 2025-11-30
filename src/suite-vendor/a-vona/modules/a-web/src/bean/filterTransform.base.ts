import type { IDecoratorFilterTransformOptions, IFilterTransformWhere, IPipeOptionsFilterTransformInfo } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { FilterTransform } from 'vona-module-a-web';

export interface IFilterTransformOptionsBase extends IDecoratorFilterTransformOptions {}

@FilterTransform<IFilterTransformOptionsBase>()
export class SerializerTransformBase extends BeanBase implements IFilterTransformWhere {
  async where(_info: IPipeOptionsFilterTransformInfo, _options: IFilterTransformOptionsBase): Promise<boolean> {
    return false;
  }
}
