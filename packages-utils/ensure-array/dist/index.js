"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureArray = void 0;
function ensureArray(arr, sep = ',') {
    if (arr === undefined || arr === null || arr === '')
        return [];
    if (Array.isArray(arr))
        return arr;
    if (typeof arr === 'string')
        return arr.split(sep);
    return [arr];
}
exports.ensureArray = ensureArray;
//# sourceMappingURL=index.js.map