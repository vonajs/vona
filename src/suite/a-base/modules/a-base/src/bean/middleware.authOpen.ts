import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware' })
export class MiddlewareAuthOpen extends BeanBase {
  async execute(options, next) {
    // check
    this.checkAuthOpen(options);
    // next
    await next();
  }

  checkAuthOpen(options) {
    // check innerAccess
    if (this.ctx.innerAccess) return;
    // check right type
    const middlewareItem = this.app.meta.middlewaresNormal['right'];
    const rightOptions = this.ctx.meta.getMiddlewareOptions(middlewareItem);
    if (rightOptions && rightOptions.type) return;
    // isAuthOpen
    const isAuthOpen = this.ctx.bean.authOpen.isAuthOpen();
    let enableAuthOpen = options.enableAuthOpen;
    const onlyAuthOpen = options.onlyAuthOpen;
    if (onlyAuthOpen) enableAuthOpen = true;
    // check
    if (isAuthOpen && !enableAuthOpen) this.ctx.throw(403);
    if (!isAuthOpen && onlyAuthOpen) this.ctx.throw(403);
  }
}
