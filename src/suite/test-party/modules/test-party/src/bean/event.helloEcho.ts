import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'event' })
export class EventHelloEcho extends BeanBase {
  async execute(context, next) {
    const data = context.data;
    data.text = 'hello echo';
    context.result = `${context.result}.echo`;
    await next();
    context.result = `echo.${context.result}`;
  }
}
