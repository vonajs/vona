import { Cast, VonaContext } from 'vona';

module.exports = () => {
  return async function (ctx: VonaContext, next: Function) {
    // check appReady
    if (!ctx.innerAccess) {
      await Cast(ctx.app.bean).instance.checkAppReady();
    }
    // next
    await next();
  };
};
