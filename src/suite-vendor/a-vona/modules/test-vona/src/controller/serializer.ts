import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoSerializerTest } from '../dto/serializerTest.ts';

export interface IControllerOptionsSerializer extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsSerializer>({ path: 'serializer', meta: { mode: ['test', 'dev'] } })
export class ControllerSerializer extends BeanBase {
  @Web.post('echoSimple')
  @Api.body(DtoSerializerTest)
  echoSimple(@Arg.body() data: DtoSerializerTest) {
    return data;
  }
}
