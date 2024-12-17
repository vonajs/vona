export default function (app) {
  return (ctx, next) => {
    return app.bean.onion.socketPacket.compose(ctx)(ctx, next);
  };
}

// function wrapMiddleware(item) {
//   const fn = (context, next) => {
//     // enable match ignore dependencies
//     if (item.options.enable === false) {
//       return next();
//     }
//     // bean
//     const bean = item.bean;
//     // execute
//     const beanFullName = `${bean.module}.middleware.io.${bean.name}`;
//     const beanInstance = context.app.bean._getBean(beanFullName);
//     if (!beanInstance) {
//       throw new Error(`socketio middleware bean not found: ${beanFullName}`);
//     }
//     return beanInstance.execute(item.options, context.packet, next);
//   };
//   fn._name = item.name;
//   return fn;
// }
