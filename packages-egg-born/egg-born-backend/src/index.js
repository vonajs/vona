import '@zhennann/set';
import 'regenerator-runtime/runtime';
import './lib/base/json.js';
import moduleAlias from 'module-alias';
import Master from 'egg-cluster/lib/master.js';
import onReload from './lib/utils/reload.js';
import Framework from './lib/framework/framework.js';

// process.traceDeprecation = true;
moduleAlias.addAlias('koa-static-cache', '@zhennann/koa-static-cache');

Master.prototype.onReload = onReload;

export default Framework;
