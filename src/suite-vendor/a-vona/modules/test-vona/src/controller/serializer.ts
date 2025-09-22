import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoSerializerSimple } from '../dto/serializerSimple.ts';

export interface IControllerOptionsSerializer extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsSerializer>({ path: 'serializer', meta: { mode: ['test', 'dev'] } })
export class ControllerSerializer extends BeanBase {
  @Web.post('echoSimple')
  @Api.body(DtoSerializerSimple)
  @Passport.public()
  echoSimple(@Arg.body() data: DtoSerializerSimple) {
    return data;
  }
}
