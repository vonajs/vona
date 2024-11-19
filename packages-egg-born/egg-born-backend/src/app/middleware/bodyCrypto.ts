module.exports = () => {
  return async function (ctx, next) {
    // bodyCrypto decrypt
    await ctx.app.bean.bodyCrypto.decrypt();
    // next
    await next();
    // bodyCrypto encrypt
    await ctx.app.bean.bodyCrypto.encrypt();
  };
};
