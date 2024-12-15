import { BeanBase } from 'vona';
import { Middleware } from 'vona-module-a-aspect';

@Middleware()
export class MiddlewareAuthOpen extends BeanBase {
  async execute(options, next) {
    // check
    this.checkAuthOpen(options);
    // next
    return next();
  }

  checkAuthOpen(options) {
    // check innerAccess
    if (this.ctx.innerAccess) return;
    // check right type
    const rightOptions = this.ctx.app.bean.onion.middleware.getOnionOptionsDynamic('right' as never) as any;
    if (rightOptions && rightOptions.type) return;
    // isAuthOpen
    const isAuthOpen = this.app.bean.authOpen.isAuthOpen();
    let enableAuthOpen = options.enableAuthOpen;
    const onlyAuthOpen = options.onlyAuthOpen;
    if (onlyAuthOpen) enableAuthOpen = true;
    // check
    if (isAuthOpen && !enableAuthOpen) this.app.throw(403);
    if (!isAuthOpen && onlyAuthOpen) this.app.throw(403);
  }
}
