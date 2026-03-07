export interface ZovaConfigEnv {
  APP_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
  APP_ROUTER_BASE: string | undefined;
  APP_PUBLIC_PATH: string | undefined;
  APP_NAME: string | undefined;
  APP_TITLE: string | undefined;
  APP_VERSION: string | undefined;
  DEV_SERVER_HOST: string | undefined;
  DEV_SERVER_PORT: string | undefined;
  SSR_API_BASE_URL: string | undefined;
  API_BASE_URL: string | undefined;
  API_PREFIX: string | undefined;
  API_JWT: string | undefined;
  SSR_COOKIE_THEMENAME: string | undefined;
  SSR_COOKIE_THEMEDARK: string | undefined;
  SSR_COOKIE_THEMEDARK_DEFAULT: string | undefined;
  SSR_BODYREADYOBSERVER: string | undefined;
  SSR_HMR: string | undefined;
}
