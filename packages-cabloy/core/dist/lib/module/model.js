"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const beanModelBase_js_1 = require("../bean/resource/model/beanModelBase.js");
function default_1(app) {
    // patch model
    patchCreateContext();
    function patchCreateContext() {
        const createContext = app.createContext;
        app.createContext = (...args) => {
            const context = createContext.call(app, ...args);
            // maybe /favicon.ico
            if (context.module) {
                context.model = createModelContainer(context, context.module.info.relativeName);
            }
            return context;
        };
    }
    function createModelContainer(context, relativeName) {
        // base
        const modelContainer = context.bean._newBean(beanModelBase_js_1.BeanModelBase, { table: null });
        // module
        modelContainer.__ebCacheModule = new Map();
        modelContainer.module = function (moduleName) {
            let _modelContainer = modelContainer.__ebCacheModule.get(moduleName);
            if (!_modelContainer) {
                _modelContainer = createModelContainer(context, moduleName);
                modelContainer.__ebCacheModule.set(moduleName, _modelContainer);
            }
            return _modelContainer;
        };
        // proxy
        return new Proxy(modelContainer, {
            get(obj, prop) {
                if (typeof prop === 'symbol')
                    return obj[prop];
                // base
                if (obj[prop])
                    return obj[prop];
                const beanFullName = `${relativeName}.model.${prop}`;
                // model
                return context.bean._getBean(beanFullName);
            },
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=model.js.map