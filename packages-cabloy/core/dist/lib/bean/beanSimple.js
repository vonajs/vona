"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanSimple = void 0;
class BeanSimple {
    get bean() {
        return this.ctx ? this.ctx.bean : this.app.bean;
    }
}
exports.BeanSimple = BeanSimple;
//# sourceMappingURL=beanSimple.js.map