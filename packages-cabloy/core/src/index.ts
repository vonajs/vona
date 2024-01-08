import '@cabloy/set';
import '@cabloy/json5';
import 'regenerator-runtime';
import moduleAlias from 'module-alias';
import Master from 'egg-cluster/lib/master.js';

moduleAlias.addAlias('koa-static-cache', '@zhennann/koa-static-cache');
Master.prototype.onReload = require('../utils/reload.js');

export * from './lib/framework/framework.js';
