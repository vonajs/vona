import { IOnionOptionsEnable } from 'vona-module-a-onion';

export interface IMetaOptionsCacheMem extends IOnionOptionsEnable {
  max?: number;
  ttl?: number;
}
