import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Controller, Web } from 'vona-module-a-web';
import { DtoSerializerTest } from '../dto/serializerTest.ts';

export interface IControllerOptionsSerializer extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsSerializer>({ path: 'serializer', meta: { mode: ['test', 'dev'] } })
export class ControllerSerializer extends BeanBase {
  @Web.get('echoSimple')
  @Api.body(DtoSerializerTest)
  echoSimple() {
    const data = {
      password: '123456',
      password2: '123456',
      email: 'kevin@cabloy.com',
      email2: 'kevin@cabloy.com',
      email3: 'kevin@cabloy.com',
      email4: 'kevin@cabloy.com',
      email5: 'kevin@cabloy.com',
      email6: 'kevin@cabloy.com',
      email7: 'kevin@cabloy.com',
      firstName: 'k',
      lastName: 'v',
    } as DtoSerializerTest;
    return data;
  }
}
