import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';

export async function createApp({ modulesMeta, locales, config, env, AppMonkey }: BootstrapOptions) {
  prepareEnv(env);
  console.log(modulesMeta, locales, config, AppMonkey);
  // // zova app
  // const app = new ZovaApplication(vue, ctxRoot);
  // await app.initialize({ modulesMeta, locales, config, AppMonkey, legacyRoutes });
  // return app;
}

function prepareEnv(env: { [key: string]: string | boolean }) {
  for (const key in env) {
    process.env[key] = env[key].toString();
  }
}
