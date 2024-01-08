module.exports = class Middleware {
  async execute(options, next) {
    // check
    await this.ctx.bean.user.check(options);
    // next
    await next();
  }
};
