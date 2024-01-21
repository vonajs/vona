export const config = _app => {
  const middlewares = {
    // instance: {
    //   bean: 'instance',
    //   global: true,
    //   dependencies: 'appReady',
    // } as IModuleConfigMiddleware,
    // appReady: {
    //   bean: 'appReady',
    //   global: true,
    // } as IModuleConfigMiddleware,
  };
  return {
    middlewares,
    broadcasts: {
      resetCache: {
        bean: 'resetCache',
      },
      reload: {
        bean: 'reload',
      },
    },
  };
};
