"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanScopeLocaleImpl = void 0;
function BeanScopeLocaleImpl(ctx, _moduleScope, text) {
    const getText = function (...args) {
        return ctx.text(text, ...args);
    };
    getText.locale = function (locale, ...args) {
        return ctx.text.locale(locale, text, ...args);
    };
    return getText;
}
exports.BeanScopeLocaleImpl = BeanScopeLocaleImpl;
//# sourceMappingURL=beanScopeLocaleImpl.js.map