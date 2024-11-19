module.exports = () => {
  return async function (ctx, next) {
    // check appReady
    if (!ctx.innerAccess) {
      await ctx.app.bean.instance.checkAppReady();
    }
    // next
    await next();
  };
};
