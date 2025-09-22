import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { DtoSerializerSimple } from './serializerSimple.ts';

export interface IDtoOptionsSerializerLazy extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsSerializerLazy>()
export class DtoSerializerLazy {
  @Api.field(v.serializerGetter((value: DtoSerializerSimple) => {
    return { ...value, password: '111111' };
  }), v.object(DtoSerializerSimple))
  simple: DtoSerializerSimple;

  @Api.field(v.lazy(v.serializerGetter((value: DtoSerializerSimple) => {
    return { ...value, password: '111111' };
  }), () => {
    return DtoSerializerSimple;
  }))
  simpleLazy: DtoSerializerSimple;
}
