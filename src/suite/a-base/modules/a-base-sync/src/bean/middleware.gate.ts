module.exports = class Middleware {
  async execute(options, next) {
    // check gate
    if (!this.ctx.app.meta.util.checkGate(options)) {
      this.ctx.throw(403);
    }
    // next
    await next();
  }
};
