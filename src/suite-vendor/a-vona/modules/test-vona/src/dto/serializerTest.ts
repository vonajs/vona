import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Serializer } from 'vona-module-a-serialization';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsSerializerTest extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsSerializerTest>()
export class DtoSerializerTest {
  @Serializer.exclude()
  @Api.field(v.min(6))
  password: string;
}
