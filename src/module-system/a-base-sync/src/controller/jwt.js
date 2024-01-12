module.exports = class JwtController {
  async create() {
    const res = await this.ctx.service.jwt.create({
      scene: this.ctx.request.body.scene,
    });
    this.ctx.success(res);
  }
};
