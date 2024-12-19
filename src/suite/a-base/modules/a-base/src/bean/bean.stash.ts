import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@Bean()
export class BeanStash extends BeanBase {
  get({ options, type, key }: any) {
    const stash = this._prepareStash(options);
    return stash.get({ type, key });
  }
  set({ options, type, key, value }: any) {
    const stash = this._prepareStash(options);
    stash.set({ type, key, value });
  }
  remove({ options, type, key }: any) {
    const stash = this._prepareStash(options);
    stash.remove({ type, key });
  }
  clear({ options, type }: any) {
    const stash = this._prepareStash(options);
    stash.clear({ type });
  }
  reset({ options }: any) {
    const stash = this._prepareStash(options);
    stash.reset();
  }
  _prepareStash(options) {
    if (!options) {
      throw new Error('stash options should not empty');
    }
    if (!options.stash) {
      // new bean
      options.stash = this.app.bean._newBean('a-base.service.stash');
    }
    return options.stash;
  }
}
