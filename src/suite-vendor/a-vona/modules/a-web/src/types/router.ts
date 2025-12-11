import type Router from 'find-my-way';
import type { Constructable } from 'vona';
import type { TypeRequestMethod } from './request.ts';

export interface ContextRouteMetadata {
  meta: any;
}

export interface ContextRoute {
  controller: Constructable;
  actionDescriptor: PropertyDescriptor;
  controllerBeanFullName: string;
  action: string;
  route: ContextRouteMetadata;
  routeMethod: TypeRequestMethod;
  routePath: string;
  routePathRaw: string;
}

declare module 'vona' {
  export interface VonaApplication {
    router: Router.Instance<Router.HTTPVersion.V1>;
  }

  export interface VonaContext {
    route: ContextRoute;
  }
}

declare module 'koa' {
  export interface Request {
    params: { [key: string]: string };
    query: { [key: string]: string };
  }
}
