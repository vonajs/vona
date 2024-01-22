export default function (app) {
  // meta
  const meta: any = {};

  // env
  meta.isProd = app.meta.isProd;
  meta.isTest = app.meta.isTest;
  meta.isLocal = app.meta.isLocal;

  // meta
  return meta;
}
