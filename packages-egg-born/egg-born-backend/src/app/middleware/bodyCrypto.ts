module.exports = () => {
  return async function (ctx, next) {
    // bodyCrypto decrypt
    await ctx.bean.bodyCrypto.decrypt();
    // next
    await next();
    // bodyCrypto encrypt
    await ctx.bean.bodyCrypto.encrypt();
  };
};
