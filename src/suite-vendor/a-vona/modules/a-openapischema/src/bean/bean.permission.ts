import type { IOpenapiPermissions, IResourceRecord } from 'vona-module-a-openapi';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanPermission extends BeanBase {
  async retrievePermissions(resource: keyof IResourceRecord): Promise<IOpenapiPermissions> {
    // return await this.scope.event.retrieveMenus.emit({ publicPath }, nextOrDefault);
  }
}
