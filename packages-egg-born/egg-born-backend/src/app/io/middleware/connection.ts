export default function (app) {
  return (ctx, next) => {
    return app.bean.onion.socketConnection.composeAsync(ctx)(ctx, next);
  };
}

// function wrapMiddleware(item) {
//   const fn = (ctx, next) => {
//     // enable match ignore dependencies
//     if (item.options.enable === false) {
//       return next();
//     }
//     // bean
//     const bean = item.bean;
//     // execute
//     const beanFullName = `${bean.module}.middleware.io.${bean.name}`;
//     const beanInstance = ctx.app.bean._getBean(beanFullName);
//     if (!beanInstance) {
//       throw new Error(`socketio middleware bean not found: ${beanFullName}`);
//     }
//     return beanInstance.execute(item.options, next);
//   };
//   fn._name = item.name;
//   return fn;
// }
