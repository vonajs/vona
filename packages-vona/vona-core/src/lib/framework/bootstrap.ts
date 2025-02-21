import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';

export function bootstrap({ modulesMeta, locales, config, AppMonkey }: BootstrapOptions) {
  console.log(modulesMeta, locales, config, AppMonkey);
  // // zova app
  // const app = new ZovaApplication(vue, ctxRoot);
  // await app.initialize({ modulesMeta, locales, config, AppMonkey, legacyRoutes });
  // return app;
}
