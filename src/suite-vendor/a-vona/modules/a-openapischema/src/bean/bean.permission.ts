import type { IOpenapiPermissions, IResourceRecord } from 'vona-module-a-openapi';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanPermission extends BeanBase {
  async retrievePermissions(resource: keyof IResourceRecord): Promise<IOpenapiPermissions> {
    return await this.scope.event.retrievePermissions.emit({ resource }, async () => {
      return await this.getPermissionsDefault(resource);
    });
  }

  async getPermissionsDefault(resource: keyof IResourceRecord): Promise<IOpenapiPermissions> {

  }
}
