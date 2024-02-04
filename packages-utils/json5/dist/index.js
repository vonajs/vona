"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const json5 = __importStar(require("json5"));
__patchJSON();
function __patchJSON() {
    // 2020-03-13T00:44:15.149Z
    // 2020-03-13T00:44:15Z
    const __dateTest = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
    function __jsonReviver(k, v, reviver) {
        if (v && typeof v === 'string' && __dateTest.test(v)) {
            v = new Date(v);
        }
        if (!reviver)
            return v;
        return reviver(k, v);
    }
    // json
    const _jsonParse = JSON.parse;
    JSON.parse = function (source, reviver) {
        return _jsonParse(source, function (k, v) {
            return __jsonReviver(k, v, reviver);
        });
    };
    // json5
    const _json5Parse = json5.parse;
    // @ts-ignore
    const parse = function (source, reviver) {
        return _json5Parse(source, function (k, v) {
            return __jsonReviver(k, v, reviver);
        });
    };
    global.JSON5 = {
        parse,
        stringify: json5.stringify,
    };
}
//# sourceMappingURL=index.js.map