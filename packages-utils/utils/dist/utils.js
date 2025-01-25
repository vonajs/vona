"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFunction = exports.evaluate = exports.getPropertyObject = exports.getProperty = exports.setProperty = exports.replaceTemplate = exports.sleep = exports.catchError = exports.deprecated = void 0;
function deprecated(oldUsage, newUsage) {
    const message = '`'
        .concat(oldUsage, '` is deprecated and will be removed in a later version. Use `')
        .concat(newUsage, '` instead');
    return console.warn(message);
}
exports.deprecated = deprecated;
async function catchError(fnMethod) {
    let error;
    let data;
    try {
        data = await fnMethod();
    }
    catch (err) {
        error = err;
    }
    return error ? [undefined, error] : [data, undefined];
}
exports.catchError = catchError;
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function replaceTemplate(content, scope) {
    if (!content)
        return content;
    return content.toString().replace(/(\\)?{{ *([\w\.]+) *}}/g, (block, skip, key) => {
        if (skip) {
            return block.substring(skip.length);
        }
        const value = getProperty(scope, key);
        return value !== undefined ? value : '';
    });
}
exports.replaceTemplate = replaceTemplate;
function setProperty(obj, name, value) {
    const names = name.split('.');
    if (names.length === 1) {
        obj[name] = value;
    }
    else {
        for (let i = 0; i < names.length - 1; i++) {
            const _obj = obj[names[i]];
            if (_obj) {
                obj = _obj;
            }
            else {
                obj = obj[names[i]] = {};
            }
        }
        obj[names[names.length - 1]] = value;
    }
}
exports.setProperty = setProperty;
function getProperty(obj, name, sep) {
    return _getProperty(obj, name, sep, false);
}
exports.getProperty = getProperty;
function getPropertyObject(obj, name, sep) {
    return _getProperty(obj, name, sep, true);
}
exports.getPropertyObject = getPropertyObject;
function _getProperty(obj, name, sep, forceObject) {
    if (!obj)
        return undefined;
    const names = name.split(sep || '.');
    // loop
    for (const name of names) {
        if (obj[name] === undefined || obj[name] === null) {
            if (forceObject) {
                obj[name] = {};
            }
            else {
                obj = obj[name];
                break;
            }
        }
        obj = obj[name];
    }
    return obj;
}
function evaluate(expression, scope) {
    if (!scope)
        return _evaluateSimple(expression);
    const scopeKeys = Object.keys(scope);
    const scopeParams = [];
    for (let i = 0; i < scopeKeys.length; i++) {
        const key = scopeKeys[i];
        scopeParams.push(scope[key]);
    }
    const fn = createFunction(expression, scopeKeys);
    return fn(...scopeParams);
}
exports.evaluate = evaluate;
function createFunction(expression, scopeKeys) {
    let fn;
    try {
        const js = `return (${expression})`;
        fn = scopeKeys && scopeKeys.length > 0 ? new Function(scopeKeys.join(','), js) : new Function(js);
    }
    catch (_err) {
        fn = scopeKeys && scopeKeys.length > 0 ? new Function(scopeKeys.join(','), expression) : new Function(expression);
    }
    return fn;
}
exports.createFunction = createFunction;
function _evaluateSimple(expression) {
    const fn = createFunction(expression);
    return fn();
}
//# sourceMappingURL=utils.js.map