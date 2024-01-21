export const config = _app => {
  return {
    middlewares: {
      // instance: {
      //   bean: 'instance',
      //   global: true,
      //   dependencies: 'appReady',
      // },
      // appReady: {
      //   bean: 'appReady',
      //   global: true,
      // },
    },
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
