import { __ThisModule__ } from '../.metadata/this.js';
mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import assert from 'assert';

@Controller()
export class ControllerTestEventHello extends BeanBase {
  async hello() {
    const data = {
      text: 'hello',
    };
    let result = 'world';
    result = await this.app.bean.event.invoke({
      module: __ThisModule__,
      name: 'hello',
      data,
      result,
      next: async (context, next) => {
        context.result = `${context.result}.hello`;
        await next();
        context.result = `hello.${context.result}`;
      },
    });
    assert.equal(data.text, 'hello echo');
    assert.equal(result, 'echo.hello.world.echo.hello');
    this.app.success();
  }
}
