import { PowerPartial, VonaContext } from '../../types/index.js';
import { ILocalInfos } from '../bean/index.js';

export interface IExecuteBeanOptions {
  locale?: keyof ILocalInfos;
  subdomain?: string | null | undefined;
  transaction?: boolean;
  instance?: boolean;
  ctxParent?: PowerPartial<VonaContext>;
}
