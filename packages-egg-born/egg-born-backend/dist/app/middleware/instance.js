"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = () => {
    return async function (ctx, next) {
        // init instance
        await ctx.bean.instance.initInstance();
        // next
        await next();
    };
};
//# sourceMappingURL=instance.js.map