import MetaClassFn from './metaClass.js';
import MetaUtilFn from './util.js';

export default function (app) {
  // meta
  const meta: any = {};

  // class
  meta.class = MetaClassFn();

  // util
  meta.util = MetaUtilFn();

  // env
  meta.isProd = app.meta.isProd;
  meta.isTest = app.meta.isTest;
  meta.isLocal = app.meta.isLocal;

  // meta
  return meta;
}
