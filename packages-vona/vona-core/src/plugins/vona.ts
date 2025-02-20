import type { PluginVonaOptions } from '../types/interface/pluginVona.ts';

export const PluginVona = {
  async install(
    { modulesMeta, locales, config, AppMonkey }: PluginVonaOptions,
  ) {
    console.log(modulesMeta, locales, config, AppMonkey);
    // // zova app
    // const app = new ZovaApplication(vue, ctxRoot);
    // await app.initialize({ modulesMeta, locales, config, AppMonkey, legacyRoutes });
    // return app;
  },
};
