import { cast } from 'vona';

module.exports = () => {
  return async function (ctx, next) {
    // init instance
    await cast(ctx.app.bean._getBean('a-instance.service.instance' as never)).initInstance();
    // next
    await next();
  };
};
