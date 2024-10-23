import { __ThisModule__ } from '../resource/this.js';
import { Service, BeanBase } from 'vona';

import url from 'url';

@Service()
export class ServiceTools extends BeanBase {
  async submit({ links, config }: any) {
    for (const target in config.submit) {
      const targetConfig = config.submit[target];
      await this._submit({ target, targetConfig, links });
    }
  }

  async _submit({ target, targetConfig, links }: any) {
    if (!targetConfig.token) return;
    if (!links || links.length === 0) return;
    // host
    const parts = url.parse(links[0]);
    const hostname = parts.hostname;
    if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1' || hostname.indexOf('192.168') === 0) {
      return;
    }
    // queue
    this.ctx.tail(() => {
      this.ctx.meta.util.queuePush({
        module: __ThisModule__,
        queueName: 'submit',
        data: {
          target,
          targetConfig,
          hostname,
          links,
        },
      });
    });
  }
}
