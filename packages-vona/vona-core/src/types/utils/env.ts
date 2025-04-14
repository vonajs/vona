import type { VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';

export interface VonaConfigEnv {
  APP_NAME: string | undefined;
  APP_TITLE: string | undefined;
  APP_VERSION: string | undefined;
  SERVER_KEYS: string | undefined;
  SERVER_GLOBALPREFIX: string | undefined;
  SERVER_PUBLICDIR: string | undefined;
  SERVER_LOGGERDIR: string | undefined;
  SERVER_SUBDOMAINOFFSET: string | undefined;
  SERVER_WORKERS: string | undefined;
  SERVER_LISTEN_HOSTNAME: string | undefined;
  SERVER_LISTEN_PORT: string | undefined;
  SERVER_LISTEN_DISABLE: 'true' | 'false' | undefined;
  TEST_WHYISNODERUNNING: string | undefined;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      META_FLAVOR: VonaMetaFlavor;
      META_MODE: VonaMetaMode;
    }
  }
}
