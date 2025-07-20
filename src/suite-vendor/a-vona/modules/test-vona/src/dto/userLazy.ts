import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { DtoRoleLazy } from './roleLazy.ts';

export interface IDtoOptionsUserLazy extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsUserLazy>()
export class DtoUserLazy {
  @Api.field()
  name: string;

  @Api.field(v.lazy(v.optional(), () => DtoUserLazy))
  user?: DtoUserLazy;

  @Api.field(v.optional(), v.array(v.lazy(() => DtoRoleLazy)))
  roles?: DtoRoleLazy[];
}
