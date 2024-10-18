import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../resource/this.js';
const __ItemDefault = {
  userName: '',
  password: '',
  passwordAgain: '',
  sex: 0,
  birthday: null,
  language: '',
  avatar: '',
  rememberMe: false,
  motto: '',
};

@Controller()
export class ControllerKitchenSinkFormSchemaValidation extends BeanBase<ScopeModule> {
  async load() {
    // try load from db cache
    const cacheName = this._getCacheName();
    let item = await this.scope._bean.cacheRedis.get(cacheName);
    item = this.ctx.bean.util.extend({}, __ItemDefault, item);
    // ok
    this.ctx.success(item);
  }

  async saveSimple() {
    // item
    const item = this.ctx.request.body.data;
    // save to db cache
    const cacheName = this._getCacheName();
    await this.scope._bean.cacheRedis.set(cacheName, item);
    // ok
    this.ctx.success();
  }

  async saveValidation() {
    await this.saveSimple();
  }

  // form-captcha signup
  signup() {
    this.ctx.success();
  }

  // form-mobile-verify
  mobileVerify() {
    this.ctx.success();
  }

  _getCacheName() {
    // get the operation user
    const user = this.ctx.state.user.op;
    return `__formTest:${user.id}`;
  }
}
