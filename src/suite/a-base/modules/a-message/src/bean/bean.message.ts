import { Bean } from 'vona-module-a-bean';
import { BeanModuleScopeBase } from 'vona';

const _cacheMessageClassesUniform: any = {};

@Bean()
export class BeanMessage extends BeanModuleScopeBase {
  async group(/* {  options, user }*/ _params: any) {
    const items = this.messageClassesUniform();
    return items;
  }

  messageClassesUniform() {
    if (!_cacheMessageClassesUniform[this.ctx.locale]) {
      _cacheMessageClassesUniform[this.ctx.locale] = this._prepareMessageClassesUniform();
    }
    return _cacheMessageClassesUniform[this.ctx.locale];
  }

  _prepareMessageClassesUniform() {
    const messageClasses = this.app.bean.io.messageClass.messageClasses();
    const items: any[] = [];
    for (const relativeName in messageClasses) {
      const _module = messageClasses[relativeName];
      for (const messageClassName in _module) {
        const messageClass = _module[messageClassName];
        if (messageClass.info.uniform) {
          items.push({
            module: relativeName,
            messageClassName,
            messageClass,
          });
        }
      }
    }
    return items;
  }
}
