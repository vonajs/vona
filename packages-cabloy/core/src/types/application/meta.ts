import { AppReload } from '../../lib/module/reload.js';
import { AppMockUtil } from '../../lib/utils/mockUtil.js';
import { AppUtil } from '../../lib/utils/util.js';

export interface AppMeta {
  workerId: string;
  inApp: boolean;
  inAgent: boolean;
  isProd: boolean;
  isTest: boolean;
  isLocal: boolean;
  util: AppUtil;
  mockUtil: AppMockUtil;
  reload: AppReload;
  beans: Record<string, any>;
  aops: Record<string, any>;
}
