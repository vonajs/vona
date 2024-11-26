import { EggAppInfo } from 'egg';
import { VonaMetaMode } from 'vona-shared';

export interface VonaAppInfo extends EggAppInfo {}

export type VonaConfigEnv = VonaMetaMode;
