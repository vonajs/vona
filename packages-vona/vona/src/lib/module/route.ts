export default function (app: VonaApplication, modules: Record<string, IModule>) {
  // patch router
  patchRouter();

  // load routes
  loadRoutes();

  function patchRouter() {
    app.meta.router = app.bean._newBean(AppRouter);
  }

  function loadRoutes() {
    // todo: remove: load routes from config
    for (const key in modules) {
      const module = modules[key];
      // routes
      const routes = module.resource.routes;
      if (routes) {
        for (const route of routes) {
          app.meta.router.register(module.info, route);
        }
      }
    }
    // controllers by decorator
    for (const controller of app.meta.onionController.middlewaresEnabled) {
      app.meta.router.registerController(controller.beanOptions.module, controller.beanOptions.beanClass);
    }
  }
}
