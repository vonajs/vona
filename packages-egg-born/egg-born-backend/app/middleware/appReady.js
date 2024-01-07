"use strict";
module.exports = (options, app) => {
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