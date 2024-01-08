import '@cabloy/set';
import '@cabloy/json5';
import 'regenerator-runtime';
import moduleAlias from 'module-alias';
import Master from 'egg-cluster/lib/master.js';
import Reload from '@cabloy/cluster-reload';

moduleAlias.addAlias('koa-static-cache', '@cabloy/koa-static-cache');
Master.prototype.onReload = Reload;

export * from './lib/framework/framework.js';
