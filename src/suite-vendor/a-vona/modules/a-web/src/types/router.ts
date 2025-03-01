import type Router from 'find-my-way';

declare module 'vona' {
  export interface VonaApplication {
    router: Router.Instance<Router.HTTPVersion.V1>;
  }
}

declare module 'koa'{
  export interface Request {
    params: { [key: string]: string };
    query: { [key: string]: string };
  }
}
