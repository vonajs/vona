import '@cabloy/set';
import '@cabloy/json5';
import 'regenerator-runtime';

const moduleAlias = require('module-alias');
moduleAlias.addAlias('koa-static-cache', '@zhennann/koa-static-cache');

const Master = require('egg-cluster/lib/master.js');
Master.prototype.onReload = require('../utils/reload.js');

export * from './lib/framework/framework.js';
