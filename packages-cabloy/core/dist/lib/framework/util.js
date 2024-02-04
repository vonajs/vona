"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mixin_classes_1 = __importDefault(require("mixin-classes"));
function default_1() {
    return {
        mixinClasses(classMain, classesMore, ...args) {
            return (0, mixin_classes_1.default)(classMain, classesMore, ...args);
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=util.js.map