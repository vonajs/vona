import type { IOpenapiPermissionModeActionActions, IOpenapiPermissions, IResourceRecord } from 'vona-module-a-openapi';
import type { ContextRouteBase, ContextRouteMetadata, IRecordResourceNameToRoutePathItem } from 'vona-module-a-web';
import { catchError } from '@cabloy/utils';
import { appMetadata, appResource, BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { SymbolUseOnionOptionsRouteReal } from 'vona-module-a-onion';
import { composeGuards, recordResourceNameToRoutePath } from 'vona-module-a-web';

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
    // controller options
    const controller = routePathInfo.controller;
    // controller options
    const beanOptions = appResource.getBean(controller);
    if (!beanOptions) throw new Error('invalid controller');
    const controllerBeanFullName = beanOptions.beanFullName;
    // descs
    const descs = Object.getOwnPropertyDescriptors(controller.prototype);
    const actionsIgnore = this.scope.config.permission.actionsIgnore;
    const actionKeys = Object.keys(descs).filter(actionKey => !['constructor'].includes(actionKey) && !actionsIgnore.includes(actionKey));
    // actions
    const permissionsActions: IOpenapiPermissionModeActionActions = {};
    for (const actionKey of actionKeys) {
      const desc = descs[actionKey];
      if (!desc.value || typeof desc.value !== 'function') continue;
      const route: ContextRouteBase = {
        controller,
        controllerBeanFullName,
        action: actionKey,
      };
      permissionsActions[actionKey] = await this._getPermissionOfAction(route);
    }
    return { actions: permissionsActions };
  }

  private async _getPermissionOfAction(route: ContextRouteBase) {
    const routeReal: ContextRouteMetadata = appMetadata.getMetadata(SymbolUseOnionOptionsRouteReal, route.controller.prototype, route.action)!;
    const routeRealPrev = this.ctx.route.route;
    this.ctx.route.route = routeReal;
    const composer = composeGuards(this.app, route);
    const [_, error] = await catchError(() => {
      return composer(this.ctx);
    });
    this.ctx.route.route = routeRealPrev;
    return !error;
  }
}
