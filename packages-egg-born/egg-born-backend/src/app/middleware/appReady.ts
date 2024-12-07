import { cast, VonaContext } from 'vona';

module.exports = () => {
  return async function (ctx: VonaContext, next: Function) {
    // check appReady
    if (!ctx.innerAccess) {
      await cast(ctx.app.bean._getBean('a-instance.service.instance' as never)).checkAppReady();
    }
    // next
    await next();
  };
};
