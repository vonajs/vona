import AppUtil from '../../lib/utils/util.js';

export interface AppMeta {
  workerId: string;
  inApp: boolean;
  inAgent: boolean;
  isProd: boolean;
  isTest: boolean;
  isLocal: boolean;
  util: AppUtil;
}
