module.exports = class TestController {
  async echo() {
    const echo = this.ctx.request.body.echo;
    // this.ctx.throw(403);
    this.ctx.success({
      echo,
      query: this.ctx.request.query,
    });
  }
};
