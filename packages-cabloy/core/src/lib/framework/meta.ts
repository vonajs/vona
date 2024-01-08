import MetaClassFn from './metaClass.js';
import MetaUtilFn from './util.js';
import MetaEnvFn from '../module/metaEnv.js';

module.exports = function (app) {
  // meta
  const meta: any = {};

  // class
  meta.class = MetaClassFn();

  // util
  meta.util = MetaUtilFn();

  // env
  MetaEnvFn(app, meta);

  // meta
  return meta;
};
