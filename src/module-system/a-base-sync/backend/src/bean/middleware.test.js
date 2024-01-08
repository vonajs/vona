module.exports = class Middleware {
  async execute(options, next) {
    if (!this.ctx.app.meta.isTest) this.ctx.throw(403);
    // next
    await next();
  }
};
