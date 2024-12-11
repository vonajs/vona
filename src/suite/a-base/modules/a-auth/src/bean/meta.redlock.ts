import { Meta } from 'vona';
import { BeanRedlockBase } from 'vona-module-a-redlock';

export interface MetaRedlock {}

@Meta()
export class MetaRedlock extends BeanRedlockBase {}
