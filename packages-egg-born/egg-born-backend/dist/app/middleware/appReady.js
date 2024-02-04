"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = () => {
    return async function (ctx, next) {
        // check appReady
        if (!ctx.innerAccess) {
            await ctx.bean.instance.checkAppReady();
        }
        // next
        await next();
    };
};
//# sourceMappingURL=appReady.js.map