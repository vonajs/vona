"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtxMockUtil = void 0;
const beanSimple_js_1 = require("../bean/beanSimple.js");
class CtxMockUtil extends beanSimple_js_1.BeanSimple {
    // login
    async login({ auth, password = '123456' }) {
        return await this.ctx.bean.authSimple.signinDirect({ data: { auth, password } });
    }
    // logout
    async logout() {
        return await this.ctx.bean.auth.logout();
    }
    // catchError
    async catchError(fnMethod, fnError) {
        let success;
        let data;
        try {
            data = await fnMethod();
            success = true;
        }
        catch (err) {
            success = false;
            await fnError(err);
        }
        // success
        if (success) {
            const err = { code: 0 };
            await fnError(err, data);
        }
        return data;
    }
}
exports.CtxMockUtil = CtxMockUtil;
//# sourceMappingURL=mockUtilCtx.js.map