import { BeanBroadcastBase, Broadcast, IBroadcastExecute } from 'vona-module-a-broadcast';

export type TypeBroadcastReloadJobData = unknown;

@Broadcast()
export class BroadcastReload
  extends BeanBroadcastBase<TypeBroadcastReloadJobData>
  implements IBroadcastExecute<TypeBroadcastReloadJobData>
{
  async execute(_data: TypeBroadcastReloadJobData, _isEmitter?: boolean) {
    await this.scope.service.instance.instanceStartup(this.ctx.subdomain, { force: true });
  }
}
