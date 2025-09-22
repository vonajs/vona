import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { DtoSerializerSimple } from './serializerSimple.ts';

export interface IDtoOptionsSerializerArray extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsSerializerArray>()
export class DtoSerializerArray {
  @Api.field(v.serializerGetter((value: DtoSerializerSimple[], _data: DtoSerializerArray) => {
    return value.map(item => {
      return {
        ...item,
        password: '111111',
      };
    });
  }), v.title('Simple'), v.array(DtoSerializerSimple))
  simples: DtoSerializerSimple[];
}
