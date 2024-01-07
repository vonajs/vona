import '@zhennann/set';
import 'regenerator-runtime';
require('../base/json.js');

const moduleAlias = require('module-alias');
moduleAlias.addAlias('koa-static-cache', '@zhennann/koa-static-cache');

const Master = require('egg-cluster/lib/master.js');
Master.prototype.onReload = require('../utils/reload.js');

export * from './lib/framework/framework.js';
