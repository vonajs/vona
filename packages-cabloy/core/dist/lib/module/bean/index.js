"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadBeans = exports.loadBeanContainer = void 0;
const beanContainer_js_1 = require("../../bean/beanContainer.js");
function loadBeanContainer(app) {
    app.bean = (0, beanContainer_js_1.BeanContainerCreate)(app, null);
}
exports.loadBeanContainer = loadBeanContainer;
function loadBeans(app) {
    // patch context
    patchCreateContext();
    function patchCreateContext() {
        const createContext = app.createContext;
        app.createContext = (...args) => {
            const context = createContext.call(app, ...args);
            // not check context.module
            // bean
            context.bean = (0, beanContainer_js_1.BeanContainerCreate)(app, context);
            return context;
        };
    }
}
exports.loadBeans = loadBeans;
//# sourceMappingURL=index.js.map