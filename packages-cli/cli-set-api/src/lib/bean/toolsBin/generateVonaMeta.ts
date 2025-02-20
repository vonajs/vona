import type { VonaConfigMeta } from '@cabloy/module-info';
import type { VonaBinConfigOptions } from './types.ts';
import { createConfigUtils } from './configUtils.ts';

export async function generateVonaMeta(configMeta: VonaConfigMeta, configOptions: VonaBinConfigOptions) {
  // config utils
  const configUtils = createConfigUtils(configMeta, configOptions);
  // env
  const env = configUtils.loadEnvs();
  // modulesMeta
  const modulesMeta = await configUtils.loadModulesMeta();
  // server
  const server = __getConfigServer();
  // build
  const build = __getConfigBuild();
  // alias
  const alias = Object.assign({}, setModuleAlias(), {
    '@': path.join(configOptions.appDir, 'src/legacy'),
  });
  // generateEntryFiles
  await generateEntryFiles(configMeta, configOptions, modulesMeta);
  // ok
  return {
    env,
    vitePlugins,
    viteConfig,
  };

  //////////////////////////////

  function __getConfigServer() {
    // proxy
    const proxy = {};
    if (process.env.PROXY_API_ENABLED === 'true') {
      proxy[process.env.PROXY_API_PREFIX!] = {
        target: process.env.PROXY_API_BASE_URL,
        changeOrigin: true,
      };
    }
    // server
    const server: CommonServerOptions = {
      proxy,
    };
      // devServerHost
    if (process.env.DEV_SERVER_HOST) {
      if (process.env.DEV_SERVER_HOST === 'true') {
        server.host = true;
      } else {
        server.host = process.env.DEV_SERVER_HOST;
      }
    }
    if (process.env.DEV_SERVER_PORT) {
      server.port = Number(process.env.DEV_SERVER_PORT);
    }
    return server;
  }

  function __getConfigBuild() {
    const outDir = path.join(configOptions.appDir, process.env.BUILD_OUTDIR || `dist/${process.env.META_APP_MODE}`);
    const build = {
      outDir,
      rollupOptions: {
        output: {
          manualChunks: id => {
            return configUtils.configManualChunk(id);
          },
        },
      },
      assetsInlineLimit: (filePath: string) => {
        if (__SvgIconPattern.test(filePath)) {
          return 0;
        }
      },
      minify: process.env.BUILD_MINIFY === 'false' ? false : 'terser',
      terserOptions: {
        keep_classnames: true,
      },
    };
    return build;
  }
}
