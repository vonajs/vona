import '@cabloy/set';
import '@cabloy/json5';
import 'regenerator-runtime';
import Reload from '@cabloy/cluster-reload';
import Master from 'egg-cluster/lib/master.js';

Master.prototype.onReload = Reload;

export * from './lib/index.js';
export * from './types/index.js';
