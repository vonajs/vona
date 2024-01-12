module.exports = class Middleware {
  async execute(options, next) {
    if (!this.ctx.innerAccess) this.ctx.throw(403);
    // next
    await next();
  }
};
