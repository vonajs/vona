module.exports = () => {
  return async function (ctx, next) {
    // init instance
    await ctx.app.bean.instance.initInstance();
    // next
    await next();
  };
};
