import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';

export type TypeQueueSubmitJobData = {
  target: any;
  targetConfig: any;
  hostname: any;
  links: any;
};

export type TypeQueueSubmitJobResult = void;

@Queue()
export class QueueSubmit
  extends BeanQueueBase<ScopeModule, TypeQueueSubmitJobData, TypeQueueSubmitJobResult>
  implements IQueueExecute<TypeQueueSubmitJobData, TypeQueueSubmitJobResult>
{
  async execute(data: TypeQueueSubmitJobData, _options?: IQueuePushOptions): Promise<TypeQueueSubmitJobResult> {
    const { target, targetConfig, hostname, links } = data;
    if (target === 'baidu') {
      await this._queueSubmitBaidu({ target, targetConfig, hostname, links });
    }
  }

  private async _queueSubmitBaidu({ targetConfig, hostname, links }: any) {
    // submit
    const url = `http://data.zz.baidu.com/urls?site=${hostname}&token=${targetConfig.token}`;
    const options = {
      method: 'POST',
      contentType: 'text/plain',
      dataType: 'json',
      data: links.join('\n'),
    } as any;
    const res = await this.ctx.curl(url, options);
    if (res.status !== 200) {
      // log
      this.ctx.logger.error(new Error(res.data && res.data.message));
    } else {
      // log
      this.ctx.logger.info(`submit baidu: ${links.join('\n')}`);
    }
  }
}
