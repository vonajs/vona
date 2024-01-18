import '@cabloy/set';
import '@cabloy/json5';
import 'regenerator-runtime';
import moduleAlias from 'module-alias';
import Reload from '@cabloy/cluster-reload';
import Master from 'egg-cluster/lib/master.js';

moduleAlias.addAlias('koa-static-cache', '@cabloy/koa-static-cache');
Master.prototype.onReload = Reload;

export * from './lib/core/index.js';
export * from './lib/decorator/index.js';
export * from './types/index.js';
export * from './lib/module/index.js';

export * from './lib/framework/framework.js';
