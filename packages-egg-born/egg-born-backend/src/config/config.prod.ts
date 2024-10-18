import { VonaAppInfo, VonaConfigOptional } from "vona";

export default function (_appInfo: VonaAppInfo) {
  const config = {} as VonaConfigOptional;

  // proxy
  config.proxy = true;
  config.ipHeaders = 'x-real-ip,x-forwarded-for';

  // database
  config.database = {
    testDatabase: false,
    base: {
      asyncStackTraces: false,
    },
  };

  // mysql
  config.mysql = {
    default: {
      hook: {
        meta: {
          long_query_time: 500,
        },
      },
    },
  };

  return config;
}
