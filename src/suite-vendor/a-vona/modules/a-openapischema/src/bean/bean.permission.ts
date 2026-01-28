import type { IOpenapiPermissions, IResourceRecord } from 'vona-module-a-openapi';
import type { IRecordResourceNameToRoutePathItem } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { recordResourceNameToRoutePath } from 'vona-module-a-web';

@Bean()
export class BeanPermission extends BeanBase {
  async retrievePermissions(resource: keyof IResourceRecord): Promise<IOpenapiPermissions> {
    return await this.scope.event.retrievePermissions.emit({ resource }, async () => {
      return await this.getPermissionsDefault(resource);
    });
  }

  async getPermissionsDefault(resource: keyof IResourceRecord): Promise<IOpenapiPermissions> {
    const routePathInfo: IRecordResourceNameToRoutePathItem = recordResourceNameToRoutePath[resource];
    if (!routePathInfo) throw new Error(`not found routePath of resource: ${resource}`);
    // routePathInfo.controller;
    return {};
  }
}
