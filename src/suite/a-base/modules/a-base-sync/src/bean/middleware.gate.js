module.exports = class Middleware {
  async execute(options, next) {
    // check env
    this.checkEnv(options);
    // next
    await next();
  }

  checkEnv(options) {
    let env = options.env;
    if (!env) return;
    if (!Array.isArray(env)) env = env.split(',');
    const bingo = env.some(item => this.ctx.app.config.env === item);
    if (!bingo) this.ctx.throw(403);
  }
};
