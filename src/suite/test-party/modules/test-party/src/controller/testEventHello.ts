import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestEventHello extends BeanBase<ScopeModule> {
  async hello() {
    const data = {
      text: 'hello',
    };
    let result = 'world';
    result = await this.ctx.bean.event.invoke({
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
    this.ctx.success();
  }
}
