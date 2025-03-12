import type { PowerPartial } from 'vona';
import type { IAuthenticateOptions } from '../types/auth.ts';
import type { IAuthProviderExecute, IAuthProviderRecord } from '../types/authProvider.ts';
import { BeanBase, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuthInner extends BeanBase {
  async authenticate<T extends keyof IAuthProviderRecord>(
    authProviderName: T,
    options?: PowerPartial<IAuthenticateOptions<IAuthProviderRecord[T]>>,
  ) {
    // onionSlice
    const onionSlice = this.bean.onion.authProvider.getOnionSliceEnabled(authProviderName);
    if (!onionSlice) throw new Error(`Auth provider not found: ${authProviderName}`);
    // clientOptions
    const clientOptions = await this._prepareClientOptions(onionSlice.beanOptions.options! as any, options);
    // execute
    const beanAuthProvider = this.app.bean._getBean<IAuthProviderExecute>(onionSlice.beanOptions.beanFullName as any);
    await beanAuthProvider.execute(clientOptions!, onionSlice.beanOptions.options!);
    console.log(onionSlice);
  }

  private async _prepareClientOptions<T extends keyof IAuthProviderRecord>(
    optionsMeta: PowerPartial<IAuthProviderRecord[T]>,
    options?: PowerPartial<IAuthenticateOptions<IAuthProviderRecord[T]>>,
  ): Promise<IAuthProviderRecord[T]['default']> {
    const clientName = options?.clientName ?? 'default';
    // todo: 从数据库中获取options
    const clientOptions = deepExtend({}, optionsMeta.default, optionsMeta.clients?.[clientName as any], options?.clientOptions);
    return clientOptions;
  }
}
