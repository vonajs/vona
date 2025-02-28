import type Router from 'find-my-way';

declare module 'vona' {
  export interface VonaApplication {
    router: Router.Instance<Router.HTTPVersion.V1>;
  }
}
