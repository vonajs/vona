var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _node, _node2, _node3, _a, _value, _value2, _seconds, _nanos, _name, _parent, _entries, _LayeredMap_instances, throwLocked_fn, entryIterator_fn, _matchesCache, _TypeDeclaration_instances, getOptionalField_fn, getMessageField_fn, getMapField_fn, getListElementAtIndex_fn, getListField_fn, matches_fn, _FunctionCandidates_instances, matchesFunction_fn, matchWithPlaceholders_fn, _overloadResolutionCache, _overloadCheckCache, _typeDeclarations, _operatorDeclarations, _functionDeclarations, _functionsCache, _listTypes, _mapTypes, _optionalTypes, _Registry_instances, invalidateOverloadsCache_fn, registerSchemaAsType_fn, getCandidates_fn, parseTypeString_fn, createDeclaration_fn, findBinaryOverloads_fn, findBinaryOverloadUncached_fn, checkBinaryOverloadUncached_fn, cacheOverloadResult_fn, matchesOverload_fn, bindPlaceholder_fn, collectPlaceholderBindings_fn, toCelFieldType_fn, toCelFieldDeclaration_fn, normalizeFields_fn, createDefaultConvert_fn, parseSignature_fn, functionSignatureOverlaps_fn, checkOverlappingSignatures_fn, normalizeParam_fn, hasOverload_fn, _variables, _contextObj, _contextMap, _convertCache, _parent2, _meta, _ASTNode_instances, evaluateAlternate_fn, evaluateMacro_fn, _Parser_instances, limitExceeded_fn, node_fn, advanceToken_fn, expandMacro_fn, consumeLiteral_fn, parseIdentifierPrimary_fn, parseParenthesizedExpression_fn, _registry, _evaluator, _typeChecker, _evalTypeChecker, _parser, _Environment_instances, checkAST_fn, formatTypeForCheck_fn, evaluateAST_fn, _Evaluator_instances, inferListType_fn, firstMapElement_fn, inferMapType_fn, inferType_fn;
import { c as computed$1, i as isReactive, r as reactive, s as shallowReactive, w as watchEffect$1, a as watchPostEffect, b as watchSyncEffect, d as watch$1, t as toRef, g as getCurrentInstance, E as EMPTY_OBJ, e as camelize, f as customRef, h as hyphenate, j as hasChanged, m as markRaw, p as provide, k as inject, l as ref$1, n as defineAsyncComponent, o as defineComponent, q as onMounted, u as setCurrentInstance, v as pauseTracking, x as resetTracking, y as nextTick, z as onBeforeUnmount, A as onUnmounted, B as queuePostFlushCb, C as useSlots } from "./vue-CRNsYCTs.js";
import { g as getDefaultExportFromCjs, c as commonjsGlobal, a as getAugmentedNamespace } from "./commonjsHelper-CCIqAdii.js";
import { s as setLocaleAdapter, a as setLocaleErrors, t as translateError, b as setParseAdapter } from "./zod-DcU_E_GK.js";
const wrapper = (callback) => callback;
const defineBoot = wrapper;
var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
var unicode = {
  Space_Separator,
  ID_Start,
  ID_Continue
};
var util = {
  isSpaceSeparator(c2) {
    return typeof c2 === "string" && unicode.Space_Separator.test(c2);
  },
  isIdStartChar(c2) {
    return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
  },
  isIdContinueChar(c2) {
    return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "‌" || c2 === "‍" || unicode.ID_Continue.test(c2));
  },
  isDigit(c2) {
    return typeof c2 === "string" && /[0-9]/.test(c2);
  },
  isHexDigit(c2) {
    return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
  }
};
let source;
let parseState;
let stack;
let pos;
let line;
let column;
let token$1;
let key;
let root;
var parse$1 = function parse(text, reviver) {
  source = String(text);
  parseState = "start";
  stack = [];
  pos = 0;
  line = 1;
  column = 0;
  token$1 = void 0;
  key = void 0;
  root = void 0;
  do {
    token$1 = lex();
    parseStates[parseState]();
  } while (token$1.type !== "eof");
  if (typeof reviver === "function") {
    return internalize({ "": root }, "", reviver);
  }
  return root;
};
function internalize(holder, name, reviver) {
  const value = holder[name];
  if (value != null && typeof value === "object") {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const key2 = String(i);
        const replacement = internalize(value, key2, reviver);
        if (replacement === void 0) {
          delete value[key2];
        } else {
          Object.defineProperty(value, key2, {
            value: replacement,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
    } else {
      for (const key2 in value) {
        const replacement = internalize(value, key2, reviver);
        if (replacement === void 0) {
          delete value[key2];
        } else {
          Object.defineProperty(value, key2, {
            value: replacement,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
    }
  }
  return reviver.call(holder, name, value);
}
let lexState;
let buffer;
let doubleQuote;
let sign$1;
let c;
function lex() {
  lexState = "default";
  buffer = "";
  doubleQuote = false;
  sign$1 = 1;
  for (; ; ) {
    c = peek();
    const token2 = lexStates[lexState]();
    if (token2) {
      return token2;
    }
  }
}
function peek() {
  if (source[pos]) {
    return String.fromCodePoint(source.codePointAt(pos));
  }
}
function read$1() {
  const c2 = peek();
  if (c2 === "\n") {
    line++;
    column = 0;
  } else if (c2) {
    column += c2.length;
  } else {
    column++;
  }
  if (c2) {
    pos += c2.length;
  }
  return c2;
}
const lexStates = {
  default() {
    switch (c) {
      case "	":
      case "\v":
      case "\f":
      case " ":
      case " ":
      case "\uFEFF":
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        read$1();
        return;
      case "/":
        read$1();
        lexState = "comment";
        return;
      case void 0:
        read$1();
        return newToken("eof");
    }
    if (util.isSpaceSeparator(c)) {
      read$1();
      return;
    }
    return lexStates[parseState]();
  },
  comment() {
    switch (c) {
      case "*":
        read$1();
        lexState = "multiLineComment";
        return;
      case "/":
        read$1();
        lexState = "singleLineComment";
        return;
    }
    throw invalidChar(read$1());
  },
  multiLineComment() {
    switch (c) {
      case "*":
        read$1();
        lexState = "multiLineCommentAsterisk";
        return;
      case void 0:
        throw invalidChar(read$1());
    }
    read$1();
  },
  multiLineCommentAsterisk() {
    switch (c) {
      case "*":
        read$1();
        return;
      case "/":
        read$1();
        lexState = "default";
        return;
      case void 0:
        throw invalidChar(read$1());
    }
    read$1();
    lexState = "multiLineComment";
  },
  singleLineComment() {
    switch (c) {
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        read$1();
        lexState = "default";
        return;
      case void 0:
        read$1();
        return newToken("eof");
    }
    read$1();
  },
  value() {
    switch (c) {
      case "{":
      case "[":
        return newToken("punctuator", read$1());
      case "n":
        read$1();
        literal$1("ull");
        return newToken("null", null);
      case "t":
        read$1();
        literal$1("rue");
        return newToken("boolean", true);
      case "f":
        read$1();
        literal$1("alse");
        return newToken("boolean", false);
      case "-":
      case "+":
        if (read$1() === "-") {
          sign$1 = -1;
        }
        lexState = "sign";
        return;
      case ".":
        buffer = read$1();
        lexState = "decimalPointLeading";
        return;
      case "0":
        buffer = read$1();
        lexState = "zero";
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        buffer = read$1();
        lexState = "decimalInteger";
        return;
      case "I":
        read$1();
        literal$1("nfinity");
        return newToken("numeric", Infinity);
      case "N":
        read$1();
        literal$1("aN");
        return newToken("numeric", NaN);
      case '"':
      case "'":
        doubleQuote = read$1() === '"';
        buffer = "";
        lexState = "string";
        return;
    }
    throw invalidChar(read$1());
  },
  identifierNameStartEscape() {
    if (c !== "u") {
      throw invalidChar(read$1());
    }
    read$1();
    const u = unicodeEscape();
    switch (u) {
      case "$":
      case "_":
        break;
      default:
        if (!util.isIdStartChar(u)) {
          throw invalidIdentifier();
        }
        break;
    }
    buffer += u;
    lexState = "identifierName";
  },
  identifierName() {
    switch (c) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        buffer += read$1();
        return;
      case "\\":
        read$1();
        lexState = "identifierNameEscape";
        return;
    }
    if (util.isIdContinueChar(c)) {
      buffer += read$1();
      return;
    }
    return newToken("identifier", buffer);
  },
  identifierNameEscape() {
    if (c !== "u") {
      throw invalidChar(read$1());
    }
    read$1();
    const u = unicodeEscape();
    switch (u) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        break;
      default:
        if (!util.isIdContinueChar(u)) {
          throw invalidIdentifier();
        }
        break;
    }
    buffer += u;
    lexState = "identifierName";
  },
  sign() {
    switch (c) {
      case ".":
        buffer = read$1();
        lexState = "decimalPointLeading";
        return;
      case "0":
        buffer = read$1();
        lexState = "zero";
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        buffer = read$1();
        lexState = "decimalInteger";
        return;
      case "I":
        read$1();
        literal$1("nfinity");
        return newToken("numeric", sign$1 * Infinity);
      case "N":
        read$1();
        literal$1("aN");
        return newToken("numeric", NaN);
    }
    throw invalidChar(read$1());
  },
  zero() {
    switch (c) {
      case ".":
        buffer += read$1();
        lexState = "decimalPoint";
        return;
      case "e":
      case "E":
        buffer += read$1();
        lexState = "decimalExponent";
        return;
      case "x":
      case "X":
        buffer += read$1();
        lexState = "hexadecimal";
        return;
    }
    return newToken("numeric", sign$1 * 0);
  },
  decimalInteger() {
    switch (c) {
      case ".":
        buffer += read$1();
        lexState = "decimalPoint";
        return;
      case "e":
      case "E":
        buffer += read$1();
        lexState = "decimalExponent";
        return;
    }
    if (util.isDigit(c)) {
      buffer += read$1();
      return;
    }
    return newToken("numeric", sign$1 * Number(buffer));
  },
  decimalPointLeading() {
    if (util.isDigit(c)) {
      buffer += read$1();
      lexState = "decimalFraction";
      return;
    }
    throw invalidChar(read$1());
  },
  decimalPoint() {
    switch (c) {
      case "e":
      case "E":
        buffer += read$1();
        lexState = "decimalExponent";
        return;
    }
    if (util.isDigit(c)) {
      buffer += read$1();
      lexState = "decimalFraction";
      return;
    }
    return newToken("numeric", sign$1 * Number(buffer));
  },
  decimalFraction() {
    switch (c) {
      case "e":
      case "E":
        buffer += read$1();
        lexState = "decimalExponent";
        return;
    }
    if (util.isDigit(c)) {
      buffer += read$1();
      return;
    }
    return newToken("numeric", sign$1 * Number(buffer));
  },
  decimalExponent() {
    switch (c) {
      case "+":
      case "-":
        buffer += read$1();
        lexState = "decimalExponentSign";
        return;
    }
    if (util.isDigit(c)) {
      buffer += read$1();
      lexState = "decimalExponentInteger";
      return;
    }
    throw invalidChar(read$1());
  },
  decimalExponentSign() {
    if (util.isDigit(c)) {
      buffer += read$1();
      lexState = "decimalExponentInteger";
      return;
    }
    throw invalidChar(read$1());
  },
  decimalExponentInteger() {
    if (util.isDigit(c)) {
      buffer += read$1();
      return;
    }
    return newToken("numeric", sign$1 * Number(buffer));
  },
  hexadecimal() {
    if (util.isHexDigit(c)) {
      buffer += read$1();
      lexState = "hexadecimalInteger";
      return;
    }
    throw invalidChar(read$1());
  },
  hexadecimalInteger() {
    if (util.isHexDigit(c)) {
      buffer += read$1();
      return;
    }
    return newToken("numeric", sign$1 * Number(buffer));
  },
  string() {
    switch (c) {
      case "\\":
        read$1();
        buffer += escape();
        return;
      case '"':
        if (doubleQuote) {
          read$1();
          return newToken("string", buffer);
        }
        buffer += read$1();
        return;
      case "'":
        if (!doubleQuote) {
          read$1();
          return newToken("string", buffer);
        }
        buffer += read$1();
        return;
      case "\n":
      case "\r":
        throw invalidChar(read$1());
      case "\u2028":
      case "\u2029":
        separatorChar(c);
        break;
      case void 0:
        throw invalidChar(read$1());
    }
    buffer += read$1();
  },
  start() {
    switch (c) {
      case "{":
      case "[":
        return newToken("punctuator", read$1());
    }
    lexState = "value";
  },
  beforePropertyName() {
    switch (c) {
      case "$":
      case "_":
        buffer = read$1();
        lexState = "identifierName";
        return;
      case "\\":
        read$1();
        lexState = "identifierNameStartEscape";
        return;
      case "}":
        return newToken("punctuator", read$1());
      case '"':
      case "'":
        doubleQuote = read$1() === '"';
        lexState = "string";
        return;
    }
    if (util.isIdStartChar(c)) {
      buffer += read$1();
      lexState = "identifierName";
      return;
    }
    throw invalidChar(read$1());
  },
  afterPropertyName() {
    if (c === ":") {
      return newToken("punctuator", read$1());
    }
    throw invalidChar(read$1());
  },
  beforePropertyValue() {
    lexState = "value";
  },
  afterPropertyValue() {
    switch (c) {
      case ",":
      case "}":
        return newToken("punctuator", read$1());
    }
    throw invalidChar(read$1());
  },
  beforeArrayValue() {
    if (c === "]") {
      return newToken("punctuator", read$1());
    }
    lexState = "value";
  },
  afterArrayValue() {
    switch (c) {
      case ",":
      case "]":
        return newToken("punctuator", read$1());
    }
    throw invalidChar(read$1());
  },
  end() {
    throw invalidChar(read$1());
  }
};
function newToken(type2, value) {
  return {
    type: type2,
    value,
    line,
    column
  };
}
function literal$1(s) {
  for (const c2 of s) {
    const p = peek();
    if (p !== c2) {
      throw invalidChar(read$1());
    }
    read$1();
  }
}
function escape() {
  const c2 = peek();
  switch (c2) {
    case "b":
      read$1();
      return "\b";
    case "f":
      read$1();
      return "\f";
    case "n":
      read$1();
      return "\n";
    case "r":
      read$1();
      return "\r";
    case "t":
      read$1();
      return "	";
    case "v":
      read$1();
      return "\v";
    case "0":
      read$1();
      if (util.isDigit(peek())) {
        throw invalidChar(read$1());
      }
      return "\0";
    case "x":
      read$1();
      return hexEscape();
    case "u":
      read$1();
      return unicodeEscape();
    case "\n":
    case "\u2028":
    case "\u2029":
      read$1();
      return "";
    case "\r":
      read$1();
      if (peek() === "\n") {
        read$1();
      }
      return "";
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      throw invalidChar(read$1());
    case void 0:
      throw invalidChar(read$1());
  }
  return read$1();
}
function hexEscape() {
  let buffer2 = "";
  let c2 = peek();
  if (!util.isHexDigit(c2)) {
    throw invalidChar(read$1());
  }
  buffer2 += read$1();
  c2 = peek();
  if (!util.isHexDigit(c2)) {
    throw invalidChar(read$1());
  }
  buffer2 += read$1();
  return String.fromCodePoint(parseInt(buffer2, 16));
}
function unicodeEscape() {
  let buffer2 = "";
  let count = 4;
  while (count-- > 0) {
    const c2 = peek();
    if (!util.isHexDigit(c2)) {
      throw invalidChar(read$1());
    }
    buffer2 += read$1();
  }
  return String.fromCodePoint(parseInt(buffer2, 16));
}
const parseStates = {
  start() {
    if (token$1.type === "eof") {
      throw invalidEOF();
    }
    push();
  },
  beforePropertyName() {
    switch (token$1.type) {
      case "identifier":
      case "string":
        key = token$1.value;
        parseState = "afterPropertyName";
        return;
      case "punctuator":
        pop();
        return;
      case "eof":
        throw invalidEOF();
    }
  },
  afterPropertyName() {
    if (token$1.type === "eof") {
      throw invalidEOF();
    }
    parseState = "beforePropertyValue";
  },
  beforePropertyValue() {
    if (token$1.type === "eof") {
      throw invalidEOF();
    }
    push();
  },
  beforeArrayValue() {
    if (token$1.type === "eof") {
      throw invalidEOF();
    }
    if (token$1.type === "punctuator" && token$1.value === "]") {
      pop();
      return;
    }
    push();
  },
  afterPropertyValue() {
    if (token$1.type === "eof") {
      throw invalidEOF();
    }
    switch (token$1.value) {
      case ",":
        parseState = "beforePropertyName";
        return;
      case "}":
        pop();
    }
  },
  afterArrayValue() {
    if (token$1.type === "eof") {
      throw invalidEOF();
    }
    switch (token$1.value) {
      case ",":
        parseState = "beforeArrayValue";
        return;
      case "]":
        pop();
    }
  },
  end() {
  }
};
function push() {
  let value;
  switch (token$1.type) {
    case "punctuator":
      switch (token$1.value) {
        case "{":
          value = {};
          break;
        case "[":
          value = [];
          break;
      }
      break;
    case "null":
    case "boolean":
    case "numeric":
    case "string":
      value = token$1.value;
      break;
  }
  if (root === void 0) {
    root = value;
  } else {
    const parent = stack[stack.length - 1];
    if (Array.isArray(parent)) {
      parent.push(value);
    } else {
      Object.defineProperty(parent, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  }
  if (value !== null && typeof value === "object") {
    stack.push(value);
    if (Array.isArray(value)) {
      parseState = "beforeArrayValue";
    } else {
      parseState = "beforePropertyName";
    }
  } else {
    const current = stack[stack.length - 1];
    if (current == null) {
      parseState = "end";
    } else if (Array.isArray(current)) {
      parseState = "afterArrayValue";
    } else {
      parseState = "afterPropertyValue";
    }
  }
}
function pop() {
  stack.pop();
  const current = stack[stack.length - 1];
  if (current == null) {
    parseState = "end";
  } else if (Array.isArray(current)) {
    parseState = "afterArrayValue";
  } else {
    parseState = "afterPropertyValue";
  }
}
function invalidChar(c2) {
  if (c2 === void 0) {
    return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
  }
  return syntaxError(`JSON5: invalid character '${formatChar(c2)}' at ${line}:${column}`);
}
function invalidEOF() {
  return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
}
function invalidIdentifier() {
  column -= 5;
  return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
}
function separatorChar(c2) {
  console.warn(`JSON5: '${formatChar(c2)}' in strings is not valid ECMAScript; consider escaping`);
}
function formatChar(c2) {
  const replacements = {
    "'": "\\'",
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\v": "\\v",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  if (replacements[c2]) {
    return replacements[c2];
  }
  if (c2 < " ") {
    const hexString = c2.charCodeAt(0).toString(16);
    return "\\x" + ("00" + hexString).substring(hexString.length);
  }
  return c2;
}
function syntaxError(message) {
  const err = new SyntaxError(message);
  err.lineNumber = line;
  err.columnNumber = column;
  return err;
}
var stringify = function stringify2(value, replacer, space) {
  const stack2 = [];
  let indent = "";
  let propertyList;
  let replacerFunc;
  let gap = "";
  let quote;
  if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
    space = replacer.space;
    quote = replacer.quote;
    replacer = replacer.replacer;
  }
  if (typeof replacer === "function") {
    replacerFunc = replacer;
  } else if (Array.isArray(replacer)) {
    propertyList = [];
    for (const v of replacer) {
      let item;
      if (typeof v === "string") {
        item = v;
      } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
        item = String(v);
      }
      if (item !== void 0 && propertyList.indexOf(item) < 0) {
        propertyList.push(item);
      }
    }
  }
  if (space instanceof Number) {
    space = Number(space);
  } else if (space instanceof String) {
    space = String(space);
  }
  if (typeof space === "number") {
    if (space > 0) {
      space = Math.min(10, Math.floor(space));
      gap = "          ".substr(0, space);
    }
  } else if (typeof space === "string") {
    gap = space.substr(0, 10);
  }
  return serializeProperty("", { "": value });
  function serializeProperty(key2, holder) {
    let value2 = holder[key2];
    if (value2 != null) {
      if (typeof value2.toJSON5 === "function") {
        value2 = value2.toJSON5(key2);
      } else if (typeof value2.toJSON === "function") {
        value2 = value2.toJSON(key2);
      }
    }
    if (replacerFunc) {
      value2 = replacerFunc.call(holder, key2, value2);
    }
    if (value2 instanceof Number) {
      value2 = Number(value2);
    } else if (value2 instanceof String) {
      value2 = String(value2);
    } else if (value2 instanceof Boolean) {
      value2 = value2.valueOf();
    }
    switch (value2) {
      case null:
        return "null";
      case true:
        return "true";
      case false:
        return "false";
    }
    if (typeof value2 === "string") {
      return quoteString(value2);
    }
    if (typeof value2 === "number") {
      return String(value2);
    }
    if (typeof value2 === "object") {
      return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
    }
    return void 0;
  }
  function quoteString(value2) {
    const quotes = {
      "'": 0.1,
      '"': 0.2
    };
    const replacements = {
      "'": "\\'",
      '"': '\\"',
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\v": "\\v",
      "\0": "\\0",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    let product = "";
    for (let i = 0; i < value2.length; i++) {
      const c2 = value2[i];
      switch (c2) {
        case "'":
        case '"':
          quotes[c2]++;
          product += c2;
          continue;
        case "\0":
          if (util.isDigit(value2[i + 1])) {
            product += "\\x00";
            continue;
          }
      }
      if (replacements[c2]) {
        product += replacements[c2];
        continue;
      }
      if (c2 < " ") {
        let hexString = c2.charCodeAt(0).toString(16);
        product += "\\x" + ("00" + hexString).substring(hexString.length);
        continue;
      }
      product += c2;
    }
    const quoteChar = quote || Object.keys(quotes).reduce((a, b) => quotes[a] < quotes[b] ? a : b);
    product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
    return quoteChar + product + quoteChar;
  }
  function serializeObject(value2) {
    if (stack2.indexOf(value2) >= 0) {
      throw TypeError("Converting circular structure to JSON5");
    }
    stack2.push(value2);
    let stepback = indent;
    indent = indent + gap;
    let keys = propertyList || Object.keys(value2);
    let partial = [];
    for (const key2 of keys) {
      const propertyString = serializeProperty(key2, value2);
      if (propertyString !== void 0) {
        let member = serializeKey(key2) + ":";
        if (gap !== "") {
          member += " ";
        }
        member += propertyString;
        partial.push(member);
      }
    }
    let final;
    if (partial.length === 0) {
      final = "{}";
    } else {
      let properties;
      if (gap === "") {
        properties = partial.join(",");
        final = "{" + properties + "}";
      } else {
        let separator = ",\n" + indent;
        properties = partial.join(separator);
        final = "{\n" + indent + properties + ",\n" + stepback + "}";
      }
    }
    stack2.pop();
    indent = stepback;
    return final;
  }
  function serializeKey(key2) {
    if (key2.length === 0) {
      return quoteString(key2);
    }
    const firstChar = String.fromCodePoint(key2.codePointAt(0));
    if (!util.isIdStartChar(firstChar)) {
      return quoteString(key2);
    }
    for (let i = firstChar.length; i < key2.length; i++) {
      if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i)))) {
        return quoteString(key2);
      }
    }
    return key2;
  }
  function serializeArray(value2) {
    if (stack2.indexOf(value2) >= 0) {
      throw TypeError("Converting circular structure to JSON5");
    }
    stack2.push(value2);
    let stepback = indent;
    indent = indent + gap;
    let partial = [];
    for (let i = 0; i < value2.length; i++) {
      const propertyString = serializeProperty(String(i), value2);
      partial.push(propertyString !== void 0 ? propertyString : "null");
    }
    let final;
    if (partial.length === 0) {
      final = "[]";
    } else {
      if (gap === "") {
        let properties = partial.join(",");
        final = "[" + properties + "]";
      } else {
        let separator = ",\n" + indent;
        let properties = partial.join(separator);
        final = "[\n" + indent + properties + ",\n" + stepback + "]";
      }
    }
    stack2.pop();
    indent = stepback;
    return final;
  }
};
const JSON5 = {
  parse: parse$1,
  stringify
};
var lib = JSON5;
__patchJSON();
function __patchJSON() {
  const __dateTest = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  function __jsonReviver(k, v, reviver) {
    if (v && typeof v === "string" && __dateTest.test(v)) {
      v = new Date(v);
    }
    if (!reviver) return v;
    return reviver(k, v);
  }
  const _jsonParse = JSON.parse;
  JSON.parse = function(source2, reviver) {
    return _jsonParse(source2, (k, v) => {
      return __jsonReviver(k, v, reviver);
    });
  };
  const _json5Parse = lib.parse;
  const parse3 = function(source2, reviver) {
    return _json5Parse(source2, (k, v) => {
      return __jsonReviver(k, v, reviver);
    });
  };
  globalThis.JSON5 = {
    parse: parse3,
    stringify: lib.stringify
  };
}
function cast(source2) {
  return source2;
}
function useComputed(options, debugOptions) {
  return computed$1(options, debugOptions);
}
class ParseError extends Error {
  constructor(message, node, cause) {
    super(message, { cause });
    __privateAdd(this, _node);
    this.name = "ParseError";
    __privateSet(this, _node, node);
    if (!node?.input) return;
    this.message = formatErrorWithHighlight(this.message, node);
  }
  get node() {
    return __privateGet(this, _node);
  }
  withAst(node) {
    if (__privateGet(this, _node) || !node?.input) return this;
    __privateSet(this, _node, node);
    this.message = formatErrorWithHighlight(this.message, node);
    return this;
  }
}
_node = new WeakMap();
class EvaluationError extends Error {
  constructor(message, node, cause) {
    super(message, { cause });
    __privateAdd(this, _node2);
    this.name = "EvaluationError";
    __privateSet(this, _node2, node);
    if (!node?.input) return;
    this.message = formatErrorWithHighlight(this.message, node);
  }
  get node() {
    return __privateGet(this, _node2);
  }
  withAst(node) {
    if (__privateGet(this, _node2) || !node?.input) return this;
    __privateSet(this, _node2, node);
    this.message = formatErrorWithHighlight(this.message, node);
    return this;
  }
}
_node2 = new WeakMap();
let TypeError$1 = (_a = class extends Error {
  constructor(message, node, cause) {
    super(message, { cause });
    __privateAdd(this, _node3);
    this.name = "TypeError";
    __privateSet(this, _node3, node);
    if (!node?.input) return;
    this.message = formatErrorWithHighlight(this.message, node);
  }
  get node() {
    return __privateGet(this, _node3);
  }
  withAst(node) {
    if (__privateGet(this, _node3) || !node?.input) return this;
    __privateSet(this, _node3, node);
    this.message = formatErrorWithHighlight(this.message, node);
    return this;
  }
}, _node3 = new WeakMap(), _a);
function formatErrorWithHighlight(message, node) {
  if (node?.pos === void 0) return message;
  const pos2 = node.pos;
  const input = node.input;
  let lineNum = 1;
  let currentPos = 0;
  let columnNum = 0;
  while (currentPos < pos2) {
    if (input[currentPos] === "\n") {
      lineNum++;
      columnNum = 0;
    } else {
      columnNum++;
    }
    currentPos++;
  }
  let contextStart = pos2;
  let contextEnd = pos2;
  while (contextStart > 0 && input[contextStart - 1] !== "\n") contextStart--;
  while (contextEnd < input.length && input[contextEnd] !== "\n") contextEnd++;
  const line2 = input.slice(contextStart, contextEnd);
  const highlight = `> ${`${lineNum}`.padStart(4, " ")} | ${line2}
${" ".repeat(9 + columnNum)}^`;
  return `${message}

${highlight}`;
}
const _Optional = class _Optional {
  constructor(value) {
    __privateAdd(this, _value);
    __privateSet(this, _value, value);
  }
  static of(value) {
    if (value === void 0) return OPTIONAL_NONE;
    return new _Optional(value);
  }
  static none() {
    return OPTIONAL_NONE;
  }
  hasValue() {
    return __privateGet(this, _value) !== void 0;
  }
  value() {
    if (__privateGet(this, _value) === void 0) throw new EvaluationError("Optional value is not present");
    return __privateGet(this, _value);
  }
  or(optional) {
    if (__privateGet(this, _value) !== void 0) return this;
    if (optional instanceof _Optional) return optional;
    throw new EvaluationError("Optional.or must be called with an Optional argument");
  }
  orValue(defaultValue) {
    return __privateGet(this, _value) === void 0 ? defaultValue : __privateGet(this, _value);
  }
  get [Symbol.toStringTag]() {
    return "optional";
  }
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return __privateGet(this, _value) === void 0 ? `Optional { none }` : `Optional { value: ${JSON.stringify(__privateGet(this, _value))} }`;
  }
};
_value = new WeakMap();
let Optional = _Optional;
const OPTIONAL_NONE = Object.freeze(new Optional());
class OptionalNamespace {
}
const optionalNamespace = new OptionalNamespace();
function toggleOptionalTypes(registry2, enable) {
  const optionalConstant = enable ? optionalNamespace : void 0;
  registry2.variables.set("optional", void 0);
  registry2.registerConstant("optional", "OptionalNamespace", optionalConstant);
}
function register(registry2) {
  const functionOverload = (sig, handler) => registry2.registerFunctionOverload(sig, handler);
  const optionalConstant = registry2.enableOptionalTypes ? optionalNamespace : void 0;
  registry2.registerType("OptionalNamespace", OptionalNamespace);
  registry2.registerConstant("optional", "OptionalNamespace", optionalConstant);
  functionOverload("optional.hasValue(): bool", (v) => v.hasValue());
  functionOverload("optional<A>.value(): A", (v) => v.value());
  registry2.registerFunctionOverload("OptionalNamespace.none(): optional<T>", () => Optional.none());
  functionOverload("OptionalNamespace.of(A): optional<A>", (_, value) => Optional.of(value));
  function ensureOptional(value, ast, description) {
    if (value instanceof Optional) return value;
    throw new EvaluationError(`${description} must be optional`, ast);
  }
  function evaluateOptional(ev, macro, ctx) {
    const v = ev.eval(macro.receiver, ctx);
    if (v instanceof Promise) return v.then((_v) => handleOptionalResolved(_v, ev, macro, ctx));
    return handleOptionalResolved(v, ev, macro, ctx);
  }
  function handleOptionalResolved(value, ev, macro, ctx) {
    const optional = ensureOptional(value, macro.receiver, `${macro.functionDesc} receiver`);
    if (optional.hasValue()) return macro.onHasValue(optional);
    return macro.onEmpty(ev, macro, ctx);
  }
  function ensureOptionalType(checker, node, ctx, description) {
    const type2 = checker.check(node, ctx);
    if (type2.kind === "optional") return type2;
    if (type2.kind === "dyn") return checker.getType("optional");
    throw new checker.Error(`${description} must be optional, got '${type2}'`, node);
  }
  function createOptionalMacro({ functionDesc, evaluate: evaluate2, typeCheck, onHasValue, onEmpty }) {
    return ({ args, receiver }) => ({
      functionDesc,
      receiver,
      arg: args[0],
      evaluate: evaluate2,
      typeCheck,
      onHasValue,
      onEmpty
    });
  }
  const invalidOrValueReceiver = "optional.orValue() receiver";
  const invalidOrReceiver = "optional.or(optional) receiver";
  const invalidOrArg = "optional.or(optional) argument";
  registry2.registerFunctionOverload(
    "optional.or(ast): optional<dyn>",
    createOptionalMacro({
      functionDesc: "optional.or(optional)",
      evaluate: evaluateOptional,
      typeCheck(check, macro, ctx) {
        const l = ensureOptionalType(check, macro.receiver, ctx, invalidOrReceiver);
        const r = ensureOptionalType(check, macro.arg, ctx, invalidOrArg);
        const unified = l.unify(check.registry, r);
        if (unified) return unified;
        throw new check.Error(
          `${macro.functionDesc} argument must be compatible type, got '${l}' and '${r}'`,
          macro.arg
        );
      },
      onHasValue: (optional) => optional,
      onEmpty(ev, macro, ctx) {
        const ast = macro.arg;
        const v = ev.eval(ast, ctx);
        if (v instanceof Promise) return v.then((_v) => ensureOptional(_v, ast, invalidOrArg));
        return ensureOptional(v, ast, invalidOrArg);
      }
    })
  );
  registry2.registerFunctionOverload(
    "optional.orValue(ast): dyn",
    createOptionalMacro({
      functionDesc: "optional.orValue(value)",
      onHasValue: (optionalValue) => optionalValue.value(),
      onEmpty(ev, macro, ctx) {
        return ev.eval(macro.arg, ctx);
      },
      evaluate: evaluateOptional,
      typeCheck(check, macro, ctx) {
        const l = ensureOptionalType(check, macro.receiver, ctx, invalidOrValueReceiver).valueType;
        const r = check.check(macro.arg, ctx);
        const unified = l.unify(check.registry, r);
        if (unified) return unified;
        throw new check.Error(
          `${macro.functionDesc} argument must be compatible type, got '${l}' and '${r}'`,
          macro.arg
        );
      }
    })
  );
}
const hasOwn$1 = Object.hasOwn;
const objKeys = Object.keys;
const objFreeze = Object.freeze;
const objEntries = Object.entries;
const isArray$1 = Array.isArray;
const arrayFrom = Array.from;
const RESERVED = /* @__PURE__ */ new Set([
  "as",
  "break",
  "const",
  "continue",
  "else",
  "for",
  "function",
  "if",
  "import",
  "let",
  "loop",
  "package",
  "namespace",
  "return",
  "var",
  "void",
  "while",
  "__proto__",
  "prototype"
]);
class UnsignedInt {
  constructor(value) {
    __privateAdd(this, _value2);
    this.verify(BigInt(value));
  }
  get value() {
    return __privateGet(this, _value2);
  }
  valueOf() {
    return __privateGet(this, _value2);
  }
  verify(v) {
    if (v < 0n || v > 18446744073709551615n) throw new EvaluationError("Unsigned integer overflow");
    __privateSet(this, _value2, v);
  }
  get [Symbol.toStringTag]() {
    return `value = ${__privateGet(this, _value2)}`;
  }
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return `UnsignedInteger { value: ${__privateGet(this, _value2)} }`;
  }
}
_value2 = new WeakMap();
const UNIT_NANOSECONDS = {
  h: 3600000000000n,
  m: 60000000000n,
  s: 1000000000n,
  ms: 1000000n,
  us: 1000n,
  µs: 1000n,
  ns: 1n
};
const _Duration = class _Duration {
  constructor(seconds, nanos = 0) {
    __privateAdd(this, _seconds);
    __privateAdd(this, _nanos);
    __privateSet(this, _seconds, BigInt(seconds));
    __privateSet(this, _nanos, nanos);
  }
  get seconds() {
    return __privateGet(this, _seconds);
  }
  get nanos() {
    return __privateGet(this, _nanos);
  }
  valueOf() {
    return Number(__privateGet(this, _seconds)) * 1e3 + __privateGet(this, _nanos) / 1e6;
  }
  static fromMilliseconds(ms) {
    const totalNanos = BigInt(Math.trunc(ms * 1e6));
    const seconds = totalNanos / 1000000000n;
    const nanos = Number(totalNanos % 1000000000n);
    return new _Duration(seconds, nanos);
  }
  addDuration(other) {
    const nanos = __privateGet(this, _nanos) + other.nanos;
    return new _Duration(
      __privateGet(this, _seconds) + other.seconds + BigInt(Math.floor(nanos / 1e9)),
      nanos % 1e9
    );
  }
  subtractDuration(other) {
    const nanos = __privateGet(this, _nanos) - other.nanos;
    return new _Duration(
      __privateGet(this, _seconds) - other.seconds + BigInt(Math.floor(nanos / 1e9)),
      (nanos + 1e9) % 1e9
    );
  }
  extendTimestamp(ts) {
    return new Date(
      ts.getTime() + Number(__privateGet(this, _seconds)) * 1e3 + Math.floor(__privateGet(this, _nanos) / 1e6)
    );
  }
  subtractTimestamp(ts) {
    return new Date(
      ts.getTime() - Number(__privateGet(this, _seconds)) * 1e3 - Math.floor(__privateGet(this, _nanos) / 1e6)
    );
  }
  toString() {
    const nanos = __privateGet(this, _nanos) ? (__privateGet(this, _nanos) / 1e9).toLocaleString("en-US", { useGrouping: false, maximumFractionDigits: 9 }).slice(1) : "";
    return `${__privateGet(this, _seconds)}${nanos}s`;
  }
  getHours() {
    return __privateGet(this, _seconds) / 3600n;
  }
  getMinutes() {
    return __privateGet(this, _seconds) / 60n;
  }
  getSeconds() {
    return __privateGet(this, _seconds);
  }
  getMilliseconds() {
    return __privateGet(this, _seconds) * 1000n + BigInt(Math.floor(__privateGet(this, _nanos) / 1e6));
  }
  get [Symbol.toStringTag]() {
    return "google.protobuf.Duration";
  }
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return `google.protobuf.Duration { seconds: ${__privateGet(this, _seconds)}, nanos: ${__privateGet(this, _nanos)} }`;
  }
};
_seconds = new WeakMap();
_nanos = new WeakMap();
let Duration = _Duration;
function registerFunctions(registry2) {
  const functionOverload = (sig, handler) => registry2.registerFunctionOverload(sig, handler);
  const identity2 = (v) => v;
  functionOverload("dyn(dyn): dyn", identity2);
  for (const _t in TYPES) {
    const type2 = TYPES[_t];
    if (!(type2 instanceof Type)) continue;
    functionOverload(`type(${type2.name}): type`, () => type2);
  }
  functionOverload("bool(bool): bool", identity2);
  functionOverload("bool(string): bool", (v) => {
    switch (v) {
      case "1":
      case "t":
      case "true":
      case "TRUE":
      case "True":
        return true;
      case "0":
      case "f":
      case "false":
      case "FALSE":
      case "False":
        return false;
      default:
        throw new EvaluationError(`bool() conversion error: invalid string value "${v}"`);
    }
  });
  functionOverload("size(string): int", (v) => BigInt(stringSize(v)));
  functionOverload("size(bytes): int", (v) => BigInt(v.length));
  functionOverload("size(list): int", (v) => BigInt(v.length ?? v.size));
  functionOverload("size(map): int", (v) => BigInt(v instanceof Map ? v.size : objKeys(v).length));
  functionOverload("string.size(): int", (v) => BigInt(stringSize(v)));
  functionOverload("bytes.size(): int", (v) => BigInt(v.length));
  functionOverload("list.size(): int", (v) => BigInt(v.length ?? v.size));
  functionOverload("map.size(): int", (v) => BigInt(v instanceof Map ? v.size : objKeys(v).length));
  functionOverload("bytes(string): bytes", (v) => ByteOpts.fromString(v));
  functionOverload("bytes(bytes): bytes", identity2);
  functionOverload("double(double): double", identity2);
  functionOverload("double(int): double", (v) => Number(v));
  functionOverload("double(uint): double", (v) => Number(v));
  functionOverload("double(string): double", (v) => {
    if (!v || v !== v.trim())
      throw new EvaluationError("double() type error: cannot convert to double");
    const s = v.toLowerCase();
    switch (s) {
      case "inf":
      case "+inf":
      case "infinity":
      case "+infinity":
        return Number.POSITIVE_INFINITY;
      case "-inf":
      case "-infinity":
        return Number.NEGATIVE_INFINITY;
      case "nan":
        return Number.NaN;
      default: {
        const parsed = Number(v);
        if (!Number.isNaN(parsed)) return parsed;
        throw new EvaluationError("double() type error: cannot convert to double");
      }
    }
  });
  functionOverload("int(int): int", identity2);
  functionOverload("int(double): int", (v) => {
    if (Number.isFinite(v)) return BigInt(Math.trunc(v));
    throw new EvaluationError("int() type error: integer overflow");
  });
  functionOverload("int(string): int", (v) => {
    if (v !== v.trim() || v.length > 20 || v.includes("0x")) {
      throw new EvaluationError("int() type error: cannot convert to int");
    }
    try {
      const num = BigInt(v);
      if (num <= 9223372036854775807n && num >= -9223372036854775808n) return num;
    } catch (_e) {
    }
    throw new EvaluationError("int() type error: cannot convert to int");
  });
  functionOverload("uint(uint): uint", identity2);
  functionOverload("uint(int): uint", (v) => {
    if (v >= 0n && v <= 18446744073709551615n) return v;
    throw new EvaluationError("uint() type error: cannot convert to uint");
  });
  functionOverload("uint(double): uint", (v) => {
    if (v >= 0 && Number.isFinite(v)) return BigInt(Math.trunc(v));
    throw new EvaluationError("uint() type error: unsigned integer overflow");
  });
  functionOverload("uint(string): uint", (v) => {
    if (v !== v.trim() || v.length > 20 || v.includes("0x")) {
      throw new EvaluationError("uint() type error: cannot convert to uint");
    }
    try {
      const num = BigInt(v);
      if (num <= 18446744073709551615n && num >= 0n) return num;
    } catch (_e) {
    }
    throw new EvaluationError("uint() type error: cannot convert to uint");
  });
  functionOverload("string(string): string", identity2);
  functionOverload("string(bool): string", (v) => `${v}`);
  functionOverload("string(int): string", (v) => `${v}`);
  functionOverload("string(bytes): string", (v) => ByteOpts.toUtf8(v));
  functionOverload("string(double): string", (v) => {
    if (v === Infinity) return "+Inf";
    if (v === -Infinity) return "-Inf";
    return `${v}`;
  });
  functionOverload("string.startsWith(string): bool", (a, b) => a.startsWith(b));
  functionOverload("string.endsWith(string): bool", (a, b) => a.endsWith(b));
  functionOverload("string.contains(string): bool", (a, b) => a.includes(b));
  functionOverload("string.lowerAscii(): string", (a) => a.toLowerCase());
  functionOverload("string.upperAscii(): string", (a) => a.toUpperCase());
  functionOverload("string.trim(): string", (a) => a.trim());
  functionOverload(
    "string.indexOf(string): int",
    (string, search) => BigInt(string.indexOf(search))
  );
  functionOverload("string.indexOf(string, int): int", (string, search, fromIndex) => {
    if (search === "") return fromIndex;
    fromIndex = Number(fromIndex);
    if (fromIndex < 0 || fromIndex >= string.length) {
      throw new EvaluationError("string.indexOf(search, fromIndex): fromIndex out of range");
    }
    return BigInt(string.indexOf(search, fromIndex));
  });
  functionOverload(
    "string.lastIndexOf(string): int",
    (string, search) => BigInt(string.lastIndexOf(search))
  );
  functionOverload("string.lastIndexOf(string, int): int", (string, search, fromIndex) => {
    if (search === "") return fromIndex;
    fromIndex = Number(fromIndex);
    if (fromIndex < 0 || fromIndex >= string.length) {
      throw new EvaluationError("string.lastIndexOf(search, fromIndex): fromIndex out of range");
    }
    return BigInt(string.lastIndexOf(search, fromIndex));
  });
  functionOverload("string.substring(int): string", (string, start) => {
    start = Number(start);
    if (start < 0 || start > string.length) {
      throw new EvaluationError("string.substring(start, end): start index out of range");
    }
    return string.substring(start);
  });
  functionOverload("string.substring(int, int): string", (string, start, end) => {
    start = Number(start);
    if (start < 0 || start > string.length) {
      throw new EvaluationError("string.substring(start, end): start index out of range");
    }
    end = Number(end);
    if (end < start || end > string.length) {
      throw new EvaluationError("string.substring(start, end): end index out of range");
    }
    return string.substring(start, end);
  });
  functionOverload("string.matches(string): bool", (a, b) => {
    try {
      return new RegExp(b).test(a);
    } catch (_err) {
      throw new EvaluationError(`Invalid regular expression: ${b}`);
    }
  });
  functionOverload("string.split(string): list<string>", (s, sep) => s.split(sep));
  functionOverload("string.split(string, int): list<string>", (s, sep, l) => {
    l = Number(l);
    if (l === 0) return [];
    const parts = s.split(sep);
    if (l < 0 || parts.length <= l) return parts;
    const limited = parts.slice(0, l - 1);
    limited.push(parts.slice(l - 1).join(sep));
    return limited;
  });
  functionOverload("list<string>.join(): string", (v) => {
    for (let i = 0; i < v.length; i++) {
      if (typeof v[i] !== "string") {
        throw new EvaluationError("string.join(): list must contain only strings");
      }
    }
    return v.join("");
  });
  functionOverload("list<string>.join(string): string", (v, sep) => {
    for (let i = 0; i < v.length; i++) {
      if (typeof v[i] !== "string") {
        throw new EvaluationError("string.join(separator): list must contain only strings");
      }
    }
    return v.join(sep);
  });
  const textEncoder = new TextEncoder("utf8");
  const textDecoder = new TextDecoder("utf8");
  const ByteOpts = typeof Buffer !== "undefined" ? {
    byteLength: (v) => Buffer.byteLength(v),
    fromString: (str) => Buffer.from(str, "utf8"),
    toHex: (b) => Buffer.prototype.hexSlice.call(b, 0, b.length),
    toBase64: (b) => Buffer.prototype.base64Slice.call(b, 0, b.length),
    toUtf8: (b) => Buffer.prototype.utf8Slice.call(b, 0, b.length),
    jsonParse: (b) => JSON.parse(b)
  } : {
    textEncoder: new TextEncoder("utf8"),
    byteLength: (v) => textEncoder.encode(v).length,
    fromString: (str) => textEncoder.encode(str),
    toHex: Uint8Array.prototype.toHex ? (b) => b.toHex() : (b) => arrayFrom(b, (i) => i.toString(16).padStart(2, "0")).join(""),
    toBase64: Uint8Array.prototype.toBase64 ? (b) => b.toBase64() : (b) => btoa(arrayFrom(b, (i) => String.fromCodePoint(i)).join("")),
    toUtf8: (b) => textDecoder.decode(b),
    jsonParse: (b) => JSON.parse(textEncoder.decode(b))
  };
  functionOverload("bytes.json(): map", ByteOpts.jsonParse);
  functionOverload("bytes.hex(): string", ByteOpts.toHex);
  functionOverload("bytes.string(): string", ByteOpts.toUtf8);
  functionOverload("bytes.base64(): string", ByteOpts.toBase64);
  functionOverload("bytes.at(int): int", (b, index) => {
    if (index < 0 || index >= b.length) throw new EvaluationError("Bytes index out of range");
    return BigInt(b[index]);
  });
  const TS = "google.protobuf.Timestamp";
  const GPD = "google.protobuf.Duration";
  const TimestampType = registry2.registerType(TS, Date).typeType;
  const DurationType = registry2.registerType(GPD, Duration).typeType;
  registry2.registerConstant("google", "map<string, map<string, type>>", {
    protobuf: { Duration: DurationType, Timestamp: TimestampType }
  });
  function tzDate(d, timeZone) {
    return new Date(d.toLocaleString("en-US", { timeZone }));
  }
  function getDayOfYear(d, tz) {
    const workingDate = tz ? tzDate(d, tz) : new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    const start = new Date(workingDate.getFullYear(), 0, 0);
    return BigInt(Math.floor((workingDate - start) / 864e5) - 1);
  }
  functionOverload(`timestamp(string): ${TS}`, (v) => {
    if (v.length < 20 || v.length > 30) {
      throw new EvaluationError("timestamp() requires a string in ISO 8601 format");
    }
    const d = new Date(v);
    if (d <= 253402300799999 && d >= -621355968e5) return d;
    throw new EvaluationError("timestamp() requires a string in ISO 8601 format");
  });
  functionOverload(`timestamp(int): ${TS}`, (i) => {
    i = Number(i) * 1e3;
    if (i <= 253402300799999 && i >= -621355968e5) return new Date(i);
    throw new EvaluationError("timestamp() requires a valid integer unix timestamp");
  });
  functionOverload(`${TS}.getDate(): int`, (d) => BigInt(d.getUTCDate()));
  functionOverload(`${TS}.getDate(string): int`, (d, tz) => BigInt(tzDate(d, tz).getDate()));
  functionOverload(`${TS}.getDayOfMonth(): int`, (d) => BigInt(d.getUTCDate() - 1));
  functionOverload(
    `${TS}.getDayOfMonth(string): int`,
    (d, tz) => BigInt(tzDate(d, tz).getDate() - 1)
  );
  functionOverload(`${TS}.getDayOfWeek(): int`, (d) => BigInt(d.getUTCDay()));
  functionOverload(`${TS}.getDayOfWeek(string): int`, (d, tz) => BigInt(tzDate(d, tz).getDay()));
  functionOverload(`${TS}.getDayOfYear(): int`, getDayOfYear);
  functionOverload(`${TS}.getDayOfYear(string): int`, getDayOfYear);
  functionOverload(`${TS}.getFullYear(): int`, (d) => BigInt(d.getUTCFullYear()));
  functionOverload(`${TS}.getFullYear(string): int`, (d, tz) => BigInt(tzDate(d, tz).getFullYear()));
  functionOverload(`${TS}.getHours(): int`, (d) => BigInt(d.getUTCHours()));
  functionOverload(`${TS}.getHours(string): int`, (d, tz) => BigInt(tzDate(d, tz).getHours()));
  functionOverload(`${TS}.getMilliseconds(): int`, (d) => BigInt(d.getUTCMilliseconds()));
  functionOverload(`${TS}.getMilliseconds(string): int`, (d) => BigInt(d.getUTCMilliseconds()));
  functionOverload(`${TS}.getMinutes(): int`, (d) => BigInt(d.getUTCMinutes()));
  functionOverload(`${TS}.getMinutes(string): int`, (d, tz) => BigInt(tzDate(d, tz).getMinutes()));
  functionOverload(`${TS}.getMonth(): int`, (d) => BigInt(d.getUTCMonth()));
  functionOverload(`${TS}.getMonth(string): int`, (d, tz) => BigInt(tzDate(d, tz).getMonth()));
  functionOverload(`${TS}.getSeconds(): int`, (d) => BigInt(d.getUTCSeconds()));
  functionOverload(`${TS}.getSeconds(string): int`, (d, tz) => BigInt(tzDate(d, tz).getSeconds()));
  const parseDurationPattern = /(\d*\.?\d*)(ns|us|µs|ms|s|m|h)/;
  function parseDuration(string) {
    if (!string) throw new EvaluationError(`Invalid duration string: ''`);
    const isNegative = string[0] === "-";
    if (string[0] === "-" || string[0] === "+") string = string.slice(1);
    let nanoseconds = BigInt(0);
    while (true) {
      const match = parseDurationPattern.exec(string);
      if (!match) throw new EvaluationError(`Invalid duration string: ${string}`);
      if (match.index !== 0) throw new EvaluationError(`Invalid duration string: ${string}`);
      string = string.slice(match[0].length);
      const unitNanos = UNIT_NANOSECONDS[match[2]];
      const [intPart = "0", fracPart = ""] = match[1].split(".");
      const intVal = BigInt(intPart) * unitNanos;
      const fracNanos = fracPart ? BigInt(fracPart.slice(0, 13).padEnd(13, "0")) * unitNanos / 10000000000000n : 0n;
      nanoseconds += intVal + fracNanos;
      if (string === "") break;
    }
    const seconds = nanoseconds >= 1000000000n ? nanoseconds / 1000000000n : 0n;
    const nanos = Number(nanoseconds % 1000000000n);
    if (isNegative) return new Duration(-seconds, -nanos);
    return new Duration(seconds, nanos);
  }
  functionOverload(`duration(string): google.protobuf.Duration`, (s) => parseDuration(s));
  functionOverload(`google.protobuf.Duration.getHours(): int`, (d) => d.getHours());
  functionOverload(`google.protobuf.Duration.getMinutes(): int`, (d) => d.getMinutes());
  functionOverload(`google.protobuf.Duration.getSeconds(): int`, (d) => d.getSeconds());
  functionOverload(`google.protobuf.Duration.getMilliseconds(): int`, (d) => d.getMilliseconds());
  register(registry2);
}
function stringSize(str) {
  let count = 0;
  for (const c2 of str) count++;
  return count;
}
class Type {
  constructor(name) {
    __privateAdd(this, _name);
    __privateSet(this, _name, name);
    objFreeze(this);
  }
  get name() {
    return __privateGet(this, _name);
  }
  get [Symbol.toStringTag]() {
    return `Type<${__privateGet(this, _name)}>`;
  }
  toString() {
    return `Type<${__privateGet(this, _name)}>`;
  }
}
_name = new WeakMap();
const TYPES = {
  string: new Type("string"),
  bool: new Type("bool"),
  int: new Type("int"),
  uint: new Type("uint"),
  double: new Type("double"),
  map: new Type("map"),
  list: new Type("list"),
  bytes: new Type("bytes"),
  null_type: new Type("null"),
  type: new Type("type")
};
const optionalType = new Type("optional");
const _LayeredMap = class _LayeredMap {
  constructor(source2) {
    __privateAdd(this, _LayeredMap_instances);
    __privateAdd(this, _parent, null);
    __privateAdd(this, _entries, null);
    if (source2 instanceof _LayeredMap) {
      __privateSet(this, _parent, source2);
      __privateSet(this, _entries, /* @__PURE__ */ new Map());
    } else {
      __privateSet(this, _entries, new Map(source2));
    }
  }
  fork(lock = true) {
    if (lock) this.set = __privateMethod(this, _LayeredMap_instances, throwLocked_fn);
    return new this.constructor(this);
  }
  set(key2, value) {
    __privateGet(this, _entries).set(key2, value);
    return this;
  }
  has(key2) {
    if (__privateGet(this, _entries).has(key2)) return !!__privateGet(this, _entries).get(key2);
    return __privateGet(this, _parent) ? __privateGet(this, _parent).has(key2) : false;
  }
  get(key2) {
    return __privateGet(this, _entries).get(key2) || __privateGet(this, _parent)?.get(key2);
  }
  [Symbol.iterator]() {
    return __privateMethod(this, _LayeredMap_instances, entryIterator_fn).call(this);
  }
  get size() {
    return __privateGet(this, _entries).size + (__privateGet(this, _parent) ? __privateGet(this, _parent).size : 0);
  }
};
_parent = new WeakMap();
_entries = new WeakMap();
_LayeredMap_instances = new WeakSet();
throwLocked_fn = function() {
  throw new Error("Cannot modify frozen registry");
};
entryIterator_fn = function* () {
  if (__privateGet(this, _parent)) yield* __privateGet(this, _parent);
  yield* __privateGet(this, _entries);
};
let LayeredMap = _LayeredMap;
class DynVariableRegistry extends LayeredMap {
  get(name) {
    return super.get(name) ?? (RESERVED.has(name) ? void 0 : new VariableDeclaration(name, dynType$1));
  }
}
function createLayeredMap(source2, MapCtor = LayeredMap, lock = true) {
  if (source2 instanceof MapCtor) return source2.fork(lock);
  return new MapCtor(source2);
}
class TypeDeclaration {
  constructor({ kind, type: type2, name, keyType, valueType }) {
    __privateAdd(this, _TypeDeclaration_instances);
    __privateAdd(this, _matchesCache, /* @__PURE__ */ new WeakMap());
    this.kind = kind;
    this.type = type2;
    this.name = name;
    this.keyType = keyType;
    this.valueType = valueType;
    this.unwrappedType = kind === "dyn" && valueType ? valueType.unwrappedType : this;
    this.wrappedType = kind === "dyn" ? this : _createDynType(this.unwrappedType);
    this.hasDynType = this.kind === "dyn" || this.valueType?.hasDynType || this.keyType?.hasDynType || false;
    this.hasPlaceholderType = this.kind === "param" || this.keyType?.hasPlaceholderType || this.valueType?.hasPlaceholderType || false;
    if (kind === "list") this.fieldLazy = __privateMethod(this, _TypeDeclaration_instances, getListField_fn);
    else if (kind === "map") this.fieldLazy = __privateMethod(this, _TypeDeclaration_instances, getMapField_fn);
    else if (kind === "message") this.fieldLazy = __privateMethod(this, _TypeDeclaration_instances, getMessageField_fn);
    else if (kind === "optional") this.fieldLazy = __privateMethod(this, _TypeDeclaration_instances, getOptionalField_fn);
    objFreeze(this);
  }
  /** @deprecated Please use .hasDynType */
  hasDyn() {
    return this.hasDynType;
  }
  /** @deprecated Please use .hasDynType === false */
  hasNoDynTypes() {
    return this.hasDynType === false;
  }
  isDynOrBool() {
    return this.type === "bool" || this.kind === "dyn";
  }
  isEmpty() {
    return this.valueType && this.valueType.kind === "param";
  }
  /** @deprecated Please use .hasPlaceholderType */
  hasPlaceholder() {
    return this.hasPlaceholderType;
  }
  unify(r, t2) {
    const t1 = this;
    if (t1 === t2 || t1.kind === "dyn" || t2.kind === "param") return t1;
    if (t2.kind === "dyn" || t1.kind === "param") return t2;
    if (t1.kind !== t2.kind) return null;
    if (!(t1.hasPlaceholderType || t2.hasPlaceholderType || t1.hasDynType || t2.hasDynType))
      return null;
    const valueType = t1.valueType.unify(r, t2.valueType);
    if (!valueType) return null;
    switch (t1.kind) {
      case "optional":
        return r.getOptionalType(valueType);
      case "list":
        return r.getListType(valueType);
      case "map":
        const keyType = t1.keyType.unify(r, t2.keyType);
        return keyType ? r.getMapType(keyType, valueType) : null;
    }
  }
  templated(r, bind) {
    if (!this.hasPlaceholderType) return this;
    switch (this.kind) {
      case "dyn":
        return this.valueType.templated(r, bind);
      case "param":
        return bind?.get(this.name) || this;
      case "map":
        return r.getMapType(this.keyType.templated(r, bind), this.valueType.templated(r, bind));
      case "list":
        return r.getListType(this.valueType.templated(r, bind));
      case "optional":
        return r.getOptionalType(this.valueType.templated(r, bind));
      default:
        return this;
    }
  }
  toString() {
    return this.name;
  }
  fieldLazy() {
  }
  field(obj, key2, ast, ev) {
    const v = this.fieldLazy(obj, key2, ast, ev);
    if (v !== void 0) return v;
    throw new EvaluationError(`No such key: ${key2}`, ast);
  }
  matchesBoth(other) {
    return this.matches(other) && other.matches(this);
  }
  matches(o) {
    const s = this.unwrappedType;
    o = o.unwrappedType;
    if (s === o || s.kind === "dyn" || o.kind === "dyn" || o.kind === "param") return true;
    return __privateGet(this, _matchesCache).get(o) ?? __privateGet(this, _matchesCache).set(o, __privateMethod(this, _TypeDeclaration_instances, matches_fn).call(this, s, o)).get(o);
  }
}
_matchesCache = new WeakMap();
_TypeDeclaration_instances = new WeakSet();
getOptionalField_fn = function(obj, key2, ast, ev) {
  obj = obj instanceof Optional ? obj.orValue() : obj;
  if (obj === void 0) return OPTIONAL_NONE;
  const type2 = ev.debugType(obj);
  try {
    return Optional.of(type2.fieldLazy(obj, key2, ast, ev));
  } catch (e) {
    if (e instanceof EvaluationError) return OPTIONAL_NONE;
    throw e;
  }
};
getMessageField_fn = function(obj, key2, ast, ev) {
  const message = obj ? ev.objectTypesByConstructor.get(obj.constructor) : void 0;
  if (!message) return;
  const type2 = message.fields ? message.fields[key2] : dynType$1;
  if (!type2) return void 0;
  const value = obj instanceof Map ? obj.get(key2) : obj[key2];
  if (value === void 0) return;
  const valueType = ev.debugType(value);
  switch (type2) {
    case dynType$1:
    case valueType:
      return value;
    default:
      if (type2.matches(valueType)) return value;
  }
  throw new EvaluationError(`Field '${key2}' is not of type '${type2}', got '${valueType}'`, ast);
};
getMapField_fn = function(obj, key2, ast, ev) {
  const value = obj instanceof Map ? obj.get(key2) : obj && hasOwn$1(obj, key2) ? obj[key2] : void 0;
  if (value === void 0) return;
  const type2 = ev.debugType(value);
  if (this.valueType.matches(type2)) return value;
  throw new EvaluationError(
    `Field '${key2}' is not of type '${this.valueType}', got '${type2}'`,
    ast
  );
};
getListElementAtIndex_fn = function(list, pos2) {
  switch (list?.constructor) {
    case Array:
      return list[pos2];
    case Set: {
      let i = 0;
      for (const item of list) {
        if (i++ !== pos2) continue;
        return item;
      }
    }
  }
};
getListField_fn = function(obj, key2, ast, ev) {
  if (typeof key2 === "bigint") key2 = Number(key2);
  else if (typeof key2 !== "number") return;
  const value = __privateMethod(this, _TypeDeclaration_instances, getListElementAtIndex_fn).call(this, obj, key2);
  if (value === void 0) {
    if (!obj) return;
    throw new EvaluationError(
      `No such key: index out of bounds, index ${key2} ${key2 < 0 ? "< 0" : `>= size ${obj.length || obj.size}`}`,
      ast
    );
  }
  const type2 = ev.debugType(value);
  if (this.valueType.matches(type2)) return value;
  throw new EvaluationError(
    `List item with index '${key2}' is not of type '${this.valueType}', got '${type2}'`,
    ast
  );
};
matches_fn = function(s, o) {
  switch (s.kind) {
    case "dyn":
    case "param":
      return true;
    case "list":
      return o.kind === "list" && s.valueType.matches(o.valueType);
    case "map":
      return o.kind === "map" && s.keyType.matches(o.keyType) && s.valueType.matches(o.valueType);
    case "optional":
      return o.kind === "optional" && s.valueType.matches(o.valueType);
    default:
      return s.name === o.name;
  }
};
const macroEvaluateErr = `have a .callAst property or .evaluate(checker, macro, ctx) method.`;
const macroTypeCheckErr = `have a .callAst property or .typeCheck(checker, macro, ctx) method.`;
function wrapMacroExpander(name, handler) {
  const p = `Macro '${name}' must`;
  return function macroExpander(opts) {
    const macro = handler(opts);
    if (!macro || typeof macro !== "object") throw new Error(`${p} return an object.`);
    if (macro.callAst) return macro;
    if (!macro.evaluate) throw new Error(`${p} ${macroEvaluateErr}`);
    if (!macro.typeCheck) throw new Error(`${p} ${macroTypeCheckErr}`);
    return macro;
  };
}
class VariableDeclaration {
  constructor(name, type2, description, value) {
    this.name = name;
    this.type = type2;
    this.description = description ?? null;
    this.constant = value !== void 0;
    this.value = value;
    objFreeze(this);
  }
}
class FunctionDeclaration {
  constructor({ name, receiverType, returnType, handler, description, params: params2 }) {
    if (typeof name !== "string") throw new Error("name must be a string");
    if (typeof handler !== "function") throw new Error("handler must be a function");
    this.name = name;
    this.receiverType = receiverType ?? null;
    this.returnType = returnType;
    this.description = description ?? null;
    this.params = params2;
    this.argTypes = params2.map((p) => p.type);
    this.macro = this.argTypes.includes(astType);
    const receiverString = receiverType ? `${receiverType}.` : "";
    this.signature = `${receiverString}${name}(${this.argTypes.join(", ")}): ${returnType}`;
    this.handler = this.macro ? wrapMacroExpander(this.signature, handler) : handler;
    this.hasPlaceholderType = this.returnType.hasPlaceholderType || this.receiverType?.hasPlaceholderType || this.argTypes.some((t) => t.hasPlaceholderType) || false;
    objFreeze(this);
  }
  hasPlaceholder() {
    return this.hasPlaceholderType;
  }
  matchesArgs(argTypes) {
    return argTypes.length === this.argTypes.length && this.argTypes.every((t, i) => t.matches(argTypes[i])) ? this : null;
  }
}
class OperatorDeclaration {
  constructor({ operator, leftType, rightType, handler, returnType }) {
    this.operator = operator;
    this.leftType = leftType;
    this.rightType = rightType || null;
    this.handler = handler;
    this.returnType = returnType;
    if (rightType) this.signature = `${leftType} ${operator} ${rightType}: ${returnType}`;
    else this.signature = `${operator}${leftType}: ${returnType}`;
    this.hasPlaceholderType = this.leftType.hasPlaceholderType || this.rightType?.hasPlaceholderType || false;
    objFreeze(this);
  }
  hasPlaceholder() {
    return this.hasPlaceholderType;
  }
  equals(other) {
    return this.operator === other.operator && this.leftType === other.leftType && this.rightType === other.rightType;
  }
}
function _createListType(valueType) {
  return new TypeDeclaration({
    kind: "list",
    name: `list<${valueType}>`,
    type: "list",
    valueType
  });
}
function _createPrimitiveType(name) {
  return new TypeDeclaration({ kind: "primitive", name, type: name });
}
function _createMessageType(name) {
  return new TypeDeclaration({ kind: "message", name, type: name });
}
function _createDynType(valueType) {
  const name = valueType ? `dyn<${valueType}>` : "dyn";
  return new TypeDeclaration({ kind: "dyn", name, type: name, valueType });
}
function _createOptionalType(valueType) {
  const name = `optional<${valueType}>`;
  return new TypeDeclaration({ kind: "optional", name, type: "optional", valueType });
}
function _createMapType(keyType, valueType) {
  return new TypeDeclaration({
    kind: "map",
    name: `map<${keyType}, ${valueType}>`,
    type: "map",
    keyType,
    valueType
  });
}
function _createPlaceholderType(name) {
  return new TypeDeclaration({ kind: "param", name, type: name });
}
const dynType$1 = _createDynType();
const astType = _createPrimitiveType("ast");
const listType = _createListType(dynType$1);
const mapType = _createMapType(dynType$1, dynType$1);
const celTypes = {
  string: _createPrimitiveType("string"),
  bool: _createPrimitiveType("bool"),
  int: _createPrimitiveType("int"),
  uint: _createPrimitiveType("uint"),
  double: _createPrimitiveType("double"),
  bytes: _createPrimitiveType("bytes"),
  dyn: dynType$1,
  null: _createPrimitiveType("null"),
  type: _createPrimitiveType("type"),
  optional: _createOptionalType(dynType$1),
  list: listType,
  "list<dyn>": listType,
  map: mapType,
  "map<dyn, dyn>": mapType
};
for (const t of [celTypes.string, celTypes.double, celTypes.int]) {
  const list = _createListType(t);
  const map = _createMapType(celTypes.string, t);
  celTypes[list.name] = list;
  celTypes[map.name] = map;
}
Object.freeze(celTypes);
class FunctionCandidates {
  constructor(registry2) {
    __privateAdd(this, _FunctionCandidates_instances);
    __publicField(this, "returnType", null);
    /** @type {Array<FunctionDeclaration>} */
    __publicField(this, "declarations", []);
    this.registry = registry2;
  }
  add(decl) {
    this.returnType = (this.returnType || decl.returnType).unify(this.registry, decl.returnType) || dynType$1;
    if (decl.macro) this.macro = decl;
    this.declarations.push(decl);
  }
  findMatch(argTypes, receiverType = null) {
    for (let i = 0; i < this.declarations.length; i++) {
      const match = __privateMethod(this, _FunctionCandidates_instances, matchesFunction_fn).call(this, this.declarations[i], argTypes, receiverType);
      if (match) return match;
    }
    return null;
  }
}
_FunctionCandidates_instances = new WeakSet();
matchesFunction_fn = function(fn, argTypes, receiverType) {
  if (fn.hasPlaceholderType) return __privateMethod(this, _FunctionCandidates_instances, matchWithPlaceholders_fn).call(this, fn, argTypes, receiverType);
  if (receiverType && fn.receiverType && !receiverType.matches(fn.receiverType)) return;
  return fn.matchesArgs(argTypes);
};
matchWithPlaceholders_fn = function(fn, argTypes, receiverType) {
  const bindings = /* @__PURE__ */ new Map();
  if (receiverType && fn.receiverType) {
    if (!this.registry.matchTypeWithPlaceholders(fn.receiverType, receiverType, bindings)) {
      return null;
    }
  }
  for (let i = 0; i < argTypes.length; i++) {
    if (!this.registry.matchTypeWithPlaceholders(fn.argTypes[i], argTypes[i], bindings)) {
      return null;
    }
  }
  return {
    handler: fn.handler,
    signature: fn.signature,
    returnType: fn.returnType.templated(this.registry, bindings)
  };
};
function splitByComma(str) {
  const parts = [];
  let current = "";
  let depth = 0;
  for (const char of str) {
    if (char === "<") depth++;
    else if (char === ">") depth--;
    else if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  if (current) parts.push(current.trim());
  return parts;
}
const objTypesDecls = [
  [UnsignedInt, "uint", TYPES.uint, celTypes.uint],
  [Type, "type", TYPES.type, celTypes.type],
  [Optional, "optional", optionalType, celTypes.optional],
  [Uint8Array, "bytes", TYPES.bytes, celTypes.bytes],
  ...typeof Buffer !== "undefined" ? [[Buffer, "bytes", TYPES.bytes, celTypes.bytes]] : []
].map(([ctor, name, typeType, type2]) => Object.freeze({ name, typeType, type: type2, ctor }));
const objTypes = objTypesDecls.map((t) => [t.name, t]);
const objTypesCtor = objTypesDecls.map((t) => [t.ctor, t]);
const invalidVar = (postfix) => new Error(`Invalid variable declaration: ${postfix}`);
const invalidType = (postfix) => new Error(`Invalid type declaration: ${postfix}`);
const fallbackDynEqualityMatchers = {
  "==": [{ handler: (a, b) => a === b, returnType: celTypes.bool }],
  "!=": [{ handler: (a, b) => a !== b, returnType: celTypes.bool }]
};
const _Registry = class _Registry {
  constructor(opts = {}) {
    __privateAdd(this, _Registry_instances);
    __privateAdd(this, _overloadResolutionCache, {});
    __privateAdd(this, _overloadCheckCache, {});
    __privateAdd(this, _typeDeclarations);
    __privateAdd(this, _operatorDeclarations);
    __privateAdd(this, _functionDeclarations);
    __privateAdd(this, _functionsCache, /* @__PURE__ */ new Map());
    __privateAdd(this, _listTypes, /* @__PURE__ */ new Map());
    __privateAdd(this, _mapTypes, /* @__PURE__ */ new Map());
    __privateAdd(this, _optionalTypes, /* @__PURE__ */ new Map());
    this.enableOptionalTypes = opts.enableOptionalTypes ?? false;
    this.objectTypes = createLayeredMap(opts.objectTypes || objTypes);
    this.objectTypesByConstructor = createLayeredMap(opts.objectTypesByConstructor || objTypesCtor);
    __privateSet(this, _functionDeclarations, createLayeredMap(opts.functionDeclarations));
    __privateSet(this, _operatorDeclarations, createLayeredMap(opts.operatorDeclarations));
    __privateSet(this, _typeDeclarations, createLayeredMap(
      opts.typeDeclarations || objEntries(celTypes),
      void 0,
      false
    ));
    this.constants = createLayeredMap(opts.constants);
    this.variables = opts.unlistedVariablesAreDyn ? createLayeredMap(opts.variables, DynVariableRegistry) : createLayeredMap(opts.variables);
    if (!this.variables.size) {
      for (const n in TYPES) this.registerConstant(n, "type", TYPES[n]);
    } else {
      toggleOptionalTypes(this, this.enableOptionalTypes);
    }
  }
  registerVariable(name, type2, opts) {
    let description = opts?.description;
    let value;
    if (typeof name === "string" && typeof type2 === "object" && !(type2 instanceof TypeDeclaration)) {
      description = type2.description;
      value = type2.value;
      if (type2.schema) type2 = this.registerType({ name: `$${name}`, schema: type2.schema }).type;
      else type2 = type2.type;
    } else if (typeof name === "object") {
      if (name.schema) type2 = this.registerType({ name: `$${name.name}`, schema: name.schema }).type;
      else type2 = name.type;
      description = name.description;
      value = name.value;
      name = name.name;
    }
    if (typeof name !== "string" || !name) throw invalidVar(`name must be a string`);
    if (RESERVED.has(name)) throw invalidVar(`'${name}' is a reserved name`);
    if (this.variables.has(name)) throw invalidVar(`'${name}' is already registered`);
    if (typeof type2 === "string") type2 = this.getType(type2);
    else if (!(type2 instanceof TypeDeclaration)) throw invalidVar(`type is required`);
    this.variables.set(name, new VariableDeclaration(name, type2, description, value));
    return this;
  }
  registerConstant(name, type2, value) {
    if (typeof name === "object") this.registerVariable(name);
    else this.registerVariable({ name, type: type2, value });
    return this;
  }
  getFunctionCandidates(rec, name, argLen) {
    const cached = __privateGet(this, _functionsCache).get(rec ? -(argLen + 1) : argLen)?.get(name);
    if (cached) return cached;
    for (const [, dec] of __privateGet(this, _functionDeclarations)) {
      __privateMethod(this, _Registry_instances, getCandidates_fn).call(this, !!dec.receiverType, dec.name, dec.argTypes.length).add(dec);
    }
    return __privateMethod(this, _Registry_instances, getCandidates_fn).call(this, rec, name, argLen);
  }
  getType(typename) {
    return __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, typename, true);
  }
  getListType(type2) {
    return __privateGet(this, _listTypes).get(type2) || __privateGet(this, _listTypes).set(type2, __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, `list<${type2}>`, true)).get(type2);
  }
  getMapType(a, b) {
    return __privateGet(this, _mapTypes).get(a)?.get(b) || (__privateGet(this, _mapTypes).get(a) || __privateGet(this, _mapTypes).set(a, /* @__PURE__ */ new Map()).get(a)).set(b, __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, `map<${a}, ${b}>`, true)).get(b);
  }
  getOptionalType(type2) {
    return __privateGet(this, _optionalTypes).get(type2) || __privateGet(this, _optionalTypes).set(type2, __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, `optional<${type2}>`, true)).get(type2);
  }
  assertType(typename, type2, signature) {
    try {
      return __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, typename, true);
    } catch (e) {
      e.message = `Invalid ${type2} '${e.unknownType || typename}' in '${signature}'`;
      throw e;
    }
  }
  getFunctionType(typename) {
    if (typename === "ast") return astType;
    const t = __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, typename, true);
    if (t.kind === "dyn" && t.valueType) throw new Error(`type '${t.name}' is not supported`);
    return t;
  }
  registerType(name, _d) {
    if (typeof name === "object") _d = name, name = _d.fullName || _d.name || _d.ctor?.name;
    if (typeof name === "string" && name[0] === ".") name = name.slice(1);
    if (typeof name !== "string" || name.length < 2 || RESERVED.has(name)) {
      throw invalidType(`name '${name}' is not valid`);
    }
    if (this.objectTypes.has(name)) throw invalidType(`type '${name}' already registered`);
    const type2 = __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, name, false);
    if (type2.kind !== "message") throw invalidType(`type '${name}' is not valid`);
    const decl = {
      name,
      typeType: new Type(name),
      type: type2,
      ctor: typeof _d === "function" ? _d : _d?.ctor,
      convert: typeof _d === "function" ? void 0 : _d?.convert,
      fields: typeof _d?.schema === "object" ? __privateMethod(this, _Registry_instances, normalizeFields_fn).call(this, name, __privateMethod(this, _Registry_instances, registerSchemaAsType_fn).call(this, name, _d.schema)) : __privateMethod(this, _Registry_instances, normalizeFields_fn).call(this, name, typeof _d === "function" ? void 0 : _d?.fields)
    };
    if (typeof decl.ctor !== "function") {
      if (!decl.fields) throw invalidType(`type '${name}' requires a constructor or fields`);
      Object.assign(decl, __privateMethod(this, _Registry_instances, createDefaultConvert_fn).call(this, name, decl.fields));
    }
    this.objectTypes.set(name, Object.freeze(decl));
    this.objectTypesByConstructor.set(decl.ctor, decl);
    this.registerFunctionOverload(`type(${name}): type`, () => decl.typeType);
    return decl;
  }
  findMacro(name, hasReceiver, argLen) {
    return this.getFunctionCandidates(hasReceiver, name, argLen).macro || false;
  }
  findUnaryOverload(op, left) {
    const cached = __privateGet(this, _overloadResolutionCache)[op]?.get(left);
    if (cached !== void 0) return cached;
    let value = false;
    for (const [, decl] of __privateGet(this, _operatorDeclarations)) {
      if (decl.operator !== op || decl.leftType !== left) continue;
      value = decl;
      break;
    }
    return (__privateGet(this, _overloadResolutionCache)[op] ??= /* @__PURE__ */ new Map()).set(left, value).get(left);
  }
  findBinaryOverload(op, left, right) {
    if (left.kind === "dyn" && left.valueType) right = right.wrappedType;
    else if (right.kind === "dyn" && right.valueType) left = left.wrappedType;
    return __privateGet(this, _overloadResolutionCache)[op]?.get(left)?.get(right) ?? __privateMethod(this, _Registry_instances, cacheOverloadResult_fn).call(this, __privateGet(this, _overloadResolutionCache), op, left, right, __privateMethod(this, _Registry_instances, findBinaryOverloadUncached_fn).call(this, op, left, right));
  }
  checkBinaryOverload(op, left, right) {
    return __privateGet(this, _overloadCheckCache)[op]?.get(left)?.get(right) ?? __privateMethod(this, _Registry_instances, cacheOverloadResult_fn).call(this, __privateGet(this, _overloadCheckCache), op, left, right, __privateMethod(this, _Registry_instances, checkBinaryOverloadUncached_fn).call(this, op, left, right));
  }
  matchTypeWithPlaceholders(declared, actual, bindings) {
    if (!declared.hasPlaceholderType) return actual.matches(declared) ? actual : null;
    const treatAsDyn = actual.kind === "dyn";
    if (!__privateMethod(this, _Registry_instances, collectPlaceholderBindings_fn).call(this, declared, actual, bindings, treatAsDyn)) return null;
    if (treatAsDyn) return actual;
    return actual.matches(declared.templated(this, bindings)) ? actual : null;
  }
  clone(opts) {
    return new _Registry({
      objectTypes: this.objectTypes,
      objectTypesByConstructor: this.objectTypesByConstructor,
      typeDeclarations: __privateGet(this, _typeDeclarations),
      operatorDeclarations: __privateGet(this, _operatorDeclarations),
      functionDeclarations: __privateGet(this, _functionDeclarations),
      variables: this.variables,
      constants: this.constants,
      unlistedVariablesAreDyn: opts.unlistedVariablesAreDyn,
      enableOptionalTypes: opts.enableOptionalTypes
    });
  }
  getDefinitions() {
    const variables = [];
    const functions = [];
    for (const [, varDecl] of this.variables) {
      if (!varDecl) continue;
      variables.push({
        name: varDecl.name,
        description: varDecl.description || null,
        type: varDecl.type.name
      });
    }
    for (const [, decl] of __privateGet(this, _functionDeclarations)) {
      functions.push({
        signature: decl.signature,
        name: decl.name,
        description: decl.description,
        receiverType: decl.receiverType ? decl.receiverType.name : null,
        returnType: decl.returnType.name,
        params: decl.params.map((p) => ({
          name: p.name,
          type: p.type.name,
          description: p.description
        }))
      });
    }
    return { variables, functions };
  }
  registerFunctionOverload(s, handler, opts) {
    if (typeof s === "object") opts = s;
    else if (typeof handler === "object") opts = handler;
    else if (!opts) opts = {};
    const sig = typeof s === "string" ? s : opts.signature ?? void 0;
    const parsed = sig !== void 0 ? __privateMethod(this, _Registry_instances, parseSignature_fn).call(this, sig) : void 0;
    const name = parsed?.name || opts.name;
    const receiverType = parsed?.receiverType || opts.receiverType;
    const argTypes = parsed?.argTypes;
    const returnType = parsed?.returnType || opts.returnType;
    const params2 = opts.params;
    let dec;
    try {
      if (!name) throw new Error(`signature or name are required`);
      if (!returnType) throw new Error(`must have a returnType`);
      if (params2) {
        if (argTypes && params2.length !== argTypes.length) {
          throw new Error(`mismatched length in params and args in signature`);
        }
      } else if (!argTypes) throw new Error(`signature or params are required`);
      dec = new FunctionDeclaration({
        name,
        receiverType: receiverType ? this.getType(receiverType) : null,
        returnType: this.getType(returnType),
        handler: typeof handler === "function" ? handler : opts.handler,
        description: opts.description,
        params: (argTypes || params2).map(
          (_, i) => __privateMethod(this, _Registry_instances, normalizeParam_fn).call(this, i, argTypes?.[i], params2?.[i])
        )
      });
    } catch (e) {
      if (typeof sig === "string") e.message = `Invalid function declaration '${sig}': ${e.message}`;
      else if (name) e.message = `Invalid function declaration '${name}': ${e.message}`;
      else e.message = `Invalid function declaration: ${e.message}`;
      throw e;
    }
    __privateMethod(this, _Registry_instances, checkOverlappingSignatures_fn).call(this, dec);
    __privateGet(this, _functionDeclarations).set(dec.signature, dec);
    if (__privateGet(this, _functionsCache).size) __privateGet(this, _functionsCache).clear();
  }
  registerOperatorOverload(string, handler) {
    const unaryParts = string.match(/^([-!])([\w.<>]+)(?::\s*([\w.<>]+))?$/);
    if (unaryParts) {
      const [, op2, operandType, returnType2] = unaryParts;
      return this.unaryOverload(op2, operandType, handler, returnType2);
    }
    const parts = string.match(
      /^([\w.<>]+) ([-+*%/]|==|!=|<|<=|>|>=|in) ([\w.<>]+)(?::\s*([\w.<>]+))?$/
    );
    if (!parts) throw new Error(`Operator overload invalid: ${string}`);
    const [, leftType, op, rightType, returnType] = parts;
    return this.binaryOverload(leftType, op, rightType, handler, returnType);
  }
  unaryOverload(op, typeStr, handler, returnTypeStr) {
    const leftType = this.assertType(typeStr, "type", `${op}${typeStr}`);
    const returnType = this.assertType(
      returnTypeStr || typeStr,
      "return type",
      `${op}${typeStr}: ${returnTypeStr || typeStr}`
    );
    const decl = new OperatorDeclaration({ operator: `${op}_`, leftType, returnType, handler });
    if (__privateMethod(this, _Registry_instances, hasOverload_fn).call(this, decl)) {
      throw new Error(`Operator overload already registered: ${op}${typeStr}`);
    }
    __privateGet(this, _operatorDeclarations).set(decl.signature, decl);
    __privateMethod(this, _Registry_instances, invalidateOverloadsCache_fn).call(this);
  }
  binaryOverload(leftTypeStr, op, rightTypeStr, handler, returnTypeStr) {
    returnTypeStr ??= isRelational(op) ? "bool" : leftTypeStr;
    const sig = `${leftTypeStr} ${op} ${rightTypeStr}: ${returnTypeStr}`;
    let leftType = this.assertType(leftTypeStr, "left type", sig);
    let rightType = this.assertType(rightTypeStr, "right type", sig);
    const returnType = this.assertType(returnTypeStr, "return type", sig);
    if (leftType.kind === "dyn" && leftType.valueType) rightType = rightType.wrappedType;
    else if (rightType.kind === "dyn" && rightType.valueType) leftType = leftType.wrappedType;
    if (isRelational(op) && returnType.type !== "bool") {
      throw new Error(`Comparison operator '${op}' must return 'bool', got '${returnType.type}'`);
    }
    const dec = new OperatorDeclaration({ operator: op, leftType, rightType, returnType, handler });
    if (dec.hasPlaceholderType && !(rightType.hasPlaceholderType && leftType.hasPlaceholderType)) {
      throw new Error(
        `Operator overload with placeholders must use them in both left and right types: ${sig}`
      );
    }
    if (__privateMethod(this, _Registry_instances, hasOverload_fn).call(this, dec)) {
      throw new Error(`Operator overload already registered: ${dec.signature}`);
    }
    if (op === "==") {
      const declarations = [
        new OperatorDeclaration({
          operator: "!=",
          leftType,
          rightType,
          handler(a, b, ast, ev) {
            return !handler(a, b, ast, ev);
          },
          returnType
        })
      ];
      if (leftType !== rightType) {
        declarations.push(
          new OperatorDeclaration({
            operator: "==",
            leftType: rightType,
            rightType: leftType,
            handler(a, b, ast, ev) {
              return handler(b, a, ast, ev);
            },
            returnType
          }),
          new OperatorDeclaration({
            operator: "!=",
            leftType: rightType,
            rightType: leftType,
            handler(a, b, ast, ev) {
              return !handler(b, a, ast, ev);
            },
            returnType
          })
        );
      }
      for (const decl of declarations) {
        if (!__privateMethod(this, _Registry_instances, hasOverload_fn).call(this, decl)) continue;
        throw new Error(`Operator overload already registered: ${decl.signature}`);
      }
      for (const decl of declarations) __privateGet(this, _operatorDeclarations).set(decl.signature, decl);
    }
    __privateGet(this, _operatorDeclarations).set(dec.signature, dec);
    __privateMethod(this, _Registry_instances, invalidateOverloadsCache_fn).call(this);
  }
};
_overloadResolutionCache = new WeakMap();
_overloadCheckCache = new WeakMap();
_typeDeclarations = new WeakMap();
_operatorDeclarations = new WeakMap();
_functionDeclarations = new WeakMap();
_functionsCache = new WeakMap();
_listTypes = new WeakMap();
_mapTypes = new WeakMap();
_optionalTypes = new WeakMap();
_Registry_instances = new WeakSet();
invalidateOverloadsCache_fn = function() {
  __privateSet(this, _overloadResolutionCache, {});
  __privateSet(this, _overloadCheckCache, {});
};
registerSchemaAsType_fn = function(name, schema) {
  const fields = /* @__PURE__ */ Object.create(null);
  for (const key2 of objKeys(schema)) {
    const def = schema[key2];
    if (typeof def === "object" && def) {
      fields[key2] = this.registerType({ name: `${name}.${key2}`, schema: def }).type.name;
    } else if (typeof def === "string") {
      fields[key2] = def;
    } else {
      throw new Error(`Invalid field definition for '${name}.${key2}'`);
    }
  }
  return fields;
};
getCandidates_fn = function(useReceiver, name, argLen) {
  const l = useReceiver ? -(argLen + 1) : argLen;
  const cache = __privateGet(this, _functionsCache).get(l) || __privateGet(this, _functionsCache).set(l, /* @__PURE__ */ new Map()).get(l);
  return cache.get(name) || cache.set(name, new FunctionCandidates(this)).get(name);
};
/** @returns {TypeDeclaration} */
parseTypeString_fn = function(typeStr, requireKnownTypes = true) {
  let match = __privateGet(this, _typeDeclarations).get(typeStr);
  if (match) return match;
  if (typeof typeStr !== "string" || !typeStr.length) {
    throw new Error(`Invalid type: must be a string`);
  }
  match = typeStr.match(/^[A-Z]$/);
  if (match) return __privateMethod(this, _Registry_instances, createDeclaration_fn).call(this, _createPlaceholderType, typeStr, typeStr);
  match = typeStr.match(/^(dyn|list|map|optional)<(.+)>$/);
  if (!match) {
    if (requireKnownTypes) {
      const err = new Error(`Unknown type: ${typeStr}`);
      err.unknownType = typeStr;
      throw err;
    }
    return __privateMethod(this, _Registry_instances, createDeclaration_fn).call(this, _createMessageType, typeStr, typeStr);
  }
  const kind = match[1];
  const inner = match[2].trim();
  switch (kind) {
    case "dyn": {
      const type2 = __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, inner, requireKnownTypes).wrappedType;
      __privateGet(this, _typeDeclarations).set(type2.name, type2);
      return type2;
    }
    case "list": {
      const vType = __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, inner, requireKnownTypes);
      return __privateMethod(this, _Registry_instances, createDeclaration_fn).call(this, _createListType, `list<${vType}>`, vType);
    }
    case "map": {
      const parts = splitByComma(inner);
      if (parts.length !== 2) throw new Error(`Invalid map type: ${typeStr}`);
      const kType = __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, parts[0], requireKnownTypes);
      const vType = __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, parts[1], requireKnownTypes);
      return __privateMethod(this, _Registry_instances, createDeclaration_fn).call(this, _createMapType, `map<${kType}, ${vType}>`, kType, vType);
    }
    case "optional": {
      const vType = __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, inner, requireKnownTypes);
      return __privateMethod(this, _Registry_instances, createDeclaration_fn).call(this, _createOptionalType, `optional<${vType}>`, vType);
    }
  }
};
createDeclaration_fn = function(creator, key2, ...args) {
  return __privateGet(this, _typeDeclarations).get(key2) || __privateGet(this, _typeDeclarations).set(key2, creator(...args)).get(key2);
};
findBinaryOverloads_fn = function(operator, leftType, rightType) {
  const nonexactMatches = [];
  for (const [, decl] of __privateGet(this, _operatorDeclarations)) {
    if (decl.operator !== operator) continue;
    if (decl.leftType === leftType && decl.rightType === rightType) return [decl];
    const secondary = __privateMethod(this, _Registry_instances, matchesOverload_fn).call(this, decl, leftType, rightType);
    if (secondary) nonexactMatches.push(secondary);
  }
  if (nonexactMatches.length === 0 && (operator === "==" || operator === "!=") && leftType.kind === "dyn") {
    return fallbackDynEqualityMatchers[operator];
  }
  return nonexactMatches;
};
findBinaryOverloadUncached_fn = function(operator, left, right) {
  const ops = __privateMethod(this, _Registry_instances, findBinaryOverloads_fn).call(this, operator, left, right);
  if (ops.length === 0) return false;
  if (ops.length === 1) return ops[0];
  throw new Error(`Operator overload '${ops[0].signature}' overlaps with '${ops[1].signature}'.`);
};
checkBinaryOverloadUncached_fn = function(op, left, right) {
  const ops = __privateMethod(this, _Registry_instances, findBinaryOverloads_fn).call(this, op, left, right);
  if (ops.length === 0) return false;
  const firstType = ops[0].returnType;
  if (ops.every((d) => d.returnType === firstType)) return firstType;
  if ((firstType.kind === "list" || firstType.kind === "map") && ops.every((d) => d.returnType.kind === firstType.kind)) {
    return firstType.kind === "list" ? celTypes.list : celTypes.map;
  }
  return dynType$1;
};
cacheOverloadResult_fn = function(cache, op, left, right, result) {
  const opMap = cache[op] ??= /* @__PURE__ */ new Map();
  const leftMap = opMap.get(left) || opMap.set(left, /* @__PURE__ */ new Map()).get(left);
  leftMap.set(right, result);
  return result;
};
matchesOverload_fn = function(decl, actualLeft, actualRight) {
  const bindings = decl.hasPlaceholderType ? /* @__PURE__ */ new Map() : null;
  const leftType = this.matchTypeWithPlaceholders(decl.leftType, actualLeft, bindings);
  if (!leftType) return;
  const rightType = this.matchTypeWithPlaceholders(decl.rightType, actualRight, bindings);
  if (!rightType) return;
  if ((decl.operator === "==" || decl.operator === "!=") && decl.leftType.kind === "dyn" && decl.leftType.valueType && actualLeft.kind !== "dyn" && actualRight.kind !== "dyn")
    return false;
  return decl.hasPlaceholderType ? {
    signature: decl.signature,
    handler: decl.handler,
    leftType,
    rightType,
    returnType: decl.returnType.templated(this, bindings)
  } : decl;
};
bindPlaceholder_fn = function(name, candidateType, bindings) {
  const existing = bindings.get(name);
  if (!existing) return bindings.set(name, candidateType) && true;
  return existing.kind === "dyn" || candidateType.kind === "dyn" ? true : existing.matchesBoth(candidateType);
};
collectPlaceholderBindings_fn = function(declared, actual, bindings, fromDyn = false) {
  if (!declared.hasPlaceholderType) return true;
  if (!actual) return false;
  const treatAsDyn = fromDyn || actual.kind === "dyn";
  actual = actual.unwrappedType;
  switch (declared.kind) {
    case "param": {
      const candidateType = treatAsDyn ? dynType$1 : actual;
      return __privateMethod(this, _Registry_instances, bindPlaceholder_fn).call(this, declared.name, candidateType, bindings);
    }
    case "list": {
      if (actual.name === "dyn") actual = declared;
      if (actual.kind !== "list") return false;
      return __privateMethod(this, _Registry_instances, collectPlaceholderBindings_fn).call(this, declared.valueType, actual.valueType, bindings, treatAsDyn);
    }
    case "map": {
      if (actual.name === "dyn") actual = declared;
      if (actual.kind !== "map") return false;
      return __privateMethod(this, _Registry_instances, collectPlaceholderBindings_fn).call(this, declared.keyType, actual.keyType, bindings, treatAsDyn) && __privateMethod(this, _Registry_instances, collectPlaceholderBindings_fn).call(this, declared.valueType, actual.valueType, bindings, treatAsDyn);
    }
    case "optional": {
      if (actual.name === "dyn") actual = declared;
      if (actual.kind !== "optional") return false;
      return __privateMethod(this, _Registry_instances, collectPlaceholderBindings_fn).call(this, declared.valueType, actual.valueType, bindings, treatAsDyn);
    }
  }
  return true;
};
toCelFieldType_fn = function(field) {
  if (typeof field === "string") return { type: field };
  if (field.id) return protobufjsFieldToCelType(field);
  return field;
};
toCelFieldDeclaration_fn = function(typename, fields, k, requireKnownTypes = false) {
  try {
    const field = __privateMethod(this, _Registry_instances, toCelFieldType_fn).call(this, fields[k]);
    if (typeof field?.type !== "string") throw new Error(`unsupported declaration`);
    return __privateMethod(this, _Registry_instances, parseTypeString_fn).call(this, field.type, requireKnownTypes);
  } catch (e) {
    e.message = `Field '${k}' in type '${typename}' has unsupported declaration: ${JSON.stringify(fields[k])}`;
    throw e;
  }
};
normalizeFields_fn = function(typename, fields) {
  if (!fields) return;
  const all = /* @__PURE__ */ Object.create(null);
  for (const k of objKeys(fields)) all[k] = __privateMethod(this, _Registry_instances, toCelFieldDeclaration_fn).call(this, typename, fields, k);
  return all;
};
createDefaultConvert_fn = function(name, fields) {
  var _raw, _a2;
  const keys = objKeys(fields);
  const conversions = /* @__PURE__ */ Object.create(null);
  for (const k of keys) {
    const type2 = fields[k];
    const decl = type2.kind === "message" && this.objectTypes.get(type2.name);
    if (decl === false) conversions[k] = false;
    else conversions[k] = decl.convert ? decl : false;
  }
  const Ctor = {
    [name]: (_a2 = class extends Map {
      constructor(v) {
        super();
        __privateAdd(this, _raw);
        __privateSet(this, _raw, v);
      }
      [Symbol.iterator]() {
        if (this.size !== keys.length) for (const k of keys) this.get(k);
        return super[Symbol.iterator]();
      }
      get(field) {
        let v = super.get(field);
        if (v !== void 0 || this.has(field)) return v;
        const dec = conversions[field];
        if (dec === void 0) return;
        v = __privateGet(this, _raw) instanceof Map ? __privateGet(this, _raw).get(field) : __privateGet(this, _raw)?.[field];
        if (dec && v && typeof v === "object") {
          switch (v.constructor) {
            case void 0:
            case Object:
            case Map:
              v = dec.convert(v);
          }
        }
        return super.set(field, v), v;
      }
    }, _raw = new WeakMap(), _a2)
  }[name];
  return {
    ctor: Ctor,
    convert(v) {
      if (!v) return;
      if (v.constructor === Ctor) return v;
      return new Ctor(v);
    }
  };
};
parseSignature_fn = function(signature) {
  if (typeof signature !== "string") throw new Error("Invalid signature: must be a string");
  const match = signature.match(/^(?:([a-zA-Z0-9.<>]+)\.)?(\w+)\((.*?)\):\s*(.+)$/);
  if (!match) throw new Error(`Invalid signature: ${signature}`);
  return {
    receiverType: match[1] || null,
    name: match[2],
    argTypes: splitByComma(match[3]),
    returnType: match[4].trim()
  };
};
/**
 * @param {FunctionDeclaration} a
 * @param {FunctionDeclaration} b
 */
functionSignatureOverlaps_fn = function(a, b) {
  if (a.name !== b.name) return false;
  if (a.argTypes.length !== b.argTypes.length) return false;
  if ((a.receiverType || b.receiverType) && (!a.receiverType || !b.receiverType)) return false;
  const isDifferentReceiver = a.receiverType !== b.receiverType && a.receiverType !== dynType$1 && b.receiverType !== dynType$1;
  return !isDifferentReceiver && (b.macro || a.macro || b.argTypes.every((t, i) => {
    const o = a.argTypes[i];
    return t === o || t === dynType$1 || o === dynType$1;
  }));
};
/** @param {FunctionDeclaration} newDec */
checkOverlappingSignatures_fn = function(newDec) {
  for (const [, decl] of __privateGet(this, _functionDeclarations)) {
    if (!__privateMethod(this, _Registry_instances, functionSignatureOverlaps_fn).call(this, decl, newDec)) continue;
    throw new Error(
      `Function signature '${newDec.signature}' overlaps with existing overload '${decl.signature}'.`
    );
  }
};
normalizeParam_fn = function(i, aType, param) {
  if (!param) return { type: this.getFunctionType(aType), name: `arg${i}`, description: null };
  const type2 = param.type || aType;
  if (!type2) throw new Error(`params[${i}].type is required`);
  if (aType && type2 !== aType) throw new Error(`params[${i}].type not equal to signature type`);
  return {
    name: param.name || `arg${i}`,
    type: this.getFunctionType(type2),
    description: param.description ?? null
  };
};
hasOverload_fn = function(decl) {
  for (const [, other] of __privateGet(this, _operatorDeclarations)) if (decl.equals(other)) return true;
  return false;
};
let Registry = _Registry;
function isRelational(op) {
  return op === "<" || op === "<=" || op === ">" || op === ">=" || op === "==" || op === "!=" || op === "in";
}
function createRegistry(opts) {
  return new Registry(opts);
}
class RootContext {
  constructor(registry2, context) {
    __privateAdd(this, _variables);
    __privateAdd(this, _contextObj);
    __privateAdd(this, _contextMap);
    __privateAdd(this, _convertCache);
    __privateSet(this, _variables, registry2.variables);
    if (context === void 0 || context === null) return;
    if (typeof context !== "object") throw new EvaluationError("Context must be an object");
    if (context instanceof Map) __privateSet(this, _contextMap, context);
    else __privateSet(this, _contextObj, context);
  }
  getType(name) {
    return __privateGet(this, _variables).get(name)?.type;
  }
  getValue(key2) {
    return __privateGet(this, _convertCache)?.get(key2) || (__privateGet(this, _contextMap) ? __privateGet(this, _contextMap).get(key2) : __privateGet(this, _contextObj)?.[key2]);
  }
  getVariable(name) {
    return __privateGet(this, _variables).get(name);
  }
  getCheckedValue(ev, ast) {
    const value = this.getValue(ast.args);
    if (value === void 0) throw new ev.Error(`Unknown variable: ${ast.args}`, ast);
    const valueType = ev.debugType(value);
    switch (ast.checkedType) {
      case valueType:
      case dynType$1:
        return value;
      default:
        if (ast.checkedType.matches(valueType)) return value;
        if (ast.checkedType.kind === "message" && valueType.kind === "map") {
          const converted = ev.objectTypes.get(ast.checkedType.name)?.convert?.(value);
          if (converted)
            return (__privateGet(this, _convertCache) ?? __privateSet(this, _convertCache, /* @__PURE__ */ new Map())).set(ast.args, converted), converted;
        }
    }
    throw new ev.Error(
      `Variable '${ast.args}' is not of type '${ast.checkedType}', got '${valueType}'`,
      ast
    );
  }
  forkWithVariable(iterVar, iterType) {
    return new OverlayContext(this, iterVar, iterType);
  }
}
_variables = new WeakMap();
_contextObj = new WeakMap();
_contextMap = new WeakMap();
_convertCache = new WeakMap();
const _OverlayContext = class _OverlayContext {
  constructor(parent, iterVar, iterType) {
    __privateAdd(this, _parent2);
    __publicField(this, "accuType");
    __publicField(this, "accuValue");
    __publicField(this, "iterValue");
    __privateSet(this, _parent2, parent);
    this.iterVar = iterVar;
    this.iterType = iterType;
  }
  forkWithVariable(iterVar, iterType) {
    return new _OverlayContext(this, iterVar, iterType);
  }
  reuse(parent) {
    if (!this.async) return __privateSet(this, _parent2, parent), this;
    const ctx = new _OverlayContext(parent, this.iterVar, this.iterType);
    ctx.accuType = this.accuType;
    return ctx;
  }
  setIterValue(v, ev, ast) {
    const valueType = ev.debugType(v);
    switch (this.iterType) {
      case valueType:
      case dynType$1:
        return this.iterValue = v, this;
      default:
        if (this.iterType.matches(valueType)) return this.iterValue = v, this;
        if (this.iterType.kind === "message" && valueType.kind === "map") {
          const converted = ev.objectTypes.get(this.iterType.name)?.convert?.(v);
          if (converted) return this.iterValue = converted, this;
        }
    }
    throw new ev.Error(
      `Variable '${this.iterVar}' is not of type '${this.iterType}', got '${valueType}'`,
      ast
    );
  }
  setAccuType(type2) {
    return this.accuType = type2, this;
  }
  setAccuValue(v) {
    return this.accuValue = v, this;
  }
  getValue(key2) {
    return this.iterVar === key2 ? this.iterValue : __privateGet(this, _parent2).getValue(key2);
  }
  getCheckedValue(ev, ast) {
    if (this.iterVar === ast.args) return this.iterValue;
    return __privateGet(this, _parent2).getCheckedValue(ev, ast);
  }
  getVariable(name) {
    if (this.iterVar === name) return new VariableDeclaration(name, this.iterType);
    return __privateGet(this, _parent2).getVariable(name);
  }
  setConverted(name, value) {
    return this.iterVar === name ? this.iterValue = value : __privateGet(this, _parent2).setConverted(name, value);
  }
  // getVariable makes this obsolete
  getType(key2) {
    return this.iterVar === key2 ? this.iterType : __privateGet(this, _parent2).getType(key2);
  }
};
_parent2 = new WeakMap();
let OverlayContext = _OverlayContext;
function protobufjsFieldToCelType(field) {
  let fieldType;
  if (field.map) {
    const keyType = protobufjsTypeToCelType(field.keyType, field.resolvedKeyType);
    const valueType = protobufjsTypeToCelType(field.type, field.resolvedType);
    fieldType = `map<${keyType}, ${valueType}>`;
  } else {
    fieldType = protobufjsTypeToCelType(field.type, field.resolvedType);
  }
  return { type: field.repeated ? `list<${fieldType}>` : fieldType };
}
function protobufjsTypeToCelType(protoType, resolvedType) {
  switch (protoType) {
    case "string":
      return "string";
    case "bytes":
      return "bytes";
    case "bool":
      return "bool";
    // protobufjs uses JavaScript numbers for all numeric types
    case "double":
    case "float":
    case "int32":
    case "int64":
    case "sint32":
    case "sint64":
    case "sfixed32":
    case "sfixed64":
    case "uint32":
    case "uint64":
    case "fixed32":
    case "fixed64":
      return "double";
    default:
      switch (resolvedType?.constructor.name) {
        case "Type":
          return resolvedType.fullName.slice(1);
        case "Enum":
          return "int";
      }
      if (protoType?.includes(".")) return protoType;
      return "dyn";
  }
}
const dynType = celTypes.dyn;
class Base {
  dynType = celTypes.dyn;
  optionalType = celTypes.optional;
  stringType = celTypes.string;
  intType = celTypes.int;
  doubleType = celTypes.double;
  boolType = celTypes.bool;
  nullType = celTypes.null;
  listType = celTypes.list;
  mapType = celTypes.map;
  constructor(opts) {
    this.opts = opts.opts;
    this.objectTypes = opts.objectTypes;
    this.objectTypesByConstructor = opts.objectTypesByConstructor;
    this.registry = opts.registry;
  }
  /**
   * Get a TypeDeclaration instance for a type name
   * @param {string} typeName - The type name (e.g., 'string', 'int', 'dyn')
   * @returns {TypeDeclaration} The type declaration instance
   */
  getType(typeName) {
    return this.registry.getType(typeName);
  }
  debugType(v) {
    switch (typeof v) {
      case "string":
        return this.stringType;
      case "bigint":
        return this.intType;
      case "number":
        return this.doubleType;
      case "boolean":
        return this.boolType;
      case "object":
        if (v === null) return this.nullType;
        switch (v.constructor) {
          case void 0:
          case Object:
          case Map:
            return this.mapType;
          case Array:
          case Set:
            return this.listType;
          default:
            return this.objectTypesByConstructor.get(v.constructor)?.type || unsupportedType(this, v.constructor?.name || typeof v);
        }
      default:
        unsupportedType(this, typeof v);
    }
  }
}
function unsupportedType(self2, type2) {
  throw new self2.Error(`Unsupported type: ${type2}`);
}
function twoProm(ev, ast, a, b, fn) {
  if (!(a instanceof Promise)) return b.then((r) => fn(ev, ast, a, r));
  if (!(b instanceof Promise)) return a.then((l) => fn(ev, ast, l, b));
  return Promise.all([a, b]).then((r) => fn(ev, ast, r[0], r[1]));
}
function checkAccessNode(chk, ast, ctx) {
  const leftType = chk.check(ast.args[0], ctx);
  if (ast.op === "[]") chk.check(ast.args[1], ctx);
  if (leftType.kind !== "optional") return chk.checkAccessOnType(ast, ctx, leftType);
  return chk.registry.getOptionalType(chk.checkAccessOnType(ast, ctx, leftType.valueType, true));
}
function checkOptionalAccessNode(chk, ast, ctx) {
  const leftType = chk.check(ast.args[0], ctx);
  if (ast.op === "[?]") chk.check(ast.args[1], ctx);
  const actualType = leftType.kind === "optional" ? leftType.valueType : leftType;
  return chk.registry.getOptionalType(chk.checkAccessOnType(ast, ctx, actualType, true));
}
function checkElementHomogenous(chk, ctx, expected, el, m) {
  const type2 = chk.check(el, ctx);
  if (type2 === expected || expected.isEmpty()) return type2;
  if (type2.isEmpty()) return expected;
  let prefix;
  if (m === 0) prefix = "List elements must have the same type,";
  else if (m === 1) prefix = "Map key uses wrong type,";
  else if (m === 2) prefix = "Map value uses wrong type,";
  throw new chk.Error(
    `${prefix} expected type '${chk.formatType(expected)}' but found '${chk.formatType(type2)}'`,
    el
  );
}
function checkElement(chk, ctx, expected, el) {
  return expected.unify(chk.registry, chk.check(el, ctx)) || chk.dynType;
}
function ternaryConditionError(ev, value, node) {
  const type2 = ev.debugRuntimeType(value, node.checkedType);
  return new ev.Error(`${node.meta.label || "Ternary condition must be bool"}, got '${type2}'`, node);
}
function handleTernary(ev, ast, ctx, condition) {
  if (condition === true) return ev.eval(ast.args[1], ctx);
  if (condition === false) return ev.eval(ast.args[2], ctx);
  throw ternaryConditionError(ev, condition, ast.args[0]);
}
function handleUnary(ev, ast, left) {
  if (ast.staticHandler) return ast.staticHandler.handler(left, ast, ev);
  const leftType = ev.debugRuntimeType(left, ast.args.checkedType);
  const overload = ev.registry.findUnaryOverload(ast.op, leftType);
  if (overload) return overload.handler(left);
  throw new ev.Error(`no such overload: ${ast.op[0]}${leftType}`, ast);
}
function evaluateUnary(ev, ast, ctx) {
  const l = ev.eval(ast.args, ctx);
  if (l instanceof Promise) return l.then((_l) => handleUnary(ev, ast, _l));
  return handleUnary(ev, ast, l);
}
function handleBinary(ev, ast, left, right) {
  if (ast.staticHandler) return ast.staticHandler.handler(left, right, ast, ev);
  const leftType = ev.debugOperandType(left, ast.args[0].checkedType);
  const rightType = ev.debugOperandType(right, ast.args[1].checkedType);
  const overload = ev.registry.findBinaryOverload(ast.op, leftType, rightType);
  if (overload) return overload.handler(left, right, ast, ev);
  throw new ev.Error(`no such overload: ${leftType} ${ast.op} ${rightType}`, ast);
}
function logicalOperandError(ev, value, node) {
  const type2 = ev.debugRuntimeType(value, node.checkedType);
  return new ev.Error(`Logical operator requires bool operands, got '${type2}'`, node);
}
function logicalValueOrErr(ev, v, node) {
  if (v instanceof Error) return v;
  return logicalOperandError(ev, v, node);
}
function _logicalOp(exp, ev, ast, left, right) {
  if (right === exp) return exp;
  if (right === !exp) {
    if (left === right) return right;
    throw logicalValueOrErr(ev, left, ast.args[0]);
  }
  if (right instanceof Promise) return right.then((r) => _logicalOpAsync(exp, ev, ast, left, r));
  throw logicalOperandError(ev, right, ast.args[1]);
}
function _logicalOpAsync(exp, ev, ast, left, right) {
  if (right === exp) return exp;
  if (typeof right !== "boolean") throw logicalOperandError(ev, right, ast.args[1]);
  if (typeof left !== "boolean") throw logicalValueOrErr(ev, left, ast.args[0]);
  return !exp;
}
function checkLogicalOp(chk, ast, ctx) {
  const leftType = chk.check(ast.args[0], ctx);
  const rightType = chk.check(ast.args[1], ctx);
  if (!leftType.isDynOrBool()) {
    throw new chk.Error(
      `Logical operator requires bool operands, got '${chk.formatType(leftType)}'`,
      ast
    );
  }
  if (!rightType.isDynOrBool()) {
    throw new chk.Error(
      `Logical operator requires bool operands, got '${chk.formatType(rightType)}'`,
      ast
    );
  }
  return chk.boolType;
}
function checkUnary(chk, ast, ctx) {
  const op = ast.op;
  const right = chk.check(ast.args, ctx);
  if (right.kind === "dyn") return op === "!_" ? chk.boolType : right;
  const overload = chk.registry.findUnaryOverload(op, right);
  if (!overload) throw new chk.Error(`no such overload: ${op[0]}${chk.formatType(right)}`, ast);
  return (ast.staticHandler = overload).returnType;
}
function checkBinary(chk, ast, ctx) {
  const op = ast.op;
  const left = chk.check(ast.args[0], ctx);
  const right = chk.check(ast.args[1], ctx);
  const type2 = left.hasDynType || right.hasDynType ? chk.registry.checkBinaryOverload(op, left, right) : (ast.staticHandler = chk.registry.findBinaryOverload(op, left, right))?.returnType;
  if (type2) return type2;
  throw new chk.Error(
    `no such overload: ${chk.formatType(left)} ${op} ${chk.formatType(right)}`,
    ast
  );
}
function evaluateBinary(ev, ast, ctx) {
  const a = ast.args;
  const l = ev.eval(a[0], ctx);
  const r = ev.eval(a[1], ctx);
  if (l instanceof Promise || r instanceof Promise) return twoProm(ev, ast, l, r, handleBinary);
  return handleBinary(ev, ast, l, r);
}
function callFn(ev, ast, args) {
  if (ast.staticHandler) return ast.staticHandler.handler.apply(ev, args);
  const [functionName, argAst] = ast.args;
  const argLen = argAst.length;
  const candidates = ast.functionCandidates ??= ev.registry.getFunctionCandidates(
    false,
    functionName,
    argLen
  );
  const types = ast.argTypes;
  let i = argLen;
  while (i--) types[i] = ev.debugOperandType(args[i], argAst[i].checkedType);
  const decl = candidates.findMatch(types);
  if (decl) return decl.handler.apply(ev, args);
  throw new ev.Error(
    `found no matching overload for '${functionName}(${types.map((t) => t.unwrappedType).join(", ")})'`,
    ast
  );
}
function callRecFn(ev, ast, receiver, args) {
  if (ast.staticHandler) return ast.staticHandler.handler.call(ev, receiver, ...args);
  const [functionName, receiverAst, argAst] = ast.args;
  const candidates = ast.functionCandidates ??= ev.registry.getFunctionCandidates(
    true,
    functionName,
    argAst.length
  );
  let i = args.length;
  const types = ast.argTypes;
  while (i--) types[i] = ev.debugOperandType(args[i], argAst[i].checkedType);
  const receiverType = ev.debugRuntimeType(receiver, receiverAst.checkedType || dynType);
  const decl = candidates.findMatch(types, receiverType);
  if (decl) return decl.handler.call(ev, receiver, ...args);
  throw new ev.Error(
    `found no matching overload for '${receiverType.type}.${functionName}(${types.map((t) => t.unwrappedType).join(", ")})'`,
    ast
  );
}
function resolveAstArray(ev, astArray, ctx, i = astArray.length) {
  if (i === 0) return [];
  let async;
  const results = new Array(i);
  while (i--) if ((results[i] = ev.eval(astArray[i], ctx)) instanceof Promise) async ??= true;
  return async ? Promise.all(results) : results;
}
function safeFromEntries(entries) {
  const obj = {};
  for (let i = 0; i < entries.length; i++) {
    const [k, v] = entries[i];
    if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
    obj[k] = v;
  }
  return obj;
}
function comprehensionElementType(chk, iterable, ctx) {
  const iterType = chk.check(iterable, ctx);
  if (iterType.kind === "dyn") return iterType;
  if (iterType.kind === "list") return iterType.valueType;
  if (iterType.kind === "map") return iterType.keyType;
  throw new chk.Error(
    `Expression of type '${chk.formatType(
      iterType
    )}' cannot be range of a comprehension (must be list, map, or dynamic).`,
    iterable
  );
}
function toIterable(ev, args, coll) {
  if (coll instanceof Set) return [...coll];
  if (coll instanceof Map) return [...coll.keys()];
  if (coll && typeof coll === "object") return objKeys(coll);
  throw new ev.Error(
    `Expression of type '${ev.debugType(
      coll
    )}' cannot be range of a comprehension (must be list, map, or dynamic).`,
    args.iterable
  );
}
function runComprehension(ev, args, ctx, items) {
  if (!isArray$1(items)) items = toIterable(ev, args, items);
  const accu = ev.eval(args.init, ctx = args.iterCtx.reuse(ctx));
  const fn = args.errorsAreFatal ? iterateLoop : iterateQuantifier;
  return (ctx === args.iterCtx ? fn : fn.async)(ev, ctx, args, items, ctx.accuValue = accu, 0);
}
function iterateLoop(ev, ctx, args, items, accu, i) {
  const condition = args.condition;
  const step = args.step;
  const len = items.length;
  while (i < len) {
    if (condition && !condition(accu)) break;
    accu = ev.eval(step, ctx.setIterValue(items[i++], ev, step));
    if (accu instanceof Promise) return continueLoop(ev, ctx, args, items, accu, i);
  }
  return args.result(accu);
}
async function continueLoop(ev, ctx, args, items, accu, i) {
  if (ctx === args.iterCtx) ctx.async = true;
  const condition = args.condition;
  const step = args.step;
  const len = items.length;
  accu = await accu;
  while (i < len) {
    if (condition && !condition(accu)) return args.result(accu);
    accu = ev.eval(step, ctx.setIterValue(items[i++], ev, step));
    if (accu instanceof Promise) accu = await accu;
  }
  return args.result(accu);
}
function iterateQuantifier(ev, ctx, args, items, accu, i, error, stp) {
  const condition = args.condition;
  const step = args.step;
  const len = items.length;
  while (i < len) {
    if (!condition(accu)) return args.result(accu);
    stp = ev.tryEval(step, ctx.setIterValue(items[i++], ev, step));
    if (stp instanceof Promise) return continueQuantifier(ev, ctx, args, items, accu, i, error, stp);
    if (stp instanceof Error && (error ??= stp)) continue;
    accu = stp;
  }
  if (error && condition(accu)) throw error;
  return args.result(accu);
}
async function continueQuantifier(ev, ctx, args, items, accu, i, error, stp) {
  if (ctx === args.iterCtx) ctx.async = true;
  const condition = args.condition;
  const step = args.step;
  const len = items.length;
  stp = await stp;
  if (stp instanceof Error) error ??= stp;
  else accu = stp;
  while (i < len) {
    if (!condition(accu)) return args.result(accu);
    stp = ev.tryEval(step, ctx.setIterValue(items[i++], ev, step));
    if (stp instanceof Promise) stp = await stp;
    if (stp instanceof Error && (error ??= stp)) continue;
    accu = stp;
  }
  if (error && condition(accu)) throw error;
  return args.result(accu);
}
iterateLoop.async = continueLoop;
iterateQuantifier.async = continueQuantifier;
function oFieldAccess(ev, ast, left, right) {
  return ev.optionalType.field(left, right, ast, ev);
}
function fieldAccess(ev, ast, left, right) {
  const leftType = ast.args[0].checkedType;
  if (leftType !== dynType) return leftType.field(left, right, ast, ev);
  return ev.debugType(left).field(left, right, ast, ev);
}
const OPERATORS = {
  value: {
    check(chk, ast) {
      return chk.debugType(ast.args);
    },
    evaluate(_ev, ast) {
      return ast.args;
    }
  },
  id: {
    check(chk, ast, ctx) {
      const variable = ctx.getVariable(ast.args);
      if (!variable) throw new chk.Error(`Unknown variable: ${ast.args}`, ast);
      if (variable.constant) {
        const alternate = ast.clone(OPERATORS.value, variable.value);
        ast.setMeta("alternate", alternate);
        return chk.check(alternate, ctx);
      }
      return variable.type;
    },
    evaluate(ev, ast, ctx) {
      return ctx.getCheckedValue(ev, ast);
    }
  },
  ".": {
    alias: "fieldAccess",
    check: checkAccessNode,
    evaluate(ev, ast, ctx) {
      const a = ast.args;
      const l = ev.eval(a[0], ctx);
      if (l instanceof Promise) return l.then((_l) => fieldAccess(ev, ast, _l, a[1]));
      return fieldAccess(ev, ast, l, a[1]);
    }
  },
  ".?": {
    alias: "optionalFieldAccess",
    check: checkOptionalAccessNode,
    evaluate(ev, ast, ctx) {
      const a = ast.args;
      const l = ev.eval(a[0], ctx);
      if (l instanceof Promise) return l.then((_l) => oFieldAccess(ev, ast, _l, a[1]));
      return oFieldAccess(ev, ast, l, a[1]);
    }
  },
  "[]": {
    alias: "bracketAccess",
    check: checkAccessNode,
    evaluate(ev, ast, ctx) {
      const a = ast.args;
      const l = ev.eval(a[0], ctx);
      const r = ev.eval(a[1], ctx);
      if (l instanceof Promise || r instanceof Promise) return twoProm(ev, ast, l, r, fieldAccess);
      return fieldAccess(ev, ast, l, r);
    }
  },
  "[?]": {
    alias: "optionalBracketAccess",
    check: checkOptionalAccessNode,
    evaluate(ev, ast, ctx) {
      const a = ast.args;
      const l = ev.eval(a[0], ctx);
      const r = ev.eval(a[1], ctx);
      if (l instanceof Promise || r instanceof Promise) return twoProm(ev, ast, l, r, oFieldAccess);
      return oFieldAccess(ev, ast, l, r);
    }
  },
  call: {
    check(chk, ast, ctx) {
      const [functionName, args] = ast.args;
      const candidates = ast.functionCandidates ??= chk.registry.getFunctionCandidates(
        false,
        functionName,
        args.length
      );
      const argTypes = ast.argTypes = args.map((a) => chk.check(a, ctx));
      const decl = candidates.findMatch(argTypes);
      if (!decl) {
        throw new chk.Error(
          `found no matching overload for '${functionName}(${chk.formatTypeList(argTypes)})'`,
          ast
        );
      }
      if (!argTypes.some((t) => t.hasDynType)) ast.staticHandler = decl;
      return decl.returnType;
    },
    evaluate(ev, ast, ctx) {
      const l = resolveAstArray(ev, ast.args[1], ctx);
      if (l instanceof Promise) return l.then((_l) => callFn(ev, ast, _l));
      return callFn(ev, ast, l);
    }
  },
  rcall: {
    check(chk, ast, ctx) {
      const [methodName, receiver, args] = ast.args;
      const receiverType = chk.check(receiver, ctx);
      const candidates = ast.functionCandidates ??= chk.registry.getFunctionCandidates(
        true,
        methodName,
        args.length
      );
      const argTypes = ast.argTypes = args.map((a) => chk.check(a, ctx));
      if (receiverType.kind === "dyn" && candidates.returnType) return candidates.returnType;
      const decl = candidates.findMatch(argTypes, receiverType);
      if (!decl) {
        throw new chk.Error(
          `found no matching overload for '${receiverType.type}.${methodName}(${chk.formatTypeList(
            argTypes
          )})'`,
          ast
        );
      }
      if (!receiverType.hasPlaceholderType && !argTypes.some((t) => t.hasDynType)) {
        ast.staticHandler = decl;
      }
      return decl.returnType;
    },
    evaluate(ev, ast, ctx) {
      const l = ev.eval(ast.args[1], ctx);
      const r = resolveAstArray(ev, ast.args[2], ctx);
      if (l instanceof Promise || r instanceof Promise) return twoProm(ev, ast, l, r, callRecFn);
      return callRecFn(ev, ast, l, r);
    }
  },
  list: {
    check(chk, ast, ctx) {
      const arr = ast.args;
      const arrLen = arr.length;
      if (arrLen === 0) return chk.getType("list<T>");
      let valueType = chk.check(arr[0], ctx);
      const check = chk.opts.homogeneousAggregateLiterals ? checkElementHomogenous : checkElement;
      for (let i = 1; i < arrLen; i++) valueType = check(chk, ctx, valueType, arr[i], 0);
      return chk.registry.getListType(valueType);
    },
    evaluate(ev, ast, ctx) {
      return resolveAstArray(ev, ast.args, ctx);
    }
  },
  map: {
    check(chk, ast, ctx) {
      const arr = ast.args;
      const arrLen = arr.length;
      if (arrLen === 0) return chk.getType("map<K, V>");
      const check = chk.opts.homogeneousAggregateLiterals ? checkElementHomogenous : checkElement;
      let keyType = chk.check(arr[0][0], ctx);
      let valueType = chk.check(arr[0][1], ctx);
      for (let i = 1; i < arrLen; i++) {
        const e = arr[i];
        keyType = check(chk, ctx, keyType, e[0], 1);
        valueType = check(chk, ctx, valueType, e[1], 2);
      }
      return chk.registry.getMapType(keyType, valueType);
    },
    evaluate(ev, ast, ctx) {
      const astEntries = ast.args;
      const len = astEntries.length;
      const results = new Array(len);
      let async;
      for (let i = 0; i < len; i++) {
        const e = astEntries[i];
        const k = ev.eval(e[0], ctx);
        const v = ev.eval(e[1], ctx);
        if (k instanceof Promise || v instanceof Promise) {
          results[i] = Promise.all([k, v]);
          async ??= true;
        } else {
          results[i] = [k, v];
        }
      }
      if (async) return Promise.all(results).then(safeFromEntries);
      return safeFromEntries(results);
    }
  },
  comprehension: {
    check(chk, ast, ctx) {
      const args = ast.args;
      args.iterCtx = ctx.forkWithVariable(args.iterVarName, comprehensionElementType(chk, args.iterable, ctx)).setAccuType(chk.check(args.init, ctx));
      const stepType = chk.check(args.step, args.iterCtx);
      if (args.kind === "quantifier") return chk.boolType;
      return stepType;
    },
    evaluate(ev, ast, ctx) {
      const a = ast.args;
      const arr = ev.eval(a.iterable, ctx);
      if (arr instanceof Promise) return arr.then((_arr) => runComprehension(ev, a, ctx, _arr));
      return runComprehension(ev, a, ctx, arr);
    }
  },
  accuValue: {
    check(_chk, _ast, ctx) {
      return ctx.accuType;
    },
    evaluate(_ev, _ast, ctx) {
      return ctx.accuValue;
    }
  },
  accuInc: {
    check(_chk, _ast, ctx) {
      return ctx.accuType;
    },
    evaluate(_ev, _ast, ctx) {
      return ctx.accuValue += 1;
    }
  },
  accuPush: {
    check(chk, ast, ctx) {
      const listType2 = ctx.accuType;
      const itemType = chk.check(ast.args, ctx);
      if (listType2.kind === "list" && listType2.valueType.kind !== "param") return listType2;
      return chk.registry.getListType(itemType);
    },
    evaluate(ev, ast, ctx) {
      const arr = ctx.accuValue;
      const el = ev.eval(ast.args, ctx);
      if (el instanceof Promise) return el.then((_e) => arr.push(_e) && arr);
      arr.push(el);
      return arr;
    }
  },
  "?:": {
    alias: "ternary",
    check(chk, ast, ctx) {
      const [condast, trueast, falseast] = ast.args;
      const condType = chk.check(condast, ctx);
      if (!condType.isDynOrBool()) {
        throw new chk.Error(
          `${condast.meta.label || "Ternary condition must be bool"}, got '${chk.formatType(condType)}'`,
          condast
        );
      }
      const trueType = chk.check(trueast, ctx);
      const falseType = chk.check(falseast, ctx);
      const unified = trueType.unify(chk.registry, falseType);
      if (unified) return unified;
      throw new chk.Error(
        `Ternary branches must have the same type, got '${chk.formatType(
          trueType
        )}' and '${chk.formatType(falseType)}'`,
        ast
      );
    },
    evaluate(ev, ast, ctx) {
      const l = ev.eval(ast.args[0], ctx);
      if (l instanceof Promise) return l.then((_l) => handleTernary(ev, ast, ctx, _l));
      return handleTernary(ev, ast, ctx, l);
    }
  },
  "||": {
    check: checkLogicalOp,
    evaluate(ev, ast, ctx) {
      const a = ast.args;
      const l = ev.tryEval(a[0], ctx);
      if (l === true) return true;
      if (l === false) {
        const right = ev.eval(a[1], ctx);
        if (typeof right === "boolean") return right;
        return _logicalOp(true, ev, ast, l, right);
      }
      if (l instanceof Promise)
        return l.then(
          (_l) => _l === true ? _l : _logicalOp(true, ev, ast, _l, ev.eval(a[1], ctx))
        );
      return _logicalOp(true, ev, ast, l, ev.eval(a[1], ctx));
    }
  },
  "&&": {
    check: checkLogicalOp,
    evaluate(ev, ast, ctx) {
      const a = ast.args;
      const l = ev.tryEval(a[0], ctx);
      if (l === false) return false;
      if (l === true) {
        const right = ev.eval(a[1], ctx);
        if (typeof right === "boolean") return right;
        return _logicalOp(false, ev, ast, l, right);
      }
      if (l instanceof Promise)
        return l.then(
          (_l) => _l === false ? _l : _logicalOp(false, ev, ast, _l, ev.eval(a[1], ctx))
        );
      return _logicalOp(false, ev, ast, l, ev.eval(a[1], ctx));
    }
  },
  "!_": { alias: "unaryNot", check: checkUnary, evaluate: evaluateUnary },
  "-_": { alias: "unaryMinus", check: checkUnary, evaluate: evaluateUnary }
};
const binaryOperators = ["!=", "==", "in", "+", "-", "*", "/", "%", "<", "<=", ">", ">="];
for (const op of binaryOperators) OPERATORS[op] = { check: checkBinary, evaluate: evaluateBinary };
for (const op of objKeys(OPERATORS)) {
  const obj = OPERATORS[op];
  obj.name = op;
  if (obj.alias) OPERATORS[obj.alias] = obj;
}
const identity = (x) => x;
function assertIdentifier(node, message) {
  if (node.op === "id") return node.args;
  throw new ParseError(message, node);
}
function createMapExpander(hasFilter) {
  const functionDesc = hasFilter ? "map(var, filter, transform)" : "map(var, transform)";
  const invalidMsg = `${functionDesc} invalid predicate iteration variable`;
  const label = `${functionDesc} filter predicate must return bool`;
  return ({ args, receiver, ast: callAst }) => {
    const [iterVar, predicate, transform] = hasFilter ? args : [args[0], null, args[1]];
    let step = transform.clone(OPERATORS.accuPush, transform);
    if (predicate) {
      const accuValue = predicate.clone(OPERATORS.accuValue);
      step = predicate.clone(OPERATORS.ternary, [predicate.setMeta("label", label), step, accuValue]);
    }
    return {
      callAst: callAst.clone(OPERATORS.comprehension, {
        errorsAreFatal: true,
        iterable: receiver,
        iterVarName: assertIdentifier(iterVar, invalidMsg),
        init: callAst.clone(OPERATORS.list, []),
        step,
        result: identity
      })
    };
  };
}
function createFilterExpander() {
  const functionDesc = "filter(var, predicate)";
  const invalidMsg = `${functionDesc} invalid predicate iteration variable`;
  const label = `${functionDesc} predicate must return bool`;
  return ({ args, receiver, ast: callAst }) => {
    const iterVarName = assertIdentifier(args[0], invalidMsg);
    const accuValue = callAst.clone(OPERATORS.accuValue);
    const predicate = args[1].setMeta("label", label);
    const appendItem = callAst.clone(OPERATORS.accuPush, callAst.clone(OPERATORS.id, iterVarName));
    const step = predicate.clone(OPERATORS.ternary, [predicate, appendItem, accuValue]);
    return {
      callAst: callAst.clone(OPERATORS.comprehension, {
        errorsAreFatal: true,
        iterable: receiver,
        iterVarName,
        init: callAst.clone(OPERATORS.list, []),
        step,
        result: identity
      })
    };
  };
}
function createQuantifierExpander(opts) {
  const invalidMsg = `${opts.name}(var, predicate) invalid predicate iteration variable`;
  const label = `${opts.name}(var, predicate) predicate must return bool`;
  return ({ args, receiver, ast: callAst }) => {
    const predicate = args[1].setMeta("label", label);
    const transform = opts.transform({ args, ast: callAst, predicate, opts });
    return {
      callAst: callAst.clone(OPERATORS.comprehension, {
        kind: "quantifier",
        errorsAreFatal: opts.errorsAreFatal || false,
        iterable: receiver,
        iterVarName: assertIdentifier(args[0], invalidMsg),
        init: transform.init,
        condition: transform.condition,
        step: transform.step,
        result: transform.result || identity
      })
    };
  };
}
function createHasExpander() {
  const invalidHasArgument = "has() invalid argument";
  function evaluate2(ev, macro, ctx) {
    const nodes = macro.macroHasProps;
    let i = nodes.length;
    let obj = ev.eval(nodes[--i], ctx);
    let inOptionalContext;
    while (i--) {
      const node = nodes[i];
      if (node.op === ".?") inOptionalContext ??= true;
      obj = ev.debugType(obj).fieldLazy(obj, node.args[1], node, ev);
      if (obj !== void 0) continue;
      if (!(!inOptionalContext && i && node.op === ".")) break;
      throw new EvaluationError(`No such key: ${node.args[1]}`, node);
    }
    return obj !== void 0;
  }
  function typeCheck(checker, macro, ctx) {
    let node = macro.args[0];
    if (node.op !== ".") throw new checker.Error(invalidHasArgument, node);
    if (!macro.macroHasProps) {
      const props = [];
      while (node.op === "." || node.op === ".?") node = props.push(node) && node.args[0];
      if (node.op !== "id") throw new checker.Error(invalidHasArgument, node);
      checker.check(node, ctx);
      props.push(node);
      macro.macroHasProps = props;
    }
    return checker.getType("bool");
  }
  return function({ args }) {
    return { args, evaluate: evaluate2, typeCheck };
  };
}
function registerMacros(registry2) {
  registry2.registerFunctionOverload("has(ast): bool", createHasExpander());
  registry2.registerFunctionOverload(
    "list.all(ast, ast): bool",
    createQuantifierExpander({
      name: "all",
      transform({ ast: callAst, predicate, opts }) {
        return {
          init: callAst.clone(OPERATORS.value, true),
          condition: identity,
          step: predicate.clone(OPERATORS.ternary, [
            predicate,
            predicate.clone(OPERATORS.value, true),
            predicate.clone(OPERATORS.value, false)
          ])
        };
      }
    })
  );
  registry2.registerFunctionOverload(
    "list.exists(ast, ast): bool",
    createQuantifierExpander({
      name: "exists",
      condition(accu) {
        return !accu;
      },
      transform({ ast: callAst, predicate, opts }) {
        return {
          init: callAst.clone(OPERATORS.value, false),
          condition: opts.condition,
          step: predicate.clone(OPERATORS.ternary, [
            predicate,
            predicate.clone(OPERATORS.value, true),
            predicate.clone(OPERATORS.value, false)
          ])
        };
      }
    })
  );
  registry2.registerFunctionOverload(
    "list.exists_one(ast, ast): bool",
    createQuantifierExpander({
      name: "exists_one",
      errorsAreFatal: true,
      result(accu) {
        return accu === 1;
      },
      transform({ ast: callAst, predicate, opts }) {
        const accuValue = callAst.clone(OPERATORS.accuValue);
        return {
          init: callAst.clone(OPERATORS.value, 0),
          step: predicate.clone(OPERATORS.ternary, [predicate, callAst.clone(OPERATORS.accuInc), accuValue]),
          result: opts.result
        };
      }
    })
  );
  registry2.registerFunctionOverload("list.map(ast, ast): list<dyn>", createMapExpander(false));
  registry2.registerFunctionOverload("list.map(ast, ast, ast): list<dyn>", createMapExpander(true));
  registry2.registerFunctionOverload("list.filter(ast, ast): list<dyn>", createFilterExpander());
  function bindOptionalEvaluate(ev, exp, bindCtx, ctx, boundValue) {
    const res = ev.eval(exp, ctx = bindCtx.reuse(ctx).setIterValue(boundValue, ev, exp));
    if (res instanceof Promise && ctx === bindCtx) ctx.async = true;
    return res;
  }
  class CelNamespace {
  }
  const celNamespace = new CelNamespace();
  registry2.registerType("CelNamespace", CelNamespace);
  registry2.registerConstant("cel", "CelNamespace", celNamespace);
  function bindTypeCheck(checker, macro, ctx) {
    macro.bindCtx = ctx.forkWithVariable(macro.var, checker.check(macro.val, ctx));
    return checker.check(macro.exp, macro.bindCtx);
  }
  function bindEvaluate(ev, { val, exp, bindCtx }, ctx) {
    const v = ev.eval(val, ctx);
    if (v instanceof Promise) return v.then((_v) => bindOptionalEvaluate(ev, exp, bindCtx, ctx, _v));
    return bindOptionalEvaluate(ev, exp, bindCtx, ctx, v);
  }
  registry2.registerFunctionOverload("CelNamespace.bind(ast, dyn, ast): dyn", ({ args }) => {
    return {
      var: assertIdentifier(args[0], "invalid variable argument"),
      val: args[1],
      exp: args[2],
      bindCtx: void 0,
      typeCheck: bindTypeCheck,
      evaluate: bindEvaluate
    };
  });
}
function registerOverloads(registry2) {
  const unaryOverload = registry2.unaryOverload.bind(registry2);
  const binaryOverload = registry2.binaryOverload.bind(registry2);
  function verifyInteger(v, ast) {
    if (v <= 9223372036854775807n && v >= -9223372036854775808n) return v;
    throw new EvaluationError(`integer overflow: ${v}`, ast);
  }
  unaryOverload("!", "bool", (a) => !a);
  unaryOverload("-", "int", (a) => -a);
  binaryOverload("dyn<int>", `==`, `double`, (a, b) => a == b);
  binaryOverload("dyn<int>", `==`, `uint`, (a, b) => a == b.valueOf());
  binaryOverload("int", "*", "int", (a, b, ast) => verifyInteger(a * b, ast));
  binaryOverload("int", "+", "int", (a, b, ast) => verifyInteger(a + b, ast));
  binaryOverload("int", "-", "int", (a, b, ast) => verifyInteger(a - b, ast));
  binaryOverload("int", "/", "int", (a, b, ast) => {
    if (b === 0n) throw new EvaluationError("division by zero", ast);
    return a / b;
  });
  binaryOverload("int", "%", "int", (a, b, ast) => {
    if (b === 0n) throw new EvaluationError("modulo by zero", ast);
    return a % b;
  });
  unaryOverload("-", "double", (a) => -a);
  binaryOverload("double", "*", "double", (a, b) => a * b);
  binaryOverload("double", "+", "double", (a, b) => a + b);
  binaryOverload("double", "-", "double", (a, b) => a - b);
  binaryOverload("double", "/", "double", (a, b) => a / b);
  binaryOverload("string", "+", "string", (a, b) => a + b);
  binaryOverload("list<V>", "+", "list<V>", (a, b) => [...a, ...b]);
  binaryOverload("bytes", "+", "bytes", (a, b) => {
    if (!a.length) return b;
    if (!b.length) return a;
    const result = new Uint8Array(a.length + b.length);
    result.set(a, 0);
    result.set(b, a.length);
    return result;
  });
  const GPD = "google.protobuf.Duration";
  binaryOverload(GPD, "+", GPD, (a, b) => a.addDuration(b));
  binaryOverload(GPD, "-", GPD, (a, b) => a.subtractDuration(b));
  binaryOverload(GPD, "==", GPD, (a, b) => a.seconds === b.seconds && a.nanos === b.nanos);
  const GPT = "google.protobuf.Timestamp";
  binaryOverload(GPT, "==", GPT, (a, b) => a.getTime() === b.getTime());
  binaryOverload(GPT, "-", GPT, (a, b) => Duration.fromMilliseconds(a.getTime() - b.getTime()), GPD);
  binaryOverload(GPT, "-", GPD, (a, b) => b.subtractTimestamp(a));
  binaryOverload(GPT, "+", GPD, (a, b) => b.extendTimestamp(a));
  binaryOverload(GPD, "+", GPT, (a, b) => a.extendTimestamp(b));
  function listIncludes(value, list, ast, ev) {
    if (list instanceof Set && list.has(value)) return true;
    for (const v of list) if (isEqual(value, v, ast, ev)) return true;
    return false;
  }
  function mapIncludes(a, b) {
    if (b instanceof Map) return b.get(a) !== void 0;
    return hasOwn$1(b, a) ? b[a] !== void 0 : false;
  }
  function listMembership(value, list, ast, ev) {
    return listIncludes(value, list, ast, ev);
  }
  binaryOverload("V", "in", "list<V>", listMembership);
  binaryOverload("K", "in", "map<K, V>", mapIncludes);
  for (const t of ["type", "null", "bool", "string", "int", "double"]) {
    binaryOverload(t, "==", t, (a, b) => a === b);
  }
  binaryOverload("bytes", `==`, "bytes", (a, b) => {
    if (a === b) return true;
    let i = a.length;
    if (i !== b.length) return false;
    while (i--) if (a[i] !== b[i]) return false;
    return true;
  });
  binaryOverload("list<V>", `==`, "list<V>", (a, b, ast, ev) => {
    if (a === b) return true;
    if (isArray$1(a) && isArray$1(b)) {
      const length = a.length;
      if (length !== b.length) return false;
      for (let i = 0; i < length; i++) {
        if (!isEqual(a[i], b[i], ast, ev)) return false;
      }
      return true;
    }
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      for (const value of a) if (!b.has(value)) return false;
      return true;
    }
    const arr = a instanceof Set ? b : a;
    const set = a instanceof Set ? a : b;
    if (!isArray$1(arr)) return false;
    if (arr.length !== set?.size) return false;
    for (let i = 0; i < arr.length; i++) if (!set.has(arr[i])) return false;
    return true;
  });
  binaryOverload("map<K, V>", `==`, "map<K, V>", (a, b, ast, ev) => {
    if (a === b) return true;
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      for (const [key2, value] of a)
        if (!(b.has(key2) && isEqual(value, b.get(key2), ast, ev))) return false;
      return true;
    }
    if (a instanceof Map || b instanceof Map) {
      const obj = a instanceof Map ? b : a;
      const map = a instanceof Map ? a : b;
      const keysObj = objKeys(obj);
      if (map.size !== keysObj.length) return false;
      for (const [key2, value] of map) {
        if (!(key2 in obj && isEqual(value, obj[key2], ast, ev))) return false;
      }
      return true;
    }
    const keysA = objKeys(a);
    const keysB = objKeys(b);
    if (keysA.length !== keysB.length) return false;
    for (let i = 0; i < keysA.length; i++) {
      const key2 = keysA[i];
      if (!(key2 in b && isEqual(a[key2], b[key2], ast, ev))) return false;
    }
    return true;
  });
  binaryOverload("uint", "==", "uint", (a, b) => a.valueOf() === b.valueOf());
  binaryOverload("dyn<uint>", `==`, `double`, (a, b) => a.valueOf() == b);
  binaryOverload("uint", "+", "uint", (a, b) => new UnsignedInt(a.valueOf() + b.valueOf()));
  binaryOverload("uint", "-", "uint", (a, b) => new UnsignedInt(a.valueOf() - b.valueOf()));
  binaryOverload("uint", "*", "uint", (a, b) => new UnsignedInt(a.valueOf() * b.valueOf()));
  binaryOverload("uint", "/", "uint", (a, b, ast) => {
    if (b.valueOf() === 0n) throw new EvaluationError("division by zero", ast);
    return new UnsignedInt(a.valueOf() / b.valueOf());
  });
  binaryOverload("uint", "%", "uint", (a, b, ast) => {
    if (b.valueOf() === 0n) throw new EvaluationError("modulo by zero", ast);
    return new UnsignedInt(a.valueOf() % b.valueOf());
  });
  for (const [left, right] of [
    ["bool", "bool"],
    ["int", "int"],
    ["uint", "uint"],
    ["double", "double"],
    ["string", "string"],
    ["google.protobuf.Timestamp", "google.protobuf.Timestamp"],
    ["google.protobuf.Duration", "google.protobuf.Duration"],
    ["int", "uint"],
    ["int", "double"],
    ["double", "int"],
    ["double", "uint"],
    ["uint", "int"],
    ["uint", "double"]
  ]) {
    binaryOverload(left, "<", right, (a, b) => a < b);
    binaryOverload(left, "<=", right, (a, b) => a <= b);
    binaryOverload(left, ">", right, (a, b) => a > b);
    binaryOverload(left, ">=", right, (a, b) => a >= b);
  }
}
function isEqual(a, b, ast, ev) {
  if (a === b) return true;
  switch (typeof a) {
    case "undefined":
    case "string":
    case "boolean":
      return false;
    case "bigint":
      if (typeof b === "number") return a == b;
      return false;
    case "number":
      if (typeof b === "bigint") return a == b;
      return false;
    case "object":
      if (typeof b !== "object") return false;
      const leftType = ev.debugType(a);
      const rightType = ev.debugType(b);
      if (leftType !== rightType) return false;
      const overload = ev.registry.findBinaryOverload("==", leftType, rightType);
      if (!overload) return false;
      return overload.handler(a, b, ast, ev);
  }
  throw new EvaluationError(`Cannot compare values of type ${typeof a}`, ast);
}
const toDynTypeBinding = (/* @__PURE__ */ new Map()).set("A", "dyn").set("T", "dyn").set("K", "dyn").set("V", "dyn");
class TypeChecker extends Base {
  constructor(opts, isEvaluating) {
    super(opts);
    this.isEvaluating = isEvaluating;
    this.Error = isEvaluating ? EvaluationError : TypeError$1;
  }
  /**
   * Check an expression and return its inferred type
   * @param {Array|any} ast - The AST node to check
   * @returns {Object} The inferred type declaration
   * @throws {TypeError} If type checking fails
   */
  check(ast, ctx) {
    return ast.checkedType ??= ast.check(this, ast, ctx);
  }
  checkAccessOnType(ast, ctx, leftType, allowMissingField = false) {
    if (leftType === this.dynType) return leftType;
    const indexTypeName = (ast.op === "[]" || ast.op === "[?]" ? this.check(ast.args[1], ctx) : this.stringType).type;
    if (leftType.kind === "list") {
      if (indexTypeName === "int" || indexTypeName === "dyn") return leftType.valueType;
      throw new this.Error(`List index must be int, got '${indexTypeName}'`, ast);
    }
    if (leftType.kind === "map") return leftType.valueType;
    const customType = this.objectTypes.get(leftType.name);
    if (customType) {
      if (!(indexTypeName === "string" || indexTypeName === "dyn")) {
        throw new this.Error(
          `Cannot index type '${leftType.name}' with type '${indexTypeName}'`,
          ast
        );
      }
      if (customType.fields) {
        let keyName;
        if (ast.op === "." || ast.op === ".?") keyName = ast.args[1];
        else if (ast.args[1].op === "value") keyName = ast.args[1].args;
        if (typeof keyName === "string") {
          const fieldType = customType.fields[keyName];
          if (fieldType) return fieldType;
          if (allowMissingField) return this.dynType;
          throw new this.Error(`No such key: ${keyName}`, ast);
        }
      }
      return this.dynType;
    }
    throw new this.Error(`Cannot index type '${this.formatType(leftType)}'`, ast);
  }
  formatType(type2) {
    if (!type2.hasPlaceholderType) return type2.name;
    return type2.templated(this.registry, toDynTypeBinding).name;
  }
  formatTypeList(types) {
    return types.map((t) => this.formatType(t)).join(", ");
  }
}
const TOKEN = {
  EOF: 0,
  NUMBER: 1,
  STRING: 2,
  BOOLEAN: 3,
  NULL: 4,
  IDENTIFIER: 5,
  PLUS: 6,
  MINUS: 7,
  MULTIPLY: 8,
  DIVIDE: 9,
  MODULO: 10,
  EQ: 11,
  NE: 12,
  LT: 13,
  LE: 14,
  GT: 15,
  GE: 16,
  AND: 17,
  OR: 18,
  NOT: 19,
  IN: 20,
  LPAREN: 21,
  RPAREN: 22,
  LBRACKET: 23,
  RBRACKET: 24,
  LBRACE: 25,
  RBRACE: 26,
  DOT: 27,
  COMMA: 28,
  COLON: 29,
  QUESTION: 30,
  BYTES: 31
};
const OP_FOR_TOKEN = {
  [TOKEN.EQ]: OPERATORS["=="],
  [TOKEN.PLUS]: OPERATORS["+"],
  [TOKEN.MINUS]: OPERATORS["-"],
  [TOKEN.MULTIPLY]: OPERATORS["*"],
  [TOKEN.DIVIDE]: OPERATORS["/"],
  [TOKEN.MODULO]: OPERATORS["%"],
  [TOKEN.LE]: OPERATORS["<="],
  [TOKEN.LT]: OPERATORS["<"],
  [TOKEN.GE]: OPERATORS[">="],
  [TOKEN.GT]: OPERATORS[">"],
  [TOKEN.NE]: OPERATORS["!="],
  [TOKEN.IN]: OPERATORS["in"]
};
const TOKEN_BY_NUMBER = {};
for (const key2 in TOKEN) TOKEN_BY_NUMBER[TOKEN[key2]] = key2;
const HEX_CODES = new Uint8Array(128);
for (const ch of "0123456789abcdefABCDEF") HEX_CODES[ch.charCodeAt(0)] = 1;
const STRING_ESCAPES = {
  "\\": "\\",
  "?": "?",
  '"': '"',
  "'": "'",
  "`": "`",
  a: "\x07",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "	",
  v: "\v"
};
const _ASTNode = class _ASTNode {
  constructor(input, pos2, op, args) {
    __privateAdd(this, _ASTNode_instances);
    __privateAdd(this, _meta);
    __privateSet(this, _meta, { input, pos: pos2, evaluate: op.evaluate, check: op.check });
    this.op = op.name;
    this.args = args;
  }
  clone(op, args) {
    return new _ASTNode(__privateGet(this, _meta).input, __privateGet(this, _meta).pos, op, args);
  }
  get meta() {
    return __privateGet(this, _meta);
  }
  check(chk, ast, ctx) {
    const meta = __privateGet(this, _meta);
    if (meta.alternate) return chk.check(meta.alternate, ctx);
    else if (meta.macro) return meta.macro.typeCheck(chk, meta.macro, ctx);
    return meta.check(chk, ast, ctx);
  }
  evaluate(ev, ast, ctx) {
    const meta = __privateGet(this, _meta);
    if (meta.alternate) this.evaluate = __privateMethod(this, _ASTNode_instances, evaluateAlternate_fn);
    else if (meta.macro) this.evaluate = __privateMethod(this, _ASTNode_instances, evaluateMacro_fn);
    else this.evaluate = meta.evaluate;
    return this.evaluate(ev, ast, ctx);
  }
  setMeta(key2, value) {
    return __privateGet(this, _meta)[key2] = value, this;
  }
  get input() {
    return __privateGet(this, _meta).input;
  }
  get pos() {
    return __privateGet(this, _meta).pos;
  }
  toOldStructure() {
    const args = Array.isArray(this.args) ? this.args : [this.args];
    return [this.op, ...args.map((a) => a instanceof _ASTNode ? a.toOldStructure() : a)];
  }
};
_meta = new WeakMap();
_ASTNode_instances = new WeakSet();
evaluateAlternate_fn = function(ev, ast, ctx) {
  return (ast = __privateGet(this, _meta).alternate).evaluate(ev, ast, ctx);
};
evaluateMacro_fn = function(ev, ast, ctx) {
  return (ast = __privateGet(this, _meta).macro).evaluate(ev, ast, ctx);
};
let ASTNode = _ASTNode;
class Lexer {
  input;
  pos;
  length;
  tokenPos;
  tokenType;
  tokenValue;
  reset(input) {
    this.pos = 0;
    this.input = input;
    this.length = input.length;
    return input;
  }
  token(pos2, type2, value) {
    this.tokenPos = pos2;
    this.tokenType = type2;
    this.tokenValue = value;
    return this;
  }
  // Read next token
  nextToken() {
    while (true) {
      const { pos: pos2, input, length } = this;
      if (pos2 >= length) return this.token(pos2, TOKEN.EOF);
      const ch = input[pos2];
      switch (ch) {
        // Whitespaces
        case " ":
        case "	":
        case "\n":
        case "\r":
          this.pos++;
          continue;
        // Operators
        case "=":
          if (input[pos2 + 1] !== "=") break;
          return this.token((this.pos += 2) - 2, TOKEN.EQ);
        case "&":
          if (input[pos2 + 1] !== "&") break;
          return this.token((this.pos += 2) - 2, TOKEN.AND);
        case "|":
          if (input[pos2 + 1] !== "|") break;
          return this.token((this.pos += 2) - 2, TOKEN.OR);
        case "+":
          return this.token(this.pos++, TOKEN.PLUS);
        case "-":
          return this.token(this.pos++, TOKEN.MINUS);
        case "*":
          return this.token(this.pos++, TOKEN.MULTIPLY);
        case "/":
          if (input[pos2 + 1] === "/") {
            while (this.pos < length && this.input[this.pos] !== "\n") this.pos++;
            continue;
          }
          return this.token(this.pos++, TOKEN.DIVIDE);
        case "%":
          return this.token(this.pos++, TOKEN.MODULO);
        case "<":
          if (input[pos2 + 1] === "=") return this.token((this.pos += 2) - 2, TOKEN.LE);
          return this.token(this.pos++, TOKEN.LT);
        case ">":
          if (input[pos2 + 1] === "=") return this.token((this.pos += 2) - 2, TOKEN.GE);
          return this.token(this.pos++, TOKEN.GT);
        case "!":
          if (input[pos2 + 1] === "=") return this.token((this.pos += 2) - 2, TOKEN.NE);
          return this.token(this.pos++, TOKEN.NOT);
        case "(":
          return this.token(this.pos++, TOKEN.LPAREN);
        case ")":
          return this.token(this.pos++, TOKEN.RPAREN);
        case "[":
          return this.token(this.pos++, TOKEN.LBRACKET);
        case "]":
          return this.token(this.pos++, TOKEN.RBRACKET);
        case "{":
          return this.token(this.pos++, TOKEN.LBRACE);
        case "}":
          return this.token(this.pos++, TOKEN.RBRACE);
        case ".":
          return this.token(this.pos++, TOKEN.DOT);
        case ",":
          return this.token(this.pos++, TOKEN.COMMA);
        case ":":
          return this.token(this.pos++, TOKEN.COLON);
        case "?":
          return this.token(this.pos++, TOKEN.QUESTION);
        case `"`:
        case `'`:
          return this.readString(ch);
        // Check for string prefixes (b, B, r, R followed by quote)
        case "b":
        case "B":
        case "r":
        case "R": {
          const next = input[pos2 + 1];
          if (next === '"' || next === "'") return ++this.pos && this.readString(next, ch);
          return this.readIdentifier();
        }
        default: {
          const code = ch.charCodeAt(0);
          if (code <= 57 && code >= 48) return this.readNumber();
          if (this._isIdentifierCharCode(code)) return this.readIdentifier();
        }
      }
      throw new ParseError(`Unexpected character: ${ch}`, { pos: pos2, input });
    }
  }
  // Characters: 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_
  _isIdentifierCharCode(c2) {
    if (c2 < 48 || c2 > 122) return false;
    return c2 >= 97 || c2 >= 65 && c2 <= 90 || c2 <= 57 || c2 === 95;
  }
  _parseAsDouble(start, end) {
    const value = Number(this.input.substring(start, end));
    if (Number.isFinite(value)) return this.token(start, TOKEN.NUMBER, value);
    throw new ParseError(`Invalid number: ${value}`, { pos: start, input: this.input });
  }
  _parseAsBigInt(start, end, isHex, unsigned) {
    const string = this.input.substring(start, end);
    if (unsigned === "u" || unsigned === "U") {
      this.pos++;
      try {
        return this.token(start, TOKEN.NUMBER, new UnsignedInt(string));
      } catch (_err) {
      }
    } else {
      try {
        return this.token(start, TOKEN.NUMBER, BigInt(string));
      } catch (_err) {
      }
    }
    throw new ParseError(isHex ? `Invalid hex integer: ${string}` : `Invalid integer: ${string}`, {
      pos: start,
      input: this.input
    });
  }
  _readDigits(input, length, pos2, code) {
    while (pos2 < length && (code = input.charCodeAt(pos2)) && !(code > 57 || code < 48)) pos2++;
    return pos2;
  }
  _readExponent(input, length, pos2) {
    let ch = pos2 < length && input[pos2];
    if (ch === "e" || ch === "E") {
      ch = ++pos2 < length && input[pos2];
      if (ch === "-" || ch === "+") pos2++;
      const start = pos2;
      pos2 = this._readDigits(input, length, pos2);
      if (start === pos2) throw new ParseError("Invalid exponent", { pos: pos2, input });
    }
    return pos2;
  }
  readNumber() {
    const { input, length, pos: start } = this;
    let pos2 = start;
    if (input[pos2] === "0" && (input[pos2 + 1] === "x" || input[pos2 + 1] === "X")) {
      pos2 += 2;
      while (pos2 < length && HEX_CODES[input[pos2].charCodeAt(0)]) pos2++;
      return this._parseAsBigInt(start, this.pos = pos2, true, input[pos2]);
    }
    pos2 = this._readDigits(input, length, pos2);
    if (pos2 + 1 < length) {
      let isDouble = false;
      let afterpos = input[pos2] === "." ? this._readDigits(input, length, pos2 + 1) : pos2 + 1;
      if (afterpos !== pos2 + 1) (isDouble = true) && (pos2 = afterpos);
      afterpos = this._readExponent(input, length, pos2);
      if (afterpos !== pos2) (isDouble = true) && (pos2 = afterpos);
      if (isDouble) return this._parseAsDouble(start, this.pos = pos2);
    }
    return this._parseAsBigInt(start, this.pos = pos2, false, input[pos2]);
  }
  readString(del, prefix) {
    const { input: i, pos: s } = this;
    if (i[s + 1] === del && i[s + 2] === del) return this.readTripleQuotedString(del, prefix);
    return this.readSingleQuotedString(del, prefix);
  }
  _closeQuotedString(rawValue, prefix, pos2) {
    switch (prefix) {
      case "b":
      case "B": {
        const processed = this.processEscapes(rawValue, true);
        const bytes = new Uint8Array(processed.length);
        for (let i = 0; i < processed.length; i++) bytes[i] = processed.charCodeAt(i) & 255;
        return this.token(pos2 - 1, TOKEN.BYTES, bytes);
      }
      case "r":
      case "R": {
        return this.token(pos2 - 1, TOKEN.STRING, rawValue);
      }
      default: {
        const value = this.processEscapes(rawValue, false);
        return this.token(pos2, TOKEN.STRING, value);
      }
    }
  }
  readSingleQuotedString(delimiter, prefix) {
    const { input, length, pos: start } = this;
    let ch;
    let pos2 = this.pos + 1;
    while (pos2 < length && (ch = input[pos2])) {
      switch (ch) {
        case delimiter:
          const rawValue = input.slice(start + 1, pos2);
          this.pos = ++pos2;
          return this._closeQuotedString(rawValue, prefix, start);
        case "\n":
        case "\r":
          throw new ParseError("Newlines not allowed in single-quoted strings", { pos: start, input });
        case "\\":
          pos2++;
      }
      pos2++;
    }
    throw new ParseError("Unterminated string", { pos: start, input });
  }
  readTripleQuotedString(delimiter, prefix) {
    const { input, length, pos: start } = this;
    let ch;
    let pos2 = this.pos + 3;
    while (pos2 < length && (ch = input[pos2])) {
      switch (ch) {
        case delimiter:
          if (input[pos2 + 1] === delimiter && input[pos2 + 2] === delimiter) {
            const rawValue = input.slice(start + 3, pos2);
            this.pos = pos2 + 3;
            return this._closeQuotedString(rawValue, prefix, start);
          }
          break;
        case "\\":
          pos2++;
      }
      pos2++;
    }
    throw new ParseError("Unterminated triple-quoted string", { pos: start, input });
  }
  processEscapes(str, isBytes) {
    if (!str.includes("\\")) return str;
    let result = "";
    let i = 0;
    while (i < str.length) {
      if (str[i] !== "\\" || i + 1 >= str.length) {
        result += str[i++];
        continue;
      }
      const next = str[i + 1];
      if (STRING_ESCAPES[next]) {
        result += STRING_ESCAPES[next];
        i += 2;
      } else if (next === "u") {
        if (isBytes) throw new ParseError("\\u not allowed in bytes literals");
        const hex = str.substring(i + 2, i += 6);
        if (!/^[0-9a-fA-F]{4}$/.test(hex)) throw new ParseError(`Invalid Unicode escape: \\u${hex}`);
        const c2 = Number.parseInt(hex, 16);
        if (c2 >= 55296 && c2 <= 57343) throw new ParseError(`Invalid Unicode surrogate: \\u${hex}`);
        result += String.fromCharCode(c2);
      } else if (next === "U") {
        if (isBytes) throw new ParseError("\\U not allowed in bytes literals");
        const hex = str.substring(i + 2, i += 10);
        if (!/^[0-9a-fA-F]{8}$/.test(hex)) throw new ParseError(`Invalid Unicode escape: \\U${hex}`);
        const c2 = Number.parseInt(hex, 16);
        if (c2 > 1114111) throw new ParseError(`Invalid Unicode escape: \\U${hex}`);
        if (c2 >= 55296 && c2 <= 57343) throw new ParseError(`Invalid Unicode surrogate: \\U${hex}`);
        result += String.fromCodePoint(c2);
      } else if (next === "x" || next === "X") {
        const h = str.substring(i + 2, i += 4);
        if (!/^[0-9a-fA-F]{2}$/.test(h)) throw new ParseError(`Invalid hex escape: \\${next}${h}`);
        result += String.fromCharCode(Number.parseInt(h, 16));
      } else if (next >= "0" && next <= "7") {
        const o = str.substring(i + 1, i += 4);
        if (!/^[0-7]{3}$/.test(o)) throw new ParseError("Octal escape must be 3 digits");
        const value = Number.parseInt(o, 8);
        if (value > 255) throw new ParseError(`Octal escape out of range: \\${o}`);
        result += String.fromCharCode(value);
      } else {
        throw new ParseError(`Invalid escape sequence: \\${next}`);
      }
    }
    return result;
  }
  readIdentifier() {
    const { pos: pos2, input, length } = this;
    let p = pos2;
    while (p < length && this._isIdentifierCharCode(input[p].charCodeAt(0))) p++;
    const value = input.substring(pos2, this.pos = p);
    switch (value) {
      case "true":
        return this.token(pos2, TOKEN.BOOLEAN, true);
      case "false":
        return this.token(pos2, TOKEN.BOOLEAN, false);
      case "null":
        return this.token(pos2, TOKEN.NULL, null);
      case "in":
        return this.token(pos2, TOKEN.IN);
      default:
        return this.token(pos2, TOKEN.IDENTIFIER, value);
    }
  }
}
class Parser {
  constructor(limits, registry2) {
    __privateAdd(this, _Parser_instances);
    __publicField(this, "lexer", null);
    __publicField(this, "input", null);
    __publicField(this, "maxDepthRemaining", null);
    __publicField(this, "astNodesRemaining", null);
    __publicField(this, "type", null);
    __publicField(this, "pos", null);
    this.limits = limits;
    this.registry = registry2;
    this.lexer = new Lexer();
  }
  // The value of the current token is accessed less regularly,
  // so we use a getter to reduce assignment overhead
  get value() {
    return this.lexer.tokenValue;
  }
  consume(expectedType) {
    if (this.type === expectedType) return __privateMethod(this, _Parser_instances, advanceToken_fn).call(this);
    throw new ParseError(
      `Expected ${TOKEN_BY_NUMBER[expectedType]}, got ${TOKEN_BY_NUMBER[this.type]}`,
      { pos: this.pos, input: this.input }
    );
  }
  match(type2) {
    return this.type === type2;
  }
  // Parse entry point
  parse(input) {
    if (typeof input !== "string") throw new ParseError("Expression must be a string");
    this.input = this.lexer.reset(input);
    __privateMethod(this, _Parser_instances, advanceToken_fn).call(this);
    this.maxDepthRemaining = this.limits.maxDepth;
    this.astNodesRemaining = this.limits.maxAstNodes;
    const result = this.parseExpression();
    if (this.match(TOKEN.EOF)) return result;
    throw new ParseError(`Unexpected character: '${this.input[this.lexer.pos - 1]}'`, {
      pos: this.pos,
      input: this.input
    });
  }
  // Expression ::= LogicalOr ('?' Expression ':' Expression)?
  parseExpression() {
    if (!this.maxDepthRemaining--) __privateMethod(this, _Parser_instances, limitExceeded_fn).call(this, "maxDepth");
    const expr = this.parseLogicalOr();
    if (!this.match(TOKEN.QUESTION)) return ++this.maxDepthRemaining && expr;
    const questionPos = __privateMethod(this, _Parser_instances, advanceToken_fn).call(this);
    const consequent = this.parseExpression();
    this.consume(TOKEN.COLON);
    const alternate = this.parseExpression();
    this.maxDepthRemaining++;
    return __privateMethod(this, _Parser_instances, node_fn).call(this, questionPos, OPERATORS.ternary, [expr, consequent, alternate]);
  }
  // LogicalOr ::= LogicalAnd ('||' LogicalAnd)*
  parseLogicalOr() {
    let expr = this.parseLogicalAnd();
    while (this.match(TOKEN.OR))
      expr = __privateMethod(this, _Parser_instances, node_fn).call(this, __privateMethod(this, _Parser_instances, advanceToken_fn).call(this), OPERATORS["||"], [expr, this.parseLogicalAnd()]);
    return expr;
  }
  // LogicalAnd ::= Equality ('&&' Equality)*
  parseLogicalAnd() {
    let expr = this.parseEquality();
    while (this.match(TOKEN.AND))
      expr = __privateMethod(this, _Parser_instances, node_fn).call(this, __privateMethod(this, _Parser_instances, advanceToken_fn).call(this), OPERATORS["&&"], [expr, this.parseEquality()]);
    return expr;
  }
  // Equality ::= Relational (('==' | '!=') Relational)*
  parseEquality() {
    let expr = this.parseRelational();
    while (this.match(TOKEN.EQ) || this.match(TOKEN.NE)) {
      const op = OP_FOR_TOKEN[this.type];
      expr = __privateMethod(this, _Parser_instances, node_fn).call(this, __privateMethod(this, _Parser_instances, advanceToken_fn).call(this), op, [expr, this.parseRelational()]);
    }
    return expr;
  }
  // Relational ::= Additive (('<' | '<=' | '>' | '>=' | 'in') Additive)*
  parseRelational() {
    let expr = this.parseAdditive();
    while (this.match(TOKEN.LT) || this.match(TOKEN.LE) || this.match(TOKEN.GT) || this.match(TOKEN.GE) || this.match(TOKEN.IN)) {
      const op = OP_FOR_TOKEN[this.type];
      expr = __privateMethod(this, _Parser_instances, node_fn).call(this, __privateMethod(this, _Parser_instances, advanceToken_fn).call(this), op, [expr, this.parseAdditive()]);
    }
    return expr;
  }
  // Additive ::= Multiplicative (('+' | '-') Multiplicative)*
  parseAdditive() {
    let expr = this.parseMultiplicative();
    while (this.match(TOKEN.PLUS) || this.match(TOKEN.MINUS)) {
      const op = OP_FOR_TOKEN[this.type];
      expr = __privateMethod(this, _Parser_instances, node_fn).call(this, __privateMethod(this, _Parser_instances, advanceToken_fn).call(this), op, [expr, this.parseMultiplicative()]);
    }
    return expr;
  }
  // Multiplicative ::= Unary (('*' | '/' | '%') Unary)*
  parseMultiplicative() {
    let expr = this.parseUnary();
    while (this.match(TOKEN.MULTIPLY) || this.match(TOKEN.DIVIDE) || this.match(TOKEN.MODULO)) {
      const op = OP_FOR_TOKEN[this.type];
      expr = __privateMethod(this, _Parser_instances, node_fn).call(this, __privateMethod(this, _Parser_instances, advanceToken_fn).call(this), op, [expr, this.parseUnary()]);
    }
    return expr;
  }
  // Unary ::= ('!' | '-')* Postfix
  parseUnary() {
    if (this.type === TOKEN.NOT)
      return __privateMethod(this, _Parser_instances, node_fn).call(this, __privateMethod(this, _Parser_instances, advanceToken_fn).call(this), OPERATORS.unaryNot, this.parseUnary());
    if (this.type === TOKEN.MINUS)
      return __privateMethod(this, _Parser_instances, node_fn).call(this, __privateMethod(this, _Parser_instances, advanceToken_fn).call(this), OPERATORS.unaryMinus, this.parseUnary());
    return this.parsePostfix();
  }
  // Postfix ::= Primary (('.' IDENTIFIER ('(' ArgumentList ')')? | '[' Expression ']'))*
  parsePostfix() {
    let expr = this.parsePrimary();
    const depth = this.maxDepthRemaining;
    while (true) {
      if (this.match(TOKEN.DOT)) {
        const dot = __privateMethod(this, _Parser_instances, advanceToken_fn).call(this);
        if (!this.maxDepthRemaining--) __privateMethod(this, _Parser_instances, limitExceeded_fn).call(this, "maxDepth", dot);
        const op = this.match(TOKEN.QUESTION) && this.registry.enableOptionalTypes && __privateMethod(this, _Parser_instances, advanceToken_fn).call(this) ? OPERATORS.optionalFieldAccess : OPERATORS.fieldAccess;
        const propertyValue = this.value;
        const propertyPos = this.consume(TOKEN.IDENTIFIER);
        if (op === OPERATORS.fieldAccess && this.match(TOKEN.LPAREN) && __privateMethod(this, _Parser_instances, advanceToken_fn).call(this)) {
          const args = this.parseArgumentList();
          this.consume(TOKEN.RPAREN);
          expr = __privateMethod(this, _Parser_instances, expandMacro_fn).call(this, propertyPos, OPERATORS.rcall, [propertyValue, expr, args]);
        } else {
          expr = __privateMethod(this, _Parser_instances, node_fn).call(this, propertyPos, op, [expr, propertyValue]);
        }
        continue;
      }
      if (this.match(TOKEN.LBRACKET)) {
        const bracket = __privateMethod(this, _Parser_instances, advanceToken_fn).call(this);
        if (!this.maxDepthRemaining--) __privateMethod(this, _Parser_instances, limitExceeded_fn).call(this, "maxDepth", bracket);
        const op = this.match(TOKEN.QUESTION) && this.registry.enableOptionalTypes && __privateMethod(this, _Parser_instances, advanceToken_fn).call(this) ? OPERATORS.optionalBracketAccess : OPERATORS.bracketAccess;
        const index = this.parseExpression();
        this.consume(TOKEN.RBRACKET);
        expr = __privateMethod(this, _Parser_instances, node_fn).call(this, bracket, op, [expr, index]);
        continue;
      }
      break;
    }
    this.maxDepthRemaining = depth;
    return expr;
  }
  // Primary ::= NUMBER | STRING | BOOLEAN | NULL | IDENTIFIER | '(' Expression ')' | Array | Object
  parsePrimary() {
    switch (this.type) {
      case TOKEN.NUMBER:
      case TOKEN.STRING:
      case TOKEN.BYTES:
      case TOKEN.BOOLEAN:
      case TOKEN.NULL:
        return __privateMethod(this, _Parser_instances, consumeLiteral_fn).call(this);
      case TOKEN.IDENTIFIER:
        return __privateMethod(this, _Parser_instances, parseIdentifierPrimary_fn).call(this);
      case TOKEN.LPAREN:
        return __privateMethod(this, _Parser_instances, parseParenthesizedExpression_fn).call(this);
      case TOKEN.LBRACKET:
        return this.parseList();
      case TOKEN.LBRACE:
        return this.parseMap();
    }
    throw new ParseError(`Unexpected token: ${TOKEN_BY_NUMBER[this.type]}`, {
      pos: this.pos,
      input: this.input
    });
  }
  parseList() {
    const token2 = this.consume(TOKEN.LBRACKET);
    const elements = [];
    let remainingElements = this.limits.maxListElements;
    if (!this.match(TOKEN.RBRACKET)) {
      elements.push(this.parseExpression());
      if (!remainingElements--) __privateMethod(this, _Parser_instances, limitExceeded_fn).call(this, "maxListElements", elements.at(-1).pos);
      while (this.match(TOKEN.COMMA)) {
        __privateMethod(this, _Parser_instances, advanceToken_fn).call(this);
        if (this.match(TOKEN.RBRACKET)) break;
        elements.push(this.parseExpression());
        if (!remainingElements--) __privateMethod(this, _Parser_instances, limitExceeded_fn).call(this, "maxListElements", elements.at(-1).pos);
      }
    }
    this.consume(TOKEN.RBRACKET);
    return __privateMethod(this, _Parser_instances, node_fn).call(this, token2, OPERATORS.list, elements);
  }
  parseMap() {
    const token2 = this.consume(TOKEN.LBRACE);
    const props = [];
    let remainingEntries = this.limits.maxMapEntries;
    if (!this.match(TOKEN.RBRACE)) {
      props.push(this.parseProperty());
      if (!remainingEntries--) __privateMethod(this, _Parser_instances, limitExceeded_fn).call(this, "maxMapEntries", props.at(-1)[0].pos);
      while (this.match(TOKEN.COMMA)) {
        __privateMethod(this, _Parser_instances, advanceToken_fn).call(this);
        if (this.match(TOKEN.RBRACE)) break;
        props.push(this.parseProperty());
        if (!remainingEntries--) __privateMethod(this, _Parser_instances, limitExceeded_fn).call(this, "maxMapEntries", props.at(-1)[0].pos);
      }
    }
    this.consume(TOKEN.RBRACE);
    return __privateMethod(this, _Parser_instances, node_fn).call(this, token2, OPERATORS.map, props);
  }
  parseProperty() {
    return [this.parseExpression(), (this.consume(TOKEN.COLON), this.parseExpression())];
  }
  parseArgumentList() {
    const args = [];
    let remainingArgs = this.limits.maxCallArguments;
    if (!this.match(TOKEN.RPAREN)) {
      args.push(this.parseExpression());
      if (!remainingArgs--) __privateMethod(this, _Parser_instances, limitExceeded_fn).call(this, "maxCallArguments", args.at(-1).pos);
      while (this.match(TOKEN.COMMA)) {
        __privateMethod(this, _Parser_instances, advanceToken_fn).call(this);
        if (this.match(TOKEN.RPAREN)) break;
        args.push(this.parseExpression());
        if (!remainingArgs--) __privateMethod(this, _Parser_instances, limitExceeded_fn).call(this, "maxCallArguments", args.at(-1).pos);
      }
    }
    return args;
  }
}
_Parser_instances = new WeakSet();
limitExceeded_fn = function(limitKey, pos2 = this.pos) {
  throw new ParseError(`Exceeded ${limitKey} (${this.limits[limitKey]})`, {
    pos: pos2,
    input: this.input
  });
};
node_fn = function(pos2, op, args) {
  const node = new ASTNode(this.input, pos2, op, args);
  if (!this.astNodesRemaining--) __privateMethod(this, _Parser_instances, limitExceeded_fn).call(this, "maxAstNodes", pos2);
  return node;
};
advanceToken_fn = function(returnValue = this.pos) {
  const l = this.lexer.nextToken();
  this.pos = l.tokenPos;
  this.type = l.tokenType;
  return returnValue;
};
expandMacro_fn = function(pos2, op, args) {
  const [methodName, receiver, fnArgs] = op === OPERATORS.rcall ? args : [args[0], null, args[1]];
  const decl = this.registry.findMacro(methodName, !!receiver, fnArgs.length);
  const ast = __privateMethod(this, _Parser_instances, node_fn).call(this, pos2, op, args);
  if (!decl) return ast;
  const macro = decl.handler({ ast, args: fnArgs, receiver, methodName, parser: this });
  if (macro.callAst) ast.setMeta("alternate", macro.callAst);
  else ast.setMeta("macro", macro);
  return ast;
};
consumeLiteral_fn = function() {
  return __privateMethod(this, _Parser_instances, advanceToken_fn).call(this, __privateMethod(this, _Parser_instances, node_fn).call(this, this.pos, OPERATORS.value, this.value));
};
parseIdentifierPrimary_fn = function() {
  const value = this.value;
  const pos2 = this.consume(TOKEN.IDENTIFIER);
  if (RESERVED.has(value)) {
    throw new ParseError(`Reserved identifier: ${value}`, {
      pos: pos2,
      input: this.input
    });
  }
  if (!this.match(TOKEN.LPAREN)) return __privateMethod(this, _Parser_instances, node_fn).call(this, pos2, OPERATORS.id, value);
  __privateMethod(this, _Parser_instances, advanceToken_fn).call(this);
  const args = this.parseArgumentList();
  this.consume(TOKEN.RPAREN);
  return __privateMethod(this, _Parser_instances, expandMacro_fn).call(this, pos2, OPERATORS.call, [value, args]);
};
parseParenthesizedExpression_fn = function() {
  this.consume(TOKEN.LPAREN);
  const expr = this.parseExpression();
  this.consume(TOKEN.RPAREN);
  return expr;
};
const DEFAULT_LIMITS = objFreeze({
  maxAstNodes: 1e5,
  maxDepth: 250,
  maxListElements: 1e3,
  maxMapEntries: 1e3,
  maxCallArguments: 32
});
const LIMIT_KEYS = new Set(objKeys(DEFAULT_LIMITS));
function createLimits(overrides, base = DEFAULT_LIMITS) {
  const keys = overrides ? objKeys(overrides) : void 0;
  if (!keys?.length) return base;
  const merged = { ...base };
  for (const key2 of keys) {
    if (!LIMIT_KEYS.has(key2)) throw new TypeError(`Unknown limits option: ${key2}`);
    const value = overrides[key2];
    if (typeof value !== "number") continue;
    merged[key2] = value;
  }
  return objFreeze(merged);
}
const DEFAULT_OPTIONS = objFreeze({
  unlistedVariablesAreDyn: false,
  homogeneousAggregateLiterals: true,
  enableOptionalTypes: false,
  limits: DEFAULT_LIMITS
});
function bool(a, b, key2) {
  const value = a?.[key2] ?? b?.[key2];
  if (typeof value !== "boolean") throw new TypeError(`Invalid option: ${key2}`);
  return value;
}
function createOptions(opts, base = DEFAULT_OPTIONS) {
  if (!opts) return base;
  return objFreeze({
    unlistedVariablesAreDyn: bool(opts, base, "unlistedVariablesAreDyn"),
    homogeneousAggregateLiterals: bool(opts, base, "homogeneousAggregateLiterals"),
    enableOptionalTypes: bool(opts, base, "enableOptionalTypes"),
    limits: createLimits(opts.limits, base.limits)
  });
}
const globalRegistry = createRegistry({ enableOptionalTypes: false });
registerFunctions(globalRegistry);
registerOverloads(globalRegistry);
registerMacros(globalRegistry);
const registryByEnvironment = /* @__PURE__ */ new WeakMap();
const _Environment = class _Environment {
  constructor(opts, inherited) {
    __privateAdd(this, _Environment_instances);
    __privateAdd(this, _registry);
    __privateAdd(this, _evaluator);
    __privateAdd(this, _typeChecker);
    __privateAdd(this, _evalTypeChecker);
    __privateAdd(this, _parser);
    this.opts = createOptions(opts, inherited?.opts);
    __privateSet(this, _registry, (inherited instanceof _Environment ? registryByEnvironment.get(inherited) : globalRegistry).clone(this.opts));
    const childOpts = {
      objectTypes: __privateGet(this, _registry).objectTypes,
      objectTypesByConstructor: __privateGet(this, _registry).objectTypesByConstructor,
      registry: __privateGet(this, _registry),
      opts: this.opts
    };
    __privateSet(this, _typeChecker, new TypeChecker(childOpts));
    __privateSet(this, _evalTypeChecker, new TypeChecker(childOpts, true));
    __privateSet(this, _evaluator, new Evaluator(childOpts));
    __privateSet(this, _parser, new Parser(this.opts.limits, __privateGet(this, _registry)));
    registryByEnvironment.set(this, __privateGet(this, _registry));
    Object.freeze(this);
  }
  clone(opts) {
    return new _Environment(opts, this);
  }
  registerFunction(signature, handler, opts) {
    __privateGet(this, _registry).registerFunctionOverload(signature, handler, opts);
    return this;
  }
  registerOperator(string, handler) {
    __privateGet(this, _registry).registerOperatorOverload(string, handler);
    return this;
  }
  registerType(typename, constructor) {
    __privateGet(this, _registry).registerType(typename, constructor);
    return this;
  }
  registerVariable(name, type2, opts) {
    __privateGet(this, _registry).registerVariable(name, type2, opts);
    return this;
  }
  registerConstant(name, type2, value) {
    __privateGet(this, _registry).registerConstant(name, type2, value);
    return this;
  }
  hasVariable(name) {
    return __privateGet(this, _registry).variables.has(name);
  }
  getDefinitions() {
    return __privateGet(this, _registry).getDefinitions();
  }
  check(expression) {
    try {
      return __privateMethod(this, _Environment_instances, checkAST_fn).call(this, __privateGet(this, _parser).parse(expression));
    } catch (e) {
      return { valid: false, error: e };
    }
  }
  parse(expression) {
    const ast = __privateGet(this, _parser).parse(expression);
    const evaluateParsed = __privateMethod(this, _Environment_instances, evaluateAST_fn).bind(this, ast);
    evaluateParsed.check = __privateMethod(this, _Environment_instances, checkAST_fn).bind(this, ast);
    evaluateParsed.ast = ast;
    return evaluateParsed;
  }
  evaluate(expression, context) {
    return __privateMethod(this, _Environment_instances, evaluateAST_fn).call(this, __privateGet(this, _parser).parse(expression), context);
  }
};
_registry = new WeakMap();
_evaluator = new WeakMap();
_typeChecker = new WeakMap();
_evalTypeChecker = new WeakMap();
_parser = new WeakMap();
_Environment_instances = new WeakSet();
checkAST_fn = function(ast) {
  try {
    const typeDecl = __privateGet(this, _typeChecker).check(ast, new RootContext(__privateGet(this, _registry)));
    return { valid: true, type: __privateMethod(this, _Environment_instances, formatTypeForCheck_fn).call(this, typeDecl) };
  } catch (e) {
    return { valid: false, error: e };
  }
};
formatTypeForCheck_fn = function(typeDecl) {
  if (typeDecl.name === `list<dyn>`) return "list";
  if (typeDecl.name === `map<dyn, dyn>`) return "map";
  return typeDecl.name;
};
evaluateAST_fn = function(ast, ctx) {
  ctx = new RootContext(__privateGet(this, _registry), ctx);
  if (!ast.checkedType) __privateGet(this, _evalTypeChecker).check(ast, ctx);
  return __privateGet(this, _evaluator).eval(ast, ctx);
};
let Environment = _Environment;
class Evaluator extends Base {
  constructor(opts) {
    super(opts);
    __privateAdd(this, _Evaluator_instances);
    this.Error = EvaluationError;
  }
  debugOperandType(value, checkedType) {
    return checkedType?.hasDynType === false ? checkedType : __privateMethod(this, _Evaluator_instances, inferType_fn).call(this, value).wrappedType;
  }
  debugRuntimeType(value, checkedType) {
    return checkedType?.hasDynType === false ? checkedType : __privateMethod(this, _Evaluator_instances, inferType_fn).call(this, value);
  }
  tryEval(ast, ctx) {
    try {
      const res = this.eval(ast, ctx);
      if (res instanceof Promise) return res.catch((err) => err);
      return res;
    } catch (err) {
      return err;
    }
  }
  eval(ast, ctx) {
    return ast.evaluate(this, ast, ctx);
  }
}
_Evaluator_instances = new WeakSet();
inferListType_fn = function(list, fb) {
  const first = list instanceof Array ? list[0] : list.values().next().value;
  if (first === void 0) return fb;
  return this.registry.getListType(__privateMethod(this, _Evaluator_instances, inferType_fn).call(this, first));
};
firstMapElement_fn = function(coll) {
  if (coll instanceof Map) return coll.entries().next().value;
  for (const key2 in coll) return [key2, coll[key2]];
};
inferMapType_fn = function(value, fb) {
  const first = __privateMethod(this, _Evaluator_instances, firstMapElement_fn).call(this, value);
  if (!first) return fb;
  return this.registry.getMapType(
    fb.keyType.hasDynType ? __privateMethod(this, _Evaluator_instances, inferType_fn).call(this, first[0]) : fb.keyType,
    fb.valueType.hasDynType ? __privateMethod(this, _Evaluator_instances, inferType_fn).call(this, first[1]) : fb.valueType
  );
};
inferType_fn = function(value) {
  const runtimeType = this.debugType(value);
  switch (runtimeType.kind) {
    case "list":
      return __privateMethod(this, _Evaluator_instances, inferListType_fn).call(this, value, runtimeType);
    case "map":
      return __privateMethod(this, _Evaluator_instances, inferMapType_fn).call(this, value, runtimeType);
    default:
      return runtimeType;
  }
};
new Environment({
  unlistedVariablesAreDyn: true
});
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var object_hash = { exports: {} };
var hasRequiredObject_hash;
function requireObject_hash() {
  if (hasRequiredObject_hash) return object_hash.exports;
  hasRequiredObject_hash = 1;
  (function(module, exports$1) {
    !(function(e) {
      module.exports = e();
    })(function() {
      return (function r(o, i, u) {
        function s(n, e2) {
          if (!i[n]) {
            if (!o[n]) {
              var t = "function" == typeof commonjsRequire && commonjsRequire;
              if (!e2 && t) return t(n, true);
              if (a) return a(n, true);
              throw new Error("Cannot find module '" + n + "'");
            }
            e2 = i[n] = { exports: {} };
            o[n][0].call(e2.exports, function(e3) {
              var t2 = o[n][1][e3];
              return s(t2 || e3);
            }, e2, e2.exports, r, o, i, u);
          }
          return i[n].exports;
        }
        for (var a = "function" == typeof commonjsRequire && commonjsRequire, e = 0; e < u.length; e++) s(u[e]);
        return s;
      })({ 1: [function(w, b, m) {
        !(function(e, n, s, c2, d, h, p, g, y) {
          var r = w("crypto");
          function t(e2, t2) {
            t2 = u(e2, t2);
            var n2;
            return void 0 === (n2 = "passthrough" !== t2.algorithm ? r.createHash(t2.algorithm) : new l()).write && (n2.write = n2.update, n2.end = n2.update), f(t2, n2).dispatch(e2), n2.update || n2.end(""), n2.digest ? n2.digest("buffer" === t2.encoding ? void 0 : t2.encoding) : (e2 = n2.read(), "buffer" !== t2.encoding ? e2.toString(t2.encoding) : e2);
          }
          (m = b.exports = t).sha1 = function(e2) {
            return t(e2);
          }, m.keys = function(e2) {
            return t(e2, { excludeValues: true, algorithm: "sha1", encoding: "hex" });
          }, m.MD5 = function(e2) {
            return t(e2, { algorithm: "md5", encoding: "hex" });
          }, m.keysMD5 = function(e2) {
            return t(e2, { algorithm: "md5", encoding: "hex", excludeValues: true });
          };
          var o = r.getHashes ? r.getHashes().slice() : ["sha1", "md5"], i = (o.push("passthrough"), ["buffer", "hex", "binary", "base64"]);
          function u(e2, t2) {
            var n2 = {};
            if (n2.algorithm = (t2 = t2 || {}).algorithm || "sha1", n2.encoding = t2.encoding || "hex", n2.excludeValues = !!t2.excludeValues, n2.algorithm = n2.algorithm.toLowerCase(), n2.encoding = n2.encoding.toLowerCase(), n2.ignoreUnknown = true === t2.ignoreUnknown, n2.respectType = false !== t2.respectType, n2.respectFunctionNames = false !== t2.respectFunctionNames, n2.respectFunctionProperties = false !== t2.respectFunctionProperties, n2.unorderedArrays = true === t2.unorderedArrays, n2.unorderedSets = false !== t2.unorderedSets, n2.unorderedObjects = false !== t2.unorderedObjects, n2.replacer = t2.replacer || void 0, n2.excludeKeys = t2.excludeKeys || void 0, void 0 === e2) throw new Error("Object argument required.");
            for (var r2 = 0; r2 < o.length; ++r2) o[r2].toLowerCase() === n2.algorithm.toLowerCase() && (n2.algorithm = o[r2]);
            if (-1 === o.indexOf(n2.algorithm)) throw new Error('Algorithm "' + n2.algorithm + '"  not supported. supported values: ' + o.join(", "));
            if (-1 === i.indexOf(n2.encoding) && "passthrough" !== n2.algorithm) throw new Error('Encoding "' + n2.encoding + '"  not supported. supported values: ' + i.join(", "));
            return n2;
          }
          function a(e2) {
            if ("function" == typeof e2) return null != /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e2));
          }
          function f(o2, t2, i2) {
            i2 = i2 || [];
            function u2(e2) {
              return t2.update ? t2.update(e2, "utf8") : t2.write(e2, "utf8");
            }
            return { dispatch: function(e2) {
              return this["_" + (null === (e2 = o2.replacer ? o2.replacer(e2) : e2) ? "null" : typeof e2)](e2);
            }, _object: function(t3) {
              var n2, e2 = Object.prototype.toString.call(t3), r2 = /\[object (.*)\]/i.exec(e2);
              r2 = (r2 = r2 ? r2[1] : "unknown:[" + e2 + "]").toLowerCase();
              if (0 <= (e2 = i2.indexOf(t3))) return this.dispatch("[CIRCULAR:" + e2 + "]");
              if (i2.push(t3), void 0 !== s && s.isBuffer && s.isBuffer(t3)) return u2("buffer:"), u2(t3);
              if ("object" === r2 || "function" === r2 || "asyncfunction" === r2) return e2 = Object.keys(t3), o2.unorderedObjects && (e2 = e2.sort()), false === o2.respectType || a(t3) || e2.splice(0, 0, "prototype", "__proto__", "constructor"), o2.excludeKeys && (e2 = e2.filter(function(e3) {
                return !o2.excludeKeys(e3);
              })), u2("object:" + e2.length + ":"), n2 = this, e2.forEach(function(e3) {
                n2.dispatch(e3), u2(":"), o2.excludeValues || n2.dispatch(t3[e3]), u2(",");
              });
              if (!this["_" + r2]) {
                if (o2.ignoreUnknown) return u2("[" + r2 + "]");
                throw new Error('Unknown object type "' + r2 + '"');
              }
              this["_" + r2](t3);
            }, _array: function(e2, t3) {
              t3 = void 0 !== t3 ? t3 : false !== o2.unorderedArrays;
              var n2 = this;
              if (u2("array:" + e2.length + ":"), !t3 || e2.length <= 1) return e2.forEach(function(e3) {
                return n2.dispatch(e3);
              });
              var r2 = [], t3 = e2.map(function(e3) {
                var t4 = new l(), n3 = i2.slice();
                return f(o2, t4, n3).dispatch(e3), r2 = r2.concat(n3.slice(i2.length)), t4.read().toString();
              });
              return i2 = i2.concat(r2), t3.sort(), this._array(t3, false);
            }, _date: function(e2) {
              return u2("date:" + e2.toJSON());
            }, _symbol: function(e2) {
              return u2("symbol:" + e2.toString());
            }, _error: function(e2) {
              return u2("error:" + e2.toString());
            }, _boolean: function(e2) {
              return u2("bool:" + e2.toString());
            }, _string: function(e2) {
              u2("string:" + e2.length + ":"), u2(e2.toString());
            }, _function: function(e2) {
              u2("fn:"), a(e2) ? this.dispatch("[native]") : this.dispatch(e2.toString()), false !== o2.respectFunctionNames && this.dispatch("function-name:" + String(e2.name)), o2.respectFunctionProperties && this._object(e2);
            }, _number: function(e2) {
              return u2("number:" + e2.toString());
            }, _xml: function(e2) {
              return u2("xml:" + e2.toString());
            }, _null: function() {
              return u2("Null");
            }, _undefined: function() {
              return u2("Undefined");
            }, _regexp: function(e2) {
              return u2("regex:" + e2.toString());
            }, _uint8array: function(e2) {
              return u2("uint8array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _uint8clampedarray: function(e2) {
              return u2("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _int8array: function(e2) {
              return u2("int8array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _uint16array: function(e2) {
              return u2("uint16array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _int16array: function(e2) {
              return u2("int16array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _uint32array: function(e2) {
              return u2("uint32array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _int32array: function(e2) {
              return u2("int32array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _float32array: function(e2) {
              return u2("float32array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _float64array: function(e2) {
              return u2("float64array:"), this.dispatch(Array.prototype.slice.call(e2));
            }, _arraybuffer: function(e2) {
              return u2("arraybuffer:"), this.dispatch(new Uint8Array(e2));
            }, _url: function(e2) {
              return u2("url:" + e2.toString());
            }, _map: function(e2) {
              u2("map:");
              e2 = Array.from(e2);
              return this._array(e2, false !== o2.unorderedSets);
            }, _set: function(e2) {
              u2("set:");
              e2 = Array.from(e2);
              return this._array(e2, false !== o2.unorderedSets);
            }, _file: function(e2) {
              return u2("file:"), this.dispatch([e2.name, e2.size, e2.type, e2.lastModfied]);
            }, _blob: function() {
              if (o2.ignoreUnknown) return u2("[blob]");
              throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n');
            }, _domwindow: function() {
              return u2("domwindow");
            }, _bigint: function(e2) {
              return u2("bigint:" + e2.toString());
            }, _process: function() {
              return u2("process");
            }, _timer: function() {
              return u2("timer");
            }, _pipe: function() {
              return u2("pipe");
            }, _tcp: function() {
              return u2("tcp");
            }, _udp: function() {
              return u2("udp");
            }, _tty: function() {
              return u2("tty");
            }, _statwatcher: function() {
              return u2("statwatcher");
            }, _securecontext: function() {
              return u2("securecontext");
            }, _connection: function() {
              return u2("connection");
            }, _zlib: function() {
              return u2("zlib");
            }, _context: function() {
              return u2("context");
            }, _nodescript: function() {
              return u2("nodescript");
            }, _httpparser: function() {
              return u2("httpparser");
            }, _dataview: function() {
              return u2("dataview");
            }, _signal: function() {
              return u2("signal");
            }, _fsevent: function() {
              return u2("fsevent");
            }, _tlswrap: function() {
              return u2("tlswrap");
            } };
          }
          function l() {
            return { buf: "", write: function(e2) {
              this.buf += e2;
            }, end: function(e2) {
              this.buf += e2;
            }, read: function() {
              return this.buf;
            } };
          }
          m.writeToStream = function(e2, t2, n2) {
            return void 0 === n2 && (n2 = t2, t2 = {}), f(t2 = u(e2, t2), n2).dispatch(e2);
          };
        }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_9a5aa49d.js", "/");
      }, { buffer: 3, crypto: 5, lYpoI2: 11 }], 2: [function(e, t, f) {
        !(function(e2, t2, n, r, o, i, u, s, a) {
          !(function(e3) {
            var a2 = "undefined" != typeof Uint8Array ? Uint8Array : Array, t3 = "+".charCodeAt(0), n2 = "/".charCodeAt(0), r2 = "0".charCodeAt(0), o2 = "a".charCodeAt(0), i2 = "A".charCodeAt(0), u2 = "-".charCodeAt(0), s2 = "_".charCodeAt(0);
            function f2(e4) {
              e4 = e4.charCodeAt(0);
              return e4 === t3 || e4 === u2 ? 62 : e4 === n2 || e4 === s2 ? 63 : e4 < r2 ? -1 : e4 < r2 + 10 ? e4 - r2 + 26 + 26 : e4 < i2 + 26 ? e4 - i2 : e4 < o2 + 26 ? e4 - o2 + 26 : void 0;
            }
            e3.toByteArray = function(e4) {
              var t4, n3;
              if (0 < e4.length % 4) throw new Error("Invalid string. Length must be a multiple of 4");
              var r3 = e4.length, r3 = "=" === e4.charAt(r3 - 2) ? 2 : "=" === e4.charAt(r3 - 1) ? 1 : 0, o3 = new a2(3 * e4.length / 4 - r3), i3 = 0 < r3 ? e4.length - 4 : e4.length, u3 = 0;
              function s3(e5) {
                o3[u3++] = e5;
              }
              for (t4 = 0; t4 < i3; t4 += 4, 0) s3((16711680 & (n3 = f2(e4.charAt(t4)) << 18 | f2(e4.charAt(t4 + 1)) << 12 | f2(e4.charAt(t4 + 2)) << 6 | f2(e4.charAt(t4 + 3)))) >> 16), s3((65280 & n3) >> 8), s3(255 & n3);
              return 2 == r3 ? s3(255 & (n3 = f2(e4.charAt(t4)) << 2 | f2(e4.charAt(t4 + 1)) >> 4)) : 1 == r3 && (s3((n3 = f2(e4.charAt(t4)) << 10 | f2(e4.charAt(t4 + 1)) << 4 | f2(e4.charAt(t4 + 2)) >> 2) >> 8 & 255), s3(255 & n3)), o3;
            }, e3.fromByteArray = function(e4) {
              var t4, n3, r3, o3, i3 = e4.length % 3, u3 = "";
              function s3(e5) {
                return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e5);
              }
              for (t4 = 0, r3 = e4.length - i3; t4 < r3; t4 += 3) n3 = (e4[t4] << 16) + (e4[t4 + 1] << 8) + e4[t4 + 2], u3 += s3((o3 = n3) >> 18 & 63) + s3(o3 >> 12 & 63) + s3(o3 >> 6 & 63) + s3(63 & o3);
              switch (i3) {
                case 1:
                  u3 = (u3 += s3((n3 = e4[e4.length - 1]) >> 2)) + s3(n3 << 4 & 63) + "==";
                  break;
                case 2:
                  u3 = (u3 = (u3 += s3((n3 = (e4[e4.length - 2] << 8) + e4[e4.length - 1]) >> 10)) + s3(n3 >> 4 & 63)) + s3(n3 << 2 & 63) + "=";
              }
              return u3;
            };
          })(void 0 === f ? this.base64js = {} : f);
        }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
      }, { buffer: 3, lYpoI2: 11 }], 3: [function(O, e, H) {
        !(function(e2, n, f, r, h, p, g, y, w) {
          var a = O("base64-js"), i = O("ieee754");
          function f(e3, t2, n2) {
            if (!(this instanceof f)) return new f(e3, t2, n2);
            var r2, o2, i2, u2, s2 = typeof e3;
            if ("base64" === t2 && "string" == s2) for (e3 = (u2 = e3).trim ? u2.trim() : u2.replace(/^\s+|\s+$/g, ""); e3.length % 4 != 0; ) e3 += "=";
            if ("number" == s2) r2 = j(e3);
            else if ("string" == s2) r2 = f.byteLength(e3, t2);
            else {
              if ("object" != s2) throw new Error("First argument needs to be a number, array or string.");
              r2 = j(e3.length);
            }
            if (f._useTypedArrays ? o2 = f._augment(new Uint8Array(r2)) : ((o2 = this).length = r2, o2._isBuffer = true), f._useTypedArrays && "number" == typeof e3.byteLength) o2._set(e3);
            else if (C(u2 = e3) || f.isBuffer(u2) || u2 && "object" == typeof u2 && "number" == typeof u2.length) for (i2 = 0; i2 < r2; i2++) f.isBuffer(e3) ? o2[i2] = e3.readUInt8(i2) : o2[i2] = e3[i2];
            else if ("string" == s2) o2.write(e3, 0, t2);
            else if ("number" == s2 && !f._useTypedArrays && !n2) for (i2 = 0; i2 < r2; i2++) o2[i2] = 0;
            return o2;
          }
          function b(e3, t2, n2, r2) {
            return f._charsWritten = c2((function(e4) {
              for (var t3 = [], n3 = 0; n3 < e4.length; n3++) t3.push(255 & e4.charCodeAt(n3));
              return t3;
            })(t2), e3, n2, r2);
          }
          function m(e3, t2, n2, r2) {
            return f._charsWritten = c2((function(e4) {
              for (var t3, n3, r3 = [], o2 = 0; o2 < e4.length; o2++) n3 = e4.charCodeAt(o2), t3 = n3 >> 8, n3 = n3 % 256, r3.push(n3), r3.push(t3);
              return r3;
            })(t2), e3, n2, r2);
          }
          function v(e3, t2, n2) {
            var r2 = "";
            n2 = Math.min(e3.length, n2);
            for (var o2 = t2; o2 < n2; o2++) r2 += String.fromCharCode(e3[o2]);
            return r2;
          }
          function o(e3, t2, n2, r2) {
            r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 1 < e3.length, "Trying to read beyond buffer length"));
            var o2, r2 = e3.length;
            if (!(r2 <= t2)) return n2 ? (o2 = e3[t2], t2 + 1 < r2 && (o2 |= e3[t2 + 1] << 8)) : (o2 = e3[t2] << 8, t2 + 1 < r2 && (o2 |= e3[t2 + 1])), o2;
          }
          function u(e3, t2, n2, r2) {
            r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 3 < e3.length, "Trying to read beyond buffer length"));
            var o2, r2 = e3.length;
            if (!(r2 <= t2)) return n2 ? (t2 + 2 < r2 && (o2 = e3[t2 + 2] << 16), t2 + 1 < r2 && (o2 |= e3[t2 + 1] << 8), o2 |= e3[t2], t2 + 3 < r2 && (o2 += e3[t2 + 3] << 24 >>> 0)) : (t2 + 1 < r2 && (o2 = e3[t2 + 1] << 16), t2 + 2 < r2 && (o2 |= e3[t2 + 2] << 8), t2 + 3 < r2 && (o2 |= e3[t2 + 3]), o2 += e3[t2] << 24 >>> 0), o2;
          }
          function _(e3, t2, n2, r2) {
            if (r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 1 < e3.length, "Trying to read beyond buffer length")), !(e3.length <= t2)) return r2 = o(e3, t2, n2, true), 32768 & r2 ? -1 * (65535 - r2 + 1) : r2;
          }
          function E(e3, t2, n2, r2) {
            if (r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(null != t2, "missing offset"), d(t2 + 3 < e3.length, "Trying to read beyond buffer length")), !(e3.length <= t2)) return r2 = u(e3, t2, n2, true), 2147483648 & r2 ? -1 * (4294967295 - r2 + 1) : r2;
          }
          function I(e3, t2, n2, r2) {
            return r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(t2 + 3 < e3.length, "Trying to read beyond buffer length")), i.read(e3, t2, n2, 23, 4);
          }
          function A(e3, t2, n2, r2) {
            return r2 || (d("boolean" == typeof n2, "missing or invalid endian"), d(t2 + 7 < e3.length, "Trying to read beyond buffer length")), i.read(e3, t2, n2, 52, 8);
          }
          function s(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 1 < e3.length, "trying to write beyond buffer length"), Y(t2, 65535));
            o2 = e3.length;
            if (!(o2 <= n2)) for (var i2 = 0, u2 = Math.min(o2 - n2, 2); i2 < u2; i2++) e3[n2 + i2] = (t2 & 255 << 8 * (r2 ? i2 : 1 - i2)) >>> 8 * (r2 ? i2 : 1 - i2);
          }
          function l(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 3 < e3.length, "trying to write beyond buffer length"), Y(t2, 4294967295));
            o2 = e3.length;
            if (!(o2 <= n2)) for (var i2 = 0, u2 = Math.min(o2 - n2, 4); i2 < u2; i2++) e3[n2 + i2] = t2 >>> 8 * (r2 ? i2 : 3 - i2) & 255;
          }
          function B(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 1 < e3.length, "Trying to write beyond buffer length"), F(t2, 32767, -32768)), e3.length <= n2 || s(e3, 0 <= t2 ? t2 : 65535 + t2 + 1, n2, r2, o2);
          }
          function L(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 3 < e3.length, "Trying to write beyond buffer length"), F(t2, 2147483647, -2147483648)), e3.length <= n2 || l(e3, 0 <= t2 ? t2 : 4294967295 + t2 + 1, n2, r2, o2);
          }
          function U(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 3 < e3.length, "Trying to write beyond buffer length"), D(t2, 34028234663852886e22, -34028234663852886e22)), e3.length <= n2 || i.write(e3, t2, n2, r2, 23, 4);
          }
          function x(e3, t2, n2, r2, o2) {
            o2 || (d(null != t2, "missing value"), d("boolean" == typeof r2, "missing or invalid endian"), d(null != n2, "missing offset"), d(n2 + 7 < e3.length, "Trying to write beyond buffer length"), D(t2, 17976931348623157e292, -17976931348623157e292)), e3.length <= n2 || i.write(e3, t2, n2, r2, 52, 8);
          }
          H.Buffer = f, H.SlowBuffer = f, H.INSPECT_MAX_BYTES = 50, f.poolSize = 8192, f._useTypedArrays = (function() {
            try {
              var e3 = new ArrayBuffer(0), t2 = new Uint8Array(e3);
              return t2.foo = function() {
                return 42;
              }, 42 === t2.foo() && "function" == typeof t2.subarray;
            } catch (e4) {
              return false;
            }
          })(), f.isEncoding = function(e3) {
            switch (String(e3).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "binary":
              case "base64":
              case "raw":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return true;
              default:
                return false;
            }
          }, f.isBuffer = function(e3) {
            return !(null == e3 || !e3._isBuffer);
          }, f.byteLength = function(e3, t2) {
            var n2;
            switch (e3 += "", t2 || "utf8") {
              case "hex":
                n2 = e3.length / 2;
                break;
              case "utf8":
              case "utf-8":
                n2 = T(e3).length;
                break;
              case "ascii":
              case "binary":
              case "raw":
                n2 = e3.length;
                break;
              case "base64":
                n2 = M(e3).length;
                break;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                n2 = 2 * e3.length;
                break;
              default:
                throw new Error("Unknown encoding");
            }
            return n2;
          }, f.concat = function(e3, t2) {
            if (d(C(e3), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e3.length) return new f(0);
            if (1 === e3.length) return e3[0];
            if ("number" != typeof t2) for (o2 = t2 = 0; o2 < e3.length; o2++) t2 += e3[o2].length;
            for (var n2 = new f(t2), r2 = 0, o2 = 0; o2 < e3.length; o2++) {
              var i2 = e3[o2];
              i2.copy(n2, r2), r2 += i2.length;
            }
            return n2;
          }, f.prototype.write = function(e3, t2, n2, r2) {
            isFinite(t2) ? isFinite(n2) || (r2 = n2, n2 = void 0) : (a2 = r2, r2 = t2, t2 = n2, n2 = a2), t2 = Number(t2) || 0;
            var o2, i2, u2, s2, a2 = this.length - t2;
            switch ((!n2 || a2 < (n2 = Number(n2))) && (n2 = a2), r2 = String(r2 || "utf8").toLowerCase()) {
              case "hex":
                o2 = (function(e4, t3, n3, r3) {
                  n3 = Number(n3) || 0;
                  var o3 = e4.length - n3;
                  (!r3 || o3 < (r3 = Number(r3))) && (r3 = o3), d((o3 = t3.length) % 2 == 0, "Invalid hex string"), o3 / 2 < r3 && (r3 = o3 / 2);
                  for (var i3 = 0; i3 < r3; i3++) {
                    var u3 = parseInt(t3.substr(2 * i3, 2), 16);
                    d(!isNaN(u3), "Invalid hex string"), e4[n3 + i3] = u3;
                  }
                  return f._charsWritten = 2 * i3, i3;
                })(this, e3, t2, n2);
                break;
              case "utf8":
              case "utf-8":
                i2 = this, u2 = t2, s2 = n2, o2 = f._charsWritten = c2(T(e3), i2, u2, s2);
                break;
              case "ascii":
              case "binary":
                o2 = b(this, e3, t2, n2);
                break;
              case "base64":
                i2 = this, u2 = t2, s2 = n2, o2 = f._charsWritten = c2(M(e3), i2, u2, s2);
                break;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                o2 = m(this, e3, t2, n2);
                break;
              default:
                throw new Error("Unknown encoding");
            }
            return o2;
          }, f.prototype.toString = function(e3, t2, n2) {
            var r2, o2, i2, u2, s2 = this;
            if (e3 = String(e3 || "utf8").toLowerCase(), t2 = Number(t2) || 0, (n2 = void 0 !== n2 ? Number(n2) : s2.length) === t2) return "";
            switch (e3) {
              case "hex":
                r2 = (function(e4, t3, n3) {
                  var r3 = e4.length;
                  (!t3 || t3 < 0) && (t3 = 0);
                  (!n3 || n3 < 0 || r3 < n3) && (n3 = r3);
                  for (var o3 = "", i3 = t3; i3 < n3; i3++) o3 += k(e4[i3]);
                  return o3;
                })(s2, t2, n2);
                break;
              case "utf8":
              case "utf-8":
                r2 = (function(e4, t3, n3) {
                  var r3 = "", o3 = "";
                  n3 = Math.min(e4.length, n3);
                  for (var i3 = t3; i3 < n3; i3++) e4[i3] <= 127 ? (r3 += N(o3) + String.fromCharCode(e4[i3]), o3 = "") : o3 += "%" + e4[i3].toString(16);
                  return r3 + N(o3);
                })(s2, t2, n2);
                break;
              case "ascii":
              case "binary":
                r2 = v(s2, t2, n2);
                break;
              case "base64":
                o2 = s2, u2 = n2, r2 = 0 === (i2 = t2) && u2 === o2.length ? a.fromByteArray(o2) : a.fromByteArray(o2.slice(i2, u2));
                break;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                r2 = (function(e4, t3, n3) {
                  for (var r3 = e4.slice(t3, n3), o3 = "", i3 = 0; i3 < r3.length; i3 += 2) o3 += String.fromCharCode(r3[i3] + 256 * r3[i3 + 1]);
                  return o3;
                })(s2, t2, n2);
                break;
              default:
                throw new Error("Unknown encoding");
            }
            return r2;
          }, f.prototype.toJSON = function() {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
          }, f.prototype.copy = function(e3, t2, n2, r2) {
            if (t2 = t2 || 0, (r2 = r2 || 0 === r2 ? r2 : this.length) !== (n2 = n2 || 0) && 0 !== e3.length && 0 !== this.length) {
              d(n2 <= r2, "sourceEnd < sourceStart"), d(0 <= t2 && t2 < e3.length, "targetStart out of bounds"), d(0 <= n2 && n2 < this.length, "sourceStart out of bounds"), d(0 <= r2 && r2 <= this.length, "sourceEnd out of bounds"), r2 > this.length && (r2 = this.length);
              var o2 = (r2 = e3.length - t2 < r2 - n2 ? e3.length - t2 + n2 : r2) - n2;
              if (o2 < 100 || !f._useTypedArrays) for (var i2 = 0; i2 < o2; i2++) e3[i2 + t2] = this[i2 + n2];
              else e3._set(this.subarray(n2, n2 + o2), t2);
            }
          }, f.prototype.slice = function(e3, t2) {
            var n2 = this.length;
            if (e3 = S(e3, n2, 0), t2 = S(t2, n2, n2), f._useTypedArrays) return f._augment(this.subarray(e3, t2));
            for (var r2 = t2 - e3, o2 = new f(r2, void 0, true), i2 = 0; i2 < r2; i2++) o2[i2] = this[i2 + e3];
            return o2;
          }, f.prototype.get = function(e3) {
            return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e3);
          }, f.prototype.set = function(e3, t2) {
            return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e3, t2);
          }, f.prototype.readUInt8 = function(e3, t2) {
            if (t2 || (d(null != e3, "missing offset"), d(e3 < this.length, "Trying to read beyond buffer length")), !(e3 >= this.length)) return this[e3];
          }, f.prototype.readUInt16LE = function(e3, t2) {
            return o(this, e3, true, t2);
          }, f.prototype.readUInt16BE = function(e3, t2) {
            return o(this, e3, false, t2);
          }, f.prototype.readUInt32LE = function(e3, t2) {
            return u(this, e3, true, t2);
          }, f.prototype.readUInt32BE = function(e3, t2) {
            return u(this, e3, false, t2);
          }, f.prototype.readInt8 = function(e3, t2) {
            if (t2 || (d(null != e3, "missing offset"), d(e3 < this.length, "Trying to read beyond buffer length")), !(e3 >= this.length)) return 128 & this[e3] ? -1 * (255 - this[e3] + 1) : this[e3];
          }, f.prototype.readInt16LE = function(e3, t2) {
            return _(this, e3, true, t2);
          }, f.prototype.readInt16BE = function(e3, t2) {
            return _(this, e3, false, t2);
          }, f.prototype.readInt32LE = function(e3, t2) {
            return E(this, e3, true, t2);
          }, f.prototype.readInt32BE = function(e3, t2) {
            return E(this, e3, false, t2);
          }, f.prototype.readFloatLE = function(e3, t2) {
            return I(this, e3, true, t2);
          }, f.prototype.readFloatBE = function(e3, t2) {
            return I(this, e3, false, t2);
          }, f.prototype.readDoubleLE = function(e3, t2) {
            return A(this, e3, true, t2);
          }, f.prototype.readDoubleBE = function(e3, t2) {
            return A(this, e3, false, t2);
          }, f.prototype.writeUInt8 = function(e3, t2, n2) {
            n2 || (d(null != e3, "missing value"), d(null != t2, "missing offset"), d(t2 < this.length, "trying to write beyond buffer length"), Y(e3, 255)), t2 >= this.length || (this[t2] = e3);
          }, f.prototype.writeUInt16LE = function(e3, t2, n2) {
            s(this, e3, t2, true, n2);
          }, f.prototype.writeUInt16BE = function(e3, t2, n2) {
            s(this, e3, t2, false, n2);
          }, f.prototype.writeUInt32LE = function(e3, t2, n2) {
            l(this, e3, t2, true, n2);
          }, f.prototype.writeUInt32BE = function(e3, t2, n2) {
            l(this, e3, t2, false, n2);
          }, f.prototype.writeInt8 = function(e3, t2, n2) {
            n2 || (d(null != e3, "missing value"), d(null != t2, "missing offset"), d(t2 < this.length, "Trying to write beyond buffer length"), F(e3, 127, -128)), t2 >= this.length || (0 <= e3 ? this.writeUInt8(e3, t2, n2) : this.writeUInt8(255 + e3 + 1, t2, n2));
          }, f.prototype.writeInt16LE = function(e3, t2, n2) {
            B(this, e3, t2, true, n2);
          }, f.prototype.writeInt16BE = function(e3, t2, n2) {
            B(this, e3, t2, false, n2);
          }, f.prototype.writeInt32LE = function(e3, t2, n2) {
            L(this, e3, t2, true, n2);
          }, f.prototype.writeInt32BE = function(e3, t2, n2) {
            L(this, e3, t2, false, n2);
          }, f.prototype.writeFloatLE = function(e3, t2, n2) {
            U(this, e3, t2, true, n2);
          }, f.prototype.writeFloatBE = function(e3, t2, n2) {
            U(this, e3, t2, false, n2);
          }, f.prototype.writeDoubleLE = function(e3, t2, n2) {
            x(this, e3, t2, true, n2);
          }, f.prototype.writeDoubleBE = function(e3, t2, n2) {
            x(this, e3, t2, false, n2);
          }, f.prototype.fill = function(e3, t2, n2) {
            if (t2 = t2 || 0, n2 = n2 || this.length, d("number" == typeof (e3 = "string" == typeof (e3 = e3 || 0) ? e3.charCodeAt(0) : e3) && !isNaN(e3), "value is not a number"), d(t2 <= n2, "end < start"), n2 !== t2 && 0 !== this.length) {
              d(0 <= t2 && t2 < this.length, "start out of bounds"), d(0 <= n2 && n2 <= this.length, "end out of bounds");
              for (var r2 = t2; r2 < n2; r2++) this[r2] = e3;
            }
          }, f.prototype.inspect = function() {
            for (var e3 = [], t2 = this.length, n2 = 0; n2 < t2; n2++) if (e3[n2] = k(this[n2]), n2 === H.INSPECT_MAX_BYTES) {
              e3[n2 + 1] = "...";
              break;
            }
            return "<Buffer " + e3.join(" ") + ">";
          }, f.prototype.toArrayBuffer = function() {
            if ("undefined" == typeof Uint8Array) throw new Error("Buffer.toArrayBuffer not supported in this browser");
            if (f._useTypedArrays) return new f(this).buffer;
            for (var e3 = new Uint8Array(this.length), t2 = 0, n2 = e3.length; t2 < n2; t2 += 1) e3[t2] = this[t2];
            return e3.buffer;
          };
          var t = f.prototype;
          function S(e3, t2, n2) {
            return "number" != typeof e3 ? n2 : t2 <= (e3 = ~~e3) ? t2 : 0 <= e3 || 0 <= (e3 += t2) ? e3 : 0;
          }
          function j(e3) {
            return (e3 = ~~Math.ceil(+e3)) < 0 ? 0 : e3;
          }
          function C(e3) {
            return (Array.isArray || function(e4) {
              return "[object Array]" === Object.prototype.toString.call(e4);
            })(e3);
          }
          function k(e3) {
            return e3 < 16 ? "0" + e3.toString(16) : e3.toString(16);
          }
          function T(e3) {
            for (var t2 = [], n2 = 0; n2 < e3.length; n2++) {
              var r2 = e3.charCodeAt(n2);
              if (r2 <= 127) t2.push(e3.charCodeAt(n2));
              else for (var o2 = n2, i2 = (55296 <= r2 && r2 <= 57343 && n2++, encodeURIComponent(e3.slice(o2, n2 + 1)).substr(1).split("%")), u2 = 0; u2 < i2.length; u2++) t2.push(parseInt(i2[u2], 16));
            }
            return t2;
          }
          function M(e3) {
            return a.toByteArray(e3);
          }
          function c2(e3, t2, n2, r2) {
            for (var o2 = 0; o2 < r2 && !(o2 + n2 >= t2.length || o2 >= e3.length); o2++) t2[o2 + n2] = e3[o2];
            return o2;
          }
          function N(e3) {
            try {
              return decodeURIComponent(e3);
            } catch (e4) {
              return String.fromCharCode(65533);
            }
          }
          function Y(e3, t2) {
            d("number" == typeof e3, "cannot write a non-number as a number"), d(0 <= e3, "specified a negative value for writing an unsigned value"), d(e3 <= t2, "value is larger than maximum value for type"), d(Math.floor(e3) === e3, "value has a fractional component");
          }
          function F(e3, t2, n2) {
            d("number" == typeof e3, "cannot write a non-number as a number"), d(e3 <= t2, "value larger than maximum allowed value"), d(n2 <= e3, "value smaller than minimum allowed value"), d(Math.floor(e3) === e3, "value has a fractional component");
          }
          function D(e3, t2, n2) {
            d("number" == typeof e3, "cannot write a non-number as a number"), d(e3 <= t2, "value larger than maximum allowed value"), d(n2 <= e3, "value smaller than minimum allowed value");
          }
          function d(e3, t2) {
            if (!e3) throw new Error(t2 || "Failed assertion");
          }
          f._augment = function(e3) {
            return e3._isBuffer = true, e3._get = e3.get, e3._set = e3.set, e3.get = t.get, e3.set = t.set, e3.write = t.write, e3.toString = t.toString, e3.toLocaleString = t.toString, e3.toJSON = t.toJSON, e3.copy = t.copy, e3.slice = t.slice, e3.readUInt8 = t.readUInt8, e3.readUInt16LE = t.readUInt16LE, e3.readUInt16BE = t.readUInt16BE, e3.readUInt32LE = t.readUInt32LE, e3.readUInt32BE = t.readUInt32BE, e3.readInt8 = t.readInt8, e3.readInt16LE = t.readInt16LE, e3.readInt16BE = t.readInt16BE, e3.readInt32LE = t.readInt32LE, e3.readInt32BE = t.readInt32BE, e3.readFloatLE = t.readFloatLE, e3.readFloatBE = t.readFloatBE, e3.readDoubleLE = t.readDoubleLE, e3.readDoubleBE = t.readDoubleBE, e3.writeUInt8 = t.writeUInt8, e3.writeUInt16LE = t.writeUInt16LE, e3.writeUInt16BE = t.writeUInt16BE, e3.writeUInt32LE = t.writeUInt32LE, e3.writeUInt32BE = t.writeUInt32BE, e3.writeInt8 = t.writeInt8, e3.writeInt16LE = t.writeInt16LE, e3.writeInt16BE = t.writeInt16BE, e3.writeInt32LE = t.writeInt32LE, e3.writeInt32BE = t.writeInt32BE, e3.writeFloatLE = t.writeFloatLE, e3.writeFloatBE = t.writeFloatBE, e3.writeDoubleLE = t.writeDoubleLE, e3.writeDoubleBE = t.writeDoubleBE, e3.fill = t.fill, e3.inspect = t.inspect, e3.toArrayBuffer = t.toArrayBuffer, e3;
          };
        }).call(this, O("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, O("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
      }, { "base64-js": 2, buffer: 3, ieee754: 10, lYpoI2: 11 }], 4: [function(c2, d, e) {
        !(function(e2, t, a, n, r, o, i, u, s) {
          var a = c2("buffer").Buffer, f = 4, l = new a(f);
          l.fill(0);
          d.exports = { hash: function(e3, t2, n2, r2) {
            for (var o2 = t2((function(e4, t3) {
              e4.length % f != 0 && (n3 = e4.length + (f - e4.length % f), e4 = a.concat([e4, l], n3));
              for (var n3, r3 = [], o3 = t3 ? e4.readInt32BE : e4.readInt32LE, i3 = 0; i3 < e4.length; i3 += f) r3.push(o3.call(e4, i3));
              return r3;
            })(e3 = a.isBuffer(e3) ? e3 : new a(e3), r2), 8 * e3.length), t2 = r2, i2 = new a(n2), u2 = t2 ? i2.writeInt32BE : i2.writeInt32LE, s2 = 0; s2 < o2.length; s2++) u2.call(i2, o2[s2], 4 * s2, true);
            return i2;
          } };
        }).call(this, c2("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c2("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { buffer: 3, lYpoI2: 11 }], 5: [function(v, e, _) {
        !(function(l, c2, u, d, h, p, g, y, w) {
          var u = v("buffer").Buffer, e2 = v("./sha"), t = v("./sha256"), n = v("./rng"), b = { sha1: e2, sha256: t, md5: v("./md5") }, s = 64, a = new u(s);
          function r(e3, n2) {
            var r2 = b[e3 = e3 || "sha1"], o2 = [];
            return r2 || i("algorithm:", e3, "is not yet supported"), { update: function(e4) {
              return u.isBuffer(e4) || (e4 = new u(e4)), o2.push(e4), e4.length, this;
            }, digest: function(e4) {
              var t2 = u.concat(o2), t2 = n2 ? (function(e5, t3, n3) {
                u.isBuffer(t3) || (t3 = new u(t3)), u.isBuffer(n3) || (n3 = new u(n3)), t3.length > s ? t3 = e5(t3) : t3.length < s && (t3 = u.concat([t3, a], s));
                for (var r3 = new u(s), o3 = new u(s), i2 = 0; i2 < s; i2++) r3[i2] = 54 ^ t3[i2], o3[i2] = 92 ^ t3[i2];
                return n3 = e5(u.concat([r3, n3])), e5(u.concat([o3, n3]));
              })(r2, n2, t2) : r2(t2);
              return o2 = null, e4 ? t2.toString(e4) : t2;
            } };
          }
          function i() {
            var e3 = [].slice.call(arguments).join(" ");
            throw new Error([e3, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join("\n"));
          }
          a.fill(0), _.createHash = function(e3) {
            return r(e3);
          }, _.createHmac = r, _.randomBytes = function(e3, t2) {
            if (!t2 || !t2.call) return new u(n(e3));
            try {
              t2.call(this, void 0, new u(n(e3)));
            } catch (e4) {
              t2(e4);
            }
          };
          var o, f = ["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], m = function(e3) {
            _[e3] = function() {
              i("sorry,", e3, "is not implemented yet");
            };
          };
          for (o in f) m(f[o]);
        }).call(this, v("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, v("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { "./md5": 6, "./rng": 7, "./sha": 8, "./sha256": 9, buffer: 3, lYpoI2: 11 }], 6: [function(w, b, e) {
        !(function(e2, r, o, i, u, a, f, l, y) {
          var t = w("./helpers");
          function n(e3, t2) {
            e3[t2 >> 5] |= 128 << t2 % 32, e3[14 + (t2 + 64 >>> 9 << 4)] = t2;
            for (var n2 = 1732584193, r2 = -271733879, o2 = -1732584194, i2 = 271733878, u2 = 0; u2 < e3.length; u2 += 16) {
              var s2 = n2, a2 = r2, f2 = o2, l2 = i2, n2 = c2(n2, r2, o2, i2, e3[u2 + 0], 7, -680876936), i2 = c2(i2, n2, r2, o2, e3[u2 + 1], 12, -389564586), o2 = c2(o2, i2, n2, r2, e3[u2 + 2], 17, 606105819), r2 = c2(r2, o2, i2, n2, e3[u2 + 3], 22, -1044525330);
              n2 = c2(n2, r2, o2, i2, e3[u2 + 4], 7, -176418897), i2 = c2(i2, n2, r2, o2, e3[u2 + 5], 12, 1200080426), o2 = c2(o2, i2, n2, r2, e3[u2 + 6], 17, -1473231341), r2 = c2(r2, o2, i2, n2, e3[u2 + 7], 22, -45705983), n2 = c2(n2, r2, o2, i2, e3[u2 + 8], 7, 1770035416), i2 = c2(i2, n2, r2, o2, e3[u2 + 9], 12, -1958414417), o2 = c2(o2, i2, n2, r2, e3[u2 + 10], 17, -42063), r2 = c2(r2, o2, i2, n2, e3[u2 + 11], 22, -1990404162), n2 = c2(n2, r2, o2, i2, e3[u2 + 12], 7, 1804603682), i2 = c2(i2, n2, r2, o2, e3[u2 + 13], 12, -40341101), o2 = c2(o2, i2, n2, r2, e3[u2 + 14], 17, -1502002290), n2 = d(n2, r2 = c2(r2, o2, i2, n2, e3[u2 + 15], 22, 1236535329), o2, i2, e3[u2 + 1], 5, -165796510), i2 = d(i2, n2, r2, o2, e3[u2 + 6], 9, -1069501632), o2 = d(o2, i2, n2, r2, e3[u2 + 11], 14, 643717713), r2 = d(r2, o2, i2, n2, e3[u2 + 0], 20, -373897302), n2 = d(n2, r2, o2, i2, e3[u2 + 5], 5, -701558691), i2 = d(i2, n2, r2, o2, e3[u2 + 10], 9, 38016083), o2 = d(o2, i2, n2, r2, e3[u2 + 15], 14, -660478335), r2 = d(r2, o2, i2, n2, e3[u2 + 4], 20, -405537848), n2 = d(n2, r2, o2, i2, e3[u2 + 9], 5, 568446438), i2 = d(i2, n2, r2, o2, e3[u2 + 14], 9, -1019803690), o2 = d(o2, i2, n2, r2, e3[u2 + 3], 14, -187363961), r2 = d(r2, o2, i2, n2, e3[u2 + 8], 20, 1163531501), n2 = d(n2, r2, o2, i2, e3[u2 + 13], 5, -1444681467), i2 = d(i2, n2, r2, o2, e3[u2 + 2], 9, -51403784), o2 = d(o2, i2, n2, r2, e3[u2 + 7], 14, 1735328473), n2 = h(n2, r2 = d(r2, o2, i2, n2, e3[u2 + 12], 20, -1926607734), o2, i2, e3[u2 + 5], 4, -378558), i2 = h(i2, n2, r2, o2, e3[u2 + 8], 11, -2022574463), o2 = h(o2, i2, n2, r2, e3[u2 + 11], 16, 1839030562), r2 = h(r2, o2, i2, n2, e3[u2 + 14], 23, -35309556), n2 = h(n2, r2, o2, i2, e3[u2 + 1], 4, -1530992060), i2 = h(i2, n2, r2, o2, e3[u2 + 4], 11, 1272893353), o2 = h(o2, i2, n2, r2, e3[u2 + 7], 16, -155497632), r2 = h(r2, o2, i2, n2, e3[u2 + 10], 23, -1094730640), n2 = h(n2, r2, o2, i2, e3[u2 + 13], 4, 681279174), i2 = h(i2, n2, r2, o2, e3[u2 + 0], 11, -358537222), o2 = h(o2, i2, n2, r2, e3[u2 + 3], 16, -722521979), r2 = h(r2, o2, i2, n2, e3[u2 + 6], 23, 76029189), n2 = h(n2, r2, o2, i2, e3[u2 + 9], 4, -640364487), i2 = h(i2, n2, r2, o2, e3[u2 + 12], 11, -421815835), o2 = h(o2, i2, n2, r2, e3[u2 + 15], 16, 530742520), n2 = p(n2, r2 = h(r2, o2, i2, n2, e3[u2 + 2], 23, -995338651), o2, i2, e3[u2 + 0], 6, -198630844), i2 = p(i2, n2, r2, o2, e3[u2 + 7], 10, 1126891415), o2 = p(o2, i2, n2, r2, e3[u2 + 14], 15, -1416354905), r2 = p(r2, o2, i2, n2, e3[u2 + 5], 21, -57434055), n2 = p(n2, r2, o2, i2, e3[u2 + 12], 6, 1700485571), i2 = p(i2, n2, r2, o2, e3[u2 + 3], 10, -1894986606), o2 = p(o2, i2, n2, r2, e3[u2 + 10], 15, -1051523), r2 = p(r2, o2, i2, n2, e3[u2 + 1], 21, -2054922799), n2 = p(n2, r2, o2, i2, e3[u2 + 8], 6, 1873313359), i2 = p(i2, n2, r2, o2, e3[u2 + 15], 10, -30611744), o2 = p(o2, i2, n2, r2, e3[u2 + 6], 15, -1560198380), r2 = p(r2, o2, i2, n2, e3[u2 + 13], 21, 1309151649), n2 = p(n2, r2, o2, i2, e3[u2 + 4], 6, -145523070), i2 = p(i2, n2, r2, o2, e3[u2 + 11], 10, -1120210379), o2 = p(o2, i2, n2, r2, e3[u2 + 2], 15, 718787259), r2 = p(r2, o2, i2, n2, e3[u2 + 9], 21, -343485551), n2 = g(n2, s2), r2 = g(r2, a2), o2 = g(o2, f2), i2 = g(i2, l2);
            }
            return Array(n2, r2, o2, i2);
          }
          function s(e3, t2, n2, r2, o2, i2) {
            return g((t2 = g(g(t2, e3), g(r2, i2))) << o2 | t2 >>> 32 - o2, n2);
          }
          function c2(e3, t2, n2, r2, o2, i2, u2) {
            return s(t2 & n2 | ~t2 & r2, e3, t2, o2, i2, u2);
          }
          function d(e3, t2, n2, r2, o2, i2, u2) {
            return s(t2 & r2 | n2 & ~r2, e3, t2, o2, i2, u2);
          }
          function h(e3, t2, n2, r2, o2, i2, u2) {
            return s(t2 ^ n2 ^ r2, e3, t2, o2, i2, u2);
          }
          function p(e3, t2, n2, r2, o2, i2, u2) {
            return s(n2 ^ (t2 | ~r2), e3, t2, o2, i2, u2);
          }
          function g(e3, t2) {
            var n2 = (65535 & e3) + (65535 & t2);
            return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
          }
          b.exports = function(e3) {
            return t.hash(e3, n, 16);
          };
        }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 7: [function(e, l, t) {
        !(function(e2, t2, n, r, o, i, u, s, f) {
          l.exports = function(e3) {
            for (var t3, n2 = new Array(e3), r2 = 0; r2 < e3; r2++) 0 == (3 & r2) && (t3 = 4294967296 * Math.random()), n2[r2] = t3 >>> ((3 & r2) << 3) & 255;
            return n2;
          };
        }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { buffer: 3, lYpoI2: 11 }], 8: [function(c2, d, e) {
        !(function(e2, t, n, r, o, s, a, f, l) {
          var i = c2("./helpers");
          function u(l2, c3) {
            l2[c3 >> 5] |= 128 << 24 - c3 % 32, l2[15 + (c3 + 64 >> 9 << 4)] = c3;
            for (var e3, t2, n2, r2 = Array(80), o2 = 1732584193, i2 = -271733879, u2 = -1732584194, s2 = 271733878, d2 = -1009589776, h = 0; h < l2.length; h += 16) {
              for (var p = o2, g = i2, y = u2, w = s2, b = d2, a2 = 0; a2 < 80; a2++) {
                r2[a2] = a2 < 16 ? l2[h + a2] : v(r2[a2 - 3] ^ r2[a2 - 8] ^ r2[a2 - 14] ^ r2[a2 - 16], 1);
                var f2 = m(m(v(o2, 5), (f2 = i2, t2 = u2, n2 = s2, (e3 = a2) < 20 ? f2 & t2 | ~f2 & n2 : !(e3 < 40) && e3 < 60 ? f2 & t2 | f2 & n2 | t2 & n2 : f2 ^ t2 ^ n2)), m(m(d2, r2[a2]), (e3 = a2) < 20 ? 1518500249 : e3 < 40 ? 1859775393 : e3 < 60 ? -1894007588 : -899497514)), d2 = s2, s2 = u2, u2 = v(i2, 30), i2 = o2, o2 = f2;
              }
              o2 = m(o2, p), i2 = m(i2, g), u2 = m(u2, y), s2 = m(s2, w), d2 = m(d2, b);
            }
            return Array(o2, i2, u2, s2, d2);
          }
          function m(e3, t2) {
            var n2 = (65535 & e3) + (65535 & t2);
            return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
          }
          function v(e3, t2) {
            return e3 << t2 | e3 >>> 32 - t2;
          }
          d.exports = function(e3) {
            return i.hash(e3, u, 20, true);
          };
        }).call(this, c2("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c2("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 9: [function(c2, d, e) {
        !(function(e2, t, n, r, u, s, a, f, l) {
          function b(e3, t2) {
            var n2 = (65535 & e3) + (65535 & t2);
            return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
          }
          function o(e3, l2) {
            var c3, d2 = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), t2 = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), n2 = new Array(64);
            e3[l2 >> 5] |= 128 << 24 - l2 % 32, e3[15 + (l2 + 64 >> 9 << 4)] = l2;
            for (var r2, o2, h = 0; h < e3.length; h += 16) {
              for (var i2 = t2[0], u2 = t2[1], s2 = t2[2], p = t2[3], a2 = t2[4], g = t2[5], y = t2[6], w = t2[7], f2 = 0; f2 < 64; f2++) n2[f2] = f2 < 16 ? e3[f2 + h] : b(b(b((o2 = n2[f2 - 2], m(o2, 17) ^ m(o2, 19) ^ v(o2, 10)), n2[f2 - 7]), (o2 = n2[f2 - 15], m(o2, 7) ^ m(o2, 18) ^ v(o2, 3))), n2[f2 - 16]), c3 = b(b(b(b(w, m(o2 = a2, 6) ^ m(o2, 11) ^ m(o2, 25)), a2 & g ^ ~a2 & y), d2[f2]), n2[f2]), r2 = b(m(r2 = i2, 2) ^ m(r2, 13) ^ m(r2, 22), i2 & u2 ^ i2 & s2 ^ u2 & s2), w = y, y = g, g = a2, a2 = b(p, c3), p = s2, s2 = u2, u2 = i2, i2 = b(c3, r2);
              t2[0] = b(i2, t2[0]), t2[1] = b(u2, t2[1]), t2[2] = b(s2, t2[2]), t2[3] = b(p, t2[3]), t2[4] = b(a2, t2[4]), t2[5] = b(g, t2[5]), t2[6] = b(y, t2[6]), t2[7] = b(w, t2[7]);
            }
            return t2;
          }
          var i = c2("./helpers"), m = function(e3, t2) {
            return e3 >>> t2 | e3 << 32 - t2;
          }, v = function(e3, t2) {
            return e3 >>> t2;
          };
          d.exports = function(e3) {
            return i.hash(e3, o, 32, true);
          };
        }).call(this, c2("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, c2("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
      }, { "./helpers": 4, buffer: 3, lYpoI2: 11 }], 10: [function(e, t, f) {
        !(function(e2, t2, n, r, o, i, u, s, a) {
          f.read = function(e3, t3, n2, r2, o2) {
            var i2, u2, l = 8 * o2 - r2 - 1, c2 = (1 << l) - 1, d = c2 >> 1, s2 = -7, a2 = n2 ? o2 - 1 : 0, f2 = n2 ? -1 : 1, o2 = e3[t3 + a2];
            for (a2 += f2, i2 = o2 & (1 << -s2) - 1, o2 >>= -s2, s2 += l; 0 < s2; i2 = 256 * i2 + e3[t3 + a2], a2 += f2, s2 -= 8) ;
            for (u2 = i2 & (1 << -s2) - 1, i2 >>= -s2, s2 += r2; 0 < s2; u2 = 256 * u2 + e3[t3 + a2], a2 += f2, s2 -= 8) ;
            if (0 === i2) i2 = 1 - d;
            else {
              if (i2 === c2) return u2 ? NaN : 1 / 0 * (o2 ? -1 : 1);
              u2 += Math.pow(2, r2), i2 -= d;
            }
            return (o2 ? -1 : 1) * u2 * Math.pow(2, i2 - r2);
          }, f.write = function(e3, t3, l, n2, r2, c2) {
            var o2, i2, u2 = 8 * c2 - r2 - 1, s2 = (1 << u2) - 1, a2 = s2 >> 1, d = 23 === r2 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f2 = n2 ? 0 : c2 - 1, h = n2 ? 1 : -1, c2 = t3 < 0 || 0 === t3 && 1 / t3 < 0 ? 1 : 0;
            for (t3 = Math.abs(t3), isNaN(t3) || t3 === 1 / 0 ? (i2 = isNaN(t3) ? 1 : 0, o2 = s2) : (o2 = Math.floor(Math.log(t3) / Math.LN2), t3 * (n2 = Math.pow(2, -o2)) < 1 && (o2--, n2 *= 2), 2 <= (t3 += 1 <= o2 + a2 ? d / n2 : d * Math.pow(2, 1 - a2)) * n2 && (o2++, n2 /= 2), s2 <= o2 + a2 ? (i2 = 0, o2 = s2) : 1 <= o2 + a2 ? (i2 = (t3 * n2 - 1) * Math.pow(2, r2), o2 += a2) : (i2 = t3 * Math.pow(2, a2 - 1) * Math.pow(2, r2), o2 = 0)); 8 <= r2; e3[l + f2] = 255 & i2, f2 += h, i2 /= 256, r2 -= 8) ;
            for (o2 = o2 << r2 | i2, u2 += r2; 0 < u2; e3[l + f2] = 255 & o2, f2 += h, o2 /= 256, u2 -= 8) ;
            e3[l + f2 - h] |= 128 * c2;
          };
        }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/ieee754/index.js", "/node_modules/gulp-browserify/node_modules/ieee754");
      }, { buffer: 3, lYpoI2: 11 }], 11: [function(e, h, t) {
        !(function(e2, t2, n, r, o, f, l, c2, d) {
          var i, u, s;
          function a() {
          }
          (e2 = h.exports = {}).nextTick = (u = "undefined" != typeof window && window.setImmediate, s = "undefined" != typeof window && window.postMessage && window.addEventListener, u ? function(e3) {
            return window.setImmediate(e3);
          } : s ? (i = [], window.addEventListener("message", function(e3) {
            var t3 = e3.source;
            t3 !== window && null !== t3 || "process-tick" !== e3.data || (e3.stopPropagation(), 0 < i.length && i.shift()());
          }, true), function(e3) {
            i.push(e3), window.postMessage("process-tick", "*");
          }) : function(e3) {
            setTimeout(e3, 0);
          }), e2.title = "browser", e2.browser = true, e2.env = {}, e2.argv = [], e2.on = a, e2.addListener = a, e2.once = a, e2.off = a, e2.removeListener = a, e2.removeAllListeners = a, e2.emit = a, e2.binding = function(e3) {
            throw new Error("process.binding is not supported");
          }, e2.cwd = function() {
            return "/";
          }, e2.chdir = function(e3) {
            throw new Error("process.chdir is not supported");
          };
        }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
      }, { buffer: 3, lYpoI2: 11 }] }, {}, [1])(1);
    });
  })(object_hash);
  return object_hash.exports;
}
var object_hashExports = requireObject_hash();
const objectHash = /* @__PURE__ */ getDefaultExportFromCjs(object_hashExports);
function _parseLastWord(str) {
  if (!str) return str;
  for (let i = str.length - 1; i >= 0; i--) {
    const ch = str.charAt(i);
    if (ch >= "A" && ch <= "Z") return str.substring(i);
  }
  return str;
}
function toLowerCaseFirstChar(str) {
  return str.charAt(0).toLowerCase() + str.substring(1);
}
function toUpperCaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
function parseLastWord(str, toLowerCase) {
  const word2 = _parseLastWord(str);
  if (!word2) return word2;
  return toLowerCase ? toLowerCaseFirstChar(word2) : word2;
}
function skipPrefix(str, prefix, toLowerCase) {
  if (!str) return str;
  let word2;
  if (!prefix) {
    word2 = str;
  } else {
    const prefix2 = prefix.replace(/\./g, "");
    if (str.toLowerCase().startsWith(prefix2.toLowerCase())) {
      word2 = str.substring(prefix2.length);
    } else {
      word2 = str;
    }
  }
  return toLowerCase ? toLowerCaseFirstChar(word2) : word2;
}
function skipLastWord(str, lastWord, toLowerCase) {
  if (!str) return str;
  if (!lastWord) lastWord = parseLastWord(str);
  let word2;
  if (str.toLowerCase().endsWith(lastWord.toLowerCase())) {
    word2 = str.substring(0, str.length - lastWord.length);
  } else {
    word2 = str;
  }
  return toLowerCase ? toLowerCaseFirstChar(word2) : word2;
}
function splitWords(str, toLowerCase, separator = " ") {
  if (!str) return str;
  let parts = [];
  let pos2 = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const ch = str.charAt(i);
    if (ch >= "A" && ch <= "Z") {
      parts.unshift(str.substring(i, pos2));
      pos2 = i;
    }
  }
  if (pos2 > 0) parts.unshift(str.substring(0, pos2));
  {
    parts = parts.map((item) => toLowerCaseFirstChar(item));
  }
  return parts.join(separator);
}
function replaceTemplate(content, scope) {
  if (!content) return content;
  if (!scope) return content;
  return content.toString().replace(/(\\)?\{\{ *([\w.]+) *\}\}/g, (block, skip, key2) => {
    if (skip) {
      return block.substring(skip.length);
    }
    const value = getProperty$2(scope, key2);
    return value !== void 0 ? value : "";
  });
}
function getProperty$2(obj, name, sep) {
  return _getProperty$2(obj, name);
}
function _getProperty$2(obj, name, sep, forceObject) {
  if (!obj) return void 0;
  const names = name.split(".");
  for (const name2 of names) {
    if (obj[name2] === void 0 || obj[name2] === null) {
      {
        obj = obj[name2];
        break;
      }
    }
    obj = obj[name2];
  }
  return obj;
}
const isUndefined$1 = (obj) => typeof obj === "undefined";
const isNil = (val) => isUndefined$1(val) || val === null;
function isEmptyObject(obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}
function isClass(fn) {
  return typeof fn === "function" && !!fn.name && fn.prototype?.constructor === fn;
}
function isPromise(obj) {
  return obj instanceof Promise || obj && typeof obj.then === "function";
}
function isNilOrEmptyString(str) {
  return str === void 0 || str === null || str === "";
}
function checkMeta(meta, data) {
  if (!meta) return true;
  for (const key2 in meta) {
    const metaItem = meta[key2];
    if (isNil(metaItem)) continue;
    if (!Array.isArray(metaItem) && metaItem !== data?.[key2]) return false;
    if (Array.isArray(metaItem) && !metaItem.includes(data?.[key2])) return false;
  }
  return true;
}
async function catchError(fnMethod) {
  let error;
  let data;
  try {
    data = await fnMethod();
  } catch (err) {
    error = err;
  }
  return error ? [void 0, error] : [data, void 0];
}
function hasProperty(obj, name, sep) {
  return _hasProperty(obj, name);
}
function getProperty$1(obj, name, sep) {
  return _getProperty$1(obj, name, sep);
}
const __keysIgnore = ["constructor", "prototype", "__proto__"];
function _hasProperty(_obj, name, sep) {
  if (!_obj) return false;
  let obj = _obj;
  const names = name.split(".");
  for (const _name2 of names) {
    const [name2, index] = _parsePropertyKey(_name2);
    if (__keysIgnore.includes(name2)) throw new Error(`invalid prop: ${name2}`);
    if (obj === void 0 || !Object.hasOwnProperty.call(obj, name2)) {
      return false;
    }
    obj = obj[name2];
    if (index !== void 0) {
      obj = obj[index];
    }
  }
  return true;
}
function _getProperty$1(_obj, name, sep, forceObject) {
  if (!_obj) return void 0;
  let obj = _obj;
  const names = name.split(sep || ".");
  for (const _name2 of names) {
    const [name2, index] = _parsePropertyKey(_name2);
    if (__keysIgnore.includes(name2)) throw new Error(`invalid prop: ${name2}`);
    if (obj[name2] === void 0) {
      {
        obj = obj[name2];
        break;
      }
    }
    obj = obj[name2];
    if (index !== void 0) {
      obj = obj[index];
    }
  }
  return obj;
}
function _parsePropertyKey(name) {
  const matched = name.match(/([^[]+)\[(\d+)\]/);
  if (!matched) return [name, void 0];
  return [matched[1], Number.parseInt(matched[2])];
}
function combineParamsAndQuery(path, options) {
  return combineQueries(defaultPathSerializer(path, options?.params), options?.query);
}
function combineQueries(pagePath, queries) {
  pagePath = pagePath ?? "/";
  if (!queries) return pagePath;
  const query2 = [];
  const parts = [];
  if (queries) {
    for (const key2 in queries) {
      const value = queries[key2];
      if (isNil(value)) continue;
      if (typeof value === "object") {
        query2.push([key2, value]);
      } else {
        parts.push(`${encodeURIComponent(key2)}=${encodeURIComponent(value)}`);
      }
    }
  }
  for (const [key2, value] of query2) {
    parts.push(`${encodeURIComponent(key2)}=${encodeURIComponent(JSON.stringify(value))}`);
  }
  if (parts.length === 0) return pagePath;
  const str = parts.join("&");
  const pos2 = pagePath.indexOf("?");
  if (pos2 === -1) return `${pagePath}?${str}`;
  if (pos2 === pagePath.length - 1) return `${pagePath}${str}`;
  return `${pagePath}&${str}`;
}
const PATH_PARAM_RE = /\{([^{}/]+)\}/g;
const PATH_PARAM_RE2 = /:([^/]+)/g;
function defaultPathSerializer(pathName, pathParams) {
  if (!pathName) return void 0;
  pathParams = pathParams ?? {};
  for (const item of [PATH_PARAM_RE, PATH_PARAM_RE2]) {
    pathName = pathName.replace(item, (_, _part) => {
      if (_part.includes("?")) _part = _part.substring(0, _part.length - 1);
      const value = pathParams?.[_part];
      if (value === void 0 || value === null) return "";
      if (typeof value === "object") return encodeURIComponent(JSON.stringify(value));
      return encodeURIComponent(value);
    });
  }
  return pathName;
}
async function forEach$1(arr, order, fn) {
  if (order) {
    for (let index = 0; index < arr.length; index++) {
      await fn(arr[index], index);
    }
  } else {
    for (let index = arr.length - 1; index >= 0; index--) {
      await fn(arr[index], index);
    }
  }
}
function forEachSync(arr, order, fn) {
  if (order) {
    for (let index = 0; index < arr.length; index++) {
      fn(arr[index], index);
    }
  } else {
    for (let index = arr.length - 1; index >= 0; index--) {
      fn(arr[index], index);
    }
  }
}
const celEnvBase = new Environment({
  unlistedVariablesAreDyn: true,
  enableOptionalTypes: true,
  homogeneousAggregateLiterals: false
});
const params = [];
for (let i = 0; i < 10; i++) {
  params.push("dyn");
  celEnvBase.registerFunction(`concat(${params.join(",")}):list`, _concat);
}
celEnvBase.registerFunction("join(list):string", (list) => {
  return _join(list);
});
celEnvBase.registerFunction("join(list,string):string", (list, sep) => {
  return _join(list, sep);
});
celEnvBase.registerFunction("string(null):string", (value) => {
  return String(value);
});
celEnvBase.registerOperator("string + int", (str, n) => str + String(n));
celEnvBase.registerOperator("int + string", (n, str) => String(n) + str);
celEnvBase.registerOperator("string + double", (str, n) => str + String(n));
celEnvBase.registerOperator("double + string", (n, str) => String(n) + str);
celEnvBase.registerOperator("string + null", (str, _n) => str);
celEnvBase.registerOperator("null + string", (_n, str) => str);
celEnvBase.registerOperator("string == null", (str, n) => str === n);
celEnvBase.registerOperator("int == null", (num, n) => num === n);
celEnvBase.registerOperator("bool == null", (b, n) => b === n);
celEnvBase.registerFunction("get(map,string):dyn", (obj, name) => {
  return getProperty$1(obj, name) ?? null;
});
celEnvBase.registerFunction("get(map,string,string):dyn", (obj, name, sep) => {
  return getProperty$1(obj, name, sep) ?? null;
});
celEnvBase.registerFunction("get(bool,string):dyn", (_obj, _name2) => {
  return null;
});
celEnvBase.registerFunction("get(bool,string,string):dyn", (_obj, _name2, _sep) => {
  return null;
});
celEnvBase.registerFunction("get(null,string):dyn", (_obj, _name2) => {
  return null;
});
celEnvBase.registerFunction("get(null,string,string):dyn", (_obj, _name2, _sep) => {
  return null;
});
celEnvBase.registerFunction("exists(null,string):bool", (obj, name) => {
  return hasProperty(obj, name);
});
celEnvBase.registerFunction("exists(map,string):bool", (obj, name) => {
  return hasProperty(obj, name);
});
function _concat(...args) {
  return [].concat(...args);
}
function _join(list, sep) {
  if (!list) return "";
  return list.join(sep);
}
const StringPrefixRegexp = "regexp://";
const StringPrefixCel = "cel://";
const StringPrefixRaw = "raw://";
function createFunction(expression, scopeKeys) {
  let fn;
  try {
    const js = `return (${expression})`;
    fn = scopeKeys && scopeKeys.length > 0 ? new Function(scopeKeys.join(","), js) : new Function(js);
  } catch (_err) {
    fn = scopeKeys && scopeKeys.length > 0 ? new Function(scopeKeys.join(","), expression) : new Function(expression);
  }
  return fn;
}
function evaluateSimple(expression, scope) {
  const scopeKeys = scope ? Object.keys(scope) : void 0;
  const scopeValues = scope ? Object.values(scope) : void 0;
  const fn = createFunction(expression, scopeKeys);
  return scopeValues ? fn(...scopeValues) : fn();
}
function evaluateExpressions(expressions, context, celEnv, dry) {
  if (isNil(expressions)) return _returnExpressionWithDry(expressions, dry);
  if (Array.isArray(expressions)) {
    return expressions.map((item) => _evaluateExpressionInner(item, context, celEnv, dry));
  } else if (typeof expressions === "object") {
    const res = {};
    for (const key2 in expressions) {
      res[key2] = _evaluateExpressionInner(expressions[key2], context, celEnv, dry);
    }
    return res;
  }
  return _evaluateExpressionInner(expressions, context, celEnv, dry);
}
function _evaluateExpressionInner(expression, context, celEnv, dry) {
  if (isNil(expression)) return _returnExpressionWithDry(expression, dry);
  if (typeof expression === "object") return evaluateExpressions(expression, context, celEnv, dry);
  if (typeof expression !== "string") return _returnExpressionWithDry(expression, dry);
  if (!expression.startsWith(StringPrefixCel)) return _returnExpressionWithDry(expression, dry);
  return dry ? true : evaluate(expression.substring(StringPrefixCel.length), context, celEnv);
}
function _returnExpressionWithDry(expression, dry) {
  return dry ? false : expression;
}
function evaluate(expression, context, celEnv) {
  if (expression.startsWith(StringPrefixRaw)) {
    return expression.substring(StringPrefixRaw.length);
  } else if (expression.startsWith(StringPrefixRegexp)) {
    return evaluateSimple(expression.substring(StringPrefixRegexp.length));
  }
  return (celEnv ?? celEnvBase).evaluate(expression, context);
}
function hashkey(key2) {
  if (key2 === void 0 || key2 === null) {
    return "";
  }
  if (Array.isArray(key2) || typeof key2 === "object") {
    return objectHash(key2, {
      respectType: false
    });
  }
  if (typeof key2 !== "string") {
    return String(key2);
  }
  return key2;
}
function matchSelector(match, selector, matchThis, ...matchArgs) {
  if (!Array.isArray(match)) {
    if (typeof match === "string" && match.startsWith(StringPrefixRegexp)) {
      match = evaluateSimple(match.substring(StringPrefixRegexp.length));
    }
    return typeof match === "string" && match.startsWith(StringPrefixCel) && !!evaluateExpressions(match, {
      selector,
      context: matchArgs[0] && typeof matchArgs[0] === "object" ? {
        ...matchArgs[0]
      } : matchArgs[0]
    }) || typeof match === "string" && !match.startsWith(StringPrefixCel) && typeof selector === "string" && match === selector || match instanceof RegExp && typeof selector === "string" && match.test(selector) || typeof match === "function" && match.call(matchThis, selector, ...matchArgs);
  }
  return match.some((item) => matchSelector(item, selector));
}
function combineResourceNameParts(resourceName, moduleName, simplify, simplifyProviderId) {
  simplify = simplify ?? true;
  simplifyProviderId = simplifyProviderId ?? true;
  if (!resourceName) resourceName = "";
  if (typeof moduleName !== "string") moduleName = moduleName.relativeName;
  const parts = moduleName.split("-");
  const res = [];
  if (!simplifyProviderId || parts[0] !== "a") res.push(parts[0]);
  if (!simplify || !resourceName.startsWith(parts[1])) res.push(parts[1]);
  if (resourceName) res.push(resourceName);
  return res;
}
function combineApiPath(path, moduleName, prefix, simplify, globalPrefixConfig) {
  const globalPrefix = globalPrefixConfig;
  simplify = simplify ?? true;
  if (!path) path = "";
  if (path.startsWith("//")) return path.substring(1);
  if (path.startsWith("/")) return `${globalPrefix}${path}`;
  const parts = combineResourceNameParts(path, moduleName ?? "", simplify, true);
  return `${globalPrefix}/${parts.join("/")}`;
}
function combineApiPathControllerAndAction(moduleName, controllerPath, actionPath, prefix, simplify, globalPrefixConfig) {
  if (actionPath === void 0) actionPath = "";
  let routePath;
  if (typeof actionPath !== "string") {
    throw new TypeError("regexp not supported");
  } else if (actionPath.startsWith("/")) {
    routePath = combineApiPath(actionPath, moduleName, prefix, simplify, globalPrefixConfig);
  } else {
    if (!controllerPath) {
      routePath = combineApiPath(actionPath, moduleName, prefix, simplify, globalPrefixConfig);
    } else {
      routePath = combineApiPath(controllerPath, moduleName, prefix, simplify, globalPrefixConfig);
      if (actionPath) {
        routePath = `${routePath}/${actionPath}`;
      }
    }
  }
  return routePath;
}
var _Reflect = {};
var hasRequired_Reflect;
function require_Reflect() {
  if (hasRequired_Reflect) return _Reflect;
  hasRequired_Reflect = 1;
  var Reflect2;
  (function(Reflect3) {
    (function(factory) {
      var root2 = typeof globalThis === "object" ? globalThis : typeof commonjsGlobal === "object" ? commonjsGlobal : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
      var exporter = makeExporter(Reflect3);
      if (typeof root2.Reflect !== "undefined") {
        exporter = makeExporter(root2.Reflect, exporter);
      }
      factory(exporter, root2);
      if (typeof root2.Reflect === "undefined") {
        root2.Reflect = Reflect3;
      }
      function makeExporter(target, previous) {
        return function(key2, value) {
          Object.defineProperty(target, key2, { configurable: true, writable: true, value });
          if (previous)
            previous(key2, value);
        };
      }
      function functionThis() {
        try {
          return Function("return this;")();
        } catch (_) {
        }
      }
      function indirectEvalThis() {
        try {
          return (void 0, eval)("(function() { return this; })()");
        } catch (_) {
        }
      }
      function sloppyModeThis() {
        return functionThis() || indirectEvalThis();
      }
    })(function(exporter, root2) {
      var hasOwn2 = Object.prototype.hasOwnProperty;
      var supportsSymbol = typeof Symbol === "function";
      var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
      var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
      var supportsCreate = typeof Object.create === "function";
      var supportsProto = { __proto__: [] } instanceof Array;
      var downLevel = !supportsCreate && !supportsProto;
      var HashMap = {
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        create: supportsCreate ? function() {
          return MakeDictionary(/* @__PURE__ */ Object.create(null));
        } : supportsProto ? function() {
          return MakeDictionary({ __proto__: null });
        } : function() {
          return MakeDictionary({});
        },
        has: downLevel ? function(map, key2) {
          return hasOwn2.call(map, key2);
        } : function(map, key2) {
          return key2 in map;
        },
        get: downLevel ? function(map, key2) {
          return hasOwn2.call(map, key2) ? map[key2] : void 0;
        } : function(map, key2) {
          return map[key2];
        }
      };
      var functionPrototype = Object.getPrototypeOf(Function);
      var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
      var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
      var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
      var registrySymbol = supportsSymbol ? /* @__PURE__ */ Symbol.for("@reflect-metadata:registry") : void 0;
      var metadataRegistry = GetOrCreateMetadataRegistry();
      var metadataProvider = CreateMetadataProvider(metadataRegistry);
      function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
          if (!IsArray(decorators))
            throw new TypeError();
          if (!IsObject(target))
            throw new TypeError();
          if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
            throw new TypeError();
          if (IsNull(attributes))
            attributes = void 0;
          propertyKey = ToPropertyKey(propertyKey);
          return DecorateProperty(decorators, target, propertyKey, attributes);
        } else {
          if (!IsArray(decorators))
            throw new TypeError();
          if (!IsConstructor(target))
            throw new TypeError();
          return DecorateConstructor(decorators, target);
        }
      }
      exporter("decorate", decorate);
      function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
            throw new TypeError();
          OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
      }
      exporter("metadata", metadata);
      function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      exporter("defineMetadata", defineMetadata);
      function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasMetadata", hasMetadata);
      function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasOwnMetadata", hasOwnMetadata);
      function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
      }
      exporter("getMetadata", getMetadata);
      function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("getOwnMetadata", getOwnMetadata);
      function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
      }
      exporter("getMetadataKeys", getMetadataKeys);
      function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
      }
      exporter("getOwnMetadataKeys", getOwnMetadataKeys);
      function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        var provider = GetMetadataProvider(
          target,
          propertyKey,
          /*Create*/
          false
        );
        if (IsUndefined(provider))
          return false;
        return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
      }
      exporter("deleteMetadata", deleteMetadata);
      function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsConstructor(decorated))
              throw new TypeError();
            target = decorated;
          }
        }
        return target;
      }
      function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target, propertyKey, descriptor);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsObject(decorated))
              throw new TypeError();
            descriptor = decorated;
          }
        }
        return descriptor;
      }
      function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn3 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn3)
          return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
      }
      function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var provider = GetMetadataProvider(
          O,
          P,
          /*Create*/
          false
        );
        if (IsUndefined(provider))
          return false;
        return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
      }
      function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn3 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn3)
          return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryGetMetadata(MetadataKey, parent, P);
        return void 0;
      }
      function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var provider = GetMetadataProvider(
          O,
          P,
          /*Create*/
          false
        );
        if (IsUndefined(provider))
          return;
        return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
      }
      function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var provider = GetMetadataProvider(
          O,
          P,
          /*Create*/
          true
        );
        provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
      }
      function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
          return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
          return ownKeys;
        if (ownKeys.length <= 0)
          return parentKeys;
        var set = new _Set();
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
          var key2 = ownKeys_1[_i];
          var hasKey = set.has(key2);
          if (!hasKey) {
            set.add(key2);
            keys.push(key2);
          }
        }
        for (var _a2 = 0, parentKeys_1 = parentKeys; _a2 < parentKeys_1.length; _a2++) {
          var key2 = parentKeys_1[_a2];
          var hasKey = set.has(key2);
          if (!hasKey) {
            set.add(key2);
            keys.push(key2);
          }
        }
        return keys;
      }
      function OrdinaryOwnMetadataKeys(O, P) {
        var provider = GetMetadataProvider(
          O,
          P,
          /*create*/
          false
        );
        if (!provider) {
          return [];
        }
        return provider.OrdinaryOwnMetadataKeys(O, P);
      }
      function Type2(x) {
        if (x === null)
          return 1;
        switch (typeof x) {
          case "undefined":
            return 0;
          case "boolean":
            return 2;
          case "string":
            return 3;
          case "symbol":
            return 4;
          case "number":
            return 5;
          case "object":
            return x === null ? 1 : 6;
          default:
            return 6;
        }
      }
      function IsUndefined(x) {
        return x === void 0;
      }
      function IsNull(x) {
        return x === null;
      }
      function IsSymbol(x) {
        return typeof x === "symbol";
      }
      function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
      }
      function ToPrimitive(input, PreferredType) {
        switch (Type2(input)) {
          case 0:
            return input;
          case 1:
            return input;
          case 2:
            return input;
          case 3:
            return input;
          case 4:
            return input;
          case 5:
            return input;
        }
        var hint = "string";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== void 0) {
          var result = exoticToPrim.call(input, hint);
          if (IsObject(result))
            throw new TypeError();
          return result;
        }
        return OrdinaryToPrimitive(input);
      }
      function OrdinaryToPrimitive(O, hint) {
        var valueOf, result;
        {
          var toString_1 = O.toString;
          if (IsCallable(toString_1)) {
            var result = toString_1.call(O);
            if (!IsObject(result))
              return result;
          }
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
        }
        throw new TypeError();
      }
      function ToBoolean(argument) {
        return !!argument;
      }
      function ToString(argument) {
        return "" + argument;
      }
      function ToPropertyKey(argument) {
        var key2 = ToPrimitive(argument);
        if (IsSymbol(key2))
          return key2;
        return ToString(key2);
      }
      function IsArray(argument) {
        return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
      }
      function IsCallable(argument) {
        return typeof argument === "function";
      }
      function IsConstructor(argument) {
        return typeof argument === "function";
      }
      function IsPropertyKey(argument) {
        switch (Type2(argument)) {
          case 3:
            return true;
          case 4:
            return true;
          default:
            return false;
        }
      }
      function SameValueZero(x, y) {
        return x === y || x !== x && y !== y;
      }
      function GetMethod(V, P) {
        var func = V[P];
        if (func === void 0 || func === null)
          return void 0;
        if (!IsCallable(func))
          throw new TypeError();
        return func;
      }
      function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
          throw new TypeError();
        var iterator = method.call(obj);
        if (!IsObject(iterator))
          throw new TypeError();
        return iterator;
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
      }
      function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
          f.call(iterator);
      }
      function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
          return proto;
        if (proto !== functionPrototype)
          return proto;
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
          return proto;
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
          return proto;
        if (constructor === O)
          return proto;
        return constructor;
      }
      function CreateMetadataRegistry() {
        var fallback;
        if (!IsUndefined(registrySymbol) && typeof root2.Reflect !== "undefined" && !(registrySymbol in root2.Reflect) && typeof root2.Reflect.defineMetadata === "function") {
          fallback = CreateFallbackProvider(root2.Reflect);
        }
        var first;
        var second;
        var rest;
        var targetProviderMap = new _WeakMap();
        var registry2 = {
          registerProvider,
          getProvider,
          setProvider
        };
        return registry2;
        function registerProvider(provider) {
          if (!Object.isExtensible(registry2)) {
            throw new Error("Cannot add provider to a frozen registry.");
          }
          switch (true) {
            case fallback === provider:
              break;
            case IsUndefined(first):
              first = provider;
              break;
            case first === provider:
              break;
            case IsUndefined(second):
              second = provider;
              break;
            case second === provider:
              break;
            default:
              if (rest === void 0)
                rest = new _Set();
              rest.add(provider);
              break;
          }
        }
        function getProviderNoCache(O, P) {
          if (!IsUndefined(first)) {
            if (first.isProviderFor(O, P))
              return first;
            if (!IsUndefined(second)) {
              if (second.isProviderFor(O, P))
                return first;
              if (!IsUndefined(rest)) {
                var iterator = GetIterator(rest);
                while (true) {
                  var next = IteratorStep(iterator);
                  if (!next) {
                    return void 0;
                  }
                  var provider = IteratorValue(next);
                  if (provider.isProviderFor(O, P)) {
                    IteratorClose(iterator);
                    return provider;
                  }
                }
              }
            }
          }
          if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
            return fallback;
          }
          return void 0;
        }
        function getProvider(O, P) {
          var providerMap = targetProviderMap.get(O);
          var provider;
          if (!IsUndefined(providerMap)) {
            provider = providerMap.get(P);
          }
          if (!IsUndefined(provider)) {
            return provider;
          }
          provider = getProviderNoCache(O, P);
          if (!IsUndefined(provider)) {
            if (IsUndefined(providerMap)) {
              providerMap = new _Map();
              targetProviderMap.set(O, providerMap);
            }
            providerMap.set(P, provider);
          }
          return provider;
        }
        function hasProvider(provider) {
          if (IsUndefined(provider))
            throw new TypeError();
          return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
        }
        function setProvider(O, P, provider) {
          if (!hasProvider(provider)) {
            throw new Error("Metadata provider not registered.");
          }
          var existingProvider = getProvider(O, P);
          if (existingProvider !== provider) {
            if (!IsUndefined(existingProvider)) {
              return false;
            }
            var providerMap = targetProviderMap.get(O);
            if (IsUndefined(providerMap)) {
              providerMap = new _Map();
              targetProviderMap.set(O, providerMap);
            }
            providerMap.set(P, provider);
          }
          return true;
        }
      }
      function GetOrCreateMetadataRegistry() {
        var metadataRegistry2;
        if (!IsUndefined(registrySymbol) && IsObject(root2.Reflect) && Object.isExtensible(root2.Reflect)) {
          metadataRegistry2 = root2.Reflect[registrySymbol];
        }
        if (IsUndefined(metadataRegistry2)) {
          metadataRegistry2 = CreateMetadataRegistry();
        }
        if (!IsUndefined(registrySymbol) && IsObject(root2.Reflect) && Object.isExtensible(root2.Reflect)) {
          Object.defineProperty(root2.Reflect, registrySymbol, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: metadataRegistry2
          });
        }
        return metadataRegistry2;
      }
      function CreateMetadataProvider(registry2) {
        var metadata2 = new _WeakMap();
        var provider = {
          isProviderFor: function(O, P) {
            var targetMetadata = metadata2.get(O);
            if (IsUndefined(targetMetadata))
              return false;
            return targetMetadata.has(P);
          },
          OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
          OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
          OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
          OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
          OrdinaryDeleteMetadata
        };
        metadataRegistry.registerProvider(provider);
        return provider;
        function GetOrCreateMetadataMap(O, P, Create) {
          var targetMetadata = metadata2.get(O);
          var createdTargetMetadata = false;
          if (IsUndefined(targetMetadata)) {
            if (!Create)
              return void 0;
            targetMetadata = new _Map();
            metadata2.set(O, targetMetadata);
            createdTargetMetadata = true;
          }
          var metadataMap = targetMetadata.get(P);
          if (IsUndefined(metadataMap)) {
            if (!Create)
              return void 0;
            metadataMap = new _Map();
            targetMetadata.set(P, metadataMap);
            if (!registry2.setProvider(O, P, provider)) {
              targetMetadata.delete(P);
              if (createdTargetMetadata) {
                metadata2.delete(O);
              }
              throw new Error("Wrong provider for target.");
            }
          }
          return metadataMap;
        }
        function OrdinaryHasOwnMetadata2(MetadataKey, O, P) {
          var metadataMap = GetOrCreateMetadataMap(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(metadataMap))
            return false;
          return ToBoolean(metadataMap.has(MetadataKey));
        }
        function OrdinaryGetOwnMetadata2(MetadataKey, O, P) {
          var metadataMap = GetOrCreateMetadataMap(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(metadataMap))
            return void 0;
          return metadataMap.get(MetadataKey);
        }
        function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O, P) {
          var metadataMap = GetOrCreateMetadataMap(
            O,
            P,
            /*Create*/
            true
          );
          metadataMap.set(MetadataKey, MetadataValue);
        }
        function OrdinaryOwnMetadataKeys2(O, P) {
          var keys = [];
          var metadataMap = GetOrCreateMetadataMap(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(metadataMap))
            return keys;
          var keysObj = metadataMap.keys();
          var iterator = GetIterator(keysObj);
          var k = 0;
          while (true) {
            var next = IteratorStep(iterator);
            if (!next) {
              keys.length = k;
              return keys;
            }
            var nextValue = IteratorValue(next);
            try {
              keys[k] = nextValue;
            } catch (e) {
              try {
                IteratorClose(iterator);
              } finally {
                throw e;
              }
            }
            k++;
          }
        }
        function OrdinaryDeleteMetadata(MetadataKey, O, P) {
          var metadataMap = GetOrCreateMetadataMap(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(metadataMap))
            return false;
          if (!metadataMap.delete(MetadataKey))
            return false;
          if (metadataMap.size === 0) {
            var targetMetadata = metadata2.get(O);
            if (!IsUndefined(targetMetadata)) {
              targetMetadata.delete(P);
              if (targetMetadata.size === 0) {
                metadata2.delete(targetMetadata);
              }
            }
          }
          return true;
        }
      }
      function CreateFallbackProvider(reflect) {
        var defineMetadata2 = reflect.defineMetadata, hasOwnMetadata2 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
        var metadataOwner = new _WeakMap();
        var provider = {
          isProviderFor: function(O, P) {
            var metadataPropertySet = metadataOwner.get(O);
            if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) {
              return true;
            }
            if (getOwnMetadataKeys2(O, P).length) {
              if (IsUndefined(metadataPropertySet)) {
                metadataPropertySet = new _Set();
                metadataOwner.set(O, metadataPropertySet);
              }
              metadataPropertySet.add(P);
              return true;
            }
            return false;
          },
          OrdinaryDefineOwnMetadata: defineMetadata2,
          OrdinaryHasOwnMetadata: hasOwnMetadata2,
          OrdinaryGetOwnMetadata: getOwnMetadata2,
          OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
          OrdinaryDeleteMetadata: deleteMetadata2
        };
        return provider;
      }
      function GetMetadataProvider(O, P, Create) {
        var registeredProvider = metadataRegistry.getProvider(O, P);
        if (!IsUndefined(registeredProvider)) {
          return registeredProvider;
        }
        if (Create) {
          if (metadataRegistry.setProvider(O, P, metadataProvider)) {
            return metadataProvider;
          }
          throw new Error("Illegal state.");
        }
        return void 0;
      }
      function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = (
          /** @class */
          (function() {
            function MapIterator2(keys, values, selector) {
              this._index = 0;
              this._keys = keys;
              this._values = values;
              this._selector = selector;
            }
            MapIterator2.prototype["@@iterator"] = function() {
              return this;
            };
            MapIterator2.prototype[iteratorSymbol] = function() {
              return this;
            };
            MapIterator2.prototype.next = function() {
              var index = this._index;
              if (index >= 0 && index < this._keys.length) {
                var result = this._selector(this._keys[index], this._values[index]);
                if (index + 1 >= this._keys.length) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                } else {
                  this._index++;
                }
                return { value: result, done: false };
              }
              return { value: void 0, done: true };
            };
            MapIterator2.prototype.throw = function(error) {
              if (this._index >= 0) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              }
              throw error;
            };
            MapIterator2.prototype.return = function(value) {
              if (this._index >= 0) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              }
              return { value, done: true };
            };
            return MapIterator2;
          })()
        );
        var Map2 = (
          /** @class */
          (function() {
            function Map3() {
              this._keys = [];
              this._values = [];
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            }
            Object.defineProperty(Map3.prototype, "size", {
              get: function() {
                return this._keys.length;
              },
              enumerable: true,
              configurable: true
            });
            Map3.prototype.has = function(key2) {
              return this._find(
                key2,
                /*insert*/
                false
              ) >= 0;
            };
            Map3.prototype.get = function(key2) {
              var index = this._find(
                key2,
                /*insert*/
                false
              );
              return index >= 0 ? this._values[index] : void 0;
            };
            Map3.prototype.set = function(key2, value) {
              var index = this._find(
                key2,
                /*insert*/
                true
              );
              this._values[index] = value;
              return this;
            };
            Map3.prototype.delete = function(key2) {
              var index = this._find(
                key2,
                /*insert*/
                false
              );
              if (index >= 0) {
                var size = this._keys.length;
                for (var i = index + 1; i < size; i++) {
                  this._keys[i - 1] = this._keys[i];
                  this._values[i - 1] = this._values[i];
                }
                this._keys.length--;
                this._values.length--;
                if (SameValueZero(key2, this._cacheKey)) {
                  this._cacheKey = cacheSentinel;
                  this._cacheIndex = -2;
                }
                return true;
              }
              return false;
            };
            Map3.prototype.clear = function() {
              this._keys.length = 0;
              this._values.length = 0;
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            };
            Map3.prototype.keys = function() {
              return new MapIterator(this._keys, this._values, getKey);
            };
            Map3.prototype.values = function() {
              return new MapIterator(this._keys, this._values, getValue);
            };
            Map3.prototype.entries = function() {
              return new MapIterator(this._keys, this._values, getEntry);
            };
            Map3.prototype["@@iterator"] = function() {
              return this.entries();
            };
            Map3.prototype[iteratorSymbol] = function() {
              return this.entries();
            };
            Map3.prototype._find = function(key2, insert) {
              if (!SameValueZero(this._cacheKey, key2)) {
                this._cacheIndex = -1;
                for (var i = 0; i < this._keys.length; i++) {
                  if (SameValueZero(this._keys[i], key2)) {
                    this._cacheIndex = i;
                    break;
                  }
                }
              }
              if (this._cacheIndex < 0 && insert) {
                this._cacheIndex = this._keys.length;
                this._keys.push(key2);
                this._values.push(void 0);
              }
              return this._cacheIndex;
            };
            return Map3;
          })()
        );
        return Map2;
        function getKey(key2, _) {
          return key2;
        }
        function getValue(_, value) {
          return value;
        }
        function getEntry(key2, value) {
          return [key2, value];
        }
      }
      function CreateSetPolyfill() {
        var Set2 = (
          /** @class */
          (function() {
            function Set3() {
              this._map = new _Map();
            }
            Object.defineProperty(Set3.prototype, "size", {
              get: function() {
                return this._map.size;
              },
              enumerable: true,
              configurable: true
            });
            Set3.prototype.has = function(value) {
              return this._map.has(value);
            };
            Set3.prototype.add = function(value) {
              return this._map.set(value, value), this;
            };
            Set3.prototype.delete = function(value) {
              return this._map.delete(value);
            };
            Set3.prototype.clear = function() {
              this._map.clear();
            };
            Set3.prototype.keys = function() {
              return this._map.keys();
            };
            Set3.prototype.values = function() {
              return this._map.keys();
            };
            Set3.prototype.entries = function() {
              return this._map.entries();
            };
            Set3.prototype["@@iterator"] = function() {
              return this.keys();
            };
            Set3.prototype[iteratorSymbol] = function() {
              return this.keys();
            };
            return Set3;
          })()
        );
        return Set2;
      }
      function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return (
          /** @class */
          (function() {
            function WeakMap2() {
              this._key = CreateUniqueKey();
            }
            WeakMap2.prototype.has = function(target) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                false
              );
              return table !== void 0 ? HashMap.has(table, this._key) : false;
            };
            WeakMap2.prototype.get = function(target) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                false
              );
              return table !== void 0 ? HashMap.get(table, this._key) : void 0;
            };
            WeakMap2.prototype.set = function(target, value) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                true
              );
              table[this._key] = value;
              return this;
            };
            WeakMap2.prototype.delete = function(target) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                false
              );
              return table !== void 0 ? delete table[this._key] : false;
            };
            WeakMap2.prototype.clear = function() {
              this._key = CreateUniqueKey();
            };
            return WeakMap2;
          })()
        );
        function CreateUniqueKey() {
          var key2;
          do
            key2 = "@@WeakMap@@" + CreateUUID();
          while (HashMap.has(keys, key2));
          keys[key2] = true;
          return key2;
        }
        function GetOrCreateWeakMapTable(target, create) {
          if (!hasOwn2.call(target, rootKey)) {
            if (!create)
              return void 0;
            Object.defineProperty(target, rootKey, { value: HashMap.create() });
          }
          return target[rootKey];
        }
        function FillRandomBytes(buffer2, size) {
          for (var i = 0; i < size; ++i)
            buffer2[i] = Math.random() * 255 | 0;
          return buffer2;
        }
        function GenRandomBytes(size) {
          if (typeof Uint8Array === "function") {
            var array = new Uint8Array(size);
            if (typeof crypto !== "undefined") {
              crypto.getRandomValues(array);
            } else if (typeof msCrypto !== "undefined") {
              msCrypto.getRandomValues(array);
            } else {
              FillRandomBytes(array, size);
            }
            return array;
          }
          return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
          var data = GenRandomBytes(UUID_SIZE);
          data[6] = data[6] & 79 | 64;
          data[8] = data[8] & 191 | 128;
          var result = "";
          for (var offset = 0; offset < UUID_SIZE; ++offset) {
            var byte = data[offset];
            if (offset === 4 || offset === 6 || offset === 8)
              result += "-";
            if (byte < 16)
              result += "0";
            result += byte.toString(16).toLowerCase();
          }
          return result;
        }
      }
      function MakeDictionary(obj) {
        obj.__ = void 0;
        delete obj.__;
        return obj;
      }
    });
  })(Reflect2 || (Reflect2 = {}));
  return _Reflect;
}
require_Reflect();
class AppMetadata {
  defineMetadata(metadataKey, metadataValue, target, prop) {
    if (isUndefined$1(prop)) {
      Reflect.defineMetadata(metadataKey, metadataValue, target);
    } else {
      Reflect.defineMetadata(metadataKey, metadataValue, target, prop);
    }
  }
  getOwnMetadata(metadataKey, target, prop) {
    if (isUndefined$1(prop)) return Reflect.getOwnMetadata(metadataKey, target);
    return Reflect.getOwnMetadata(metadataKey, target, prop);
  }
  getMetadata(metadataKey, target, prop) {
    if (isUndefined$1(prop)) return Reflect.getMetadata(metadataKey, target);
    return Reflect.getMetadata(metadataKey, target, prop);
  }
  getOwnMetadataArray(inherit, metadataKey, target, prop) {
    let own = this.getOwnMetadata(metadataKey, target, prop);
    if (!own) {
      if (!inherit) {
        own = [];
      } else {
        const parent = this.getMetadata(metadataKey, target, prop);
        if (parent) {
          own = parent.slice();
        } else {
          own = [];
        }
      }
      this.defineMetadata(metadataKey, own, target, prop);
    }
    return own;
  }
  getOwnMetadataMap(inherit, metadataKey, target, prop) {
    let own = this.getOwnMetadata(metadataKey, target, prop);
    if (!own) {
      if (!inherit) {
        own = {};
      } else {
        const parent = this.getMetadata(metadataKey, target, prop);
        if (parent) {
          own = Object.assign({}, parent);
        } else {
          own = {};
        }
      }
      this.defineMetadata(metadataKey, own, target, prop);
    }
    return own;
  }
  getDesignType(target, prop) {
    return this.getMetadata("design:type", target, prop);
  }
  getDesignParamtypes(target, prop) {
    return this.getMetadata("design:paramtypes", target, prop);
  }
  getDesignReturntype(target, prop) {
    return this.getMetadata("design:returntype", target, prop);
  }
}
const appMetadata = new AppMetadata();
const SymbolMappedClassMetadataKeys = /* @__PURE__ */ Symbol("SymbolMappedClassMetakeys");
function registerMappedClassMetadataKey(target, metadataKey, options) {
  const metadataKeys = appMetadata.getOwnMetadataMap(true, SymbolMappedClassMetadataKeys, target);
  if (!Object.hasOwn(metadataKeys, metadataKey)) {
    metadataKeys[metadataKey] = options;
  }
}
let buf;
let bufIdx = 0;
const hexBytes = Array.from({
  length: 256
});
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib2 = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib2 !== void 0) {
    if (lib2.randomBytes !== void 0) {
      return lib2.randomBytes;
    }
    if (lib2.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib2.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uuid$1() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return `${hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]]}-${hexBytes[b[4]]}${hexBytes[b[5]]}-${hexBytes[b[6]]}${hexBytes[b[7]]}-${hexBytes[b[8]]}${hexBytes[b[9]]}-${hexBytes[b[10]]}${hexBytes[b[11]]}${hexBytes[b[12]]}${hexBytes[b[13]]}${hexBytes[b[14]]}${hexBytes[b[15]]}`;
}
let _sys;
function getSys() {
  return _sys;
}
function setSys(sys2) {
  _sys = sys2;
}
const hasOwn = Object.prototype.hasOwnProperty;
const toStr = Object.prototype.toString;
const defineProperty = Object.defineProperty;
const gOPD$1 = Object.getOwnPropertyDescriptor;
function isArray(arr) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(arr);
  }
  return toStr.call(arr) === "[object Array]";
}
function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== "[object Object]") {
    return false;
  }
  const hasOwnConstructor = hasOwn.call(obj, "constructor");
  const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }
  let key2;
  for (key2 in obj) {
  }
  return typeof key2 === "undefined" || hasOwn.call(obj, key2);
}
function setProperty(target, options) {
  if (defineProperty && options.name === "__proto__") {
    defineProperty(target, options.name, {
      enumerable: true,
      configurable: true,
      value: options.newValue,
      writable: true
    });
  } else {
    target[options.name] = options.newValue;
  }
}
function getProperty(obj, name) {
  if (name === "__proto__") {
    if (!hasOwn.call(obj, name)) {
      return void 0;
    } else if (gOPD$1) {
      return gOPD$1(obj, name).value;
    }
  }
  return obj[name];
}
function extend(...args) {
  let options, name, src, copy, copyIsArray, clone;
  let target = args[0];
  let i = 1;
  const length = arguments.length;
  let deep = false;
  if (typeof target === "boolean") {
    deep = target;
    target = args[1] || {};
    i = 2;
  }
  if (target == null || typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  for (; i < length; ++i) {
    options = args[i];
    if (options != null) {
      if (options.$$typeof) {
        target = options;
        continue;
      }
      for (name in options) {
        src = getProperty(target, name);
        copy = getProperty(options, name);
        if (target !== copy) {
          if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }
            setProperty(target, {
              name,
              newValue: extend(deep, clone, copy)
            });
          } else {
            setProperty(target, {
              name,
              newValue: copy
            });
          }
        }
      }
    }
  }
  return target;
}
var isArguments$1;
var hasRequiredIsArguments$1;
function requireIsArguments$1() {
  if (hasRequiredIsArguments$1) return isArguments$1;
  hasRequiredIsArguments$1 = 1;
  var toStr2 = Object.prototype.toString;
  isArguments$1 = function isArguments2(value) {
    var str = toStr2.call(value);
    var isArgs = str === "[object Arguments]";
    if (!isArgs) {
      isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr2.call(value.callee) === "[object Function]";
    }
    return isArgs;
  };
  return isArguments$1;
}
var implementation$4;
var hasRequiredImplementation$4;
function requireImplementation$4() {
  if (hasRequiredImplementation$4) return implementation$4;
  hasRequiredImplementation$4 = 1;
  var keysShim;
  if (!Object.keys) {
    var has = Object.prototype.hasOwnProperty;
    var toStr2 = Object.prototype.toString;
    var isArgs = requireIsArguments$1();
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
    var hasProtoEnumBug = isEnumerable.call(function() {
    }, "prototype");
    var dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ];
    var equalsConstructorPrototype = function(o) {
      var ctor = o.constructor;
      return ctor && ctor.prototype === o;
    };
    var excludedKeys = {
      $applicationCache: true,
      $console: true,
      $external: true,
      $frame: true,
      $frameElement: true,
      $frames: true,
      $innerHeight: true,
      $innerWidth: true,
      $onmozfullscreenchange: true,
      $onmozfullscreenerror: true,
      $outerHeight: true,
      $outerWidth: true,
      $pageXOffset: true,
      $pageYOffset: true,
      $parent: true,
      $scrollLeft: true,
      $scrollTop: true,
      $scrollX: true,
      $scrollY: true,
      $self: true,
      $webkitIndexedDB: true,
      $webkitStorageInfo: true,
      $window: true
    };
    var hasAutomationEqualityBug = (function() {
      if (typeof window === "undefined") {
        return false;
      }
      for (var k in window) {
        try {
          if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
            try {
              equalsConstructorPrototype(window[k]);
            } catch (e) {
              return true;
            }
          }
        } catch (e) {
          return true;
        }
      }
      return false;
    })();
    var equalsConstructorPrototypeIfNotBuggy = function(o) {
      if (typeof window === "undefined" || !hasAutomationEqualityBug) {
        return equalsConstructorPrototype(o);
      }
      try {
        return equalsConstructorPrototype(o);
      } catch (e) {
        return false;
      }
    };
    keysShim = function keys(object) {
      var isObject2 = object !== null && typeof object === "object";
      var isFunction = toStr2.call(object) === "[object Function]";
      var isArguments2 = isArgs(object);
      var isString2 = isObject2 && toStr2.call(object) === "[object String]";
      var theKeys = [];
      if (!isObject2 && !isFunction && !isArguments2) {
        throw new TypeError("Object.keys called on a non-object");
      }
      var skipProto = hasProtoEnumBug && isFunction;
      if (isString2 && object.length > 0 && !has.call(object, 0)) {
        for (var i = 0; i < object.length; ++i) {
          theKeys.push(String(i));
        }
      }
      if (isArguments2 && object.length > 0) {
        for (var j = 0; j < object.length; ++j) {
          theKeys.push(String(j));
        }
      } else {
        for (var name in object) {
          if (!(skipProto && name === "prototype") && has.call(object, name)) {
            theKeys.push(String(name));
          }
        }
      }
      if (hasDontEnumBug) {
        var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
        for (var k = 0; k < dontEnums.length; ++k) {
          if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
            theKeys.push(dontEnums[k]);
          }
        }
      }
      return theKeys;
    };
  }
  implementation$4 = keysShim;
  return implementation$4;
}
var objectKeys;
var hasRequiredObjectKeys;
function requireObjectKeys() {
  if (hasRequiredObjectKeys) return objectKeys;
  hasRequiredObjectKeys = 1;
  var slice = Array.prototype.slice;
  var isArgs = requireIsArguments$1();
  var origKeys = Object.keys;
  var keysShim = origKeys ? function keys(o) {
    return origKeys(o);
  } : requireImplementation$4();
  var originalKeys = Object.keys;
  keysShim.shim = function shimObjectKeys() {
    if (Object.keys) {
      var keysWorksWithArguments = (function() {
        var args = Object.keys(arguments);
        return args && args.length === arguments.length;
      })(1, 2);
      if (!keysWorksWithArguments) {
        Object.keys = function keys(object) {
          if (isArgs(object)) {
            return originalKeys(slice.call(object));
          }
          return originalKeys(object);
        };
      }
    } else {
      Object.keys = keysShim;
    }
    return Object.keys || keysShim;
  };
  objectKeys = keysShim;
  return objectKeys;
}
var esDefineProperty;
var hasRequiredEsDefineProperty;
function requireEsDefineProperty() {
  if (hasRequiredEsDefineProperty) return esDefineProperty;
  hasRequiredEsDefineProperty = 1;
  var $defineProperty = Object.defineProperty || false;
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty = false;
    }
  }
  esDefineProperty = $defineProperty;
  return esDefineProperty;
}
var syntax;
var hasRequiredSyntax;
function requireSyntax() {
  if (hasRequiredSyntax) return syntax;
  hasRequiredSyntax = 1;
  syntax = SyntaxError;
  return syntax;
}
var type;
var hasRequiredType;
function requireType() {
  if (hasRequiredType) return type;
  hasRequiredType = 1;
  type = TypeError;
  return type;
}
var gOPD;
var hasRequiredGOPD;
function requireGOPD() {
  if (hasRequiredGOPD) return gOPD;
  hasRequiredGOPD = 1;
  gOPD = Object.getOwnPropertyDescriptor;
  return gOPD;
}
var gopd;
var hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd) return gopd;
  hasRequiredGopd = 1;
  var $gOPD = /* @__PURE__ */ requireGOPD();
  if ($gOPD) {
    try {
      $gOPD([], "length");
    } catch (e) {
      $gOPD = null;
    }
  }
  gopd = $gOPD;
  return gopd;
}
var defineDataProperty;
var hasRequiredDefineDataProperty;
function requireDefineDataProperty() {
  if (hasRequiredDefineDataProperty) return defineDataProperty;
  hasRequiredDefineDataProperty = 1;
  var $defineProperty = /* @__PURE__ */ requireEsDefineProperty();
  var $SyntaxError = /* @__PURE__ */ requireSyntax();
  var $TypeError = /* @__PURE__ */ requireType();
  var gopd2 = /* @__PURE__ */ requireGopd();
  defineDataProperty = function defineDataProperty2(obj, property, value) {
    if (!obj || typeof obj !== "object" && typeof obj !== "function") {
      throw new $TypeError("`obj` must be an object or a function`");
    }
    if (typeof property !== "string" && typeof property !== "symbol") {
      throw new $TypeError("`property` must be a string or a symbol`");
    }
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
      throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
      throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
      throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
    }
    if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
      throw new $TypeError("`loose`, if provided, must be a boolean");
    }
    var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
    var nonWritable = arguments.length > 4 ? arguments[4] : null;
    var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
    var loose = arguments.length > 6 ? arguments[6] : false;
    var desc = !!gopd2 && gopd2(obj, property);
    if ($defineProperty) {
      $defineProperty(obj, property, {
        configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
        enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
        value,
        writable: nonWritable === null && desc ? desc.writable : !nonWritable
      });
    } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
      obj[property] = value;
    } else {
      throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
    }
  };
  return defineDataProperty;
}
var hasPropertyDescriptors_1;
var hasRequiredHasPropertyDescriptors;
function requireHasPropertyDescriptors() {
  if (hasRequiredHasPropertyDescriptors) return hasPropertyDescriptors_1;
  hasRequiredHasPropertyDescriptors = 1;
  var $defineProperty = /* @__PURE__ */ requireEsDefineProperty();
  var hasPropertyDescriptors = function hasPropertyDescriptors2() {
    return !!$defineProperty;
  };
  hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
    if (!$defineProperty) {
      return null;
    }
    try {
      return $defineProperty([], "length", { value: 1 }).length !== 1;
    } catch (e) {
      return true;
    }
  };
  hasPropertyDescriptors_1 = hasPropertyDescriptors;
  return hasPropertyDescriptors_1;
}
var defineProperties_1;
var hasRequiredDefineProperties;
function requireDefineProperties() {
  if (hasRequiredDefineProperties) return defineProperties_1;
  hasRequiredDefineProperties = 1;
  var keys = requireObjectKeys();
  var hasSymbols2 = typeof Symbol === "function" && typeof /* @__PURE__ */ Symbol("foo") === "symbol";
  var toStr2 = Object.prototype.toString;
  var concat = Array.prototype.concat;
  var defineDataProperty2 = /* @__PURE__ */ requireDefineDataProperty();
  var isFunction = function(fn) {
    return typeof fn === "function" && toStr2.call(fn) === "[object Function]";
  };
  var supportsDescriptors = /* @__PURE__ */ requireHasPropertyDescriptors()();
  var defineProperty2 = function(object, name, value, predicate) {
    if (name in object) {
      if (predicate === true) {
        if (object[name] === value) {
          return;
        }
      } else if (!isFunction(predicate) || !predicate()) {
        return;
      }
    }
    if (supportsDescriptors) {
      defineDataProperty2(object, name, value, true);
    } else {
      defineDataProperty2(object, name, value);
    }
  };
  var defineProperties = function(object, map) {
    var predicates = arguments.length > 2 ? arguments[2] : {};
    var props = keys(map);
    if (hasSymbols2) {
      props = concat.call(props, Object.getOwnPropertySymbols(map));
    }
    for (var i = 0; i < props.length; i += 1) {
      defineProperty2(object, props[i], map[props[i]], predicates[props[i]]);
    }
  };
  defineProperties.supportsDescriptors = !!supportsDescriptors;
  defineProperties_1 = defineProperties;
  return defineProperties_1;
}
var callBind = { exports: {} };
var esObjectAtoms;
var hasRequiredEsObjectAtoms;
function requireEsObjectAtoms() {
  if (hasRequiredEsObjectAtoms) return esObjectAtoms;
  hasRequiredEsObjectAtoms = 1;
  esObjectAtoms = Object;
  return esObjectAtoms;
}
var esErrors;
var hasRequiredEsErrors;
function requireEsErrors() {
  if (hasRequiredEsErrors) return esErrors;
  hasRequiredEsErrors = 1;
  esErrors = Error;
  return esErrors;
}
var _eval;
var hasRequired_eval;
function require_eval() {
  if (hasRequired_eval) return _eval;
  hasRequired_eval = 1;
  _eval = EvalError;
  return _eval;
}
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  range = RangeError;
  return range;
}
var ref;
var hasRequiredRef;
function requireRef() {
  if (hasRequiredRef) return ref;
  hasRequiredRef = 1;
  ref = ReferenceError;
  return ref;
}
var uri;
var hasRequiredUri;
function requireUri() {
  if (hasRequiredUri) return uri;
  hasRequiredUri = 1;
  uri = URIError;
  return uri;
}
var abs;
var hasRequiredAbs;
function requireAbs() {
  if (hasRequiredAbs) return abs;
  hasRequiredAbs = 1;
  abs = Math.abs;
  return abs;
}
var floor;
var hasRequiredFloor;
function requireFloor() {
  if (hasRequiredFloor) return floor;
  hasRequiredFloor = 1;
  floor = Math.floor;
  return floor;
}
var max;
var hasRequiredMax;
function requireMax() {
  if (hasRequiredMax) return max;
  hasRequiredMax = 1;
  max = Math.max;
  return max;
}
var min;
var hasRequiredMin;
function requireMin() {
  if (hasRequiredMin) return min;
  hasRequiredMin = 1;
  min = Math.min;
  return min;
}
var pow;
var hasRequiredPow;
function requirePow() {
  if (hasRequiredPow) return pow;
  hasRequiredPow = 1;
  pow = Math.pow;
  return pow;
}
var round;
var hasRequiredRound;
function requireRound() {
  if (hasRequiredRound) return round;
  hasRequiredRound = 1;
  round = Math.round;
  return round;
}
var _isNaN;
var hasRequired_isNaN;
function require_isNaN() {
  if (hasRequired_isNaN) return _isNaN;
  hasRequired_isNaN = 1;
  _isNaN = Number.isNaN || function isNaN2(a) {
    return a !== a;
  };
  return _isNaN;
}
var sign;
var hasRequiredSign;
function requireSign() {
  if (hasRequiredSign) return sign;
  hasRequiredSign = 1;
  var $isNaN = /* @__PURE__ */ require_isNaN();
  sign = function sign2(number) {
    if ($isNaN(number) || number === 0) {
      return number;
    }
    return number < 0 ? -1 : 1;
  };
  return sign;
}
var shams$1;
var hasRequiredShams$1;
function requireShams$1() {
  if (hasRequiredShams$1) return shams$1;
  hasRequiredShams$1 = 1;
  shams$1 = function hasSymbols2() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = /* @__PURE__ */ Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (var _ in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(obj, sym)
      );
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
  return shams$1;
}
var hasSymbols;
var hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols) return hasSymbols;
  hasRequiredHasSymbols = 1;
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = requireShams$1();
  hasSymbols = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof /* @__PURE__ */ Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
  return hasSymbols;
}
var Reflect_getPrototypeOf;
var hasRequiredReflect_getPrototypeOf;
function requireReflect_getPrototypeOf() {
  if (hasRequiredReflect_getPrototypeOf) return Reflect_getPrototypeOf;
  hasRequiredReflect_getPrototypeOf = 1;
  Reflect_getPrototypeOf = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  return Reflect_getPrototypeOf;
}
var Object_getPrototypeOf;
var hasRequiredObject_getPrototypeOf;
function requireObject_getPrototypeOf() {
  if (hasRequiredObject_getPrototypeOf) return Object_getPrototypeOf;
  hasRequiredObject_getPrototypeOf = 1;
  var $Object = /* @__PURE__ */ requireEsObjectAtoms();
  Object_getPrototypeOf = $Object.getPrototypeOf || null;
  return Object_getPrototypeOf;
}
var implementation$3;
var hasRequiredImplementation$3;
function requireImplementation$3() {
  if (hasRequiredImplementation$3) return implementation$3;
  hasRequiredImplementation$3 = 1;
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var toStr2 = Object.prototype.toString;
  var max2 = Math.max;
  var funcType = "[object Function]";
  var concatty = function concatty2(a, b) {
    var arr = [];
    for (var i = 0; i < a.length; i += 1) {
      arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
      arr[j + a.length] = b[j];
    }
    return arr;
  };
  var slicy = function slicy2(arrLike, offset) {
    var arr = [];
    for (var i = offset, j = 0; i < arrLike.length; i += 1, j += 1) {
      arr[j] = arrLike[i];
    }
    return arr;
  };
  var joiny = function(arr, joiner) {
    var str = "";
    for (var i = 0; i < arr.length; i += 1) {
      str += arr[i];
      if (i + 1 < arr.length) {
        str += joiner;
      }
    }
    return str;
  };
  implementation$3 = function bind(that) {
    var target = this;
    if (typeof target !== "function" || toStr2.apply(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(
          this,
          concatty(args, arguments)
        );
        if (Object(result) === result) {
          return result;
        }
        return this;
      }
      return target.apply(
        that,
        concatty(args, arguments)
      );
    };
    var boundLength = max2(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
      boundArgs[i] = "$" + i;
    }
    bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {
      };
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound;
  };
  return implementation$3;
}
var functionBind;
var hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind) return functionBind;
  hasRequiredFunctionBind = 1;
  var implementation2 = requireImplementation$3();
  functionBind = Function.prototype.bind || implementation2;
  return functionBind;
}
var functionCall;
var hasRequiredFunctionCall;
function requireFunctionCall() {
  if (hasRequiredFunctionCall) return functionCall;
  hasRequiredFunctionCall = 1;
  functionCall = Function.prototype.call;
  return functionCall;
}
var functionApply;
var hasRequiredFunctionApply;
function requireFunctionApply() {
  if (hasRequiredFunctionApply) return functionApply;
  hasRequiredFunctionApply = 1;
  functionApply = Function.prototype.apply;
  return functionApply;
}
var reflectApply;
var hasRequiredReflectApply;
function requireReflectApply() {
  if (hasRequiredReflectApply) return reflectApply;
  hasRequiredReflectApply = 1;
  reflectApply = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  return reflectApply;
}
var actualApply;
var hasRequiredActualApply;
function requireActualApply() {
  if (hasRequiredActualApply) return actualApply;
  hasRequiredActualApply = 1;
  var bind = requireFunctionBind();
  var $apply = requireFunctionApply();
  var $call = requireFunctionCall();
  var $reflectApply = requireReflectApply();
  actualApply = $reflectApply || bind.call($call, $apply);
  return actualApply;
}
var callBindApplyHelpers;
var hasRequiredCallBindApplyHelpers;
function requireCallBindApplyHelpers() {
  if (hasRequiredCallBindApplyHelpers) return callBindApplyHelpers;
  hasRequiredCallBindApplyHelpers = 1;
  var bind = requireFunctionBind();
  var $TypeError = /* @__PURE__ */ requireType();
  var $call = requireFunctionCall();
  var $actualApply = requireActualApply();
  callBindApplyHelpers = function callBindBasic(args) {
    if (args.length < 1 || typeof args[0] !== "function") {
      throw new $TypeError("a function is required");
    }
    return $actualApply(bind, $call, args);
  };
  return callBindApplyHelpers;
}
var get;
var hasRequiredGet;
function requireGet() {
  if (hasRequiredGet) return get;
  hasRequiredGet = 1;
  var callBind2 = requireCallBindApplyHelpers();
  var gOPD2 = /* @__PURE__ */ requireGopd();
  var hasProtoAccessor;
  try {
    hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (e) {
    if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
      throw e;
    }
  }
  var desc = !!hasProtoAccessor && gOPD2 && gOPD2(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  );
  var $Object = Object;
  var $getPrototypeOf = $Object.getPrototypeOf;
  get = desc && typeof desc.get === "function" ? callBind2([desc.get]) : typeof $getPrototypeOf === "function" ? (
    /** @type {import('./get')} */
    function getDunder(value) {
      return $getPrototypeOf(value == null ? value : $Object(value));
    }
  ) : false;
  return get;
}
var getProto;
var hasRequiredGetProto;
function requireGetProto() {
  if (hasRequiredGetProto) return getProto;
  hasRequiredGetProto = 1;
  var reflectGetProto = requireReflect_getPrototypeOf();
  var originalGetProto = requireObject_getPrototypeOf();
  var getDunderProto = /* @__PURE__ */ requireGet();
  getProto = reflectGetProto ? function getProto2(O) {
    return reflectGetProto(O);
  } : originalGetProto ? function getProto2(O) {
    if (!O || typeof O !== "object" && typeof O !== "function") {
      throw new TypeError("getProto: not an object");
    }
    return originalGetProto(O);
  } : getDunderProto ? function getProto2(O) {
    return getDunderProto(O);
  } : null;
  return getProto;
}
var hasown;
var hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown) return hasown;
  hasRequiredHasown = 1;
  var call = Function.prototype.call;
  var $hasOwn = Object.prototype.hasOwnProperty;
  var bind = requireFunctionBind();
  hasown = bind.call(call, $hasOwn);
  return hasown;
}
var getIntrinsic;
var hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
  if (hasRequiredGetIntrinsic) return getIntrinsic;
  hasRequiredGetIntrinsic = 1;
  var undefined$1;
  var $Object = /* @__PURE__ */ requireEsObjectAtoms();
  var $Error = /* @__PURE__ */ requireEsErrors();
  var $EvalError = /* @__PURE__ */ require_eval();
  var $RangeError = /* @__PURE__ */ requireRange();
  var $ReferenceError = /* @__PURE__ */ requireRef();
  var $SyntaxError = /* @__PURE__ */ requireSyntax();
  var $TypeError = /* @__PURE__ */ requireType();
  var $URIError = /* @__PURE__ */ requireUri();
  var abs2 = /* @__PURE__ */ requireAbs();
  var floor2 = /* @__PURE__ */ requireFloor();
  var max2 = /* @__PURE__ */ requireMax();
  var min2 = /* @__PURE__ */ requireMin();
  var pow2 = /* @__PURE__ */ requirePow();
  var round2 = /* @__PURE__ */ requireRound();
  var sign2 = /* @__PURE__ */ requireSign();
  var $Function = Function;
  var getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {
    }
  };
  var $gOPD = /* @__PURE__ */ requireGopd();
  var $defineProperty = /* @__PURE__ */ requireEsDefineProperty();
  var throwTypeError = function() {
    throw new $TypeError();
  };
  var ThrowTypeError = $gOPD ? (function() {
    try {
      arguments.callee;
      return throwTypeError;
    } catch (calleeThrows) {
      try {
        return $gOPD(arguments, "callee").get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  })() : throwTypeError;
  var hasSymbols2 = requireHasSymbols()();
  var getProto2 = requireGetProto();
  var $ObjectGPO = requireObject_getPrototypeOf();
  var $ReflectGPO = requireReflect_getPrototypeOf();
  var $apply = requireFunctionApply();
  var $call = requireFunctionCall();
  var needsEval = {};
  var TypedArray = typeof Uint8Array === "undefined" || !getProto2 ? undefined$1 : getProto2(Uint8Array);
  var INTRINSICS = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols2 && getProto2 ? getProto2([][Symbol.iterator]()) : undefined$1,
    "%AsyncFromSyncIteratorPrototype%": undefined$1,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
    "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": $Error,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": $EvalError,
    "%Float16Array%": typeof Float16Array === "undefined" ? undefined$1 : Float16Array,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols2 && getProto2 ? getProto2(getProto2([][Symbol.iterator]())) : undefined$1,
    "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
    "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols2 || !getProto2 ? undefined$1 : getProto2((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": $Object,
    "%Object.getOwnPropertyDescriptor%": $gOPD,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
    "%RangeError%": $RangeError,
    "%ReferenceError%": $ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols2 || !getProto2 ? undefined$1 : getProto2((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols2 && getProto2 ? getProto2(""[Symbol.iterator]()) : undefined$1,
    "%Symbol%": hasSymbols2 ? Symbol : undefined$1,
    "%SyntaxError%": $SyntaxError,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
    "%URIError%": $URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet,
    "%Function.prototype.call%": $call,
    "%Function.prototype.apply%": $apply,
    "%Object.defineProperty%": $defineProperty,
    "%Object.getPrototypeOf%": $ObjectGPO,
    "%Math.abs%": abs2,
    "%Math.floor%": floor2,
    "%Math.max%": max2,
    "%Math.min%": min2,
    "%Math.pow%": pow2,
    "%Math.round%": round2,
    "%Math.sign%": sign2,
    "%Reflect.getPrototypeOf%": $ReflectGPO
  };
  if (getProto2) {
    try {
      null.error;
    } catch (e) {
      var errorProto = getProto2(getProto2(e));
      INTRINSICS["%Error.prototype%"] = errorProto;
    }
  }
  var doEval = function doEval2(name) {
    var value;
    if (name === "%AsyncFunction%") {
      value = getEvalledConstructor("async function () {}");
    } else if (name === "%GeneratorFunction%") {
      value = getEvalledConstructor("function* () {}");
    } else if (name === "%AsyncGeneratorFunction%") {
      value = getEvalledConstructor("async function* () {}");
    } else if (name === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) {
        value = fn.prototype;
      }
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen && getProto2) {
        value = getProto2(gen.prototype);
      }
    }
    INTRINSICS[name] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  };
  var bind = requireFunctionBind();
  var hasOwn2 = /* @__PURE__ */ requireHasown();
  var $concat = bind.call($call, Array.prototype.concat);
  var $spliceApply = bind.call($apply, Array.prototype.splice);
  var $replace = bind.call($call, String.prototype.replace);
  var $strSlice = bind.call($call, String.prototype.slice);
  var $exec = bind.call($call, RegExp.prototype.exec);
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    } else if (last === "%" && first !== "%") {
      throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    }
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
      result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn2(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn2(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) {
        value = doEval(intrinsicName);
      }
      if (typeof value === "undefined" && !allowMissing) {
        throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
      }
      return {
        alias,
        name: intrinsicName,
        value
      };
    }
    throw new $SyntaxError("intrinsic " + name + " does not exist!");
  };
  getIntrinsic = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) {
      throw new $TypeError("intrinsic name must be a non-empty string");
    }
    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
      throw new $TypeError('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name) === null) {
      throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat([0, 1], alias));
    }
    for (var i = 1, isOwn = true; i < parts.length; i += 1) {
      var part = parts[i];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
        throw new $SyntaxError("property names with quotes must have matching quotes");
      }
      if (part === "constructor" || !isOwn) {
        skipFurtherCaching = true;
      }
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn2(INTRINSICS, intrinsicRealName)) {
        value = INTRINSICS[intrinsicRealName];
      } else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) {
            throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
          }
          return void undefined$1;
        }
        if ($gOPD && i + 1 >= parts.length) {
          var desc = $gOPD(value, part);
          isOwn = !!desc;
          if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
            value = desc.get;
          } else {
            value = value[part];
          }
        } else {
          isOwn = hasOwn2(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) {
          INTRINSICS[intrinsicRealName] = value;
        }
      }
    }
    return value;
  };
  return getIntrinsic;
}
var setFunctionLength;
var hasRequiredSetFunctionLength;
function requireSetFunctionLength() {
  if (hasRequiredSetFunctionLength) return setFunctionLength;
  hasRequiredSetFunctionLength = 1;
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var define = /* @__PURE__ */ requireDefineDataProperty();
  var hasDescriptors = /* @__PURE__ */ requireHasPropertyDescriptors()();
  var gOPD2 = /* @__PURE__ */ requireGopd();
  var $TypeError = /* @__PURE__ */ requireType();
  var $floor = GetIntrinsic("%Math.floor%");
  setFunctionLength = function setFunctionLength2(fn, length) {
    if (typeof fn !== "function") {
      throw new $TypeError("`fn` is not a function");
    }
    if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
      throw new $TypeError("`length` must be a positive 32-bit integer");
    }
    var loose = arguments.length > 2 && !!arguments[2];
    var functionLengthIsConfigurable = true;
    var functionLengthIsWritable = true;
    if ("length" in fn && gOPD2) {
      var desc = gOPD2(fn, "length");
      if (desc && !desc.configurable) {
        functionLengthIsConfigurable = false;
      }
      if (desc && !desc.writable) {
        functionLengthIsWritable = false;
      }
    }
    if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
      if (hasDescriptors) {
        define(
          /** @type {Parameters<define>[0]} */
          fn,
          "length",
          length,
          true,
          true
        );
      } else {
        define(
          /** @type {Parameters<define>[0]} */
          fn,
          "length",
          length
        );
      }
    }
    return fn;
  };
  return setFunctionLength;
}
var applyBind;
var hasRequiredApplyBind;
function requireApplyBind() {
  if (hasRequiredApplyBind) return applyBind;
  hasRequiredApplyBind = 1;
  var bind = requireFunctionBind();
  var $apply = requireFunctionApply();
  var actualApply2 = requireActualApply();
  applyBind = function applyBind2() {
    return actualApply2(bind, $apply, arguments);
  };
  return applyBind;
}
var hasRequiredCallBind;
function requireCallBind() {
  if (hasRequiredCallBind) return callBind.exports;
  hasRequiredCallBind = 1;
  (function(module) {
    var setFunctionLength2 = /* @__PURE__ */ requireSetFunctionLength();
    var $defineProperty = /* @__PURE__ */ requireEsDefineProperty();
    var callBindBasic = requireCallBindApplyHelpers();
    var applyBind2 = requireApplyBind();
    module.exports = function callBind2(originalFunction) {
      var func = callBindBasic(arguments);
      var adjustedLength = originalFunction.length - (arguments.length - 1);
      return setFunctionLength2(
        func,
        1 + (adjustedLength > 0 ? adjustedLength : 0),
        true
      );
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind2 });
    } else {
      module.exports.apply = applyBind2;
    }
  })(callBind);
  return callBind.exports;
}
var callBound$1;
var hasRequiredCallBound$1;
function requireCallBound$1() {
  if (hasRequiredCallBound$1) return callBound$1;
  hasRequiredCallBound$1 = 1;
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var callBindBasic = requireCallBindApplyHelpers();
  var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
  callBound$1 = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = (
      /** @type {(this: unknown, ...args: unknown[]) => unknown} */
      GetIntrinsic(name, !!allowMissing)
    );
    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
      return callBindBasic(
        /** @type {const} */
        [intrinsic]
      );
    }
    return intrinsic;
  };
  return callBound$1;
}
var implementation$2;
var hasRequiredImplementation$2;
function requireImplementation$2() {
  if (hasRequiredImplementation$2) return implementation$2;
  hasRequiredImplementation$2 = 1;
  var objectKeys2 = requireObjectKeys();
  var hasSymbols2 = requireShams$1()();
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var $Object = /* @__PURE__ */ requireEsObjectAtoms();
  var $push = callBound2("Array.prototype.push");
  var $propIsEnumerable = callBound2("Object.prototype.propertyIsEnumerable");
  var originalGetSymbols = hasSymbols2 ? $Object.getOwnPropertySymbols : null;
  implementation$2 = function assign2(target, source1) {
    if (target == null) {
      throw new TypeError("target must be an object");
    }
    var to = $Object(target);
    if (arguments.length === 1) {
      return to;
    }
    for (var s = 1; s < arguments.length; ++s) {
      var from = $Object(arguments[s]);
      var keys = objectKeys2(from);
      var getSymbols = hasSymbols2 && ($Object.getOwnPropertySymbols || originalGetSymbols);
      if (getSymbols) {
        var syms = getSymbols(from);
        for (var j = 0; j < syms.length; ++j) {
          var key2 = syms[j];
          if ($propIsEnumerable(from, key2)) {
            $push(keys, key2);
          }
        }
      }
      for (var i = 0; i < keys.length; ++i) {
        var nextKey = keys[i];
        if ($propIsEnumerable(from, nextKey)) {
          var propValue = from[nextKey];
          to[nextKey] = propValue;
        }
      }
    }
    return to;
  };
  return implementation$2;
}
var polyfill$2;
var hasRequiredPolyfill$2;
function requirePolyfill$2() {
  if (hasRequiredPolyfill$2) return polyfill$2;
  hasRequiredPolyfill$2 = 1;
  var implementation2 = requireImplementation$2();
  var lacksProperEnumerationOrder = function() {
    if (!Object.assign) {
      return false;
    }
    var str = "abcdefghijklmnopqrst";
    var letters = str.split("");
    var map = {};
    for (var i = 0; i < letters.length; ++i) {
      map[letters[i]] = letters[i];
    }
    var obj = Object.assign({}, map);
    var actual = "";
    for (var k in obj) {
      actual += k;
    }
    return str !== actual;
  };
  var assignHasPendingExceptions = function() {
    if (!Object.assign || !Object.preventExtensions) {
      return false;
    }
    var thrower = Object.preventExtensions({ 1: 2 });
    try {
      Object.assign(thrower, "xy");
    } catch (e) {
      return thrower[1] === "y";
    }
    return false;
  };
  polyfill$2 = function getPolyfill() {
    if (!Object.assign) {
      return implementation2;
    }
    if (lacksProperEnumerationOrder()) {
      return implementation2;
    }
    if (assignHasPendingExceptions()) {
      return implementation2;
    }
    return Object.assign;
  };
  return polyfill$2;
}
var shim$2;
var hasRequiredShim$2;
function requireShim$2() {
  if (hasRequiredShim$2) return shim$2;
  hasRequiredShim$2 = 1;
  var define = requireDefineProperties();
  var getPolyfill = requirePolyfill$2();
  shim$2 = function shimAssign() {
    var polyfill2 = getPolyfill();
    define(
      Object,
      { assign: polyfill2 },
      { assign: function() {
        return Object.assign !== polyfill2;
      } }
    );
    return polyfill2;
  };
  return shim$2;
}
var object_assign;
var hasRequiredObject_assign;
function requireObject_assign() {
  if (hasRequiredObject_assign) return object_assign;
  hasRequiredObject_assign = 1;
  var defineProperties = requireDefineProperties();
  var callBind2 = requireCallBind();
  var implementation2 = requireImplementation$2();
  var getPolyfill = requirePolyfill$2();
  var shim2 = requireShim$2();
  var polyfill2 = callBind2.apply(getPolyfill());
  var bound = function assign2(target, source1) {
    return polyfill2(Object, arguments);
  };
  defineProperties(bound, {
    getPolyfill,
    implementation: implementation2,
    shim: shim2
  });
  object_assign = bound;
  return object_assign;
}
var callBound;
var hasRequiredCallBound;
function requireCallBound() {
  if (hasRequiredCallBound) return callBound;
  hasRequiredCallBound = 1;
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var callBind2 = requireCallBind();
  var $indexOf = callBind2(GetIntrinsic("String.prototype.indexOf"));
  callBound = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic(name, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
      return callBind2(intrinsic);
    }
    return intrinsic;
  };
  return callBound;
}
var functionsHaveNames_1;
var hasRequiredFunctionsHaveNames;
function requireFunctionsHaveNames() {
  if (hasRequiredFunctionsHaveNames) return functionsHaveNames_1;
  hasRequiredFunctionsHaveNames = 1;
  var functionsHaveNames = function functionsHaveNames2() {
    return typeof (function f() {
    }).name === "string";
  };
  var gOPD2 = Object.getOwnPropertyDescriptor;
  if (gOPD2) {
    try {
      gOPD2([], "length");
    } catch (e) {
      gOPD2 = null;
    }
  }
  functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
    if (!functionsHaveNames() || !gOPD2) {
      return false;
    }
    var desc = gOPD2(function() {
    }, "name");
    return !!desc && !!desc.configurable;
  };
  var $bind = Function.prototype.bind;
  functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
    return functionsHaveNames() && typeof $bind === "function" && (function f() {
    }).bind().name !== "";
  };
  functionsHaveNames_1 = functionsHaveNames;
  return functionsHaveNames_1;
}
var setFunctionName;
var hasRequiredSetFunctionName;
function requireSetFunctionName() {
  if (hasRequiredSetFunctionName) return setFunctionName;
  hasRequiredSetFunctionName = 1;
  var define = /* @__PURE__ */ requireDefineDataProperty();
  var hasDescriptors = /* @__PURE__ */ requireHasPropertyDescriptors()();
  var functionsHaveConfigurableNames = requireFunctionsHaveNames().functionsHaveConfigurableNames();
  var $TypeError = /* @__PURE__ */ requireType();
  setFunctionName = function setFunctionName2(fn, name) {
    if (typeof fn !== "function") {
      throw new $TypeError("`fn` is not a function");
    }
    var loose = arguments.length > 2 && !!arguments[2];
    if (!loose || functionsHaveConfigurableNames) {
      if (hasDescriptors) {
        define(
          /** @type {Parameters<define>[0]} */
          fn,
          "name",
          name,
          true,
          true
        );
      } else {
        define(
          /** @type {Parameters<define>[0]} */
          fn,
          "name",
          name
        );
      }
    }
    return fn;
  };
  return setFunctionName;
}
var implementation$1;
var hasRequiredImplementation$1;
function requireImplementation$1() {
  if (hasRequiredImplementation$1) return implementation$1;
  hasRequiredImplementation$1 = 1;
  var setFunctionName2 = requireSetFunctionName();
  var $TypeError = /* @__PURE__ */ requireType();
  var $Object = Object;
  implementation$1 = setFunctionName2(function flags() {
    if (this == null || this !== $Object(this)) {
      throw new $TypeError("RegExp.prototype.flags getter called on non-object");
    }
    var result = "";
    if (this.hasIndices) {
      result += "d";
    }
    if (this.global) {
      result += "g";
    }
    if (this.ignoreCase) {
      result += "i";
    }
    if (this.multiline) {
      result += "m";
    }
    if (this.dotAll) {
      result += "s";
    }
    if (this.unicode) {
      result += "u";
    }
    if (this.unicodeSets) {
      result += "v";
    }
    if (this.sticky) {
      result += "y";
    }
    return result;
  }, "get flags", true);
  return implementation$1;
}
var polyfill$1;
var hasRequiredPolyfill$1;
function requirePolyfill$1() {
  if (hasRequiredPolyfill$1) return polyfill$1;
  hasRequiredPolyfill$1 = 1;
  var implementation2 = requireImplementation$1();
  var supportsDescriptors = requireDefineProperties().supportsDescriptors;
  var $gOPD = Object.getOwnPropertyDescriptor;
  polyfill$1 = function getPolyfill() {
    if (supportsDescriptors && /a/mig.flags === "gim") {
      var descriptor = $gOPD(RegExp.prototype, "flags");
      if (descriptor && typeof descriptor.get === "function" && "dotAll" in RegExp.prototype && "hasIndices" in RegExp.prototype) {
        var calls = "";
        var o = {};
        Object.defineProperty(o, "hasIndices", {
          get: function() {
            calls += "d";
          }
        });
        Object.defineProperty(o, "sticky", {
          get: function() {
            calls += "y";
          }
        });
        descriptor.get.call(o);
        if (calls === "dy") {
          return descriptor.get;
        }
      }
    }
    return implementation2;
  };
  return polyfill$1;
}
var shim$1;
var hasRequiredShim$1;
function requireShim$1() {
  if (hasRequiredShim$1) return shim$1;
  hasRequiredShim$1 = 1;
  var supportsDescriptors = requireDefineProperties().supportsDescriptors;
  var getPolyfill = requirePolyfill$1();
  var gOPD2 = /* @__PURE__ */ requireGopd();
  var defineProperty2 = Object.defineProperty;
  var $TypeError = /* @__PURE__ */ requireEsErrors();
  var getProto2 = requireGetProto();
  var regex = /a/;
  shim$1 = function shimFlags() {
    if (!supportsDescriptors || !getProto2) {
      throw new $TypeError("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
    }
    var polyfill2 = getPolyfill();
    var proto = getProto2(regex);
    var descriptor = gOPD2(proto, "flags");
    if (!descriptor || descriptor.get !== polyfill2) {
      defineProperty2(proto, "flags", {
        configurable: true,
        enumerable: false,
        get: polyfill2
      });
    }
    return polyfill2;
  };
  return shim$1;
}
var regexp_prototype_flags;
var hasRequiredRegexp_prototype_flags;
function requireRegexp_prototype_flags() {
  if (hasRequiredRegexp_prototype_flags) return regexp_prototype_flags;
  hasRequiredRegexp_prototype_flags = 1;
  var define = requireDefineProperties();
  var callBind2 = requireCallBind();
  var implementation2 = requireImplementation$1();
  var getPolyfill = requirePolyfill$1();
  var shim2 = requireShim$1();
  var flagsBound = callBind2(getPolyfill());
  define(flagsBound, {
    getPolyfill,
    implementation: implementation2,
    shim: shim2
  });
  regexp_prototype_flags = flagsBound;
  return regexp_prototype_flags;
}
var esGetIterator = { exports: {} };
var shams;
var hasRequiredShams;
function requireShams() {
  if (hasRequiredShams) return shams;
  hasRequiredShams = 1;
  var hasSymbols2 = requireShams$1();
  shams = function hasToStringTagShams() {
    return hasSymbols2() && !!Symbol.toStringTag;
  };
  return shams;
}
var isArguments;
var hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments) return isArguments;
  hasRequiredIsArguments = 1;
  var hasToStringTag = requireShams()();
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var $toString = callBound2("Object.prototype.toString");
  var isStandardArguments = function isArguments2(value) {
    if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
      return false;
    }
    return $toString(value) === "[object Arguments]";
  };
  var isLegacyArguments = function isArguments2(value) {
    if (isStandardArguments(value)) {
      return true;
    }
    return value !== null && typeof value === "object" && "length" in value && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && "callee" in value && $toString(value.callee) === "[object Function]";
  };
  var supportsStandardArguments = (function() {
    return isStandardArguments(arguments);
  })();
  isStandardArguments.isLegacyArguments = isLegacyArguments;
  isArguments = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  return isArguments;
}
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var objectInspect;
var hasRequiredObjectInspect;
function requireObjectInspect() {
  if (hasRequiredObjectInspect) return objectInspect;
  hasRequiredObjectInspect = 1;
  var hasMap = typeof Map === "function" && Map.prototype;
  var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
  var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
  var mapForEach = hasMap && Map.prototype.forEach;
  var hasSet = typeof Set === "function" && Set.prototype;
  var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
  var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
  var setForEach = hasSet && Set.prototype.forEach;
  var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
  var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
  var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
  var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
  var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
  var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
  var booleanValueOf = Boolean.prototype.valueOf;
  var objectToString = Object.prototype.toString;
  var functionToString = Function.prototype.toString;
  var $match = String.prototype.match;
  var $slice = String.prototype.slice;
  var $replace = String.prototype.replace;
  var $toUpperCase = String.prototype.toUpperCase;
  var $toLowerCase = String.prototype.toLowerCase;
  var $test = RegExp.prototype.test;
  var $concat = Array.prototype.concat;
  var $join = Array.prototype.join;
  var $arrSlice = Array.prototype.slice;
  var $floor = Math.floor;
  var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
  var gOPS = Object.getOwnPropertySymbols;
  var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
  var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
  var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
    return O.__proto__;
  } : null);
  function addNumericSeparator(num, str) {
    if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
      return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === "number") {
      var int = num < 0 ? -$floor(-num) : $floor(num);
      if (int !== num) {
        var intStr = String(int);
        var dec = $slice.call(str, intStr.length + 1);
        return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return $replace.call(str, sepRegex, "$&_");
  }
  var utilInspect = require$$0;
  var inspectCustom = utilInspect.custom;
  var inspectSymbol = isSymbol2(inspectCustom) ? inspectCustom : null;
  var quotes = {
    __proto__: null,
    "double": '"',
    single: "'"
  };
  var quoteREs = {
    __proto__: null,
    "double": /(["\\])/g,
    single: /(['\\])/g
  };
  objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};
    if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
    if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    }
    if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;
    if (typeof obj === "undefined") {
      return "undefined";
    }
    if (obj === null) {
      return "null";
    }
    if (typeof obj === "boolean") {
      return obj ? "true" : "false";
    }
    if (typeof obj === "string") {
      return inspectString(obj, opts);
    }
    if (typeof obj === "number") {
      if (obj === 0) {
        return Infinity / obj > 0 ? "0" : "-0";
      }
      var str = String(obj);
      return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === "bigint") {
      var bigIntStr = String(obj) + "n";
      return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }
    var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
    if (typeof depth === "undefined") {
      depth = 0;
    }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
      return isArray2(obj) ? "[Array]" : "[Object]";
    }
    var indent = getIndent(opts, depth);
    if (typeof seen === "undefined") {
      seen = [];
    } else if (indexOf(seen, obj) >= 0) {
      return "[Circular]";
    }
    function inspect(value, from, noIndent) {
      if (from) {
        seen = $arrSlice.call(seen);
        seen.push(from);
      }
      if (noIndent) {
        var newOpts = {
          depth: opts.depth
        };
        if (has(opts, "quoteStyle")) {
          newOpts.quoteStyle = opts.quoteStyle;
        }
        return inspect_(value, newOpts, depth + 1, seen);
      }
      return inspect_(value, opts, depth + 1, seen);
    }
    if (typeof obj === "function" && !isRegExp(obj)) {
      var name = nameOf(obj);
      var keys = arrObjKeys(obj, inspect);
      return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
    }
    if (isSymbol2(obj)) {
      var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
      return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
      var s = "<" + $toLowerCase.call(String(obj.nodeName));
      var attrs = obj.attributes || [];
      for (var i = 0; i < attrs.length; i++) {
        s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
      }
      s += ">";
      if (obj.childNodes && obj.childNodes.length) {
        s += "...";
      }
      s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
      return s;
    }
    if (isArray2(obj)) {
      if (obj.length === 0) {
        return "[]";
      }
      var xs = arrObjKeys(obj, inspect);
      if (indent && !singleLineValues(xs)) {
        return "[" + indentedJoin(xs, indent) + "]";
      }
      return "[ " + $join.call(xs, ", ") + " ]";
    }
    if (isError(obj)) {
      var parts = arrObjKeys(obj, inspect);
      if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
        return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
      }
      if (parts.length === 0) {
        return "[" + String(obj) + "]";
      }
      return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
    }
    if (typeof obj === "object" && customInspect) {
      if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
        return utilInspect(obj, { depth: maxDepth - depth });
      } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
        return obj.inspect();
      }
    }
    if (isMap2(obj)) {
      var mapParts = [];
      if (mapForEach) {
        mapForEach.call(obj, function(value, key2) {
          mapParts.push(inspect(key2, obj, true) + " => " + inspect(value, obj));
        });
      }
      return collectionOf("Map", mapSize.call(obj), mapParts, indent);
    }
    if (isSet2(obj)) {
      var setParts = [];
      if (setForEach) {
        setForEach.call(obj, function(value) {
          setParts.push(inspect(value, obj));
        });
      }
      return collectionOf("Set", setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
      return weakCollectionOf("WeakMap");
    }
    if (isWeakSet(obj)) {
      return weakCollectionOf("WeakSet");
    }
    if (isWeakRef(obj)) {
      return weakCollectionOf("WeakRef");
    }
    if (isNumber(obj)) {
      return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
      return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
      return markBoxed(booleanValueOf.call(obj));
    }
    if (isString2(obj)) {
      return markBoxed(inspect(String(obj)));
    }
    if (typeof window !== "undefined" && obj === window) {
      return "{ [object Window] }";
    }
    if (typeof globalThis !== "undefined" && obj === globalThis || typeof commonjsGlobal !== "undefined" && obj === commonjsGlobal) {
      return "{ [object globalThis] }";
    }
    if (!isDate(obj) && !isRegExp(obj)) {
      var ys = arrObjKeys(obj, inspect);
      var isPlainObject2 = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
      var protoTag = obj instanceof Object ? "" : "null prototype";
      var stringTag = !isPlainObject2 && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr2(obj), 8, -1) : protoTag ? "Object" : "";
      var constructorTag = isPlainObject2 || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
      var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
      if (ys.length === 0) {
        return tag + "{}";
      }
      if (indent) {
        return tag + "{" + indentedJoin(ys, indent) + "}";
      }
      return tag + "{ " + $join.call(ys, ", ") + " }";
    }
    return String(obj);
  };
  function wrapQuotes(s, defaultStyle, opts) {
    var style = opts.quoteStyle || defaultStyle;
    var quoteChar = quotes[style];
    return quoteChar + s + quoteChar;
  }
  function quote(s) {
    return $replace.call(String(s), /"/g, "&quot;");
  }
  function canTrustToString(obj) {
    return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
  }
  function isArray2(obj) {
    return toStr2(obj) === "[object Array]" && canTrustToString(obj);
  }
  function isDate(obj) {
    return toStr2(obj) === "[object Date]" && canTrustToString(obj);
  }
  function isRegExp(obj) {
    return toStr2(obj) === "[object RegExp]" && canTrustToString(obj);
  }
  function isError(obj) {
    return toStr2(obj) === "[object Error]" && canTrustToString(obj);
  }
  function isString2(obj) {
    return toStr2(obj) === "[object String]" && canTrustToString(obj);
  }
  function isNumber(obj) {
    return toStr2(obj) === "[object Number]" && canTrustToString(obj);
  }
  function isBoolean(obj) {
    return toStr2(obj) === "[object Boolean]" && canTrustToString(obj);
  }
  function isSymbol2(obj) {
    if (hasShammedSymbols) {
      return obj && typeof obj === "object" && obj instanceof Symbol;
    }
    if (typeof obj === "symbol") {
      return true;
    }
    if (!obj || typeof obj !== "object" || !symToString) {
      return false;
    }
    try {
      symToString.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }
  function isBigInt(obj) {
    if (!obj || typeof obj !== "object" || !bigIntValueOf) {
      return false;
    }
    try {
      bigIntValueOf.call(obj);
      return true;
    } catch (e) {
    }
    return false;
  }
  var hasOwn2 = Object.prototype.hasOwnProperty || function(key2) {
    return key2 in this;
  };
  function has(obj, key2) {
    return hasOwn2.call(obj, key2);
  }
  function toStr2(obj) {
    return objectToString.call(obj);
  }
  function nameOf(f) {
    if (f.name) {
      return f.name;
    }
    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) {
      return m[1];
    }
    return null;
  }
  function indexOf(xs, x) {
    if (xs.indexOf) {
      return xs.indexOf(x);
    }
    for (var i = 0, l = xs.length; i < l; i++) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  }
  function isMap2(x) {
    if (!mapSize || !x || typeof x !== "object") {
      return false;
    }
    try {
      mapSize.call(x);
      try {
        setSize.call(x);
      } catch (s) {
        return true;
      }
      return x instanceof Map;
    } catch (e) {
    }
    return false;
  }
  function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakMapHas.call(x, weakMapHas);
      try {
        weakSetHas.call(x, weakSetHas);
      } catch (s) {
        return true;
      }
      return x instanceof WeakMap;
    } catch (e) {
    }
    return false;
  }
  function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakRefDeref.call(x);
      return true;
    } catch (e) {
    }
    return false;
  }
  function isSet2(x) {
    if (!setSize || !x || typeof x !== "object") {
      return false;
    }
    try {
      setSize.call(x);
      try {
        mapSize.call(x);
      } catch (m) {
        return true;
      }
      return x instanceof Set;
    } catch (e) {
    }
    return false;
  }
  function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== "object") {
      return false;
    }
    try {
      weakSetHas.call(x, weakSetHas);
      try {
        weakMapHas.call(x, weakMapHas);
      } catch (s) {
        return true;
      }
      return x instanceof WeakSet;
    } catch (e) {
    }
    return false;
  }
  function isElement(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
      return true;
    }
    return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
  }
  function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
      var remaining = str.length - opts.maxStringLength;
      var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
      return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    var quoteRE = quoteREs[opts.quoteStyle || "single"];
    quoteRE.lastIndex = 0;
    var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, "single", opts);
  }
  function lowbyte(c2) {
    var n = c2.charCodeAt(0);
    var x = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[n];
    if (x) {
      return "\\" + x;
    }
    return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
  }
  function markBoxed(str) {
    return "Object(" + str + ")";
  }
  function weakCollectionOf(type2) {
    return type2 + " { ? }";
  }
  function collectionOf(type2, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
    return type2 + " (" + size + ") {" + joinedEntries + "}";
  }
  function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
      if (indexOf(xs[i], "\n") >= 0) {
        return false;
      }
    }
    return true;
  }
  function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === "	") {
      baseIndent = "	";
    } else if (typeof opts.indent === "number" && opts.indent > 0) {
      baseIndent = $join.call(Array(opts.indent + 1), " ");
    } else {
      return null;
    }
    return {
      base: baseIndent,
      prev: $join.call(Array(depth + 1), baseIndent)
    };
  }
  function indentedJoin(xs, indent) {
    if (xs.length === 0) {
      return "";
    }
    var lineJoiner = "\n" + indent.prev + indent.base;
    return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
  }
  function arrObjKeys(obj, inspect) {
    var isArr = isArray2(obj);
    var xs = [];
    if (isArr) {
      xs.length = obj.length;
      for (var i = 0; i < obj.length; i++) {
        xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
      }
    }
    var syms = typeof gOPS === "function" ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
      symMap = {};
      for (var k = 0; k < syms.length; k++) {
        symMap["$" + syms[k]] = syms[k];
      }
    }
    for (var key2 in obj) {
      if (!has(obj, key2)) {
        continue;
      }
      if (isArr && String(Number(key2)) === key2 && key2 < obj.length) {
        continue;
      }
      if (hasShammedSymbols && symMap["$" + key2] instanceof Symbol) {
        continue;
      } else if ($test.call(/[^\w$]/, key2)) {
        xs.push(inspect(key2, obj) + ": " + inspect(obj[key2], obj));
      } else {
        xs.push(key2 + ": " + inspect(obj[key2], obj));
      }
    }
    if (typeof gOPS === "function") {
      for (var j = 0; j < syms.length; j++) {
        if (isEnumerable.call(obj, syms[j])) {
          xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
        }
      }
    }
    return xs;
  }
  return objectInspect;
}
var sideChannelList;
var hasRequiredSideChannelList;
function requireSideChannelList() {
  if (hasRequiredSideChannelList) return sideChannelList;
  hasRequiredSideChannelList = 1;
  var inspect = /* @__PURE__ */ requireObjectInspect();
  var $TypeError = /* @__PURE__ */ requireType();
  var listGetNode = function(list, key2, isDelete) {
    var prev = list;
    var curr;
    for (; (curr = prev.next) != null; prev = curr) {
      if (curr.key === key2) {
        prev.next = curr.next;
        if (!isDelete) {
          curr.next = /** @type {NonNullable<typeof list.next>} */
          list.next;
          list.next = curr;
        }
        return curr;
      }
    }
  };
  var listGet = function(objects, key2) {
    if (!objects) {
      return void 0;
    }
    var node = listGetNode(objects, key2);
    return node && node.value;
  };
  var listSet = function(objects, key2, value) {
    var node = listGetNode(objects, key2);
    if (node) {
      node.value = value;
    } else {
      objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
      {
        // eslint-disable-line no-param-reassign, no-extra-parens
        key: key2,
        next: objects.next,
        value
      };
    }
  };
  var listHas = function(objects, key2) {
    if (!objects) {
      return false;
    }
    return !!listGetNode(objects, key2);
  };
  var listDelete = function(objects, key2) {
    if (objects) {
      return listGetNode(objects, key2, true);
    }
  };
  sideChannelList = function getSideChannelList() {
    var $o;
    var channel = {
      assert: function(key2) {
        if (!channel.has(key2)) {
          throw new $TypeError("Side channel does not contain " + inspect(key2));
        }
      },
      "delete": function(key2) {
        var root2 = $o && $o.next;
        var deletedNode = listDelete($o, key2);
        if (deletedNode && root2 && root2 === deletedNode) {
          $o = void 0;
        }
        return !!deletedNode;
      },
      get: function(key2) {
        return listGet($o, key2);
      },
      has: function(key2) {
        return listHas($o, key2);
      },
      set: function(key2, value) {
        if (!$o) {
          $o = {
            next: void 0
          };
        }
        listSet(
          /** @type {NonNullable<typeof $o>} */
          $o,
          key2,
          value
        );
      }
    };
    return channel;
  };
  return sideChannelList;
}
var sideChannelMap;
var hasRequiredSideChannelMap;
function requireSideChannelMap() {
  if (hasRequiredSideChannelMap) return sideChannelMap;
  hasRequiredSideChannelMap = 1;
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var inspect = /* @__PURE__ */ requireObjectInspect();
  var $TypeError = /* @__PURE__ */ requireType();
  var $Map = GetIntrinsic("%Map%", true);
  var $mapGet = callBound2("Map.prototype.get", true);
  var $mapSet = callBound2("Map.prototype.set", true);
  var $mapHas = callBound2("Map.prototype.has", true);
  var $mapDelete = callBound2("Map.prototype.delete", true);
  var $mapSize = callBound2("Map.prototype.size", true);
  sideChannelMap = !!$Map && /** @type {Exclude<import('.'), false>} */
  function getSideChannelMap() {
    var $m;
    var channel = {
      assert: function(key2) {
        if (!channel.has(key2)) {
          throw new $TypeError("Side channel does not contain " + inspect(key2));
        }
      },
      "delete": function(key2) {
        if ($m) {
          var result = $mapDelete($m, key2);
          if ($mapSize($m) === 0) {
            $m = void 0;
          }
          return result;
        }
        return false;
      },
      get: function(key2) {
        if ($m) {
          return $mapGet($m, key2);
        }
      },
      has: function(key2) {
        if ($m) {
          return $mapHas($m, key2);
        }
        return false;
      },
      set: function(key2, value) {
        if (!$m) {
          $m = new $Map();
        }
        $mapSet($m, key2, value);
      }
    };
    return channel;
  };
  return sideChannelMap;
}
var sideChannelWeakmap;
var hasRequiredSideChannelWeakmap;
function requireSideChannelWeakmap() {
  if (hasRequiredSideChannelWeakmap) return sideChannelWeakmap;
  hasRequiredSideChannelWeakmap = 1;
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var inspect = /* @__PURE__ */ requireObjectInspect();
  var getSideChannelMap = requireSideChannelMap();
  var $TypeError = /* @__PURE__ */ requireType();
  var $WeakMap = GetIntrinsic("%WeakMap%", true);
  var $weakMapGet = callBound2("WeakMap.prototype.get", true);
  var $weakMapSet = callBound2("WeakMap.prototype.set", true);
  var $weakMapHas = callBound2("WeakMap.prototype.has", true);
  var $weakMapDelete = callBound2("WeakMap.prototype.delete", true);
  sideChannelWeakmap = $WeakMap ? (
    /** @type {Exclude<import('.'), false>} */
    function getSideChannelWeakMap() {
      var $wm;
      var $m;
      var channel = {
        assert: function(key2) {
          if (!channel.has(key2)) {
            throw new $TypeError("Side channel does not contain " + inspect(key2));
          }
        },
        "delete": function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapDelete($wm, key2);
            }
          } else if (getSideChannelMap) {
            if ($m) {
              return $m["delete"](key2);
            }
          }
          return false;
        },
        get: function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key2);
            }
          }
          return $m && $m.get(key2);
        },
        has: function(key2) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key2);
            }
          }
          return !!$m && $m.has(key2);
        },
        set: function(key2, value) {
          if ($WeakMap && key2 && (typeof key2 === "object" || typeof key2 === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key2, value);
          } else if (getSideChannelMap) {
            if (!$m) {
              $m = getSideChannelMap();
            }
            $m.set(key2, value);
          }
        }
      };
      return channel;
    }
  ) : getSideChannelMap;
  return sideChannelWeakmap;
}
var sideChannel;
var hasRequiredSideChannel;
function requireSideChannel() {
  if (hasRequiredSideChannel) return sideChannel;
  hasRequiredSideChannel = 1;
  var $TypeError = /* @__PURE__ */ requireType();
  var inspect = /* @__PURE__ */ requireObjectInspect();
  var getSideChannelList = requireSideChannelList();
  var getSideChannelMap = requireSideChannelMap();
  var getSideChannelWeakMap = requireSideChannelWeakmap();
  var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
  sideChannel = function getSideChannel() {
    var $channelData;
    var channel = {
      assert: function(key2) {
        if (!channel.has(key2)) {
          throw new $TypeError("Side channel does not contain " + inspect(key2));
        }
      },
      "delete": function(key2) {
        return !!$channelData && $channelData["delete"](key2);
      },
      get: function(key2) {
        return $channelData && $channelData.get(key2);
      },
      has: function(key2) {
        return !!$channelData && $channelData.has(key2);
      },
      set: function(key2, value) {
        if (!$channelData) {
          $channelData = makeChannel();
        }
        $channelData.set(key2, value);
      }
    };
    return channel;
  };
  return sideChannel;
}
var internalSlot;
var hasRequiredInternalSlot;
function requireInternalSlot() {
  if (hasRequiredInternalSlot) return internalSlot;
  hasRequiredInternalSlot = 1;
  var hasOwn2 = /* @__PURE__ */ requireHasown();
  var channel = requireSideChannel()();
  var $TypeError = /* @__PURE__ */ requireType();
  var SLOT = {
    assert: function(O, slot) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new $TypeError("`O` is not an object");
      }
      if (typeof slot !== "string") {
        throw new $TypeError("`slot` must be a string");
      }
      channel.assert(O);
      if (!SLOT.has(O, slot)) {
        throw new $TypeError("`" + slot + "` is not present on `O`");
      }
    },
    get: function(O, slot) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new $TypeError("`O` is not an object");
      }
      if (typeof slot !== "string") {
        throw new $TypeError("`slot` must be a string");
      }
      var slots = channel.get(O);
      return slots && slots[
        /** @type {SaltedInternalSlot} */
        "$" + slot
      ];
    },
    has: function(O, slot) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new $TypeError("`O` is not an object");
      }
      if (typeof slot !== "string") {
        throw new $TypeError("`slot` must be a string");
      }
      var slots = channel.get(O);
      return !!slots && hasOwn2(
        slots,
        /** @type {SaltedInternalSlot} */
        "$" + slot
      );
    },
    set: function(O, slot, V) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new $TypeError("`O` is not an object");
      }
      if (typeof slot !== "string") {
        throw new $TypeError("`slot` must be a string");
      }
      var slots = channel.get(O);
      if (!slots) {
        slots = {};
        channel.set(O, slots);
      }
      slots[
        /** @type {SaltedInternalSlot} */
        "$" + slot
      ] = V;
    }
  };
  if (Object.freeze) {
    Object.freeze(SLOT);
  }
  internalSlot = SLOT;
  return internalSlot;
}
var stopIterationIterator;
var hasRequiredStopIterationIterator;
function requireStopIterationIterator() {
  if (hasRequiredStopIterationIterator) return stopIterationIterator;
  hasRequiredStopIterationIterator = 1;
  var SLOT = requireInternalSlot();
  var $SyntaxError = /* @__PURE__ */ requireSyntax();
  var $StopIteration = typeof StopIteration === "object" ? StopIteration : null;
  stopIterationIterator = function getStopIterationIterator(origIterator) {
    if (!$StopIteration) {
      throw new $SyntaxError("this environment lacks StopIteration");
    }
    SLOT.set(origIterator, "[[Done]]", false);
    var siIterator = {
      next: (
        /** @type {() => IteratorResult<T>} */
        function next() {
          var iterator = (
            /** @type {typeof origIterator} */
            SLOT.get(this, "[[Iterator]]")
          );
          var done = !!SLOT.get(iterator, "[[Done]]");
          try {
            return {
              done,
              // eslint-disable-next-line no-extra-parens
              value: done ? void 0 : (
                /** @type {T} */
                iterator.next()
              )
            };
          } catch (e) {
            SLOT.set(iterator, "[[Done]]", true);
            if (e !== $StopIteration) {
              throw e;
            }
            return {
              done: true,
              value: void 0
            };
          }
        }
      )
    };
    SLOT.set(siIterator, "[[Iterator]]", origIterator);
    return siIterator;
  };
  return stopIterationIterator;
}
var isarray;
var hasRequiredIsarray;
function requireIsarray() {
  if (hasRequiredIsarray) return isarray;
  hasRequiredIsarray = 1;
  var toString = {}.toString;
  isarray = Array.isArray || function(arr) {
    return toString.call(arr) == "[object Array]";
  };
  return isarray;
}
var isString;
var hasRequiredIsString;
function requireIsString() {
  if (hasRequiredIsString) return isString;
  hasRequiredIsString = 1;
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var $strValueOf = callBound2("String.prototype.valueOf");
  var tryStringObject = function tryStringObject2(value) {
    try {
      $strValueOf(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var $toString = callBound2("Object.prototype.toString");
  var strClass = "[object String]";
  var hasToStringTag = requireShams()();
  isString = function isString2(value) {
    if (typeof value === "string") {
      return true;
    }
    if (!value || typeof value !== "object") {
      return false;
    }
    return hasToStringTag ? tryStringObject(value) : $toString(value) === strClass;
  };
  return isString;
}
var isMap;
var hasRequiredIsMap;
function requireIsMap() {
  if (hasRequiredIsMap) return isMap;
  hasRequiredIsMap = 1;
  var $Map = typeof Map === "function" && Map.prototype ? Map : null;
  var $Set = typeof Set === "function" && Set.prototype ? Set : null;
  var exported;
  if (!$Map) {
    exported = function isMap2(x) {
      return false;
    };
  }
  var $mapHas = $Map ? Map.prototype.has : null;
  var $setHas = $Set ? Set.prototype.has : null;
  if (!exported && !$mapHas) {
    exported = function isMap2(x) {
      return false;
    };
  }
  isMap = exported || function isMap2(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    try {
      $mapHas.call(x);
      if ($setHas) {
        try {
          $setHas.call(x);
        } catch (e) {
          return true;
        }
      }
      return x instanceof $Map;
    } catch (e) {
    }
    return false;
  };
  return isMap;
}
var isSet;
var hasRequiredIsSet;
function requireIsSet() {
  if (hasRequiredIsSet) return isSet;
  hasRequiredIsSet = 1;
  var $Map = typeof Map === "function" && Map.prototype ? Map : null;
  var $Set = typeof Set === "function" && Set.prototype ? Set : null;
  var exported;
  if (!$Set) {
    exported = function isSet2(x) {
      return false;
    };
  }
  var $mapHas = $Map ? Map.prototype.has : null;
  var $setHas = $Set ? Set.prototype.has : null;
  if (!exported && !$setHas) {
    exported = function isSet2(x) {
      return false;
    };
  }
  isSet = exported || function isSet2(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    try {
      $setHas.call(x);
      if ($mapHas) {
        try {
          $mapHas.call(x);
        } catch (e) {
          return true;
        }
      }
      return x instanceof $Set;
    } catch (e) {
    }
    return false;
  };
  return isSet;
}
var hasRequiredEsGetIterator;
function requireEsGetIterator() {
  if (hasRequiredEsGetIterator) return esGetIterator.exports;
  hasRequiredEsGetIterator = 1;
  var isArguments2 = /* @__PURE__ */ requireIsArguments();
  var getStopIterationIterator = /* @__PURE__ */ requireStopIterationIterator();
  if (requireHasSymbols()() || requireShams$1()()) {
    var $iterator = Symbol.iterator;
    esGetIterator.exports = function getIterator(iterable) {
      if (iterable != null && typeof iterable[$iterator] !== "undefined") {
        return iterable[$iterator]();
      }
      if (isArguments2(iterable)) {
        return Array.prototype[$iterator].call(iterable);
      }
    };
  } else {
    var isArray2 = requireIsarray();
    var isString2 = requireIsString();
    var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
    var $Map = GetIntrinsic("%Map%", true);
    var $Set = GetIntrinsic("%Set%", true);
    var callBound2 = requireCallBound();
    var $arrayPush = callBound2("Array.prototype.push");
    var $charCodeAt = callBound2("String.prototype.charCodeAt");
    var $stringSlice = callBound2("String.prototype.slice");
    var advanceStringIndex = function advanceStringIndex2(S, index) {
      var length = S.length;
      if (index + 1 >= length) {
        return index + 1;
      }
      var first = $charCodeAt(S, index);
      if (first < 55296 || first > 56319) {
        return index + 1;
      }
      var second = $charCodeAt(S, index + 1);
      if (second < 56320 || second > 57343) {
        return index + 1;
      }
      return index + 2;
    };
    var getArrayIterator = function getArrayIterator2(arraylike) {
      var i = 0;
      return {
        next: function next() {
          var done = i >= arraylike.length;
          var value;
          if (!done) {
            value = arraylike[i];
            i += 1;
          }
          return {
            done,
            value
          };
        }
      };
    };
    var getNonCollectionIterator = function getNonCollectionIterator2(iterable, noPrimordialCollections) {
      if (isArray2(iterable) || isArguments2(iterable)) {
        return getArrayIterator(iterable);
      }
      if (isString2(iterable)) {
        var i = 0;
        return {
          next: function next() {
            var nextIndex = advanceStringIndex(iterable, i);
            var value = $stringSlice(iterable, i, nextIndex);
            i = nextIndex;
            return {
              done: nextIndex > iterable.length,
              value
            };
          }
        };
      }
      if (noPrimordialCollections && typeof iterable["_es6-shim iterator_"] !== "undefined") {
        return iterable["_es6-shim iterator_"]();
      }
    };
    if (!$Map && !$Set) {
      esGetIterator.exports = function getIterator(iterable) {
        if (iterable != null) {
          return getNonCollectionIterator(iterable, true);
        }
      };
    } else {
      var isMap2 = /* @__PURE__ */ requireIsMap();
      var isSet2 = /* @__PURE__ */ requireIsSet();
      var $mapForEach = callBound2("Map.prototype.forEach", true);
      var $setForEach = callBound2("Set.prototype.forEach", true);
      if (typeof process === "undefined" || !process.versions || !process.versions.node) {
        var $mapIterator = callBound2("Map.prototype.iterator", true);
        var $setIterator = callBound2("Set.prototype.iterator", true);
      }
      var $mapAtAtIterator = callBound2("Map.prototype.@@iterator", true) || callBound2("Map.prototype._es6-shim iterator_", true);
      var $setAtAtIterator = callBound2("Set.prototype.@@iterator", true) || callBound2("Set.prototype._es6-shim iterator_", true);
      var getCollectionIterator = function getCollectionIterator2(iterable) {
        if (isMap2(iterable)) {
          if ($mapIterator) {
            return getStopIterationIterator($mapIterator(iterable));
          }
          if ($mapAtAtIterator) {
            return $mapAtAtIterator(iterable);
          }
          if ($mapForEach) {
            var entries = [];
            $mapForEach(iterable, function(v, k) {
              $arrayPush(entries, [k, v]);
            });
            return getArrayIterator(entries);
          }
        }
        if (isSet2(iterable)) {
          if ($setIterator) {
            return getStopIterationIterator($setIterator(iterable));
          }
          if ($setAtAtIterator) {
            return $setAtAtIterator(iterable);
          }
          if ($setForEach) {
            var values = [];
            $setForEach(iterable, function(v) {
              $arrayPush(values, v);
            });
            return getArrayIterator(values);
          }
        }
      };
      esGetIterator.exports = function getIterator(iterable) {
        return getCollectionIterator(iterable) || getNonCollectionIterator(iterable);
      };
    }
  }
  return esGetIterator.exports;
}
var implementation;
var hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation) return implementation;
  hasRequiredImplementation = 1;
  var numberIsNaN = function(value) {
    return value !== value;
  };
  implementation = function is(a, b) {
    if (a === 0 && b === 0) {
      return 1 / a === 1 / b;
    }
    if (a === b) {
      return true;
    }
    if (numberIsNaN(a) && numberIsNaN(b)) {
      return true;
    }
    return false;
  };
  return implementation;
}
var polyfill;
var hasRequiredPolyfill;
function requirePolyfill() {
  if (hasRequiredPolyfill) return polyfill;
  hasRequiredPolyfill = 1;
  var implementation2 = requireImplementation();
  polyfill = function getPolyfill() {
    return typeof Object.is === "function" ? Object.is : implementation2;
  };
  return polyfill;
}
var shim;
var hasRequiredShim;
function requireShim() {
  if (hasRequiredShim) return shim;
  hasRequiredShim = 1;
  var getPolyfill = requirePolyfill();
  var define = requireDefineProperties();
  shim = function shimObjectIs() {
    var polyfill2 = getPolyfill();
    define(Object, { is: polyfill2 }, {
      is: function testObjectIs() {
        return Object.is !== polyfill2;
      }
    });
    return polyfill2;
  };
  return shim;
}
var objectIs;
var hasRequiredObjectIs;
function requireObjectIs() {
  if (hasRequiredObjectIs) return objectIs;
  hasRequiredObjectIs = 1;
  var define = requireDefineProperties();
  var callBind2 = requireCallBind();
  var implementation2 = requireImplementation();
  var getPolyfill = requirePolyfill();
  var shim2 = requireShim();
  var polyfill2 = callBind2(getPolyfill(), Object);
  define(polyfill2, {
    getPolyfill,
    implementation: implementation2,
    shim: shim2
  });
  objectIs = polyfill2;
  return objectIs;
}
var isArrayBuffer;
var hasRequiredIsArrayBuffer;
function requireIsArrayBuffer() {
  if (hasRequiredIsArrayBuffer) return isArrayBuffer;
  hasRequiredIsArrayBuffer = 1;
  var callBind2 = requireCallBind();
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var $ArrayBuffer = GetIntrinsic("%ArrayBuffer%", true);
  var $byteLength = callBound2("ArrayBuffer.prototype.byteLength", true);
  var $toString = callBound2("Object.prototype.toString");
  var abSlice = !!$ArrayBuffer && !$byteLength && new $ArrayBuffer(0).slice;
  var $abSlice = !!abSlice && callBind2(abSlice);
  isArrayBuffer = $byteLength || $abSlice ? function isArrayBuffer2(obj) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    try {
      if ($byteLength) {
        $byteLength(obj);
      } else {
        $abSlice(obj, 0);
      }
      return true;
    } catch (e) {
      return false;
    }
  } : $ArrayBuffer ? function isArrayBuffer2(obj) {
    return $toString(obj) === "[object ArrayBuffer]";
  } : function isArrayBuffer2(obj) {
    return false;
  };
  return isArrayBuffer;
}
var isDateObject;
var hasRequiredIsDateObject;
function requireIsDateObject() {
  if (hasRequiredIsDateObject) return isDateObject;
  hasRequiredIsDateObject = 1;
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var getDay = callBound2("Date.prototype.getDay");
  var tryDateObject = function tryDateGetDayCall(value) {
    try {
      getDay(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr2 = callBound2("Object.prototype.toString");
  var dateClass = "[object Date]";
  var hasToStringTag = requireShams()();
  isDateObject = function isDateObject2(value) {
    if (typeof value !== "object" || value === null) {
      return false;
    }
    return hasToStringTag ? tryDateObject(value) : toStr2(value) === dateClass;
  };
  return isDateObject;
}
var isRegex;
var hasRequiredIsRegex;
function requireIsRegex() {
  if (hasRequiredIsRegex) return isRegex;
  hasRequiredIsRegex = 1;
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var hasToStringTag = requireShams()();
  var hasOwn2 = /* @__PURE__ */ requireHasown();
  var gOPD2 = /* @__PURE__ */ requireGopd();
  var fn;
  if (hasToStringTag) {
    var $exec = callBound2("RegExp.prototype.exec");
    var isRegexMarker = {};
    var throwRegexMarker = function() {
      throw isRegexMarker;
    };
    var badStringifier = {
      toString: throwRegexMarker,
      valueOf: throwRegexMarker
    };
    if (typeof Symbol.toPrimitive === "symbol") {
      badStringifier[Symbol.toPrimitive] = throwRegexMarker;
    }
    fn = function isRegex2(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      var descriptor = (
        /** @type {NonNullable<typeof gOPD>} */
        gOPD2(
          /** @type {{ lastIndex?: unknown }} */
          value,
          "lastIndex"
        )
      );
      var hasLastIndexDataProperty = descriptor && hasOwn2(descriptor, "value");
      if (!hasLastIndexDataProperty) {
        return false;
      }
      try {
        $exec(
          value,
          /** @type {string} */
          /** @type {unknown} */
          badStringifier
        );
      } catch (e) {
        return e === isRegexMarker;
      }
    };
  } else {
    var $toString = callBound2("Object.prototype.toString");
    var regexClass = "[object RegExp]";
    fn = function isRegex2(value) {
      if (!value || typeof value !== "object" && typeof value !== "function") {
        return false;
      }
      return $toString(value) === regexClass;
    };
  }
  isRegex = fn;
  return isRegex;
}
var isSharedArrayBuffer;
var hasRequiredIsSharedArrayBuffer;
function requireIsSharedArrayBuffer() {
  if (hasRequiredIsSharedArrayBuffer) return isSharedArrayBuffer;
  hasRequiredIsSharedArrayBuffer = 1;
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var $byteLength = callBound2("SharedArrayBuffer.prototype.byteLength", true);
  isSharedArrayBuffer = $byteLength ? function isSharedArrayBuffer2(obj) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    try {
      $byteLength(obj);
      return true;
    } catch (e) {
      return false;
    }
  } : function isSharedArrayBuffer2(_obj) {
    return false;
  };
  return isSharedArrayBuffer;
}
var isNumberObject;
var hasRequiredIsNumberObject;
function requireIsNumberObject() {
  if (hasRequiredIsNumberObject) return isNumberObject;
  hasRequiredIsNumberObject = 1;
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var $numToStr = callBound2("Number.prototype.toString");
  var tryNumberObject = function tryNumberObject2(value) {
    try {
      $numToStr(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var $toString = callBound2("Object.prototype.toString");
  var numClass = "[object Number]";
  var hasToStringTag = requireShams()();
  isNumberObject = function isNumberObject2(value) {
    if (typeof value === "number") {
      return true;
    }
    if (!value || typeof value !== "object") {
      return false;
    }
    return hasToStringTag ? tryNumberObject(value) : $toString(value) === numClass;
  };
  return isNumberObject;
}
var isBooleanObject;
var hasRequiredIsBooleanObject;
function requireIsBooleanObject() {
  if (hasRequiredIsBooleanObject) return isBooleanObject;
  hasRequiredIsBooleanObject = 1;
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var $boolToStr = callBound2("Boolean.prototype.toString");
  var $toString = callBound2("Object.prototype.toString");
  var tryBooleanObject = function booleanBrandCheck(value) {
    try {
      $boolToStr(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var boolClass = "[object Boolean]";
  var hasToStringTag = requireShams()();
  isBooleanObject = function isBoolean(value) {
    if (typeof value === "boolean") {
      return true;
    }
    if (value === null || typeof value !== "object") {
      return false;
    }
    return hasToStringTag ? tryBooleanObject(value) : $toString(value) === boolClass;
  };
  return isBooleanObject;
}
var isSymbol = { exports: {} };
var safeRegexTest;
var hasRequiredSafeRegexTest;
function requireSafeRegexTest() {
  if (hasRequiredSafeRegexTest) return safeRegexTest;
  hasRequiredSafeRegexTest = 1;
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var isRegex2 = requireIsRegex();
  var $exec = callBound2("RegExp.prototype.exec");
  var $TypeError = /* @__PURE__ */ requireType();
  safeRegexTest = function regexTester(regex) {
    if (!isRegex2(regex)) {
      throw new $TypeError("`regex` must be a RegExp");
    }
    return function test(s) {
      return $exec(regex, s) !== null;
    };
  };
  return safeRegexTest;
}
var hasRequiredIsSymbol;
function requireIsSymbol() {
  if (hasRequiredIsSymbol) return isSymbol.exports;
  hasRequiredIsSymbol = 1;
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var $toString = callBound2("Object.prototype.toString");
  var hasSymbols2 = requireHasSymbols()();
  var safeRegexTest2 = /* @__PURE__ */ requireSafeRegexTest();
  if (hasSymbols2) {
    var $symToStr = callBound2("Symbol.prototype.toString");
    var isSymString = safeRegexTest2(/^Symbol\(.*\)$/);
    var isSymbolObject = function isRealSymbolObject(value) {
      if (typeof value.valueOf() !== "symbol") {
        return false;
      }
      return isSymString($symToStr(value));
    };
    isSymbol.exports = function isSymbol2(value) {
      if (typeof value === "symbol") {
        return true;
      }
      if (!value || typeof value !== "object" || $toString(value) !== "[object Symbol]") {
        return false;
      }
      try {
        return isSymbolObject(value);
      } catch (e) {
        return false;
      }
    };
  } else {
    isSymbol.exports = function isSymbol2(value) {
      return false;
    };
  }
  return isSymbol.exports;
}
var isBigint = { exports: {} };
var hasBigints;
var hasRequiredHasBigints;
function requireHasBigints() {
  if (hasRequiredHasBigints) return hasBigints;
  hasRequiredHasBigints = 1;
  var $BigInt = typeof BigInt !== "undefined" && BigInt;
  hasBigints = function hasNativeBigInts() {
    return typeof $BigInt === "function" && typeof BigInt === "function" && typeof $BigInt(42) === "bigint" && typeof BigInt(42) === "bigint";
  };
  return hasBigints;
}
var hasRequiredIsBigint;
function requireIsBigint() {
  if (hasRequiredIsBigint) return isBigint.exports;
  hasRequiredIsBigint = 1;
  var hasBigInts = requireHasBigints()();
  if (hasBigInts) {
    var bigIntValueOf = BigInt.prototype.valueOf;
    var tryBigInt = function tryBigIntObject(value) {
      try {
        bigIntValueOf.call(value);
        return true;
      } catch (e) {
      }
      return false;
    };
    isBigint.exports = function isBigInt(value) {
      if (value === null || typeof value === "undefined" || typeof value === "boolean" || typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "function") {
        return false;
      }
      if (typeof value === "bigint") {
        return true;
      }
      return tryBigInt(value);
    };
  } else {
    isBigint.exports = function isBigInt(value) {
      return false;
    };
  }
  return isBigint.exports;
}
var whichBoxedPrimitive;
var hasRequiredWhichBoxedPrimitive;
function requireWhichBoxedPrimitive() {
  if (hasRequiredWhichBoxedPrimitive) return whichBoxedPrimitive;
  hasRequiredWhichBoxedPrimitive = 1;
  var isString2 = requireIsString();
  var isNumber = requireIsNumberObject();
  var isBoolean = requireIsBooleanObject();
  var isSymbol2 = requireIsSymbol();
  var isBigInt = requireIsBigint();
  whichBoxedPrimitive = function whichBoxedPrimitive2(value) {
    if (value == null || typeof value !== "object" && typeof value !== "function") {
      return null;
    }
    if (isString2(value)) {
      return "String";
    }
    if (isNumber(value)) {
      return "Number";
    }
    if (isBoolean(value)) {
      return "Boolean";
    }
    if (isSymbol2(value)) {
      return "Symbol";
    }
    if (isBigInt(value)) {
      return "BigInt";
    }
  };
  return whichBoxedPrimitive;
}
var isWeakmap;
var hasRequiredIsWeakmap;
function requireIsWeakmap() {
  if (hasRequiredIsWeakmap) return isWeakmap;
  hasRequiredIsWeakmap = 1;
  var $WeakMap = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap : null;
  var $WeakSet = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet : null;
  var exported;
  if (!$WeakMap) {
    exported = function isWeakMap(x) {
      return false;
    };
  }
  var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
  var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
  if (!exported && !$mapHas) {
    exported = function isWeakMap(x) {
      return false;
    };
  }
  isWeakmap = exported || function isWeakMap(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    try {
      $mapHas.call(x, $mapHas);
      if ($setHas) {
        try {
          $setHas.call(x, $setHas);
        } catch (e) {
          return true;
        }
      }
      return x instanceof $WeakMap;
    } catch (e) {
    }
    return false;
  };
  return isWeakmap;
}
var isWeakset = { exports: {} };
var hasRequiredIsWeakset;
function requireIsWeakset() {
  if (hasRequiredIsWeakset) return isWeakset.exports;
  hasRequiredIsWeakset = 1;
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var $WeakSet = GetIntrinsic("%WeakSet%", true);
  var $setHas = callBound2("WeakSet.prototype.has", true);
  if ($setHas) {
    var $mapHas = callBound2("WeakMap.prototype.has", true);
    isWeakset.exports = function isWeakSet(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      try {
        $setHas(x, $setHas);
        if ($mapHas) {
          try {
            $mapHas(x, $mapHas);
          } catch (e) {
            return true;
          }
        }
        return x instanceof $WeakSet;
      } catch (e) {
      }
      return false;
    };
  } else {
    isWeakset.exports = function isWeakSet(x) {
      return false;
    };
  }
  return isWeakset.exports;
}
var whichCollection;
var hasRequiredWhichCollection;
function requireWhichCollection() {
  if (hasRequiredWhichCollection) return whichCollection;
  hasRequiredWhichCollection = 1;
  var isMap2 = /* @__PURE__ */ requireIsMap();
  var isSet2 = /* @__PURE__ */ requireIsSet();
  var isWeakMap = requireIsWeakmap();
  var isWeakSet = /* @__PURE__ */ requireIsWeakset();
  whichCollection = function whichCollection2(value) {
    if (value && typeof value === "object") {
      if (isMap2(value)) {
        return "Map";
      }
      if (isSet2(value)) {
        return "Set";
      }
      if (isWeakMap(value)) {
        return "WeakMap";
      }
      if (isWeakSet(value)) {
        return "WeakSet";
      }
    }
    return false;
  };
  return whichCollection;
}
var isCallable;
var hasRequiredIsCallable;
function requireIsCallable() {
  if (hasRequiredIsCallable) return isCallable;
  hasRequiredIsCallable = 1;
  var fnToStr = Function.prototype.toString;
  var reflectApply2 = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
  var badArrayLike;
  var isCallableMarker;
  if (typeof reflectApply2 === "function" && typeof Object.defineProperty === "function") {
    try {
      badArrayLike = Object.defineProperty({}, "length", {
        get: function() {
          throw isCallableMarker;
        }
      });
      isCallableMarker = {};
      reflectApply2(function() {
        throw 42;
      }, null, badArrayLike);
    } catch (_) {
      if (_ !== isCallableMarker) {
        reflectApply2 = null;
      }
    }
  } else {
    reflectApply2 = null;
  }
  var constructorRegex = /^\s*class\b/;
  var isES6ClassFn = function isES6ClassFunction(value) {
    try {
      var fnStr = fnToStr.call(value);
      return constructorRegex.test(fnStr);
    } catch (e) {
      return false;
    }
  };
  var tryFunctionObject = function tryFunctionToStr(value) {
    try {
      if (isES6ClassFn(value)) {
        return false;
      }
      fnToStr.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr2 = Object.prototype.toString;
  var objectClass = "[object Object]";
  var fnClass = "[object Function]";
  var genClass = "[object GeneratorFunction]";
  var ddaClass = "[object HTMLAllCollection]";
  var ddaClass2 = "[object HTML document.all class]";
  var ddaClass3 = "[object HTMLCollection]";
  var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
  var isIE68 = !(0 in [,]);
  var isDDA = function isDocumentDotAll() {
    return false;
  };
  if (typeof document === "object") {
    var all = document.all;
    if (toStr2.call(all) === toStr2.call(document.all)) {
      isDDA = function isDocumentDotAll(value) {
        if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
          try {
            var str = toStr2.call(value);
            return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
          } catch (e) {
          }
        }
        return false;
      };
    }
  }
  isCallable = reflectApply2 ? function isCallable2(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      return false;
    }
    try {
      reflectApply2(value, null, badArrayLike);
    } catch (e) {
      if (e !== isCallableMarker) {
        return false;
      }
    }
    return !isES6ClassFn(value) && tryFunctionObject(value);
  } : function isCallable2(value) {
    if (isDDA(value)) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (typeof value !== "function" && typeof value !== "object") {
      return false;
    }
    if (hasToStringTag) {
      return tryFunctionObject(value);
    }
    if (isES6ClassFn(value)) {
      return false;
    }
    var strClass = toStr2.call(value);
    if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
      return false;
    }
    return tryFunctionObject(value);
  };
  return isCallable;
}
var forEach;
var hasRequiredForEach;
function requireForEach() {
  if (hasRequiredForEach) return forEach;
  hasRequiredForEach = 1;
  var isCallable2 = requireIsCallable();
  var toStr2 = Object.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var forEachArray = function forEachArray2(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (hasOwnProperty.call(array, i)) {
        if (receiver == null) {
          iterator(array[i], i, array);
        } else {
          iterator.call(receiver, array[i], i, array);
        }
      }
    }
  };
  var forEachString = function forEachString2(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
      if (receiver == null) {
        iterator(string.charAt(i), i, string);
      } else {
        iterator.call(receiver, string.charAt(i), i, string);
      }
    }
  };
  var forEachObject = function forEachObject2(object, iterator, receiver) {
    for (var k in object) {
      if (hasOwnProperty.call(object, k)) {
        if (receiver == null) {
          iterator(object[k], k, object);
        } else {
          iterator.call(receiver, object[k], k, object);
        }
      }
    }
  };
  function isArray2(x) {
    return toStr2.call(x) === "[object Array]";
  }
  forEach = function forEach2(list, iterator, thisArg) {
    if (!isCallable2(iterator)) {
      throw new TypeError("iterator must be a function");
    }
    var receiver;
    if (arguments.length >= 3) {
      receiver = thisArg;
    }
    if (isArray2(list)) {
      forEachArray(list, iterator, receiver);
    } else if (typeof list === "string") {
      forEachString(list, iterator, receiver);
    } else {
      forEachObject(list, iterator, receiver);
    }
  };
  return forEach;
}
var possibleTypedArrayNames;
var hasRequiredPossibleTypedArrayNames;
function requirePossibleTypedArrayNames() {
  if (hasRequiredPossibleTypedArrayNames) return possibleTypedArrayNames;
  hasRequiredPossibleTypedArrayNames = 1;
  possibleTypedArrayNames = [
    "Float16Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ];
  return possibleTypedArrayNames;
}
var availableTypedArrays;
var hasRequiredAvailableTypedArrays;
function requireAvailableTypedArrays() {
  if (hasRequiredAvailableTypedArrays) return availableTypedArrays;
  hasRequiredAvailableTypedArrays = 1;
  var possibleNames = /* @__PURE__ */ requirePossibleTypedArrayNames();
  var g = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
  availableTypedArrays = function availableTypedArrays2() {
    var out = [];
    for (var i = 0; i < possibleNames.length; i++) {
      if (typeof g[possibleNames[i]] === "function") {
        out[out.length] = possibleNames[i];
      }
    }
    return out;
  };
  return availableTypedArrays;
}
var whichTypedArray;
var hasRequiredWhichTypedArray;
function requireWhichTypedArray() {
  if (hasRequiredWhichTypedArray) return whichTypedArray;
  hasRequiredWhichTypedArray = 1;
  var forEach2 = requireForEach();
  var availableTypedArrays2 = /* @__PURE__ */ requireAvailableTypedArrays();
  var callBind2 = requireCallBind();
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var gOPD2 = /* @__PURE__ */ requireGopd();
  var getProto2 = requireGetProto();
  var $toString = callBound2("Object.prototype.toString");
  var hasToStringTag = requireShams()();
  var g = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
  var typedArrays = availableTypedArrays2();
  var $slice = callBound2("String.prototype.slice");
  var $indexOf = callBound2("Array.prototype.indexOf", true) || function indexOf(array, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  };
  var cache = { __proto__: null };
  if (hasToStringTag && gOPD2 && getProto2) {
    forEach2(typedArrays, function(typedArray) {
      var arr = new g[typedArray]();
      if (Symbol.toStringTag in arr && getProto2) {
        var proto = getProto2(arr);
        var descriptor = gOPD2(proto, Symbol.toStringTag);
        if (!descriptor && proto) {
          var superProto = getProto2(proto);
          descriptor = gOPD2(superProto, Symbol.toStringTag);
        }
        if (descriptor && descriptor.get) {
          var bound = callBind2(descriptor.get);
          cache[
            /** @type {`$${import('.').TypedArrayName}`} */
            "$" + typedArray
          ] = bound;
        }
      }
    });
  } else {
    forEach2(typedArrays, function(typedArray) {
      var arr = new g[typedArray]();
      var fn = arr.slice || arr.set;
      if (fn) {
        var bound = (
          /** @type {import('./types').BoundSlice | import('./types').BoundSet} */
          // @ts-expect-error TODO FIXME
          callBind2(fn)
        );
        cache[
          /** @type {`$${import('.').TypedArrayName}`} */
          "$" + typedArray
        ] = bound;
      }
    });
  }
  var tryTypedArrays = function tryAllTypedArrays(value) {
    var found = false;
    forEach2(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      cache,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(getter, typedArray) {
        if (!found) {
          try {
            if ("$" + getter(value) === typedArray) {
              found = /** @type {import('.').TypedArrayName} */
              $slice(typedArray, 1);
            }
          } catch (e) {
          }
        }
      }
    );
    return found;
  };
  var trySlices = function tryAllSlices(value) {
    var found = false;
    forEach2(
      /** @type {Record<`\$${import('.').TypedArrayName}`, Getter>} */
      cache,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(getter, name) {
        if (!found) {
          try {
            getter(value);
            found = /** @type {import('.').TypedArrayName} */
            $slice(name, 1);
          } catch (e) {
          }
        }
      }
    );
    return found;
  };
  whichTypedArray = function whichTypedArray2(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (!hasToStringTag) {
      var tag = $slice($toString(value), 8, -1);
      if ($indexOf(typedArrays, tag) > -1) {
        return tag;
      }
      if (tag !== "Object") {
        return false;
      }
      return trySlices(value);
    }
    if (!gOPD2) {
      return null;
    }
    return tryTypedArrays(value);
  };
  return whichTypedArray;
}
var arrayBufferByteLength;
var hasRequiredArrayBufferByteLength;
function requireArrayBufferByteLength() {
  if (hasRequiredArrayBufferByteLength) return arrayBufferByteLength;
  hasRequiredArrayBufferByteLength = 1;
  var callBound2 = /* @__PURE__ */ requireCallBound$1();
  var $byteLength = callBound2("ArrayBuffer.prototype.byteLength", true);
  var isArrayBuffer2 = /* @__PURE__ */ requireIsArrayBuffer();
  arrayBufferByteLength = function byteLength(ab) {
    if (!isArrayBuffer2(ab)) {
      return NaN;
    }
    return $byteLength ? $byteLength(ab) : ab.byteLength;
  };
  return arrayBufferByteLength;
}
var deepEqual$1;
var hasRequiredDeepEqual;
function requireDeepEqual() {
  if (hasRequiredDeepEqual) return deepEqual$1;
  hasRequiredDeepEqual = 1;
  var assign2 = requireObject_assign();
  var callBound2 = requireCallBound();
  var flags = requireRegexp_prototype_flags();
  var GetIntrinsic = /* @__PURE__ */ requireGetIntrinsic();
  var getIterator = requireEsGetIterator();
  var getSideChannel = requireSideChannel();
  var is = requireObjectIs();
  var isArguments2 = /* @__PURE__ */ requireIsArguments();
  var isArray2 = requireIsarray();
  var isArrayBuffer2 = /* @__PURE__ */ requireIsArrayBuffer();
  var isDate = /* @__PURE__ */ requireIsDateObject();
  var isRegex2 = requireIsRegex();
  var isSharedArrayBuffer2 = /* @__PURE__ */ requireIsSharedArrayBuffer();
  var objectKeys2 = requireObjectKeys();
  var whichBoxedPrimitive2 = requireWhichBoxedPrimitive();
  var whichCollection2 = /* @__PURE__ */ requireWhichCollection();
  var whichTypedArray2 = /* @__PURE__ */ requireWhichTypedArray();
  var byteLength = /* @__PURE__ */ requireArrayBufferByteLength();
  var sabByteLength = callBound2("SharedArrayBuffer.prototype.byteLength", true);
  var $getTime = callBound2("Date.prototype.getTime");
  var gPO = Object.getPrototypeOf;
  var $objToString = callBound2("Object.prototype.toString");
  var $Set = GetIntrinsic("%Set%", true);
  var $mapHas = callBound2("Map.prototype.has", true);
  var $mapGet = callBound2("Map.prototype.get", true);
  var $mapSize = callBound2("Map.prototype.size", true);
  var $setAdd = callBound2("Set.prototype.add", true);
  var $setDelete = callBound2("Set.prototype.delete", true);
  var $setHas = callBound2("Set.prototype.has", true);
  var $setSize = callBound2("Set.prototype.size", true);
  function setHasEqualElement(set, val1, opts, channel) {
    var i = getIterator(set);
    var result;
    while ((result = i.next()) && !result.done) {
      if (internalDeepEqual(val1, result.value, opts, channel)) {
        $setDelete(set, result.value);
        return true;
      }
    }
    return false;
  }
  function findLooseMatchingPrimitives(prim) {
    if (typeof prim === "undefined") {
      return null;
    }
    if (typeof prim === "object") {
      return void 0;
    }
    if (typeof prim === "symbol") {
      return false;
    }
    if (typeof prim === "string" || typeof prim === "number") {
      return +prim === +prim;
    }
    return true;
  }
  function mapMightHaveLoosePrim(a, b, prim, item, opts, channel) {
    var altValue = findLooseMatchingPrimitives(prim);
    if (altValue != null) {
      return altValue;
    }
    var curB = $mapGet(b, altValue);
    var looseOpts = assign2({}, opts, { strict: false });
    if (typeof curB === "undefined" && !$mapHas(b, altValue) || !internalDeepEqual(item, curB, looseOpts, channel)) {
      return false;
    }
    return !$mapHas(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
  }
  function setMightHaveLoosePrim(a, b, prim) {
    var altValue = findLooseMatchingPrimitives(prim);
    if (altValue != null) {
      return altValue;
    }
    return $setHas(b, altValue) && !$setHas(a, altValue);
  }
  function mapHasEqualEntry(set, map, key1, item1, opts, channel) {
    var i = getIterator(set);
    var result;
    var key2;
    while ((result = i.next()) && !result.done) {
      key2 = result.value;
      if (
        // eslint-disable-next-line no-use-before-define
        internalDeepEqual(key1, key2, opts, channel) && internalDeepEqual(item1, $mapGet(map, key2), opts, channel)
      ) {
        $setDelete(set, key2);
        return true;
      }
    }
    return false;
  }
  function internalDeepEqual(actual, expected, options, channel) {
    var opts = options || {};
    if (opts.strict ? is(actual, expected) : actual === expected) {
      return true;
    }
    var actualBoxed = whichBoxedPrimitive2(actual);
    var expectedBoxed = whichBoxedPrimitive2(expected);
    if (actualBoxed !== expectedBoxed) {
      return false;
    }
    if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") {
      return opts.strict ? is(actual, expected) : actual == expected;
    }
    var hasActual = channel.has(actual);
    var hasExpected = channel.has(expected);
    var sentinel;
    if (hasActual && hasExpected) {
      if (channel.get(actual) === channel.get(expected)) {
        return true;
      }
    } else {
      sentinel = {};
    }
    if (!hasActual) {
      channel.set(actual, sentinel);
    }
    if (!hasExpected) {
      channel.set(expected, sentinel);
    }
    return objEquiv(actual, expected, opts, channel);
  }
  function isBuffer(x) {
    if (!x || typeof x !== "object" || typeof x.length !== "number") {
      return false;
    }
    if (typeof x.copy !== "function" || typeof x.slice !== "function") {
      return false;
    }
    if (x.length > 0 && typeof x[0] !== "number") {
      return false;
    }
    return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
  }
  function setEquiv(a, b, opts, channel) {
    if ($setSize(a) !== $setSize(b)) {
      return false;
    }
    var iA = getIterator(a);
    var iB = getIterator(b);
    var resultA;
    var resultB;
    var set;
    while ((resultA = iA.next()) && !resultA.done) {
      if (resultA.value && typeof resultA.value === "object") {
        if (!set) {
          set = new $Set();
        }
        $setAdd(set, resultA.value);
      } else if (!$setHas(b, resultA.value)) {
        if (opts.strict) {
          return false;
        }
        if (!setMightHaveLoosePrim(a, b, resultA.value)) {
          return false;
        }
        if (!set) {
          set = new $Set();
        }
        $setAdd(set, resultA.value);
      }
    }
    if (set) {
      while ((resultB = iB.next()) && !resultB.done) {
        if (resultB.value && typeof resultB.value === "object") {
          if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) {
            return false;
          }
        } else if (!opts.strict && !$setHas(a, resultB.value) && !setHasEqualElement(set, resultB.value, opts.strict, channel)) {
          return false;
        }
      }
      return $setSize(set) === 0;
    }
    return true;
  }
  function mapEquiv(a, b, opts, channel) {
    if ($mapSize(a) !== $mapSize(b)) {
      return false;
    }
    var iA = getIterator(a);
    var iB = getIterator(b);
    var resultA;
    var resultB;
    var set;
    var key2;
    var item1;
    var item2;
    while ((resultA = iA.next()) && !resultA.done) {
      key2 = resultA.value[0];
      item1 = resultA.value[1];
      if (key2 && typeof key2 === "object") {
        if (!set) {
          set = new $Set();
        }
        $setAdd(set, key2);
      } else {
        item2 = $mapGet(b, key2);
        if (typeof item2 === "undefined" && !$mapHas(b, key2) || !internalDeepEqual(item1, item2, opts, channel)) {
          if (opts.strict) {
            return false;
          }
          if (!mapMightHaveLoosePrim(a, b, key2, item1, opts, channel)) {
            return false;
          }
          if (!set) {
            set = new $Set();
          }
          $setAdd(set, key2);
        }
      }
    }
    if (set) {
      while ((resultB = iB.next()) && !resultB.done) {
        key2 = resultB.value[0];
        item2 = resultB.value[1];
        if (key2 && typeof key2 === "object") {
          if (!mapHasEqualEntry(set, a, key2, item2, opts, channel)) {
            return false;
          }
        } else if (!opts.strict && (!a.has(key2) || !internalDeepEqual($mapGet(a, key2), item2, opts, channel)) && !mapHasEqualEntry(set, a, key2, item2, assign2({}, opts, { strict: false }), channel)) {
          return false;
        }
      }
      return $setSize(set) === 0;
    }
    return true;
  }
  function objEquiv(a, b, opts, channel) {
    var i, key2;
    if (typeof a !== typeof b) {
      return false;
    }
    if (a == null || b == null) {
      return false;
    }
    if ($objToString(a) !== $objToString(b)) {
      return false;
    }
    if (isArguments2(a) !== isArguments2(b)) {
      return false;
    }
    var aIsArray = isArray2(a);
    var bIsArray = isArray2(b);
    if (aIsArray !== bIsArray) {
      return false;
    }
    var aIsError = a instanceof Error;
    var bIsError = b instanceof Error;
    if (aIsError !== bIsError) {
      return false;
    }
    if (aIsError || bIsError) {
      if (a.name !== b.name || a.message !== b.message) {
        return false;
      }
    }
    var aIsRegex = isRegex2(a);
    var bIsRegex = isRegex2(b);
    if (aIsRegex !== bIsRegex) {
      return false;
    }
    if ((aIsRegex || bIsRegex) && (a.source !== b.source || flags(a) !== flags(b))) {
      return false;
    }
    var aIsDate = isDate(a);
    var bIsDate = isDate(b);
    if (aIsDate !== bIsDate) {
      return false;
    }
    if (aIsDate || bIsDate) {
      if ($getTime(a) !== $getTime(b)) {
        return false;
      }
    }
    if (opts.strict && gPO && gPO(a) !== gPO(b)) {
      return false;
    }
    var aWhich = whichTypedArray2(a);
    var bWhich = whichTypedArray2(b);
    if (aWhich !== bWhich) {
      return false;
    }
    if (aWhich || bWhich) {
      if (a.length !== b.length) {
        return false;
      }
      for (i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    var aIsBuffer = isBuffer(a);
    var bIsBuffer = isBuffer(b);
    if (aIsBuffer !== bIsBuffer) {
      return false;
    }
    if (aIsBuffer || bIsBuffer) {
      if (a.length !== b.length) {
        return false;
      }
      for (i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    var aIsArrayBuffer = isArrayBuffer2(a);
    var bIsArrayBuffer = isArrayBuffer2(b);
    if (aIsArrayBuffer !== bIsArrayBuffer) {
      return false;
    }
    if (aIsArrayBuffer || bIsArrayBuffer) {
      if (byteLength(a) !== byteLength(b)) {
        return false;
      }
      return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel);
    }
    var aIsSAB = isSharedArrayBuffer2(a);
    var bIsSAB = isSharedArrayBuffer2(b);
    if (aIsSAB !== bIsSAB) {
      return false;
    }
    if (aIsSAB || bIsSAB) {
      if (sabByteLength(a) !== sabByteLength(b)) {
        return false;
      }
      return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel);
    }
    if (typeof a !== typeof b) {
      return false;
    }
    var ka = objectKeys2(a);
    var kb = objectKeys2(b);
    if (ka.length !== kb.length) {
      return false;
    }
    ka.sort();
    kb.sort();
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] != kb[i]) {
        return false;
      }
    }
    for (i = ka.length - 1; i >= 0; i--) {
      key2 = ka[i];
      if (!internalDeepEqual(a[key2], b[key2], opts, channel)) {
        return false;
      }
    }
    var aCollection = whichCollection2(a);
    var bCollection = whichCollection2(b);
    if (aCollection !== bCollection) {
      return false;
    }
    if (aCollection === "Set" || bCollection === "Set") {
      return setEquiv(a, b, opts, channel);
    }
    if (aCollection === "Map") {
      return mapEquiv(a, b, opts, channel);
    }
    return true;
  }
  deepEqual$1 = function deepEqual2(a, b, opts) {
    return internalDeepEqual(a, b, opts, getSideChannel());
  };
  return deepEqual$1;
}
var deepEqualExports = requireDeepEqual();
const DeepEqual = /* @__PURE__ */ getDefaultExportFromCjs(deepEqualExports);
class BeanSimple {
  constructor() {
    this.sys = void 0;
    this.app = void 0;
    this.ctx = void 0;
  }
  get bean() {
    return this.ctx ? this.ctx.bean : this.sys.bean;
  }
}
class SysUtil extends BeanSimple {
  getAbsoluteUrlFromPagePath(path, ignoreHost, ignorePublicPath) {
    let prefix = ignoreHost ? "" : `${this.sys.env.SSR_PROD_PROTOCOL}://${this.sys.env.SSR_PROD_HOST}`;
    if (!ignorePublicPath && this.sys.env.APP_PUBLIC_PATH) {
      prefix = `${prefix}/${this.sys.env.APP_PUBLIC_PATH}`;
    }
    return `${prefix}${path || ""}`;
  }
  getPagePathFromAbsoluteUrl(url, ignorePublicPath) {
    let pagePath;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      const _url = new URL(url);
      pagePath = _url.pathname + _url.search;
    } else {
      pagePath = url;
    }
    if (!ignorePublicPath && this.sys.env.APP_PUBLIC_PATH) {
      const prefix = `/${this.sys.env.APP_PUBLIC_PATH}`;
      if (pagePath.startsWith(prefix)) {
        pagePath = pagePath.substring(prefix.length);
      }
    }
    return pagePath;
  }
  getApiBaseURL(useApiPrefix = true) {
    let baseURL = this.sys.config.api.baseURL || "";
    if (useApiPrefix) {
      baseURL = `${baseURL}${this.sys.config.api.prefix || ""}`;
    }
    return baseURL;
  }
  getOpenApiBaseURL(envName) {
    {
      return this.sys.env[envName] || this.sys.env.OPENAPI_BASE_URL_DEFAULT || this.sys.env.API_BASE_URL;
    }
  }
  getApiPath(path) {
    if (!path) return path;
    if (path.startsWith("//")) {
      path = path.substring(1);
    } else {
      path = this.sys.config.api.prefix + path;
    }
    return path;
  }
  apiActionPathTranslate(pathName, pathParams) {
    return defaultPathSerializer(pathName, pathParams);
  }
  apiActionConfigPrepare(baseURL, options, authToken) {
    const optionsCustom = {
      params: options?.query,
      query: void 0
    };
    const interceptors = {};
    authToken = options?.authToken === void 0 ? authToken : options?.authToken;
    if (authToken !== void 0) {
      interceptors["a-interceptor:jwt"] = {
        authToken
      };
    }
    if (options?.openapiSchema) {
      interceptors["a-interceptor:headers"] = {
        openapiSchema: options?.openapiSchema
      };
    }
    if (!isEmptyObject(interceptors)) {
      optionsCustom.interceptors = interceptors;
    }
    return deepExtend({
      baseURL: baseURL || this.getApiBaseURL(false)
    }, options, optionsCustom);
  }
  getModuleConfigSafe(moduleName) {
    const module = this.sys.meta.module.get(moduleName);
    if (module) {
      const scope = this.sys.bean.scope(moduleName);
      return cast(scope).config;
    }
    let config = this.sys.config.modules[moduleName];
    if (!config) {
      config = this.sys.config.modules[moduleName] = {};
    }
    return config;
  }
  getModuleConfigOriginal(moduleName) {
    return this.sys.configOriginal.modules[moduleName] ?? {};
  }
  parseResourceApi(resource, api) {
    const parts = resource.split(":");
    return api ?? combineApiPathControllerAndAction(parts[0], parts[1], void 0, true, true, this.sys.env.API_PREFIX);
  }
}
function uuid() {
  return uuid$1();
}
function objectAssignReactive(...args) {
  let target = args[0];
  if (!target || typeof target !== "object") throw new Error("invalid args");
  if (!isReactive(target)) {
    target = reactive(target);
  }
  for (let i = 1; i < args.length; i++) {
    const source2 = args[i];
    if (!source2) continue;
    const keys = Object.getOwnPropertyNames(source2);
    for (const key2 of keys) {
      const desc = Object.getOwnPropertyDescriptor(source2, key2);
      target[key2] = desc?.value;
    }
  }
  return target;
}
function deepExtend(...args) {
  return extend(true, ...args);
}
function deepEqual(actual, expected, opts) {
  return DeepEqual(actual, expected, opts);
}
function disposeInstance(instance) {
  instance?.__dispose__?.();
}
function polyfillDispose(instance) {
  if (!instance || instance.__dispose__) return;
  Object.getPrototypeOf(instance).__dispose__ = () => {
  };
}
function beanFullNameFromOnionName(onionName, sceneName) {
  return onionName.replace(":", `.${sceneName}.`);
}
const DecoratorBeanFullName = /* @__PURE__ */ Symbol("Decorator#BeanFullName");
const SymbolDecoratorBeanInfo = /* @__PURE__ */ Symbol("SymbolDecoratorBeanInfo");
const SymbolDecoratorProxyDisable = /* @__PURE__ */ Symbol("SymbolDecoratorProxyDisable");
const SymbolDecoratorPreload = /* @__PURE__ */ Symbol("SymbolDecoratorPreload");
const SymbolDecoratorVirtual = /* @__PURE__ */ Symbol("SymbolDecoratorVirtual");
const SymbolDecoratorUse = /* @__PURE__ */ Symbol("SymbolDecoratorUse");
const DecoratorBeanFullNameOfComposable = /* @__PURE__ */ Symbol("Decorator#BeanFullNameOfComposable");
class AppResource {
  constructor() {
    this.beans = {};
    this.scenes = {};
  }
  addUse(target, options) {
    registerMappedClassMetadataKey(target, SymbolDecoratorUse);
    const uses = appMetadata.getOwnMetadataMap(true, SymbolDecoratorUse, target);
    uses[options.prop] = options;
  }
  getUses(target) {
    return appMetadata.getMetadata(SymbolDecoratorUse, target);
  }
  addBean(beanOptions) {
    const {
      beanClass,
      options,
      optionsPrimitive
    } = beanOptions;
    const virtual = appMetadata.getOwnMetadata(SymbolDecoratorVirtual, beanClass);
    const {
      scene,
      name
    } = this._parseSceneAndBeanName(beanClass, beanOptions.scene, beanOptions.name);
    const beanInfo = appMetadata.getOwnMetadata(SymbolDecoratorBeanInfo, beanClass);
    const module = beanInfo?.module;
    if (!module) throw new Error(`module name not parsed for bean: ${scene}.${name}`);
    const beanFullName = `${module}.${scene}.${name}`;
    const moduleBelong = this._parseModuleBelong(module, beanClass, virtual);
    const options2 = this._prepareOnionOptions(options, optionsPrimitive, scene, `${module}:${name}`);
    const beanOptions2 = {
      ...beanOptions,
      module,
      scene,
      name,
      beanFullName,
      moduleBelong,
      options: options2
    };
    this.beans[beanFullName] = beanOptions2;
    if (!this.scenes[scene]) this.scenes[scene] = {};
    if (!this.scenes[scene][module]) this.scenes[scene][module] = {};
    this.scenes[scene][module][beanFullName] = beanOptions2;
    appMetadata.defineMetadata(DecoratorBeanFullName, beanFullName, beanOptions2.beanClass);
    return beanOptions2;
  }
  getBeanFullName(beanFullName) {
    if (!beanFullName) return beanFullName;
    if (typeof beanFullName === "function" && isClass(beanFullName)) {
      return appMetadata.getOwnMetadata(DecoratorBeanFullName, beanFullName);
    }
    return beanFullName;
  }
  getBeanFullNameOfComposable(beanComposable) {
    if (!beanComposable) return;
    if (!beanComposable[DecoratorBeanFullNameOfComposable]) {
      beanComposable[DecoratorBeanFullNameOfComposable] = `__composable__:${uuid$1()}`;
    }
    return beanComposable[DecoratorBeanFullNameOfComposable];
  }
  getBean(beanFullName) {
    const fullName = this.getBeanFullName(beanFullName);
    if (!fullName) return null;
    return this.beans[fullName];
  }
  _fixClassName(className) {
    while (className.endsWith("2")) {
      className = className.substring(0, className.length - 1);
    }
    return className;
  }
  _parseSceneAndBeanName(beanClass, scene, name) {
    if (scene && name) {
      return {
        scene,
        name
      };
    }
    let beanClassName = this._fixClassName(beanClass.name);
    if (beanClassName.toLowerCase().startsWith("bean")) {
      beanClassName = beanClassName.substring("bean".length);
    }
    if (!name) {
      if (scene) {
        name = skipPrefix(beanClassName, scene, true);
      } else {
        name = parseLastWord(beanClassName, true);
      }
    }
    if (!scene) {
      scene = skipLastWord(beanClassName, name, true);
      scene = splitWords(scene, true, ".");
    }
    return {
      scene,
      name
    };
  }
  _parseModuleBelong(module, beanClass, virtual) {
    if (!virtual) return module;
    let moduleBelong;
    let parent = Object.getPrototypeOf(beanClass);
    while (parent) {
      const beanOptions = this.getBean(parent);
      if (beanOptions && beanOptions.moduleBelong) {
        moduleBelong = beanOptions.moduleBelong;
        break;
      }
      parent = Object.getPrototypeOf(parent);
    }
    return moduleBelong;
  }
  _getModuleBelong(beanFullName) {
    const beanOptions = this.getBean(beanFullName);
    return beanOptions?.moduleBelong;
  }
  _getModuleName(beanFullName) {
    const beanOptions = this.getBean(beanFullName);
    return beanOptions?.module;
  }
  _prepareOnionOptions(options, optionsPrimitive, scene, name) {
    const sys2 = getSys();
    const optionsConfig = cast(sys2.config).onions[scene]?.[name];
    if (optionsPrimitive) {
      return optionsConfig === void 0 ? options : optionsConfig;
    } else {
      return deepExtend({}, options, optionsConfig);
    }
  }
}
const appResource = new AppResource();
const SymbolWaitPromise = /* @__PURE__ */ Symbol("SymbolWaitPromise");
class StateLock {
  static create() {
    return reactive(new StateLock());
  }
  constructor() {
    this._state = void 0;
    this._resolve = void 0;
    this._state = false;
  }
  get state() {
    return this._state;
  }
  touch() {
    if (this._state === true) return;
    this._state = true;
    if (this._resolve) {
      this._resolve.call(void 0, null);
      this._resolve = void 0;
    }
  }
  async wait() {
    if (!this[SymbolWaitPromise]) {
      this[SymbolWaitPromise] = this._waitInner();
    }
    return this[SymbolWaitPromise];
  }
  async _waitInner() {
    return new Promise((resolve) => {
      if (this.state) return resolve(null);
      this._resolve = resolve;
    });
  }
}
const SymbolBeanFullName = /* @__PURE__ */ Symbol("SymbolBeanFullName");
const SymbolBeanInstanceKey = /* @__PURE__ */ Symbol("SymbolBeanInstanceKey");
const SymbolModuleBelong = /* @__PURE__ */ Symbol("SymbolModuleBelong");
const SymbolModuleName = /* @__PURE__ */ Symbol("SymbolModuleName");
const SymbolInited = /* @__PURE__ */ Symbol("SymbolInited");
class BeanBaseSimple extends BeanSimple {
  constructor() {
    super();
    this[SymbolBeanFullName] = void 0;
    this[SymbolBeanInstanceKey] = void 0;
    this[SymbolInited] = void 0;
    this[SymbolInited] = StateLock.create();
  }
  get [SymbolModuleBelong]() {
    const moduleBelong = appResource._getModuleBelong(this[SymbolBeanFullName]);
    if (!moduleBelong) throw new Error(`not found module belong: ${this[SymbolBeanFullName]}`);
    return moduleBelong;
  }
  get [SymbolModuleName]() {
    const moduleName = appResource._getModuleName(this[SymbolBeanFullName]);
    if (!moduleName) throw new Error(`not found module name: ${this[SymbolBeanFullName]}`);
    return moduleName;
  }
  get $beanFullName() {
    return this[SymbolBeanFullName];
  }
  get $beanInstanceKey() {
    return this[SymbolBeanInstanceKey];
  }
  get $beanOptions() {
    return appResource.getBean(this[SymbolBeanFullName] || this.constructor);
  }
  get $onionName() {
    const parts = this.$beanFullName.split(".");
    return `${parts[0]}:${parts[2]}`;
  }
  get $onionOptions() {
    return this.$beanOptions.options;
  }
}
const BeanModuleScope$2 = /* @__PURE__ */ Symbol("BeanScopeError#ModuleScope");
class BeanScopeError extends BeanSimple {
  constructor(moduleScope) {
    super();
    this[BeanModuleScope$2] = void 0;
    this.__instances = {};
    this[BeanModuleScope$2] = moduleScope;
  }
  __get__(prop) {
    if (!this.__instances[prop]) {
      this.__instances[prop] = this.app.meta.error.createScopeError(this[BeanModuleScope$2], prop);
    }
    return this.__instances[prop];
  }
}
const errorsInternal = {
  "0": "Success",
  "1": "Unknown Error",
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "103": "Early hints",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required",
  "600": "Component Unmounted"
};
class ErrorClass extends BeanSimple {
  /** @internal */
  async initialize() {
  }
  // code/message,args
  throw(module, code, ...args) {
    const body = this.parseFail(module, code, ...args);
    const err = new Error();
    err.code = body.code;
    err.message = body.message;
    if (body.code < 500) err.status = body.code;
    throw err;
  }
  // code/message,args
  parseFail(module, code, ...args) {
    if (typeof code === "object") return code;
    return this.parseCode(module, 1, code, ...args);
  }
  // parseCode
  parseCode(module, codeDefault, code, ...args) {
    const ebError = this.sys.meta.error.errors[module];
    if (typeof code === "string" && /^\d+$/.test(code)) {
      code = Number(code);
    }
    let text;
    if (code && typeof code === "string") {
      text = code;
      code = ebError[code];
    }
    if (code === void 0 || code === null || code === "") {
      code = codeDefault;
    }
    let message;
    if (code <= 1e3) {
      message = this.app.meta.locale.getText(true, void 0, void 0, errorsInternal[code], ...args);
    } else {
      message = this.app.meta.locale.getText(false, module, void 0, text || code, ...args);
    }
    code = __combineErrorCode(module, code);
    return {
      code,
      message
    };
  }
}
function __combineErrorCode(module, code) {
  if (typeof code !== "number" || code <= 1e3) return code;
  return module ? `${module}:${code}` : code;
}
const SymbolErrorInstanceInfo = /* @__PURE__ */ Symbol("SymbolErrorInstanceInfo");
const BeanModuleScope$1 = /* @__PURE__ */ Symbol("BeanScopeLocale#ModuleScope");
class BeanScopeLocale extends BeanSimple {
  constructor(moduleScope) {
    super();
    this[BeanModuleScope$1] = void 0;
    this.__instances = {};
    this[BeanModuleScope$1] = moduleScope;
  }
  __get__(prop) {
    if (!this.__instances[prop]) {
      const metaLocale = this.app ? this.app.meta.locale : this.sys.meta.locale;
      this.__instances[prop] = metaLocale.createScopeLocaleText(this[BeanModuleScope$1], prop);
    }
    return this.__instances[prop];
  }
}
const LocaleModuleNameSeparator = "::";
const SymbolVueDecorators = /* @__PURE__ */ Symbol("Bean#SymbolVueDecorators");
function getVueDecoratorValues(beanInstance) {
  if (!beanInstance[SymbolVueDecorators]) {
    beanInstance[SymbolVueDecorators] = shallowReactive({});
  }
  return beanInstance[SymbolVueDecorators];
}
function getVueDecoratorValue(beanInstance, prop, index, fn) {
  const key2 = `${prop}:${index}`;
  const values = getVueDecoratorValues(beanInstance);
  if (!values[key2] && fn) {
    values[key2] = fn();
  }
  return values[key2];
}
function setVueDecoratorValue(beanInstance, prop, index, value) {
  const key2 = `${prop}:${index}`;
  const values = getVueDecoratorValues(beanInstance);
  values[key2] = value;
}
const SymbolText = /* @__PURE__ */ Symbol("SymbolText");
const SymbolLogger = /* @__PURE__ */ Symbol("SymbolLogger");
const SymbolLoggerChildren = /* @__PURE__ */ Symbol("SymbolLoggerChildren");
class BeanBase extends BeanBaseSimple {
  constructor(...args) {
    super(...args);
    this[SymbolText] = void 0;
    this[SymbolLogger] = {};
    this[SymbolLoggerChildren] = {};
  }
  get $el() {
    if (!this.ctx) {
      throw new Error("$el can not be used inside global bean.");
    }
    return this.ctx.meta.el;
  }
  get $text() {
    if (!this[SymbolText]) {
      this[SymbolText] = this.app.meta.locale.createLocaleText(this[SymbolModuleBelong]);
    }
    return this[SymbolText];
  }
  get $logger() {
    return this.$loggerClient("default");
  }
  $loggerClient(clientName) {
    if (!this[SymbolLogger][clientName]) {
      this[SymbolLogger][clientName] = this.sys.meta.logger.get(clientName).child({
        beanFullName: this.$beanFullName
      });
    }
    return this[SymbolLogger][clientName];
  }
  $loggerChild(childName, clientName = "default") {
    if (!this[SymbolLoggerChildren][clientName]) this[SymbolLoggerChildren][clientName] = {};
    if (!this[SymbolLoggerChildren][clientName][childName]) {
      this[SymbolLoggerChildren][clientName][childName] = this.sys.meta.logger.get(clientName).child({
        beanFullName: this.$beanFullName,
        name: childName
      });
    }
    return this[SymbolLoggerChildren][clientName][childName];
  }
  get $event() {
    return this.app.meta.event;
  }
  // need not
  // protected async __init__() {}
  // protected __dispose__() {}
  get scope() {
    return this.bean.scope(this[SymbolModuleBelong]);
  }
  $watchHandle(prop, index) {
    if (typeof prop === "function") {
      prop = prop.name;
    }
    return getVueDecoratorValue(this, prop, index ?? 0);
  }
  $renderFreeze(freeze) {
    return cast(this.ctx.instance).ctx.renderFreeze(freeze);
  }
  async $renderFreezeScope(fn) {
    return await cast(this.ctx.instance).ctx.renderFreezeScope(fn);
  }
  $onCreated(fn) {
    this.ctx.meta.hooks.onCreated(fn);
  }
  $onMounted(fn) {
    this.ctx.meta.hooks.onMounted(fn);
  }
  $errorHandler(err, info) {
    if (err instanceof Error && err[SymbolErrorInstanceInfo]) {
      delete err[SymbolErrorInstanceInfo];
    }
    return this.app?.vue.config.errorHandler(err, this.ctx.instance, info);
  }
  $useComputed(options, debugOptions) {
    return this.ctx.util.instanceScope(() => {
      return useComputed(options, debugOptions);
    });
  }
  $watchEffect(effect, options) {
    return this.ctx.util.instanceScope(() => {
      return watchEffect$1(effect, options);
    });
  }
  $watchPostEffect(effect, options) {
    return this.ctx.util.instanceScope(() => {
      return watchPostEffect(effect);
    });
  }
  $watchSyncEffect(effect, options) {
    return this.ctx.util.instanceScope(() => {
      return watchSyncEffect(effect);
    });
  }
  $watch(source2, cb, options) {
    return this.ctx.util.instanceScope(() => {
      return watch$1(source2, cb, options);
    });
  }
  $onControllerCreated(fn) {
    return this.ctx.util.instanceScope(() => {
      return this.ctx.meta.hooks.onCreated(fn);
    });
  }
  $controllerMounted(fn) {
    return this.ctx.util.instanceScope(() => {
      return this.ctx.meta.hooks.onMounted(fn);
    });
  }
  $zovaComponent(module, name) {
    return this.sys.meta.component.getZovaComponent(module, name);
  }
  // need not
  // public dispose() {
  //   const self = cast(this);
  //   if (self.__dispose__) {
  //     self.__dispose__();
  //   }
  // }
}
class BeanAopBase extends BeanBase {
}
class BeanAopMethodBase extends BeanBase {
}
function __adapterDefault(_context, chain) {
  return {
    receiver: void 0,
    fn: chain
  };
}
function compose(chains, adapter) {
  if (!adapter) adapter = __adapterDefault;
  if (!chains) chains = [];
  return function(context, next) {
    let index = -1;
    return dispatch(0, context);
    function dispatch(i, context2) {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      let receiver;
      let fn;
      const chain = chains[i];
      if (chain) {
        const obj = adapter(context2, chain);
        if (!obj) return dispatch(i + 1, context2);
        receiver = obj.receiver;
        fn = obj.fn;
        if (!fn) throw new Error("fn is not defined");
      }
      if (i === chains.length) fn = next;
      if (!fn) return context2;
      return fn.call(receiver, context2, (...args) => {
        context2 = args.length === 0 ? context2 : args[0];
        return dispatch(i + 1, context2);
      });
    }
  };
}
function BeanInfo(options) {
  return function(target) {
    appMetadata.defineMetadata(SymbolDecoratorBeanInfo, options, target);
  };
}
function createBeanDecorator(scene, containerScope, markReactive, options, optionsPrimitive, fn) {
  return function(target) {
    const name = scene === "scope" ? "module" : void 0;
    appResource.addBean({
      scene,
      name,
      containerScope,
      markReactive,
      beanClass: target,
      options,
      optionsPrimitive
    });
  };
}
function Preload() {
  return function(target) {
    appMetadata.defineMetadata(SymbolDecoratorPreload, true, target);
  };
}
function ProxyDisable() {
  return function(target) {
    appMetadata.defineMetadata(SymbolDecoratorProxyDisable, true, target);
  };
}
function useRef(object, key2, defaultValue) {
  return toRef(object, key2, defaultValue);
}
function Use(options) {
  return function(target, prop, descriptor) {
    if (!options) options = {};
    if (typeof options === "string") {
      options = {
        beanFullName: options
      };
    }
    const beanClass = appMetadata.getDesignType(target, prop);
    appResource.addUse(target, {
      ...options,
      prop,
      beanClass,
      descriptor
    });
  };
}
function usePrepareArg(arg, withSelector, markReactive) {
  return {
    withSelector,
    markReactive,
    args: [arg]
  };
}
function __prepareInjectSelectorInfo(beanInstance, useOptions) {
  let selectorInfo = __prepareInjectSelectorInfo_descriptor(beanInstance, useOptions);
  if (!selectorInfo) {
    selectorInfo = __prepareInjectSelectorInfo_init(beanInstance, useOptions);
  }
  if (!selectorInfo && !isNilOrEmptyString(useOptions.selector)) {
    const selector = evaluateExpressions(useOptions.selector, {
      self: beanInstance,
      sys: beanInstance.sys,
      app: beanInstance.app,
      ctx: beanInstance.ctx
    });
    return {
      withSelector: true,
      args: [selector]
    };
  }
  return selectorInfo ?? {
    withSelector: false,
    args: []
  };
}
function __prepareInjectSelectorInfo_descriptor(beanInstance, useOptions) {
  const fnGet = useOptions.descriptor?.get;
  if (!fnGet) return;
  const res = fnGet.call(beanInstance);
  if (!res) return;
  const withSelector = res.withSelector ?? false;
  const markReactive = res.markReactive ?? true;
  const args = res.args.map((arg, index) => {
    return typeof arg === "function" ? markReactive && (!withSelector || index > 0) ? useRef(arg) : arg() : arg;
  });
  return {
    withSelector,
    args
  };
}
function __prepareInjectSelectorInfo_init(beanInstance, useOptions) {
  const init = useOptions.init;
  if (!init) return;
  const withSelector = init.withSelector ?? false;
  const markReactive = init.markReactive ?? true;
  const _args = init.args ?? [init.arg];
  if (!_args) return;
  const args = _args.map((arg, index) => __prepareInjectSelectorInfo_init_arg(beanInstance, arg, markReactive && (!withSelector || index > 0)));
  return {
    withSelector,
    args
  };
}
function __prepareInjectSelectorInfo_init_arg(beanInstance, arg, reactive2) {
  const context = {
    self: beanInstance,
    sys: beanInstance.sys,
    app: beanInstance.app,
    ctx: beanInstance.ctx
  };
  if (reactive2 && evaluateExpressions(arg, context, void 0, true)) {
    return useRef(() => evaluateExpressions(arg, context));
  }
  return evaluateExpressions(arg, context);
}
function UseScope(options) {
  return function(target, prop) {
    if (!options) throw new Error("should specify the module name");
    if (typeof options === "string") {
      options = {
        module: options
      };
    }
    const beanFullName = `${options.module}.scope.module`;
    appResource.addUse(target, {
      ...options,
      prop,
      beanFullName
    });
  };
}
function Virtual() {
  return function(target) {
    appMetadata.defineMetadata(SymbolDecoratorVirtual, true, target);
  };
}
const SymbolDecoratorVueElements = /* @__PURE__ */ Symbol("SymbolDecoratorVueElements");
function createVueDecorator(type2, options) {
  return function(target, prop, descriptor) {
    const vues = appMetadata.getOwnMetadataMap(true, SymbolDecoratorVueElements, target);
    if (!vues[prop]) vues[prop] = [];
    vues[prop].push({
      type: type2,
      descriptor,
      options
    });
  };
}
function Emit(eventName) {
  return createVueDecorator("emit", {
    eventName
  });
}
function ModelValue(modelName) {
  return createVueDecorator("model", {
    modelName
  });
}
function computed(beanInstance, _beanFullName, prop, vueElement, index) {
  const {
    descriptor
  } = vueElement;
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        if (!descriptor.set) {
          return useComputed(() => {
            return descriptor.get?.apply(beanInstance);
          });
        } else {
          return useComputed({
            get() {
              return descriptor.get?.apply(beanInstance);
            },
            set(value) {
              descriptor.set.call(beanInstance, value);
            }
          });
        }
      });
    }
  });
}
function useContext() {
  const instance = getCurrentInstance();
  return instance?.zova;
}
function onControllerCreated(fn) {
  const ctx = useContext();
  if (!ctx) {
    throw new Error("run in the invalid context");
  }
  ctx.meta.hooks.onCreated(fn);
}
function controllerCreated(beanInstance, _beanFullName, _prop, vueElement, _index) {
  const {
    descriptor
  } = vueElement;
  onControllerCreated(() => {
    return descriptor.value.call(beanInstance);
  });
}
function onControllerMounted(fn) {
  const ctx = useContext();
  if (!ctx) {
    throw new Error("run in the invalid context");
  }
  ctx.meta.hooks.onMounted(fn);
}
function controllerMounted(beanInstance, _beanFullName, _prop, vueElement, _index) {
  const {
    descriptor
  } = vueElement;
  onControllerMounted(() => {
    return descriptor.value.call(beanInstance);
  });
}
function emit(beanInstance, _beanFullName, prop, vueElement, index) {
  const {
    descriptor
  } = vueElement;
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        return function(...args) {
          const returnValue = descriptor.value.apply(beanInstance, args);
          if (isPromise(returnValue)) {
            return returnValue.then((returnValue2) => {
              return __emitHandler(returnValue2, args, beanInstance, prop, vueElement);
            });
          } else {
            return __emitHandler(returnValue, args, beanInstance, prop, vueElement);
          }
        };
      });
    }
  });
}
function __emitHandler(returnValue, args, beanInstance, prop, vueElement) {
  let eventName = vueElement.options?.eventName;
  if (!eventName) {
    if (prop.startsWith("emit")) {
      eventName = toLowerCaseFirstChar(prop.substring("emit".length));
    } else {
      eventName = prop;
    }
  }
  const propName = `on${toUpperCaseFirstChar(eventName)}`;
  const func = beanInstance.$props?.[propName];
  if (!func) return;
  if (returnValue === void 0) {
    func(...args);
  } else {
    func(returnValue, ...args);
  }
  return returnValue;
}
function useModel(props, name, options = EMPTY_OBJ) {
  const i = getCurrentInstance();
  if (!i) {
    throw new Error("useModel() called without active instance.");
  }
  const propsDefault = Object.getPrototypeOf(this).constructor.$propsDefault;
  const propType = typeof propsDefault[name];
  const camelizedName = camelize(name);
  const modifiers = getModelModifiers(props, camelizedName);
  const res = customRef((track, trigger) => {
    let localValue;
    let prevSetValue = EMPTY_OBJ;
    let prevEmittedValue;
    watchSyncEffect(() => {
      const propValue = props[camelizedName];
      if (hasChanged(localValue, propValue)) {
        localValue = propValue;
        trigger();
      }
    });
    return {
      get() {
        track();
        return coerceValueType(propType, options.get ? options.get(localValue) : localValue);
      },
      set(value) {
        const emittedValue = coerceValueType(propType, options.set ? options.set(value) : value);
        if (!hasChanged(emittedValue, localValue) && !(prevSetValue !== EMPTY_OBJ && hasChanged(value, prevSetValue))) {
          return;
        }
        localValue = value;
        trigger();
        const rawProps = i.vnode.props;
        rawProps?.[`onUpdate:${name}`]?.(emittedValue);
        if (hasChanged(value, emittedValue) && hasChanged(value, prevSetValue) && !hasChanged(emittedValue, prevEmittedValue)) {
          trigger();
        }
        prevSetValue = value;
        prevEmittedValue = emittedValue;
      }
    };
  });
  res[Symbol.iterator] = () => {
    let i2 = 0;
    return {
      next() {
        if (i2 < 2) {
          return {
            value: i2++ ? modifiers || EMPTY_OBJ : res,
            done: false
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
  };
  return res;
}
function getModelModifiers(props, modelName) {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
}
function coerceValueType(type2, value) {
  if (["undefined", "null"].includes(type2)) return value;
  if (isNil(value)) return value;
  if (typeof value === type2) return value;
  let _value3;
  if (type2 === "number") {
    if (Number.isNaN(value)) {
      _value3 = value;
    } else {
      _value3 = Number(value);
    }
  } else if (type2 === "boolean") {
    _value3 = value === "false" || value === "0" ? false : Boolean(value);
  } else if (type2 === "string") {
    _value3 = String(value);
  } else {
    _value3 = value;
  }
  return _value3;
}
function model(beanInstance, _beanFullName, prop, vueElement, index) {
  const self2 = this;
  const {
    descriptor
  } = vueElement;
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        let modelName = vueElement.options?.modelName;
        if (!modelName) {
          if (prop === "modelValue") {
            modelName = prop;
          } else {
            if (prop.startsWith("model")) {
              modelName = toLowerCaseFirstChar(prop.substring("model".length));
            } else {
              modelName = prop;
            }
          }
        }
        const useModelOptions = {};
        if (descriptor.get) {
          useModelOptions.get = (value) => {
            return cast(descriptor.get).call(beanInstance, value);
          };
        }
        if (descriptor.set) {
          useModelOptions.set = (value) => {
            return descriptor.set.call(beanInstance, value);
          };
        }
        return self2.runWithInstanceScopeOrAppContext(() => {
          return useModel.call(beanInstance, beanInstance.$props, modelName, useModelOptions);
        });
      });
    }
  });
}
function raw(beanInstance, _beanFullName, prop, _vueElement, index) {
  const initialValue = beanInstance[prop];
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        return initialValue && typeof initialValue === "object" ? markRaw(initialValue) : initialValue;
      });
    },
    set(value) {
      setVueDecoratorValue(beanInstance, prop, index, markRaw(value));
      return true;
    }
  });
}
function shallow(beanInstance, _beanFullName, prop, _vueElement, index) {
  const initialValue = beanInstance[prop];
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        return initialValue && typeof initialValue === "object" ? shallowReactive(initialValue) : initialValue;
      });
    },
    set(value) {
      setVueDecoratorValue(beanInstance, prop, index, shallowReactive(value));
      return true;
    }
  });
}
function watch(beanInstance, _beanFullName, prop, vueElement, index) {
  const {
    descriptor,
    options
  } = vueElement;
  let keySource = `${prop}Source`;
  let getter;
  if (options?.path) {
    getter = () => {
      return getProperty$1(beanInstance, options.path, ".");
    };
  } else if (beanInstance[keySource]) {
    getter = () => {
      return beanInstance[keySource]();
    };
  } else {
    if (prop.startsWith("watch")) {
      keySource = toLowerCaseFirstChar(prop.substring("watch".length));
    } else {
      keySource = prop;
    }
    getter = () => {
      return beanInstance[keySource];
    };
  }
  getVueDecoratorValue(beanInstance, prop, index, () => {
    return watch$1(getter, (newValue, oldValue) => {
      descriptor.value.call(beanInstance, newValue, oldValue);
    }, options?.watchOptions);
  });
}
function watchEffect(beanInstance, _beanFullName, prop, vueElement, index) {
  const {
    descriptor,
    options
  } = vueElement;
  getVueDecoratorValue(beanInstance, prop, index, () => {
    return watchEffect$1(() => {
      descriptor.value.call(beanInstance);
    }, options?.watchEffectOptions);
  });
}
const vueDecorators = {
  computed,
  emit,
  watch,
  watchEffect,
  raw,
  shallow,
  model,
  controllerCreated,
  controllerMounted
};
const SymbolBeanContainerParent = /* @__PURE__ */ Symbol("SymbolBeanContainerParent");
const SymbolProxyMagic = /* @__PURE__ */ Symbol("SymbolProxyMagic");
const SymbolProxyAopMethod = /* @__PURE__ */ Symbol("SymbolProxyAopMethod");
const SymbolCacheAopChains = /* @__PURE__ */ Symbol("SymbolCacheAopChains");
const SymbolCacheAopChainsKey = /* @__PURE__ */ Symbol("SymbolCacheAopChainsKey");
const SymbolGetBeanSelectorInnerPromises = /* @__PURE__ */ Symbol("SymbolGetBeanSelectorInnerPromises");
const SymbolBeanContainerInstances = /* @__PURE__ */ Symbol("SymbolBeanContainerInstances");
class BeanContainer {
  static create(sys2, app, ctx) {
    const beanContainer = new BeanContainer(sys2, app, ctx);
    const proxy = new Proxy(beanContainer, {
      get(obj, prop) {
        if (typeof prop === "symbol") return obj[prop];
        if (obj[prop]) return obj[prop];
        return obj._getBeanSyncOnly(prop);
      }
    });
    return markRaw(proxy);
  }
  constructor(sys2, app, ctx) {
    this.sys = void 0;
    this.app = void 0;
    this.ctx = void 0;
    this[SymbolBeanContainerInstances] = shallowReactive({});
    this[SymbolGetBeanSelectorInnerPromises] = {};
    this.sys = sys2;
    this.app = app;
    this.ctx = ctx;
  }
  /** @internal */
  dispose() {
    const beanInstances = this[SymbolBeanContainerInstances];
    for (const prop in beanInstances) {
      if (prop.startsWith("$$")) continue;
      const beanInstance = cast(beanInstances[prop]);
      if (beanInstance && !(beanInstance instanceof BeanAopBase) && beanInstance.__dispose__) {
        if (this.containerType === "sys") {
          this.sys.meta.module._monkeyModuleSync(false, "beanDispose", void 0, this, beanInstance);
          beanInstance.__dispose__();
          this.sys.meta.module._monkeyModuleSync(false, "beanDisposed", void 0, this, beanInstance);
        } else {
          this.app.meta.module._monkeyModuleSync(false, "beanDispose", void 0, this, beanInstance);
          this.runWithInstanceScopeOrAppContext(() => {
            beanInstance.__dispose__();
          });
          this.app.meta.module._monkeyModuleSync(false, "beanDisposed", void 0, this, beanInstance);
        }
      }
    }
    this[SymbolBeanContainerInstances] = shallowReactive({});
    this[SymbolBeanContainerParent] = void 0;
    this[SymbolGetBeanSelectorInnerPromises] = {};
  }
  get containerType() {
    if (!this.ctx) return "sys";
    if (!this.app || this.ctx.bean === this.app.bean) return "app";
    return "ctx";
  }
  get parent() {
    if (this[SymbolBeanContainerParent] === void 0) {
      this[SymbolBeanContainerParent] = this._getParent();
    }
    return this[SymbolBeanContainerParent];
  }
  _getParent() {
    if (this.containerType === "sys") return null;
    let parent = this.ctx?.instance?.parent;
    while (parent) {
      const beanContainerParent = parent.zova?.bean;
      if (beanContainerParent) return beanContainerParent;
      parent = parent.parent;
    }
    return this.sys.bean;
  }
  runWithInstanceScopeOrAppContext(fn, tracking) {
    if (this.containerType === "sys") return fn();
    if (this.ctx) {
      return this.ctx.util.instanceScope(fn, tracking);
    } else {
      return this.app.vue.runWithContext(fn);
    }
  }
  provide(injectKey, value) {
    return this.ctx.util.instanceScope(() => {
      return provide(injectKey, value);
    });
  }
  inject(injectKey, defaultValue, treatDefaultAsFactory) {
    return this.ctx.util.instanceScope(() => {
      return inject(injectKey, defaultValue, treatDefaultAsFactory);
    });
  }
  defineProperty(obj, prop, attributes) {
    const self2 = this;
    const attrs = {
      ...attributes
    };
    if (attributes.get) {
      attrs.get = function() {
        const innerKey = `__innerKey_${prop}`;
        if (!obj[innerKey]) {
          self2.runWithInstanceScopeOrAppContext(() => {
            __setPropertyValue(obj, innerKey, attributes.get(), true);
          });
        }
        return obj[innerKey];
      };
    }
    return Object.defineProperty(obj, prop, attrs);
  }
  /** get specific module's scope */
  // scope<T>(moduleScope: string): T;
  scope(moduleScope) {
    if (this.containerType === "ctx") {
      return this.app.bean.scope(moduleScope);
    }
    return this._getBeanSyncOnly(`${moduleScope}.scope.module`);
  }
  // async getScope<T>(moduleScope: string): Promise<T>;
  async getScope(moduleScope) {
    if (this.containerType === "ctx") {
      return await this.app.bean.getScope(moduleScope);
    }
    await this._useModule(moduleScope);
    return this.scope(moduleScope);
  }
  _setBean(key2, instance) {
    this[SymbolBeanContainerInstances][key2] = instance;
  }
  _getBeanSync(key2, markReactive, forceLoad) {
    const beanInstance = this[SymbolBeanContainerInstances][key2];
    if (beanInstance === void 0) {
      if (forceLoad !== false) {
        this._getBean(key2, markReactive);
      }
      return void 0;
    }
    if (beanInstance && beanInstance[SymbolInited] && !beanInstance[SymbolInited].state) {
      return void 0;
    }
    return beanInstance;
  }
  _getBeanSyncOnly(key2) {
    return this[SymbolBeanContainerInstances][key2];
  }
  // async _getBean<T>(beanFullName: string, markReactive?: boolean, ...args): Promise<T>;
  async _getBean(beanFullName, markReactive, ...args) {
    return await this._getBeanSelectorInner(true, null, void 0, beanFullName, markReactive, false, ...args);
  }
  // async _getBeanSelector<T>(beanFullName: string, markReactive?: boolean, selector?: string): Promise<T>;
  async _getBeanSelector(beanFullName, markReactive, selector, ...args) {
    return await this._getBeanSelectorInner(true, null, void 0, beanFullName, markReactive, true, selector, ...args);
  }
  _getBeanSelectorInnerSync(beanComposable, beanFullName, selector) {
    const fullName = this._getBeanFullNameByComposableOrClassSync(beanComposable, beanFullName);
    if (!fullName) {
      return null;
    }
    const key2 = __getSelectorKey(fullName, true, selector);
    return this[SymbolBeanContainerInstances][key2];
  }
  async _getBeanSelectorInner(newBeanForce, recordProp, beanComposable, beanFullName, markReactive, withSelector, ...args) {
    const fullName = await this._getBeanFullNameByComposableOrClass(beanComposable, beanFullName);
    if (!fullName) {
      return null;
    }
    const key2 = __getSelectorKey(fullName, withSelector, args[0]);
    if (this[SymbolBeanContainerInstances][key2] === void 0 && newBeanForce) {
      if (!this[SymbolGetBeanSelectorInnerPromises][key2]) {
        this[SymbolGetBeanSelectorInnerPromises][key2] = this._getBeanSelectorInnerPromise(recordProp, beanComposable, fullName, markReactive, withSelector, ...args);
      }
      await this[SymbolGetBeanSelectorInnerPromises][key2];
    }
    if (this[SymbolBeanContainerInstances][key2] && this[SymbolGetBeanSelectorInnerPromises][key2]) {
      await this[SymbolGetBeanSelectorInnerPromises][key2];
      this[SymbolGetBeanSelectorInnerPromises][key2] = void 0;
    }
    return this[SymbolBeanContainerInstances][key2];
  }
  async _getBeanSelectorInnerPromise(recordProp, beanComposable, fullName, markReactive, withSelector, ...args) {
    return await this._newBeanInner(true, recordProp, null, beanComposable, fullName, markReactive, withSelector, ...args);
  }
  _newBeanSimple(A, markReactive, ...args) {
    const beanInstance = this._prepareBeanInstanceSimple(void 0, A, A, args, markReactive);
    if (!(beanInstance instanceof BeanAopBase) && beanInstance.__init__) {
      beanInstance.__init__(...args);
    }
    return beanInstance;
  }
  // async _newBean<T>(beanFullName: string, markReactive?: boolean, ...args): Promise<T>;
  async _newBean(beanFullName, markReactive, ...args) {
    return await this._newBeanInner(false, null, null, void 0, beanFullName, markReactive, false, ...args);
  }
  // async _newBeanSelector<T>(beanFullName: string, markReactive?: boolean, selector?: string, ...args): Promise<T>;
  async _newBeanSelector(beanFullName, markReactive, selector, ...args) {
    return await this._newBean(beanFullName, markReactive, selector, ...args);
  }
  /** @internal */
  async _newBeanInner(record, recordProp, controllerData, beanComposable, beanFullName, markReactive, withSelector, ...args) {
    if (beanComposable) {
      return await this._createBeanInstance(record, recordProp, controllerData, beanComposable, void 0, void 0, args, false, markReactive, withSelector);
    }
    const beanOptions = await this._getBeanOptionsForce(beanFullName);
    if (!beanOptions) {
      if (typeof beanFullName === "function" && isClass(beanFullName)) {
        return await this._createBeanInstance(record, recordProp, controllerData, void 0, void 0, beanFullName, args, false, markReactive, withSelector);
      }
      return null;
    }
    return await this._createBeanInstance(
      record,
      recordProp,
      controllerData,
      void 0,
      beanOptions.beanFullName,
      beanOptions.beanClass,
      args,
      cast(beanOptions.scene) === "aop",
      // default is true: same as inject prop
      markReactive ?? beanOptions.markReactive ?? true,
      withSelector
    );
  }
  _getBeanFullNameByComposableOrClassSync(beanComposable, beanFullName) {
    if (beanComposable) {
      return appResource.getBeanFullNameOfComposable(beanComposable);
    }
    const beanOptions = this._getBeanOptionsForceSync(beanFullName);
    if (!beanOptions) {
      return void 0;
    }
    return beanOptions.beanFullName;
  }
  async _getBeanFullNameByComposableOrClass(beanComposable, beanFullName) {
    if (beanComposable) {
      return appResource.getBeanFullNameOfComposable(beanComposable);
    }
    if (!beanFullName) {
      return void 0;
    }
    const beanOptions = await this._getBeanOptionsForce(beanFullName);
    if (!beanOptions) {
      return void 0;
    }
    return beanOptions.beanFullName;
  }
  _getBeanOptionsForceSync(beanFullName) {
    return appResource.getBean(beanFullName);
  }
  async _getBeanOptionsForce(beanFullName) {
    if (typeof beanFullName === "function" && isClass(beanFullName)) {
      return appResource.getBean(beanFullName);
    }
    const parts = beanFullName.split(".");
    await this._useModule(parts[0]);
    return appResource.getBean(beanFullName);
  }
  async _createBeanInstance(record, recordProp, controllerData, beanComposable, beanFullName, beanClass, args, aop, markReactive, withSelector) {
    const beanInstance = await this._prepareBeanInstance(beanComposable, beanFullName, beanClass, args, markReactive, aop);
    if (controllerData) {
      beanInstance.__initControllerData(controllerData);
    }
    if (record) {
      const fullName = await this._getBeanFullNameByComposableOrClass(beanComposable, beanFullName);
      if (fullName) {
        const key2 = __getSelectorKey(fullName, withSelector, args[0]);
        __setPropertyValue(beanInstance, SymbolBeanInstanceKey, key2, false);
        this[SymbolBeanContainerInstances][key2] = beanInstance;
      }
      if (recordProp) {
        this.__recordProp(recordProp, fullName, beanInstance, true);
      }
    }
    if (!beanComposable) {
      await this._initBeanInstance(beanFullName, beanInstance, args);
    }
    return beanInstance;
  }
  async _prepareBeanInstance(beanComposable, beanFullName, beanClass, args, markReactive, aop) {
    let beanInstance = this._prepareBeanInstanceCommon(beanComposable, beanFullName, beanClass, args, markReactive);
    const beanInstanceProxy = await this._patchBeanInstance(beanFullName || beanClass, beanInstance, aop);
    if (beanInstanceProxy) {
      if (markReactive) {
        beanInstance = reactive(beanInstanceProxy);
      } else {
        beanInstance = markRaw(beanInstanceProxy);
      }
    }
    return beanInstance;
  }
  _prepareBeanInstanceSimple(beanComposable, beanFullName, beanClass, args, markReactive) {
    let beanInstance = this._prepareBeanInstanceCommon(beanComposable, beanFullName, beanClass, args, markReactive);
    const beanInstanceProxy = this._patchBeanInstanceSimple(beanFullName || beanClass, beanInstance);
    if (beanInstanceProxy) {
      if (markReactive) {
        beanInstance = reactive(beanInstanceProxy);
      } else {
        beanInstance = markRaw(beanInstanceProxy);
      }
    }
    return beanInstance;
  }
  _prepareBeanInstanceCommon(beanComposable, beanFullName, BeanClass, args, markReactive) {
    let beanInstance;
    if (beanComposable) {
      beanInstance = this._createBeanComposableInstance(beanComposable, args);
    } else {
      beanInstance = new BeanClass(...args);
    }
    if (beanInstance instanceof BeanSimple) {
      beanInstance.sys = this.sys;
      Object.defineProperty(beanInstance, "app", {
        enumerable: false,
        configurable: true,
        get: () => {
          return this.ctx?.app;
        }
      });
      beanInstance.ctx = this.ctx;
    }
    if (typeof beanFullName === "string") {
      __setPropertyValue(beanInstance, SymbolBeanFullName, beanFullName, false);
    }
    if (markReactive) {
      beanInstance = reactive(beanInstance);
    } else {
      beanInstance = markRaw(beanInstance);
    }
    return beanInstance;
  }
  _createBeanComposableInstance(beanComposable, args) {
    return this.runWithInstanceScopeOrAppContext(() => {
      return beanComposable(...args);
    });
  }
  async _initBeanInstance(beanFullName, beanInstance, args) {
    this.runWithInstanceScopeOrAppContext(() => {
      this._injectVueElements(beanInstance, beanFullName);
    });
    await this._injectBeanInstance(beanInstance, beanFullName);
    if (this.containerType === "sys") {
      await this.sys.meta.module._monkeyModule(true, "beanInit", void 0, this, beanInstance);
    } else {
      await this.app?.meta.module._monkeyModule(true, "beanInit", void 0, this, beanInstance);
    }
    if (!(beanInstance instanceof BeanAopBase) && beanInstance.__init__) {
      await this.runWithInstanceScopeOrAppContext(async () => {
        await beanInstance.__init__(...args);
      });
    }
    if (this.containerType === "sys") {
      await this.sys.meta.module._monkeyModule(true, "beanInited", void 0, this, beanInstance);
    } else {
      await this.app?.meta.module._monkeyModule(true, "beanInited", void 0, this, beanInstance);
    }
    if (beanInstance[SymbolInited]) {
      beanInstance[SymbolInited].touch();
    }
    return beanInstance;
  }
  _injectVueElements(beanInstance, beanFullName) {
    const beanOptions = appResource.getBean(beanFullName);
    if (!beanOptions) return;
    const vues = appMetadata.getMetadata(SymbolDecoratorVueElements, beanOptions.beanClass.prototype);
    if (!vues) return;
    for (const prop in vues) {
      const vueElements = vues[prop];
      for (let index = 0; index < vueElements.length; index++) {
        this._injectVueElement(beanInstance, beanFullName, prop, vueElements[index], index);
      }
    }
  }
  _injectVueElement(beanInstance, beanFullName, prop, vueElement, index) {
    const decoratorHandler = vueDecorators[vueElement.type];
    if (decoratorHandler) {
      decoratorHandler.call(this, beanInstance, beanFullName, prop, vueElement, index);
    }
  }
  async _injectBeanInstance(beanInstance, beanFullName) {
    const beanOptions = appResource.getBean(beanFullName);
    if (!beanOptions) return;
    const uses = appResource.getUses(beanOptions.beanClass.prototype);
    if (!uses) return;
    for (const key2 in uses) {
      const useOptions = uses[key2];
      const targetBeanComposable = useOptions.beanComposable;
      let targetBeanFullName = useOptions.beanFullName;
      if (!targetBeanFullName && useOptions.beanClass) {
        targetBeanFullName = appResource.getBeanFullName(useOptions.beanClass);
      }
      if (useOptions.injectionScope && ["host", "skipSelf"].includes(useOptions.injectionScope)) {
        const selectorInfo = __prepareInjectSelectorInfo(beanInstance, useOptions);
        const useOptions2 = selectorInfo.withSelector ? Object.assign({}, useOptions, {
          selector: selectorInfo.args[0]
        }) : useOptions;
        const targetBeanInstance2 = useComputed(() => {
          return this._getBeanFromHostInner(false, useOptions.prop, targetBeanComposable, targetBeanFullName, useOptions2);
        });
        __setPropertyValue(beanInstance, key2, targetBeanInstance2, true);
        continue;
      }
      const targetBeanInstance = await this._injectBeanInstanceProp(beanInstance, targetBeanComposable, targetBeanFullName, useOptions);
      __setPropertyValue(beanInstance, key2, targetBeanInstance, true);
    }
  }
  async _injectBeanInstanceProp(beanInstance, targetBeanComposable, targetBeanFullName, useOptions) {
    if (useOptions.name) {
      return this[SymbolBeanContainerInstances][useOptions.name];
    }
    if (!targetBeanComposable && !targetBeanFullName) {
      return this[SymbolBeanContainerInstances][useOptions.prop];
    }
    let targetOptions;
    if (targetBeanComposable) {
      targetOptions = {
        containerScope: void 0,
        markReactive: void 0
      };
    } else if (targetBeanFullName) {
      targetOptions = await this._getBeanOptionsForce(targetBeanFullName);
      if (!targetOptions) {
        throw new Error(`not found bean class: ${targetBeanFullName}`);
      }
    }
    const injectionScope = useOptions.injectionScope ?? targetOptions.containerScope ?? "ctx";
    const markReactive = useOptions.markReactive ?? targetOptions.markReactive ?? true;
    const selectorInfo = __prepareInjectSelectorInfo(beanInstance, useOptions);
    const recordProp = useOptions.prop;
    let targetInstance;
    if (injectionScope === "sys") {
      targetInstance = await this.sys.bean._getBeanSelectorInner(true, null, targetBeanComposable, targetBeanFullName, markReactive, selectorInfo.withSelector, ...selectorInfo.args);
      await this._injectBeanInstanceProp_appBean(recordProp, targetBeanComposable, targetBeanFullName, targetInstance);
    } else if (injectionScope === "app") {
      targetInstance = await this.app.bean._getBeanSelectorInner(true, null, targetBeanComposable, targetBeanFullName, markReactive, selectorInfo.withSelector, ...selectorInfo.args);
      await this._injectBeanInstanceProp_appBean(recordProp, targetBeanComposable, targetBeanFullName, targetInstance);
    } else if (injectionScope === "ctx") {
      targetInstance = await this._getBeanSelectorInner(true, recordProp, targetBeanComposable, targetBeanFullName, markReactive, selectorInfo.withSelector, ...selectorInfo.args);
    } else if (injectionScope === "new") {
      targetInstance = await this._newBeanInner(false, null, null, targetBeanComposable, targetBeanFullName, markReactive, selectorInfo.withSelector, ...selectorInfo.args);
    }
    return targetInstance;
  }
  _getBeanFromHost(beanFullName, useOptions) {
    if (typeof beanFullName !== "string") {
      useOptions = beanFullName;
      beanFullName = void 0;
    }
    if (!useOptions) {
      useOptions = {};
    }
    return this._getBeanFromHostInner(false, void 0, void 0, beanFullName, useOptions);
  }
  _getBeanFromHostInner(record, recordProp, targetBeanComposable, targetBeanFullName, useOptions) {
    let beanContainerParent;
    if (!useOptions.injectionScope || useOptions.injectionScope === "host") {
      beanContainerParent = this;
    } else if (useOptions.injectionScope === "skipSelf") {
      beanContainerParent = this.parent;
    }
    while (true) {
      if (!beanContainerParent) return null;
      const beanInstance = this._getBeanFromHostInner2(recordProp, beanContainerParent, targetBeanComposable, targetBeanFullName, useOptions);
      if (beanInstance !== void 0) {
        if (record) {
          this.__recordProp(recordProp, void 0, beanInstance, false);
        }
        return beanInstance;
      }
      beanContainerParent = beanContainerParent.parent;
    }
  }
  _getBeanFromHostInner2(recordProp, beanContainerParent, targetBeanComposable, targetBeanFullName, useOptions) {
    if (useOptions.name) {
      return beanContainerParent[SymbolBeanContainerInstances][useOptions.name];
    }
    if (!targetBeanComposable && !targetBeanFullName) {
      return beanContainerParent[SymbolBeanContainerInstances][recordProp];
    }
    return beanContainerParent._getBeanSelectorInnerSync(targetBeanComposable, targetBeanFullName, useOptions.selector);
  }
  async _injectBeanInstanceProp_appBean(recordProp, targetBeanComposable, _targetBeanFullName, targetInstance) {
    if (targetInstance === void 0) return;
    if (!this.ctx) return;
    this.__recordProp(recordProp, void 0, targetInstance, false);
    if (!targetBeanComposable && targetInstance) {
      await targetInstance[SymbolInited].wait();
    }
  }
  async _patchBeanInstance(beanFullNameOrBeanClass, beanInstance, aop) {
    if (!beanFullNameOrBeanClass) return void 0;
    if (aop) return void 0;
    const _aopChains = await this._prepareAopChains(beanFullNameOrBeanClass, beanInstance);
    if (_aopChains.length === 0) return void 0;
    return this._newBeanProxy(beanFullNameOrBeanClass, beanInstance);
  }
  _patchBeanInstanceSimple(beanFullNameOrBeanClass, beanInstance) {
    if (!beanFullNameOrBeanClass) return void 0;
    const _aopChains = this._prepareAopChainsSimple(beanFullNameOrBeanClass, beanInstance);
    if (_aopChains.length === 0) return void 0;
    return this._newBeanProxy(beanFullNameOrBeanClass, beanInstance);
  }
  _newBeanProxy(beanFullName, beanInstance) {
    const self2 = this;
    const proxy = new Proxy(beanInstance, {
      get(target, prop, receiver) {
        if (typeof prop === "symbol") {
          return Reflect.get(target, prop, receiver);
        }
        if (__isInnerMethod(prop)) {
          if (prop === "__v_isShallow" && target.__v_isShallow_patch) {
            return Reflect.get(target, "__v_isShallow_patch", receiver);
          }
          return Reflect.get(target, prop, receiver);
        }
        const descriptorInfo = __getPropertyDescriptor(target, prop);
        if (!__checkAopOfDescriptorInfo(descriptorInfo)) return Reflect.get(target, prop, receiver);
        const methodType = __methodTypeOfDescriptor(descriptorInfo);
        if (!methodType) {
          if (__isLifeCycleMethod(prop)) return Reflect.get(target, prop, receiver);
          const methodName = `__get_${prop}__`;
          const methodNameMagic = "__get__";
          const _aopChainsProp = self2._getAopChainsProp(beanFullName, methodName, methodNameMagic, "get", prop);
          if (!_aopChainsProp) return Reflect.get(target, prop, receiver);
          return _aopChainsProp([receiver, void 0], ([receiver2, _]) => {
            if (!descriptorInfo && target.__get__) {
              return Reflect.apply(target.__get__, receiver2, [prop, target]);
            } else {
              return Reflect.get(target, prop, receiver2);
            }
          });
        }
        return self2._getInstanceMethodProxy(beanFullName, target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        if (typeof prop === "symbol") {
          Reflect.set(target, prop, value, receiver);
          return true;
        }
        if (__isInnerMethod(prop)) {
          Reflect.set(target, prop, value, receiver);
          return true;
        }
        const descriptorInfo = __getPropertyDescriptor(target, prop);
        if (!__checkAopOfDescriptorInfo(descriptorInfo)) {
          Reflect.set(target, prop, value, receiver);
          return true;
        }
        const methodName = `__set_${prop}__`;
        const methodNameMagic = "__set__";
        const _aopChainsProp = self2._getAopChainsProp(beanFullName, methodName, methodNameMagic, "set", prop);
        if (!_aopChainsProp) {
          Reflect.set(target, prop, value, receiver);
          return true;
        }
        return _aopChainsProp([receiver, value], ([receiver2, value2]) => {
          if (!descriptorInfo && target.__set__) {
            const res = Reflect.apply(target.__set__, receiver2, [prop, value2, target]);
            if (res === void 0) throw new Error("__set__ must return true/false");
            if (!res) {
              Reflect.set(target, prop, value2, receiver2);
            }
          } else {
            Reflect.set(target, prop, value2, receiver2);
          }
          return true;
        });
      }
    });
    return proxy;
  }
  _getInstanceMethodProxy(beanFullName, target, prop, receiver) {
    if (__isInnerMethod(prop)) {
      return Reflect.get(target, prop, receiver);
    }
    const methodNameMagic = "__method__";
    const _aopChainsProp = this._getAopChainsProp(beanFullName, prop, methodNameMagic, "method", prop);
    if (!_aopChainsProp) return Reflect.get(target, prop, receiver);
    const methodProxyKey = `__aopproxy_method_${prop}__`;
    if (target[methodProxyKey]) return target[methodProxyKey];
    const methodProxy = new Proxy(target[prop], {
      apply(target2, thisArg, args) {
        return _aopChainsProp([thisArg, args], ([thisArg2, args2]) => {
          return Reflect.apply(target2, thisArg2, args2);
        });
      }
    });
    __setPropertyValue(target, methodProxyKey, methodProxy, false);
    return methodProxy;
  }
  async _prepareAopChains(beanFullNameOrBeanClass, beanInstance) {
    if (!beanFullNameOrBeanClass) return [];
    const beanOptions = appResource.getBean(beanFullNameOrBeanClass);
    const cacheKey = beanOptions?.beanFullName || beanFullNameOrBeanClass;
    const proxyDisable = beanOptions?.beanClass ? appMetadata.getMetadata(SymbolDecoratorProxyDisable, beanOptions?.beanClass) : false;
    const host = this._aopCacheHost();
    if (!host[SymbolCacheAopChains]) host[SymbolCacheAopChains] = {};
    if (host[SymbolCacheAopChains][cacheKey]) return host[SymbolCacheAopChains][cacheKey];
    let chains = [];
    if (!proxyDisable && beanOptions && cast(beanOptions.scene) !== "aop") {
      const beanAop = await this.sys.bean._getBean("a-bean.service.aop", false);
      const aops = await beanAop.findAopsMatched(beanOptions.beanFullName);
      if (aops) {
        const aopInstances = [];
        for (const aop of aops) {
          aopInstances.push(await this.sys.bean._getBean(aop.beanFullName, true));
        }
        chains = chains.concat(aopInstances);
      }
    }
    if (!proxyDisable && beanOptions) {
      const beanAop = await this.sys.bean._getBean("a-bean.service.aop", false);
      const aopMethods = await beanAop.findAopMethodsMatched(beanOptions?.beanFullName);
      if (aopMethods) {
        chains.push([SymbolProxyAopMethod, aopMethods]);
      }
    }
    if (__hasMagicMethod(beanInstance)) {
      chains.push(SymbolProxyMagic);
    }
    host[SymbolCacheAopChains][cacheKey] = chains;
    return chains;
  }
  _prepareAopChainsSimple(beanFullNameOrBeanClass, beanInstance) {
    if (!beanFullNameOrBeanClass) return [];
    const beanOptions = appResource.getBean(beanFullNameOrBeanClass);
    const cacheKey = beanOptions?.beanFullName || beanFullNameOrBeanClass;
    const host = this._aopCacheHost();
    if (!host[SymbolCacheAopChains]) host[SymbolCacheAopChains] = {};
    if (host[SymbolCacheAopChains][cacheKey]) return host[SymbolCacheAopChains][cacheKey];
    const chains = [];
    if (__hasMagicMethod(beanInstance)) {
      chains.push(SymbolProxyMagic);
    }
    host[SymbolCacheAopChains][cacheKey] = chains;
    return chains;
  }
  _getAopChains(beanFullName) {
    const beanOptions = appResource.getBean(beanFullName);
    const cacheKey = beanOptions?.beanFullName || beanFullName;
    const host = this._aopCacheHost();
    return host[SymbolCacheAopChains]?.[cacheKey] || [];
  }
  _aopCacheHost() {
    return this.sys;
  }
  _getAopChainsProp(beanFullName, methodName, methodNameMagic, methodType, prop) {
    const chainsKey = `__aopChains_${methodName}__`;
    const beanOptions = appResource.getBean(beanFullName);
    const cacheKey = beanOptions?.beanFullName || beanFullName;
    const host = this._aopCacheHost();
    if (!host[SymbolCacheAopChainsKey]) host[SymbolCacheAopChainsKey] = {};
    if (!host[SymbolCacheAopChainsKey][cacheKey]) host[SymbolCacheAopChainsKey][cacheKey] = {};
    if (host[SymbolCacheAopChainsKey][cacheKey][chainsKey] !== void 0) return host[SymbolCacheAopChainsKey][cacheKey][chainsKey];
    const _aopChains = this._getAopChains(beanFullName);
    const chains = [];
    for (const aopKey of _aopChains) {
      if (aopKey === SymbolProxyMagic) {
        if (!__isLifeCycleMethod(methodName)) {
          chains.push([aopKey, methodName]);
        }
      } else if (Array.isArray(aopKey) && aopKey[0] === SymbolProxyAopMethod) {
        this._getAopChainsProp_aopMethods(chains, aopKey, aopKey[1], methodType, prop);
      } else {
        const aop = aopKey;
        if (aop[methodName]) {
          let fn;
          if (methodType === "get") {
            fn = function([receiver, _], next) {
              return aop[methodName](_patchAopNext([receiver, _], next), receiver);
            };
          } else if (methodType === "set") {
            fn = function([receiver, value], next) {
              return aop[methodName](value, _patchAopNext([receiver, value], next), receiver);
            };
          } else if (methodType === "method") {
            fn = function([receiver, args], next) {
              return aop[methodName](args, _patchAopNext([receiver, args], next), receiver);
            };
          }
          chains.push([aopKey, fn]);
        }
        if (methodNameMagic && aop[methodNameMagic]) {
          if (!__isLifeCycleMethod(methodName)) {
            let fn;
            if (methodType === "get") {
              fn = function([receiver, _], next) {
                return aop[methodNameMagic](prop, _patchAopNext([receiver, _], next), receiver);
              };
            } else if (methodType === "set") {
              fn = function([receiver, value], next) {
                return aop[methodNameMagic](prop, value, _patchAopNext([receiver, value], next), receiver);
              };
            } else if (methodType === "method") {
              fn = function([receiver, args], next) {
                return aop[methodNameMagic](prop, args, _patchAopNext([receiver, args], next), receiver);
              };
            }
            chains.push([aopKey, fn]);
          }
        }
      }
    }
    let result;
    if (chains.length === 0) {
      result = null;
    } else {
      result = __composeForProp(chains);
    }
    host[SymbolCacheAopChainsKey][cacheKey][chainsKey] = result;
    return result;
  }
  _getAopChainsProp_aopMethods(chains, aopKey, aopMethodsAll, methodType, prop) {
    const aopMethods = aopMethodsAll[prop];
    if (!aopMethods) return;
    for (const aopMethod of aopMethods) {
      let fn;
      if (methodType === "get") {
        fn = function([receiver, _], next) {
          if (!aopMethod.beanInstance.get) throw new Error(`get property accessor not exists: ${aopMethod.onionName}`);
          return aopMethod.beanInstance.get(aopMethod.options, _patchAopNext([receiver, _], next), receiver, prop);
        };
      } else if (methodType === "set") {
        fn = function([receiver, value], next) {
          if (!aopMethod.beanInstance.set) throw new Error(`set property accessor not exists: ${aopMethod.onionName}`);
          return aopMethod.beanInstance.set(aopMethod.options, value, _patchAopNext([receiver, value], next), receiver, prop);
        };
      } else if (methodType === "method") {
        fn = function([receiver, args], next) {
          if (!aopMethod.beanInstance.execute) throw new Error(`execute method not exists: ${aopMethod.onionName}`);
          return aopMethod.beanInstance.execute(aopMethod.options, args, _patchAopNext([receiver, args], next), receiver, prop);
        };
      }
      chains.push([aopKey, fn]);
    }
  }
  __recordProp(recordProp, fullName, beanInstance, throwError) {
    if (this[SymbolBeanContainerInstances][recordProp] !== void 0 && throwError) {
      throw new Error(`prop exsits: ${recordProp.toString()}, ${fullName}`);
    }
    if (this[SymbolBeanContainerInstances][recordProp] === void 0) {
      this[SymbolBeanContainerInstances][recordProp] = beanInstance;
    }
  }
  async _useModule(moduleName) {
    if (this.containerType === "sys") {
      await this.sys.meta.module.use(moduleName);
    } else {
      await this.app.meta.module.use(moduleName);
    }
  }
}
function __composeForPropAdapter(_context, chain) {
  const [aopKey, fn] = chain;
  if (aopKey === SymbolProxyMagic) return;
  return {
    receiver: void 0,
    fn
  };
}
function __composeForProp(chains) {
  return compose(chains, __composeForPropAdapter);
}
function _patchAopNext([receiver, context], next) {
  return (...args) => {
    context = args.length === 0 ? context : args[0];
    return next([receiver, context]);
  };
}
function __checkAopOfDescriptorInfo(descriptorInfo) {
  if (!descriptorInfo) return true;
  return !descriptorInfo.dynamic && !descriptorInfo.ofBeanBase;
}
function __getPropertyDescriptor(obj, prop) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
  if (descriptor) return {
    descriptor,
    dynamic: true
  };
  return __getPropertyDescriptorStatic(obj, prop);
}
function __getPropertyDescriptorStatic(obj, prop) {
  let proto = Object.getPrototypeOf(obj);
  let ofBeanBase = false;
  while (proto) {
    if (proto.constructor.name === BeanBase.name) {
      ofBeanBase = true;
    }
    const descriptor = Object.getOwnPropertyDescriptor(proto, prop);
    if (descriptor) return {
      descriptor,
      dynamic: false,
      ofBeanBase
    };
    proto = Object.getPrototypeOf(proto);
  }
  return null;
}
function __setPropertyValue(obj, prop, value, patch) {
  if (value && typeof value === "object" && patch) {
    value.__v_isShallow_patch = true;
  }
  Object.defineProperty(obj, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return value;
    }
  });
  if (value && typeof value === "object" && patch) {
    delete value.__v_isShallow_patch;
  }
}
function __hasMagicMethod(instance) {
  return !!instance.__get__ || !!instance.__set__;
}
function __isInnerMethod(prop) {
  return [
    "__get__",
    "__set__",
    // '__init__',
    // '__dispose__',
    "then",
    "__v_skip",
    "__v_isReactive",
    "__v_isReadonly",
    "__v_isShallow",
    "__v_raw",
    "__v_isRef",
    "__v_isVNode",
    "__v_cache",
    "__v_isShallow_patch"
  ].includes(prop);
}
function __isLifeCycleMethod(prop) {
  return ["__init__", "__dispose__"].includes(prop);
}
function __methodTypeOfDescriptor(descriptorInfo) {
  if (!descriptorInfo) return null;
  const {
    descriptor,
    dynamic
  } = descriptorInfo;
  if (dynamic) return null;
  if (descriptor.get) return null;
  const methodType = descriptor.value?.constructor?.name;
  if (["Function", "AsyncFunction"].includes(methodType)) {
    return methodType;
  }
  return null;
}
function __getSelectorKey(beanFullName, withSelector, selector) {
  if (!withSelector) return beanFullName;
  const isSelectorValid = !isNilOrEmptyString(selector);
  return !isSelectorValid ? beanFullName : `${beanFullName}#${selector}`;
}
class BeanControllerBase extends BeanBase {
  constructor(...args) {
    super(...args);
    this.$props = void 0;
    this.$slots = void 0;
  }
  /** @internal */
  __initControllerData(controllerData) {
    if (this.ctx.disposed) return;
    this.$slots = controllerData.context.slots;
    this.__initControllerProps(this.ctx.instance.vnode.props);
    this.app.meta.module._monkeyModuleSync(true, "controllerDataInit", void 0, controllerData, this);
  }
  /** @internal */
  __updateControllerData() {
    if (this.ctx.disposed) return;
    this.__initControllerProps(this.ctx.instance.vnode.props);
    this.app.meta.module._monkeyModuleSync(true, "controllerDataUpdate", void 0, this);
  }
  $useModel(name, options) {
    if (typeof name === "object") {
      options = name;
      name = "modelValue";
    }
    if (!name) name = "modelValue";
    return useModel.call(this, this.$props, name, options);
  }
  get $slotDefault() {
    return cast(this.$props).slotDefault ?? this.$slots.default;
  }
  __initControllerProps(propsInput) {
    const propsDefault = Object.getPrototypeOf(this).constructor.$propsDefault;
    let props = Object.assign({}, propsInput);
    for (const key2 in props) {
      if (props[key2] === void 0) {
        delete props[key2];
      }
    }
    props = Object.assign({}, propsDefault, props);
    if (!this.$props) {
      this.$props = shallowReactive(props);
    } else {
      Object.assign(this.$props, props);
      for (const key2 in this.$props) {
        if (!props || !Object.hasOwnProperty.call(props, key2)) {
          delete this.$props[key2];
        }
      }
    }
  }
}
const BeanControllerIdentifier = "$$c";
const BeanRenderIdentifier = "$$r";
const BeanStyleIdentifier = "$$s";
const SymbolControllerRefDisable = /* @__PURE__ */ Symbol("SymbolControllerRefDisable");
const SymbolController = /* @__PURE__ */ Symbol("SymbolController");
class BeanControllerLike extends BeanBase {
  get [SymbolController]() {
    return this.bean._getBeanSyncOnly(BeanControllerIdentifier);
  }
  /** @internal */
  __get__(prop) {
    const controller = cast(this[SymbolController]);
    return controller?.[prop];
  }
  /** @internal */
  __set__(prop, value) {
    const controller = cast(this[SymbolController]);
    if (!controller) return false;
    if (prop in controller) {
      controller[prop] = value;
      return true;
    } else {
      return false;
    }
  }
}
class BeanControllerPageBase extends BeanBase {
  constructor(...args) {
    super(...args);
    this.$params = void 0;
    this.$query = void 0;
  }
  /** @internal */
  __initControllerData(controllerData) {
    if (this.app) {
      this.app.meta.module._monkeyModuleSync(true, "controllerDataInit", void 0, controllerData, this);
    }
  }
  /** @internal */
  __updateControllerData() {
    this.app.meta.module._monkeyModuleSync(true, "controllerDataUpdate", void 0, this);
  }
}
const SymbolStyle = /* @__PURE__ */ Symbol("SymbolStyle");
class BeanRenderLike extends BeanControllerLike {
  get [SymbolStyle]() {
    return this.bean._getBeanSyncOnly(BeanStyleIdentifier);
  }
  /** @internal */
  __get__(prop) {
    const value = super.__get__(prop);
    if (value !== void 0) return value;
    const style = cast(this[SymbolStyle]);
    return style?.[prop];
  }
  /** @internal */
  __set__(prop, value) {
    const res = super.__set__(prop, value);
    if (res) return res;
    const style = cast(this[SymbolStyle]);
    if (!style) return false;
    if (prop in style) {
      style[prop] = value;
      return true;
    } else {
      return false;
    }
  }
}
class BeanRenderBase extends BeanRenderLike {
  render() {
  }
}
class BeanStyleBase extends BeanControllerLike {
}
const BeanModuleScope = /* @__PURE__ */ Symbol("BeanScopeScene#ModuleScope");
class BeanScopeUtil extends BeanSimple {
  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = void 0;
    this[BeanModuleScope] = moduleScope;
  }
  test() {
    return this[BeanModuleScope];
  }
}
const BeanModuleError = /* @__PURE__ */ Symbol("BeanScopeBase#BeanModuleError");
const BeanModuleLocale = /* @__PURE__ */ Symbol("BeanScopeBase#BeanModuleLocale");
const BeanModuleConfig = /* @__PURE__ */ Symbol("BeanScopeBase#BeanModuleConfig");
const BeanModuleConstant = /* @__PURE__ */ Symbol("BeanScopeBase#BeanModuleConstant");
const BeanModuleApi = /* @__PURE__ */ Symbol("BeanScopeBase#BeanModuleApi");
const BeanModuleApiSchema = /* @__PURE__ */ Symbol("BeanScopeBase#BeanModuleApiSchema");
const BeanModuleUtil = /* @__PURE__ */ Symbol("BeanScopeBase#BeanModuleUtil");
class BeanScopeBase extends BeanBaseSimple {
  constructor(...args) {
    super(...args);
    this[BeanModuleError] = void 0;
    this[BeanModuleLocale] = void 0;
    this[BeanModuleConfig] = void 0;
    this[BeanModuleConstant] = void 0;
    this[BeanModuleApi] = void 0;
    this[BeanModuleApiSchema] = void 0;
    this[BeanModuleUtil] = void 0;
  }
  get module() {
    return this.app.meta.module.get(this[SymbolModuleBelong]);
  }
  __get__(prop) {
    const moduleBelong = this[SymbolModuleBelong];
    if (prop === "error") {
      if (!this[BeanModuleError]) {
        this[BeanModuleError] = this.bean._newBeanSimple(BeanScopeError, false, moduleBelong);
      }
      return this[BeanModuleError];
    }
    if (prop === "locale") {
      if (!this[BeanModuleLocale]) {
        this[BeanModuleLocale] = this.bean._newBeanSimple(BeanScopeLocale, false, moduleBelong);
      }
      return this[BeanModuleLocale];
    }
    if (prop === "config") {
      if (!this[BeanModuleConfig]) {
        this[BeanModuleConfig] = this.sys.config.modules[moduleBelong];
      }
      return this[BeanModuleConfig];
    }
    if (prop === "constant") {
      if (!this[BeanModuleConstant]) {
        this[BeanModuleConstant] = this.sys.constant.modules[moduleBelong];
      }
      return this[BeanModuleConstant];
    }
    if (prop === "api") {
      if (!this[BeanModuleApi]) {
        this[BeanModuleApi] = {};
      }
      return this[BeanModuleApi];
    }
    if (prop === "apiSchema") {
      if (!this[BeanModuleApiSchema]) {
        this[BeanModuleApiSchema] = {};
      }
      return this[BeanModuleApiSchema];
    }
    if (prop === "util") {
      if (!this[BeanModuleUtil]) {
        this[BeanModuleUtil] = this.bean._newBeanSimple(BeanScopeUtil, false, moduleBelong);
      }
      return this[BeanModuleUtil];
    }
  }
}
const SymbolRenderOriginal = /* @__PURE__ */ Symbol("SymbolRenderOriginal");
const SymbolRenderFreezeCounter = /* @__PURE__ */ Symbol("SymbolRenderFreezeCounter");
const SymbolRenderFreezeSnapshot = /* @__PURE__ */ Symbol("SymbolRenderFreezeSnapshot");
const PluginFreeze = {
  install(app) {
    app.mixin({
      created() {
        const renderMethod = "render";
        const self2 = this;
        const instance = this._;
        self2[SymbolRenderFreezeCounter] = ref$1(0);
        self2[SymbolRenderFreezeSnapshot] = void 0;
        self2[SymbolRenderOriginal] = instance[renderMethod];
        instance[renderMethod] = function(...args) {
          if (self2[SymbolRenderFreezeCounter].value === 0) {
            return self2[SymbolRenderOriginal].call(this, ...args);
          }
          if (!self2[SymbolRenderFreezeSnapshot]) {
            self2[SymbolRenderFreezeSnapshot] = self2[SymbolRenderOriginal].call(this, ...args);
          }
          return self2[SymbolRenderFreezeSnapshot];
        };
      },
      beforeUnmount() {
        const self2 = this;
        if (self2[SymbolRenderFreezeSnapshot]) {
          self2[SymbolRenderFreezeSnapshot] = void 0;
        }
      },
      methods: {
        renderFreeze(freeze) {
          const self2 = this;
          if (freeze) {
            if (self2[SymbolRenderFreezeCounter].value === 0) {
              self2[SymbolRenderFreezeSnapshot] = void 0;
            }
            self2[SymbolRenderFreezeCounter].value++;
          } else {
            self2[SymbolRenderFreezeCounter].value--;
            if (self2[SymbolRenderFreezeCounter].value === 0) {
              self2[SymbolRenderFreezeSnapshot] = void 0;
            }
          }
        },
        async renderFreezeScope(fn) {
          const self2 = this;
          try {
            self2.renderFreeze(true);
            return await fn();
          } finally {
            self2.renderFreeze(false);
          }
        }
      }
    });
  }
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
const ZodTypeKeys = {
  ZodAny: "any",
  ZodArray: "array",
  ZodBigInt: "bigint",
  ZodBoolean: "boolean",
  ZodDefault: "default",
  ZodTransform: "transform",
  ZodEnum: "enum",
  ZodIntersection: "intersection",
  ZodLiteral: "literal",
  ZodNever: "never",
  ZodNull: "null",
  ZodNullable: "nullable",
  ZodNumber: "number",
  ZodNonOptional: "nonoptional",
  ZodObject: "object",
  ZodOptional: "optional",
  ZodPipe: "pipe",
  ZodReadonly: "readonly",
  ZodRecord: "record",
  ZodString: "string",
  ZodTuple: "tuple",
  ZodType: "type",
  ZodUnion: "union",
  ZodDiscriminatedUnion: "union",
  ZodUnknown: "unknown",
  ZodVoid: "void",
  ZodDate: "date"
};
function isZodType(schema, typeNames) {
  const typeNamesArray = Array.isArray(typeNames) ? typeNames : [typeNames];
  return typeNamesArray.some((typeName) => {
    var _a2;
    const typeNameMatch = ((_a2 = schema === null || schema === void 0 ? void 0 : schema.def) === null || _a2 === void 0 ? void 0 : _a2.type) === ZodTypeKeys[typeName];
    if (typeName === "ZodDiscriminatedUnion") {
      return typeNameMatch && "discriminator" in schema.def;
    }
    return typeNameMatch;
  });
}
function isAnyZodType(schema) {
  return "def" in schema;
}
class $ZodRegistry {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap();
    this._idmap = /* @__PURE__ */ new Map();
  }
  add(schema, ..._meta2) {
    const meta = _meta2[0];
    this._map.set(schema, meta);
    if (meta && typeof meta === "object" && "id" in meta) {
      if (this._idmap.has(meta.id)) {
        throw new Error(`ID ${meta.id} already exists in the registry`);
      }
      this._idmap.set(meta.id, schema);
    }
    return this;
  }
  clear() {
    this._map = /* @__PURE__ */ new WeakMap();
    this._idmap = /* @__PURE__ */ new Map();
    return this;
  }
  remove(schema) {
    const meta = this._map.get(schema);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.delete(meta.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : void 0;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
}
function registry() {
  return new $ZodRegistry();
}
function isUndefined(value) {
  return value === void 0;
}
function omit$1(object, keys) {
  const result = {};
  Object.entries(object).forEach(([key2, value]) => {
    if (!keys.some((keyToOmit) => keyToOmit === key2)) {
      result[key2] = value;
    }
  });
  return result;
}
function omitBy(object, predicate) {
  const result = {};
  Object.entries(object).forEach(([key2, value]) => {
    if (!predicate(value, key2)) {
      result[key2] = value;
    }
  });
  return result;
}
const zodToOpenAPIRegistry = registry();
class Metadata {
  static collectMetadata(schema, metadata) {
    const currentMetadata = this.getMetadataFromRegistry(schema);
    const _internal = Object.assign(Object.assign({}, currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata._internal), metadata === null || metadata === void 0 ? void 0 : metadata._internal);
    const param = Object.assign(Object.assign({}, currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.param), metadata === null || metadata === void 0 ? void 0 : metadata.param);
    const totalMetadata = Object.assign(Object.assign(Object.assign(Object.assign({}, Object.keys(_internal).length > 0 ? { _internal } : {}), currentMetadata), metadata), Object.keys(param).length > 0 ? { param } : {});
    if (isZodType(schema, [
      "ZodOptional",
      "ZodNullable",
      "ZodDefault",
      "ZodReadonly",
      "ZodNonOptional"
    ]) && isAnyZodType(schema._zod.def.innerType)) {
      return this.collectMetadata(schema._zod.def.innerType, totalMetadata);
    }
    if (isZodType(schema, "ZodPipe")) {
      const inSchema = schema._zod.def.in;
      const outSchema = schema._zod.def.out;
      if (isZodType(inSchema, "ZodTransform") && isAnyZodType(outSchema)) {
        return this.collectMetadata(outSchema, totalMetadata);
      }
      if (isAnyZodType(inSchema)) {
        return this.collectMetadata(inSchema, totalMetadata);
      }
    }
    return totalMetadata;
  }
  /**
   * @deprecated Use one of `getOpenApiMetadata` or `getInternalMetadata` instead
   */
  static getMetadata(zodSchema) {
    return this.collectMetadata(zodSchema);
  }
  static getOpenApiMetadata(zodSchema) {
    const metadata = this.collectMetadata(zodSchema);
    const _a2 = metadata !== null && metadata !== void 0 ? metadata : {}, rest = __rest(_a2, ["_internal"]);
    return rest;
  }
  static getInternalMetadata(zodSchema) {
    var _a2;
    return (_a2 = this.collectMetadata(zodSchema)) === null || _a2 === void 0 ? void 0 : _a2._internal;
  }
  static getParamMetadata(zodSchema) {
    const metadata = this.collectMetadata(zodSchema);
    return Object.assign(Object.assign({}, metadata), {
      // A description provided from .openapi() should be taken with higher precedence
      param: Object.assign(Object.assign({}, (metadata === null || metadata === void 0 ? void 0 : metadata.description) ? { description: metadata.description } : {}), metadata === null || metadata === void 0 ? void 0 : metadata.param)
    });
  }
  /**
   * A method that omits all custom keys added to the regular OpenAPI
   * metadata properties
   */
  static buildSchemaMetadata(metadata) {
    return omitBy(omit$1(metadata, ["param", "_internal"]), isUndefined);
  }
  static buildParameterMetadata(metadata) {
    return omitBy(metadata, isUndefined);
  }
  static applySchemaMetadata(initialData, metadata) {
    return omitBy(Object.assign(Object.assign({}, initialData), this.buildSchemaMetadata(metadata)), isUndefined);
  }
  static getRefId(zodSchema) {
    var _a2;
    return (_a2 = this.getInternalMetadata(zodSchema)) === null || _a2 === void 0 ? void 0 : _a2.refId;
  }
  static unwrapChained(schema) {
    return this.unwrapUntil(schema);
  }
  static getDefaultValue(zodSchema) {
    const unwrapped = this.unwrapUntil(zodSchema, "ZodDefault");
    return unwrapped === null || unwrapped === void 0 ? void 0 : unwrapped._zod.def.defaultValue;
  }
  static unwrapUntil(schema, typeName) {
    if (typeName && isZodType(schema, typeName)) {
      return schema;
    }
    if (isZodType(schema, [
      "ZodOptional",
      "ZodNullable",
      "ZodDefault",
      "ZodReadonly",
      "ZodNonOptional"
    ]) && isAnyZodType(schema._zod.def.innerType)) {
      return this.unwrapUntil(schema._zod.def.innerType, typeName);
    }
    if (isZodType(schema, "ZodPipe")) {
      const inSchema = schema._zod.def.in;
      const outSchema = schema._zod.def.out;
      if (isZodType(inSchema, "ZodTransform") && isAnyZodType(outSchema)) {
        return this.unwrapUntil(outSchema, typeName);
      }
      if (isAnyZodType(inSchema)) {
        return this.unwrapUntil(inSchema, typeName);
      }
    }
    return typeName ? void 0 : schema;
  }
  static getMetadataFromInternalRegistry(zodSchema) {
    return zodToOpenAPIRegistry.get(zodSchema);
  }
  static getMetadataFromRegistry(zodSchema) {
    const internal = this.getMetadataFromInternalRegistry(zodSchema);
    const general = zodSchema.meta();
    if (!internal) {
      return general;
    }
    const { _internal } = internal, rest = __rest(internal, ["_internal"]);
    const _a2 = general !== null && general !== void 0 ? general : {}, { id, title } = _a2, restGeneral = __rest(_a2, ["id", "title"]);
    return Object.assign(Object.assign(Object.assign({ _internal: Object.assign(Object.assign({}, id ? { refId: id } : {}), _internal) }, rest), title ? { description: title } : {}), restGeneral);
  }
  static setMetadataInRegistry(zodSchema, metadata) {
    zodToOpenAPIRegistry.add(zodSchema, metadata);
  }
}
class ZodMetadata {
  static unwrapUntil(schema, typeName) {
    return Metadata.unwrapUntil(schema, typeName);
  }
  static unwrapChained(schema) {
    if (!schema) return void 0;
    return Metadata.unwrapChained(schema);
  }
  static getDefaultValue(zodSchema) {
    return Metadata.getDefaultValue(zodSchema);
  }
  static getInternalMetadata(zodSchema) {
    return Metadata.getInternalMetadata(zodSchema);
  }
  static getLazySchema(zodSchema) {
    const innerSchema = this.unwrapChained(zodSchema);
    return zodSchema._zod.def.getter ?? innerSchema._zod.def.getter;
  }
  static resolveLazySchema(zodSchema) {
    const getter = this.getLazySchema(zodSchema);
    if (!getter) return zodSchema;
    const metadata = this.getOpenapiMetadata(zodSchema);
    zodSchema = getter();
    return metadata ? zodSchema.openapi(metadata) : zodSchema;
  }
  static getRefId(zodSchema) {
    return Metadata.getRefId(zodSchema);
  }
  static getFieldSchema(zodSchema, key2) {
    if (!zodSchema) return;
    const parts = key2.split(".");
    for (const part of parts) {
      zodSchema = this._getFieldSchemaInner(zodSchema, part);
      if (!zodSchema) break;
    }
    return zodSchema;
  }
  static _getFieldSchemaInner(zodSchema, key2) {
    if (!zodSchema) return;
    zodSchema = this.unwrapChained(zodSchema);
    let schema;
    if (zodSchema.def.type === "object") {
      schema = zodSchema;
    } else if (zodSchema.def.type === "union") {
      schema = zodSchema.def.options.find((item) => item.def.type === "object");
    } else {
      throw new Error("invalid zod schema");
    }
    return schema.shape[key2];
  }
  static getOpenapiMetadata(zodSchema) {
    return Metadata.getOpenApiMetadata(zodSchema);
  }
  static isZodType(schema, typeNames) {
    return isZodType(schema, typeNames);
  }
}
function zodEnhance(app) {
  setLocaleAdapter((text, iss) => {
    return translateError((text2, ...args) => {
      return app.meta.text(text2, ...args);
    }, text, iss);
  });
}
function zodEnhanceSys() {
  setParseAdapter(ZodMetadata);
}
function zodSetLocaleErrors(app, localeErrors, localeDefault) {
  setLocaleErrors(() => {
    return app.meta.locale.current;
  }, localeErrors, localeDefault);
}
function configDefault(env) {
  const config = {
    meta: {
      flavor: cast(env).META_FLAVOR,
      mode: cast(env).META_MODE,
      appMode: cast(env).META_APP_MODE
    }
  };
  return config;
}
const constantDefault = {
  modules: {}
};
const __adapter = (_context, chain) => {
  const eventHandlerWrapper = chain;
  if (!eventHandlerWrapper.fn) return;
  return {
    receiver: void 0,
    fn: eventHandlerWrapper.fn
  };
};
class AppEvent extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.eventHandlersMap = {};
  }
  /** @internal */
  async initialize() {
  }
  getEventHandlers(eventName) {
    let eventHandlers = this.eventHandlersMap[eventName];
    if (!eventHandlers) {
      eventHandlers = this.eventHandlersMap[eventName] = [];
    }
    return eventHandlers;
  }
  async emit(eventName, data, nextOrDefault) {
    const eventHandlers = this.getEventHandlers(eventName);
    const next = typeof nextOrDefault === "function" ? cast(nextOrDefault) : async () => {
      return nextOrDefault;
    };
    return await compose(eventHandlers.concat(), __adapter)(data, next);
  }
  emitSync(eventName, data, nextOrDefault) {
    const eventHandlers = this.getEventHandlers(eventName);
    const next = typeof nextOrDefault === "function" ? cast(nextOrDefault) : () => {
      return nextOrDefault;
    };
    return compose(eventHandlers.concat(), __adapter)(data, next);
  }
  on(eventName, fn) {
    const eventHandlers = this.getEventHandlers(eventName);
    eventHandlers.push({
      fn
    });
    return () => {
      const index = eventHandlers.findIndex((item) => item.fn === fn);
      if (index > -1) {
        eventHandlers[index].fn = void 0;
        eventHandlers.splice(index, 1);
      }
    };
  }
  once(eventName, fn) {
    const off = this.on(eventName, async (data, next) => {
      const res = await fn(data, next);
      off();
      return res;
    });
    return off;
  }
}
function isValidFormat(fmt) {
  if (typeof fmt.transform !== "function") {
    throw new TypeError(["No transform function found on format. Did you create a format instance?", "const myFormat = format(formatFn);", "const instance = myFormat();"].join("\n"));
  }
  return true;
}
function cascade(formats) {
  if (!formats.every(isValidFormat)) {
    throw new Error("have not valid format");
  }
  return (info) => {
    let obj = info;
    for (let i = 0; i < formats.length; i++) {
      obj = formats[i].transform(obj, formats[i].options);
      if (!obj) {
        return false;
      }
    }
    return obj;
  };
}
const LEVEL = /* @__PURE__ */ Symbol("LEVEL");
const MESSAGE = /* @__PURE__ */ Symbol("MESSAGE");
const SPLAT = /* @__PURE__ */ Symbol("SPLAT");
let NpmConfigSetLevels = /* @__PURE__ */ (function(NpmConfigSetLevels2) {
  NpmConfigSetLevels2[NpmConfigSetLevels2["error"] = 0] = "error";
  NpmConfigSetLevels2[NpmConfigSetLevels2["warn"] = 1] = "warn";
  NpmConfigSetLevels2[NpmConfigSetLevels2["info"] = 2] = "info";
  NpmConfigSetLevels2[NpmConfigSetLevels2["http"] = 3] = "http";
  NpmConfigSetLevels2[NpmConfigSetLevels2["verbose"] = 4] = "verbose";
  NpmConfigSetLevels2[NpmConfigSetLevels2["debug"] = 5] = "debug";
  NpmConfigSetLevels2[NpmConfigSetLevels2["silly"] = 6] = "silly";
  return NpmConfigSetLevels2;
})({});
const codes = {
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39]
};
let allColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "green",
  verbose: "cyan",
  debug: "blue",
  silly: "magenta",
  tip: "gray"
};
function colorize(color, text) {
  if (!text) return text;
  const code = codes[allColors[color]];
  if (!code) return text;
  const open = `\x1B[${code[0]}m`;
  const close = `\x1B[${code[1]}m`;
  return `${open}${text}${close}`;
}
class Colorizer {
  constructor(opts = {}) {
    this.options = void 0;
    if (opts.colors) {
      allColors = Object.assign({}, allColors, opts.colors);
    }
    this.options = opts;
  }
  colorize(lookup, level, message) {
    if (typeof message === "undefined") {
      message = level;
    }
    return colorize(lookup, message);
  }
  transform(info, opts) {
    if (opts.all && typeof info[MESSAGE] === "string") {
      info[MESSAGE] = this.colorize(info[LEVEL], info.level, info[MESSAGE]);
    }
    if (opts.level || opts.all || !opts.message) {
      info.level = this.colorize(info[LEVEL], info.level);
    }
    if (opts.all || opts.message) {
      info.message = this.colorize(info[LEVEL], info.level, info.message);
    }
    return info;
  }
}
function colorizer(opts) {
  return new Colorizer(opts);
}
class Format {
  constructor(transform, opts) {
    this.transform = void 0;
    this.options = void 0;
    this.transform = transform;
    this.options = opts;
  }
}
function format$2(transform) {
  return (opts) => {
    return new Format(transform, opts);
  };
}
function combine(...formats) {
  const combinedFormat = format$2(cascade(formats));
  return combinedFormat();
}
const errors = format$2((einfo, {
  stack: stack2,
  cause
}) => {
  if (einfo instanceof Error) {
    const info = Object.assign({}, einfo, {
      level: einfo.level,
      [LEVEL]: einfo[LEVEL] || einfo.level,
      message: einfo.message,
      [MESSAGE]: einfo[MESSAGE] || einfo.message
    });
    if (stack2) info.stack = einfo.stack;
    if (cause) info.cause = einfo.cause;
    return info;
  }
  if (!(einfo.message instanceof Error)) return einfo;
  const err = einfo.message;
  Object.assign(einfo, err);
  einfo.message = err.message;
  einfo[MESSAGE] = err.message;
  if (stack2) einfo.stack = err.stack;
  if (cause) einfo.cause = err.cause;
  return einfo;
});
class Profiler {
  constructor(logger) {
    this.logger = void 0;
    this.start = void 0;
    this.logger = logger;
    this.start = Date.now();
  }
  done(...args) {
    if (typeof args[args.length - 1] === "function") {
      console.warn("Callback function no longer supported as of winston@3.0.0");
      args.pop();
    }
    const info = typeof args[args.length - 1] === "object" ? args.pop() : {};
    info.level = info.level || "info";
    info.durationMs = Date.now() - this.start;
    return this.logger.log(info);
  }
}
const formatRegExp$1 = /%[scdjifoO%]/g;
class Logger {
  constructor(options, defaultMeta) {
    this.options = void 0;
    this.defaultMeta = void 0;
    this.options = options;
    this.defaultMeta = defaultMeta;
  }
  child(defaultMeta) {
    const defaultMetaNew = Object.assign({}, this.defaultMeta, defaultMeta);
    return new Logger(this.options, defaultMetaNew);
  }
  error(msg, ...splat) {
    return this.log("error", msg, ...splat);
  }
  warn(msg, ...splat) {
    return this.log("warn", msg, ...splat);
  }
  info(msg, ...splat) {
    return this.log("info", msg, ...splat);
  }
  http(msg, ...splat) {
    return this.log("http", msg, ...splat);
  }
  verbose(msg, ...splat) {
    return this.log("verbose", msg, ...splat);
  }
  debug(msg, ...splat) {
    return this.log("debug", msg, ...splat);
  }
  silly(msg, ...splat) {
    return this.log("silly", msg, ...splat);
  }
  log(level, msg, ...splat) {
    if (arguments.length === 1) {
      level[LEVEL] = level.level;
      this._addDefaultMeta(level);
      this.write(level);
      return this;
    }
    if (arguments.length === 2) {
      if (msg && typeof msg === "object") {
        msg[LEVEL] = msg.level = level;
        this._addDefaultMeta(msg);
        this.write(msg);
        return this;
      }
      msg = {
        [LEVEL]: level,
        level,
        message: msg
      };
      this._addDefaultMeta(msg);
      this.write(msg);
      return this;
    }
    const [meta] = splat;
    if (typeof meta === "object" && meta !== null) {
      const tokens = msg && msg.match && msg.match(formatRegExp$1);
      if (!tokens) {
        const info = Object.assign({}, this.defaultMeta, meta, {
          [LEVEL]: level,
          [SPLAT]: splat,
          level,
          message: msg
        });
        if (meta.message) info.message = `${info.message} ${meta.message}`;
        if (meta.stack) info.stack = meta.stack;
        if (meta.cause) info.cause = meta.cause;
        this.write(info);
        return this;
      }
    }
    this.write(Object.assign({}, this.defaultMeta, {
      [LEVEL]: level,
      [SPLAT]: splat,
      level,
      message: msg
    }));
    return this;
  }
  write(logInfo) {
    const info = this.options.format.transform(logInfo, this.options.format.options);
    if (!info) return;
    const message = info[MESSAGE];
    if (Array.isArray(message)) {
      console.log(...message);
    } else {
      console.log(message);
    }
  }
  startTimer() {
    return new Profiler(this);
  }
  _addDefaultMeta(logInfo) {
    if (this.defaultMeta) {
      Object.assign(logInfo, this.defaultMeta);
    }
  }
  async end() {
  }
}
class Printf {
  constructor(templateFn) {
    this.template = void 0;
    this.template = templateFn;
  }
  transform(info) {
    info[MESSAGE] = this.template(info);
    return info;
  }
}
function print(opts) {
  return new Printf(opts);
}
let CIRCULAR_ERROR_MESSAGE;
function tryStringify(arg) {
  try {
    return JSON.stringify(arg);
  } catch (err) {
    if (!CIRCULAR_ERROR_MESSAGE) {
      try {
        const a = {};
        a.a = a;
        JSON.stringify(a);
      } catch (err2) {
        CIRCULAR_ERROR_MESSAGE = err2.message;
      }
    }
    if (err.name === "TypeError" && err.message === CIRCULAR_ERROR_MESSAGE) {
      return "[Circular]";
    }
    throw err;
  }
}
function format$1(f) {
  if (arguments.length === 1) return f;
  let str = "";
  let a = 1;
  let lastPos = 0;
  for (let i = 0; i < f.length; ) {
    if (f.charCodeAt(i) === 37 && i + 1 < f.length) {
      if (f.charCodeAt(i + 1) !== 37 && a >= arguments.length) {
        ++i;
        continue;
      }
      switch (f.charCodeAt(i + 1)) {
        case 100:
          if (lastPos < i) {
            str += f.slice(lastPos, i);
          }
          str += Number(arguments[a++]);
          break;
        case 105:
          if (lastPos < i) {
            str += f.slice(lastPos, i);
          }
          str += parseInt(arguments[a++]);
          break;
        case 102:
          if (lastPos < i) {
            str += f.slice(lastPos, i);
          }
          str += parseFloat(arguments[a++]);
          break;
        case 106:
          if (lastPos < i) {
            str += f.slice(lastPos, i);
          }
          str += tryStringify(arguments[a++]);
          break;
        case 115:
          if (lastPos < i) {
            str += f.slice(lastPos, i);
          }
          str += String(arguments[a++]);
          break;
        case 37:
          if (lastPos < i) {
            str += f.slice(lastPos, i);
          }
          str += "%";
          break;
        default:
          if (lastPos < i) {
            str += f.slice(lastPos, i);
          }
          str += "%";
          lastPos = i = i + 1;
          continue;
      }
      lastPos = i = i + 2;
      continue;
    }
    ++i;
  }
  if (lastPos === 0) {
    str = f;
  } else if (lastPos < f.length) {
    str += f.slice(lastPos);
  }
  return str;
}
function getText(...args) {
  if (args.length === 0) return "";
  const [text, value] = args;
  if (!text) return "";
  if (args.length === 1) {
    return text;
  }
  if (args.length === 2) {
    if (isObject(value)) {
      return formatWithObject(text, value);
    }
    if (Array.isArray(value)) {
      return formatWithArray(text, value);
    }
    return format$1(text, value);
  }
  const _args = new Array(args.length);
  _args[0] = text;
  for (let i = 1; i < _args.length; i++) {
    _args[i] = args[i];
  }
  return format$1.apply(null, _args);
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
const ARRAY_INDEX_RE = /\{(\d+)\}/g;
function formatWithArray(text, values) {
  return text.replace(ARRAY_INDEX_RE, function(orignal, matched) {
    const index = parseInt(matched);
    if (index < values.length) {
      return values[index];
    }
    return orignal;
  });
}
const Object_INDEX_RE = /\{(.+?)\}/g;
function formatWithObject(text, values) {
  return text.replace(Object_INDEX_RE, function(orignal, matched) {
    const value = values[matched];
    if (value) {
      return value;
    }
    return orignal;
  });
}
const __keysCachesLocales = {};
function getLocaleText(supportCustomMessage, locales1, locales2, locale, key2, ...args) {
  const keyCaches = _parseKeyCaches(locales1, locales2, locale, key2);
  if (keyCaches !== false) {
    for (const keyCache of keyCaches) {
      const flags = keyCache[0];
      const _key = keyCache[1];
      const argIndex = flags[1] ?? 0;
      if (args[argIndex] === flags[0]) {
        return _getLocaleText_inner(supportCustomMessage, locales1, locales2, locale, _key, ...args);
      }
    }
  }
  return _getLocaleText_inner(supportCustomMessage, locales1, locales2, locale, key2, ...args);
}
function _parseKeyCaches(locales1, locales2, locale, key2) {
  if (!__keysCachesLocales[locale]) __keysCachesLocales[locale] = {};
  const keysCaches = __keysCachesLocales[locale];
  if (keysCaches[key2] !== void 0) return keysCaches[key2];
  const _keyCaches = [];
  _collectKeyCaches(_keyCaches, false, locales1, locale, key2);
  _collectKeyCaches(_keyCaches, true, locales2, locale, key2);
  keysCaches[key2] = _keyCaches.length === 0 ? false : _keyCaches;
  return keysCaches[key2];
}
function _collectKeyCaches(keyCaches, checkExists, locales, locale, key2) {
  if (!locales || !locales[locale]) return;
  for (const _key in locales[locale]) {
    if (_key === key2 || !_key.startsWith(key2)) continue;
    let flag = _key.substring(key2.length);
    if (flag.startsWith("_")) flag = flag.substring(1);
    const flags = flag.split("_").map((item) => Number(item));
    if (!checkExists || !keyCaches.some((item) => item[1] === _key)) {
      keyCaches.push([flags, _key]);
    }
  }
}
function _getLocaleText_inner(supportCustomMessage, locales1, locales2, locale, key2, ...args) {
  if (!key2) return "";
  let text = locales1?.[locale]?.[key2] ?? locales2?.[locale]?.[key2];
  if (text === void 0 && locale !== "en-us") {
    text = locales1?.["en-us"]?.[key2] ?? locales2?.["en-us"]?.[key2];
  }
  if (text === void 0) {
    text = key2;
  }
  if (supportCustomMessage && !text.replaceAll("%%", "").includes("%") && args[0]) {
    return getText(...args);
  }
  return getText(text, ...args);
}
const formatRegExp = /%[scdjifoO%]/g;
const escapedPercent = /%%/g;
class Splatter {
  constructor(opts) {
    this.options = void 0;
    this.options = opts;
  }
  _splat(info, tokens) {
    const msg = info.message;
    const splat = info[SPLAT] || info.splat || [];
    const percents = msg.match(escapedPercent);
    const escapes = percents && percents.length || 0;
    const expectedSplat = tokens.length - escapes;
    const extraSplat = expectedSplat - splat.length;
    const metas = extraSplat < 0 ? splat.splice(extraSplat, -1 * extraSplat) : [];
    const metalen = metas.length;
    if (metalen) {
      for (let i = 0; i < metalen; i++) {
        Object.assign(info, metas[i]);
      }
    }
    info.message = getText(msg, ...splat);
    return info;
  }
  transform(info) {
    const msg = info.message;
    const splat = info[SPLAT] || info.splat;
    if (!splat || !splat.length) {
      return info;
    }
    const tokens = msg && msg.match && msg.match(formatRegExp);
    if (!tokens && (splat || splat.length)) {
      const metas = splat.length > 1 ? splat.splice(0) : splat;
      const metalen = metas.length;
      if (metalen) {
        for (let i = 0; i < metalen; i++) {
          Object.assign(info, metas[i]);
        }
      }
      return info;
    }
    if (tokens) {
      return this._splat(info, tokens);
    }
    return info;
  }
}
function splatter(opts) {
  return new Splatter(opts);
}
var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
var twoDigitsOptional = "\\d\\d?";
var twoDigits = "\\d\\d";
var threeDigits = "\\d{3}";
var fourDigits = "\\d{4}";
var word = "[^\\s]+";
var literal = /\[([^]*?)\]/gm;
function shorten(arr, sLen) {
  var newArr = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i].substr(0, sLen));
  }
  return newArr;
}
var monthUpdate = function(arrName) {
  return function(v, i18n) {
    var lowerCaseArr = i18n[arrName].map(function(v2) {
      return v2.toLowerCase();
    });
    var index = lowerCaseArr.indexOf(v.toLowerCase());
    if (index > -1) {
      return index;
    }
    return null;
  };
};
function assign(origObj) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  for (var _a2 = 0, args_1 = args; _a2 < args_1.length; _a2++) {
    var obj = args_1[_a2];
    for (var key2 in obj) {
      origObj[key2] = obj[key2];
    }
  }
  return origObj;
}
var dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var monthNamesShort = shorten(monthNames, 3);
var dayNamesShort = shorten(dayNames, 3);
var defaultI18n = {
  dayNamesShort,
  dayNames,
  monthNamesShort,
  monthNames,
  amPm: ["am", "pm"],
  DoFn: function(dayOfMonth) {
    return dayOfMonth + ["th", "st", "nd", "rd"][dayOfMonth % 10 > 3 ? 0 : (dayOfMonth - dayOfMonth % 10 !== 10 ? 1 : 0) * dayOfMonth % 10];
  }
};
var globalI18n = assign({}, defaultI18n);
var setGlobalDateI18n = function(i18n) {
  return globalI18n = assign(globalI18n, i18n);
};
var regexEscape = function(str) {
  return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
};
var pad = function(val, len) {
  if (len === void 0) {
    len = 2;
  }
  val = String(val);
  while (val.length < len) {
    val = "0" + val;
  }
  return val;
};
var formatFlags = {
  D: function(dateObj) {
    return String(dateObj.getDate());
  },
  DD: function(dateObj) {
    return pad(dateObj.getDate());
  },
  Do: function(dateObj, i18n) {
    return i18n.DoFn(dateObj.getDate());
  },
  d: function(dateObj) {
    return String(dateObj.getDay());
  },
  dd: function(dateObj) {
    return pad(dateObj.getDay());
  },
  ddd: function(dateObj, i18n) {
    return i18n.dayNamesShort[dateObj.getDay()];
  },
  dddd: function(dateObj, i18n) {
    return i18n.dayNames[dateObj.getDay()];
  },
  M: function(dateObj) {
    return String(dateObj.getMonth() + 1);
  },
  MM: function(dateObj) {
    return pad(dateObj.getMonth() + 1);
  },
  MMM: function(dateObj, i18n) {
    return i18n.monthNamesShort[dateObj.getMonth()];
  },
  MMMM: function(dateObj, i18n) {
    return i18n.monthNames[dateObj.getMonth()];
  },
  YY: function(dateObj) {
    return pad(String(dateObj.getFullYear()), 4).substr(2);
  },
  YYYY: function(dateObj) {
    return pad(dateObj.getFullYear(), 4);
  },
  h: function(dateObj) {
    return String(dateObj.getHours() % 12 || 12);
  },
  hh: function(dateObj) {
    return pad(dateObj.getHours() % 12 || 12);
  },
  H: function(dateObj) {
    return String(dateObj.getHours());
  },
  HH: function(dateObj) {
    return pad(dateObj.getHours());
  },
  m: function(dateObj) {
    return String(dateObj.getMinutes());
  },
  mm: function(dateObj) {
    return pad(dateObj.getMinutes());
  },
  s: function(dateObj) {
    return String(dateObj.getSeconds());
  },
  ss: function(dateObj) {
    return pad(dateObj.getSeconds());
  },
  S: function(dateObj) {
    return String(Math.round(dateObj.getMilliseconds() / 100));
  },
  SS: function(dateObj) {
    return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
  },
  SSS: function(dateObj) {
    return pad(dateObj.getMilliseconds(), 3);
  },
  a: function(dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
  },
  A: function(dateObj, i18n) {
    return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
  },
  ZZ: function(dateObj) {
    var offset = dateObj.getTimezoneOffset();
    return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4);
  },
  Z: function(dateObj) {
    var offset = dateObj.getTimezoneOffset();
    return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2) + ":" + pad(Math.abs(offset) % 60, 2);
  }
};
var monthParse = function(v) {
  return +v - 1;
};
var emptyDigits = [null, twoDigitsOptional];
var emptyWord = [null, word];
var amPm = [
  "isPm",
  word,
  function(v, i18n) {
    var val = v.toLowerCase();
    if (val === i18n.amPm[0]) {
      return 0;
    } else if (val === i18n.amPm[1]) {
      return 1;
    }
    return null;
  }
];
var timezoneOffset = [
  "timezoneOffset",
  "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
  function(v) {
    var parts = (v + "").match(/([+-]|\d\d)/gi);
    if (parts) {
      var minutes = +parts[1] * 60 + parseInt(parts[2], 10);
      return parts[0] === "+" ? minutes : -minutes;
    }
    return 0;
  }
];
var parseFlags = {
  D: ["day", twoDigitsOptional],
  DD: ["day", twoDigits],
  Do: ["day", twoDigitsOptional + word, function(v) {
    return parseInt(v, 10);
  }],
  M: ["month", twoDigitsOptional, monthParse],
  MM: ["month", twoDigits, monthParse],
  YY: [
    "year",
    twoDigits,
    function(v) {
      var now = /* @__PURE__ */ new Date();
      var cent = +("" + now.getFullYear()).substr(0, 2);
      return +("" + (+v > 68 ? cent - 1 : cent) + v);
    }
  ],
  h: ["hour", twoDigitsOptional, void 0, "isPm"],
  hh: ["hour", twoDigits, void 0, "isPm"],
  H: ["hour", twoDigitsOptional],
  HH: ["hour", twoDigits],
  m: ["minute", twoDigitsOptional],
  mm: ["minute", twoDigits],
  s: ["second", twoDigitsOptional],
  ss: ["second", twoDigits],
  YYYY: ["year", fourDigits],
  S: ["millisecond", "\\d", function(v) {
    return +v * 100;
  }],
  SS: ["millisecond", twoDigits, function(v) {
    return +v * 10;
  }],
  SSS: ["millisecond", threeDigits],
  d: emptyDigits,
  dd: emptyDigits,
  ddd: emptyWord,
  dddd: emptyWord,
  MMM: ["month", word, monthUpdate("monthNamesShort")],
  MMMM: ["month", word, monthUpdate("monthNames")],
  a: amPm,
  A: amPm,
  ZZ: timezoneOffset,
  Z: timezoneOffset
};
var globalMasks = {
  default: "ddd MMM DD YYYY HH:mm:ss",
  shortDate: "M/D/YY",
  mediumDate: "MMM D, YYYY",
  longDate: "MMMM D, YYYY",
  fullDate: "dddd, MMMM D, YYYY",
  isoDate: "YYYY-MM-DD",
  isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
  shortTime: "HH:mm",
  mediumTime: "HH:mm:ss",
  longTime: "HH:mm:ss.SSS"
};
var setGlobalDateMasks = function(masks) {
  return assign(globalMasks, masks);
};
var format = function(dateObj, mask, i18n) {
  if (mask === void 0) {
    mask = globalMasks["default"];
  }
  if (i18n === void 0) {
    i18n = {};
  }
  if (typeof dateObj === "number") {
    dateObj = new Date(dateObj);
  }
  if (Object.prototype.toString.call(dateObj) !== "[object Date]" || isNaN(dateObj.getTime())) {
    throw new Error("Invalid Date pass to format");
  }
  mask = globalMasks[mask] || mask;
  var literals = [];
  mask = mask.replace(literal, function($0, $1) {
    literals.push($1);
    return "@@@";
  });
  var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
  mask = mask.replace(token, function($0) {
    return formatFlags[$0](dateObj, combinedI18nSettings);
  });
  return mask.replace(/@@@/g, function() {
    return literals.shift();
  });
};
function parse2(dateStr, format2, i18n) {
  if (i18n === void 0) {
    i18n = {};
  }
  if (typeof format2 !== "string") {
    throw new Error("Invalid format in fecha parse");
  }
  format2 = globalMasks[format2] || format2;
  if (dateStr.length > 1e3) {
    return null;
  }
  var today = /* @__PURE__ */ new Date();
  var dateInfo = {
    year: today.getFullYear(),
    month: 0,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    isPm: null,
    timezoneOffset: null
  };
  var parseInfo2 = [];
  var literals = [];
  var newFormat = format2.replace(literal, function($0, $1) {
    literals.push(regexEscape($1));
    return "@@@";
  });
  var specifiedFields = {};
  var requiredFields = {};
  newFormat = regexEscape(newFormat).replace(token, function($0) {
    var info = parseFlags[$0];
    var field2 = info[0], regex = info[1], requiredField = info[3];
    if (specifiedFields[field2]) {
      throw new Error("Invalid format. " + field2 + " specified twice in format");
    }
    specifiedFields[field2] = true;
    if (requiredField) {
      requiredFields[requiredField] = true;
    }
    parseInfo2.push(info);
    return "(" + regex + ")";
  });
  Object.keys(requiredFields).forEach(function(field2) {
    if (!specifiedFields[field2]) {
      throw new Error("Invalid format. " + field2 + " is required in specified format");
    }
  });
  newFormat = newFormat.replace(/@@@/g, function() {
    return literals.shift();
  });
  var matches = dateStr.match(new RegExp(newFormat, "i"));
  if (!matches) {
    return null;
  }
  var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
  for (var i = 1; i < matches.length; i++) {
    var _a2 = parseInfo2[i - 1], field = _a2[0], parser = _a2[2];
    var value = parser ? parser(matches[i], combinedI18nSettings) : +matches[i];
    if (value == null) {
      return null;
    }
    dateInfo[field] = value;
  }
  if (dateInfo.isPm === 1 && dateInfo.hour != null && +dateInfo.hour !== 12) {
    dateInfo.hour = +dateInfo.hour + 12;
  } else if (dateInfo.isPm === 0 && +dateInfo.hour === 12) {
    dateInfo.hour = 0;
  }
  var dateTZ;
  if (dateInfo.timezoneOffset == null) {
    dateTZ = new Date(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute, dateInfo.second, dateInfo.millisecond);
    var validateFields = [
      ["month", "getMonth"],
      ["day", "getDate"],
      ["hour", "getHours"],
      ["minute", "getMinutes"],
      ["second", "getSeconds"]
    ];
    for (var i = 0, len = validateFields.length; i < len; i++) {
      if (specifiedFields[validateFields[i][0]] && dateInfo[validateFields[i][0]] !== dateTZ[validateFields[i][1]]()) {
        return null;
      }
    }
  } else {
    dateTZ = new Date(Date.UTC(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute - dateInfo.timezoneOffset, dateInfo.second, dateInfo.millisecond));
    if (dateInfo.month > 11 || dateInfo.month < 0 || dateInfo.day > 31 || dateInfo.day < 1 || dateInfo.hour > 23 || dateInfo.hour < 0 || dateInfo.minute > 59 || dateInfo.minute < 0 || dateInfo.second > 59 || dateInfo.second < 0) {
      return null;
    }
  }
  return dateTZ;
}
var fecha = {
  format,
  parse: parse2,
  defaultI18n,
  setGlobalDateI18n,
  setGlobalDateMasks
};
const timestamp = format$2((info, opts = {}) => {
  if (opts.format) {
    info.timestamp = typeof opts.format === "function" ? opts.format() : fecha.format(/* @__PURE__ */ new Date(), opts.format);
  }
  if (!info.timestamp) {
    info.timestamp = (/* @__PURE__ */ new Date()).toISOString();
  }
  if (opts.alias) {
    info[opts.alias] = info.timestamp;
  }
  return info;
});
const SymbolLoggerInstances = /* @__PURE__ */ Symbol("SymbolLoggerInstances");
class SysLogger extends BeanSimple {
  constructor(...args) {
    super(...args);
    this[SymbolLoggerInstances] = {};
  }
  async dispose() {
    for (const key2 in this[SymbolLoggerInstances]) {
      const logger = this[SymbolLoggerInstances][key2];
      await _closeLogger(logger);
    }
  }
  get(clientName) {
    clientName = clientName || "default";
    if (!this[SymbolLoggerInstances][clientName]) {
      this[SymbolLoggerInstances][clientName] = this._createClient(clientName);
    }
    return this[SymbolLoggerInstances][clientName];
  }
  child(childName, clientName) {
    const logger = this.get(clientName);
    if (!childName) return logger;
    return logger.child({
      name: childName
    });
  }
  getFilterLevel(clientName) {
    return getLoggerFilterLevel();
  }
  setFilterLevel(level, clientName) {
  }
  _createClient(clientName) {
    const configClient = this.sys.config.logger.clients[clientName];
    if (!configClient) throw new Error(`logger client not found: ${clientName}`);
    const configNode = deepExtend({}, this._prepareConfigClient(clientName, this.sys.config.logger.base), this._prepareConfigClient(clientName, configClient));
    const logger = new Logger(configNode);
    return logger;
  }
  _prepareConfigClient(clientName, configClient) {
    if (typeof configClient !== "function") return configClient;
    return configClient.call(this.sys, {
      clientName,
      level: () => getLoggerFilterLevel()
    });
  }
}
async function _closeLogger(logger) {
  if (logger.__closed__) return;
  await logger.end();
  logger.__closed__ = true;
}
function getLoggerFilterLevel(clientName) {
  return;
}
function useSys() {
  return sys;
}
function createZovaComponentAsync(module, name) {
  return defineAsyncComponent(() => {
    return new Promise((resolve) => {
      const sys2 = useSys();
      sys2.meta.component.use(module, name).then((value) => {
        resolve(value);
      });
    });
  });
}
const SymbolZovaComponents = /* @__PURE__ */ Symbol("SymbolZovaComponents");
class SysComponent extends BeanSimple {
  constructor(...args) {
    super(...args);
    this[SymbolZovaComponents] = {};
  }
  /** @internal */
  async initialize() {
  }
  createAsyncComponent(module, name) {
    return () => {
      return this.use(module, name);
    };
  }
  getZovaComponent(module, name) {
    const componentName = module.includes(":") ? module : `${module}:${name}`;
    if (!this[SymbolZovaComponents][componentName]) {
      this[SymbolZovaComponents][componentName] = markRaw(createZovaComponentAsync(componentName));
    }
    return this[SymbolZovaComponents][componentName];
  }
  async use(module, name) {
    if (module.includes(":")) {
      const parts = module.split(":");
      module = parts[0];
      name = parts[1];
    }
    const _module = await this.sys.meta.module.use(module);
    return _module.resource.components[name];
  }
}
class SysError extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.errors = void 0;
  }
  /** @internal */
  async initialize() {
    this.errors = {};
  }
}
const SymbolLocaleCurrent = /* @__PURE__ */ Symbol("SymbolLocaleCurrent");
const SymbolTzCurrent = /* @__PURE__ */ Symbol("SymbolTzCurrent");
class AppLocale extends BeanSimple {
  constructor(...args) {
    super(...args);
    this[SymbolLocaleCurrent] = ref$1();
    this[SymbolTzCurrent] = ref$1();
  }
  get metaCookie() {
    return this.app ? this.app.meta.cookie : this.sys.meta.cookie;
  }
  get current() {
    let locale = this[SymbolLocaleCurrent].value;
    if (!locale && this.sys.config.locale.cookieLocale) locale = this.metaCookie.getItem(this.sys.config.locale.storeKey);
    if (!locale) locale = this.sys.config.locale.default;
    return locale;
  }
  set current(value) {
    if (this[SymbolLocaleCurrent].value === value) return;
    this[SymbolLocaleCurrent].value = value;
    if (this.sys.config.locale.cookieLocale) {
      this.metaCookie.setItem(this.sys.config.locale.storeKey, value);
    }
  }
  get tz() {
    let tz = this[SymbolTzCurrent].value;
    if (!tz) tz = this.metaCookie.getItem(this.sys.config.tz.storeKey);
    if (!tz) tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz;
  }
  set tz(value) {
    if (this[SymbolTzCurrent].value === value) return;
    this[SymbolTzCurrent].value = value;
    this.metaCookie.setItem(this.sys.config.tz.storeKey, value);
  }
  /** @internal */
  async initialize() {
  }
  /** @internal */
  createLocaleText(moduleScope) {
    const self2 = this;
    const getText2 = function(text, ...args) {
      return self2.getText(false, moduleScope, void 0, text, ...args);
    };
    getText2.locale = function(locale, text, ...args) {
      return self2.getText(false, moduleScope, locale, text, ...args);
    };
    return getText2;
  }
  /** @internal */
  createScopeLocaleText(moduleScope, text) {
    const self2 = this;
    const getText2 = function(...args) {
      return self2.getText(false, moduleScope, void 0, text, ...args);
    };
    getText2.locale = function(locale, ...args) {
      return self2.getText(false, moduleScope, locale, text, ...args);
    };
    return getText2;
  }
  getText(supportCustomMessage, moduleScope, locale, key2, ...args) {
    if (!key2) return key2;
    if (typeof key2 !== "string") throw new Error(`${key2} should be string`);
    const pos2 = key2.indexOf(LocaleModuleNameSeparator);
    if (pos2 > -1) {
      moduleScope = key2.substring(0, pos2);
      key2 = key2.substring(pos2 + LocaleModuleNameSeparator.length);
    }
    return getLocaleText(supportCustomMessage, moduleScope ? this.sys.meta.locale.localeModules[moduleScope] : void 0, this.sys.meta.locale.locales, locale || this.current, key2, ...args);
  }
}
class SysLocale extends AppLocale {
  constructor(...args) {
    super(...args);
    this.locales = {};
    this.localeModules = {};
  }
  /** @internal */
  async initialize(locales) {
    if (!locales) return;
    for (const locale in locales) {
      const moduleMap = locales[locale].modules;
      for (const moduleName in moduleMap) {
        this._registerLocale(moduleName, locale, moduleMap[moduleName]);
      }
    }
  }
  /** @internal */
  _registerLocales(moduleName, locales) {
    if (!locales) return;
    for (const locale in locales) {
      this._registerLocale(moduleName, locale, locales[locale]);
    }
  }
  _registerLocale(moduleName, locale, moduleLocales) {
    this.locales[locale] = Object.assign({}, moduleLocales, this.locales[locale]);
    if (!this.localeModules[moduleName]) this.localeModules[moduleName] = {};
    this.localeModules[moduleName][locale] = Object.assign({}, moduleLocales, this.localeModules[moduleName][locale]);
  }
}
let __onionScenesMeta;
function getOnionScenesMeta(modules) {
  if (!__onionScenesMeta) __onionScenesMeta = _getOnionScenesMeta(modules);
  return __onionScenesMeta;
}
function _getOnionScenesMeta(modules) {
  const result = {};
  for (const moduleName in modules) {
    const module = modules[moduleName];
    const onions = module.info.onionsMeta?.onions;
    if (!onions) continue;
    for (const sceneName in onions) result[sceneName] = {
      ...onions[sceneName],
      module
    };
  }
  return result;
}
const PREFIX_A = "/api/";
const PREFIX_B = "vona-module-";
const PREFIX_C = "./vona-module-";
const PREFIX_D = "./";
const PREFIX_E = "/";
function parseInfo(moduleName) {
  if (!moduleName) return;
  if (moduleName.includes("://")) return;
  if (moduleName.charAt(0) === "/") moduleName = moduleName.substring(1);
  let parts = moduleName.split("/").filter((item) => item);
  if (parts.length < 2) {
    parts = moduleName.split("-").filter((item) => item);
    if (parts.length < 2) return;
    if (parts.length === 4) parts = parts.slice(2);
    if (parts.length === 5) parts = parts.slice(3);
  }
  return {
    pid: parts[0],
    name: parts[1],
    relativeName: `${parts[0]}-${parts[1]}`,
    url: `${parts[0]}/${parts[1]}`,
    originalName: parts.join("-")
  };
}
function parseName(moduleUrl) {
  const moduleName = _parseNameInner(moduleUrl);
  if (!moduleName) return;
  const [a, b] = moduleName.split("-");
  if (!a || !b) return;
  return moduleName;
}
function _parseNameInner(moduleUrl) {
  if (!moduleUrl) return;
  if (moduleUrl.indexOf("/api/static/") === 0) moduleUrl = `/api/${moduleUrl.substring(12)}`;
  if (moduleUrl.indexOf(PREFIX_A) === 0) return _parseNameLikeUrl(moduleUrl, PREFIX_A);
  else if (moduleUrl.indexOf(PREFIX_B) === 0) return _parseName(moduleUrl, PREFIX_B);
  else if (moduleUrl.indexOf(PREFIX_C) === 0) return _parseName(moduleUrl, PREFIX_C);
  else if (moduleUrl.indexOf(PREFIX_D) === 0) return _parseName(moduleUrl, PREFIX_D);
  else if (moduleUrl.indexOf(PREFIX_E) === 0) return _parseNameLikeUrl(moduleUrl, PREFIX_E);
  else return _parseName(moduleUrl.replace("/", "-"), "");
}
function _parseNameLikeUrl(moduleUrl, prefix) {
  const posA = prefix.length;
  const posB = moduleUrl.indexOf("/", posA) + 1;
  if (posB === 0) return;
  let posC = moduleUrl.indexOf("/", posB);
  if (posC === -1) posC = moduleUrl.length;
  return moduleUrl.substring(posA, posC).replace("/", "-");
}
function _parseName(moduleUrl, prefix) {
  const posA = prefix.length;
  let posB = moduleUrl.indexOf("/", posA);
  if (posB === -1) posB = moduleUrl.indexOf(":", posA);
  if (posB === -1) posB = moduleUrl.indexOf(".", posA);
  if (posB === -1) posB = moduleUrl.length;
  return moduleUrl.substring(posA, posB);
}
const SymbolInstalled = /* @__PURE__ */ Symbol("SymbolInstalled");
class SysModule extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.modulesMeta = void 0;
    this.modules = shallowReactive({});
    this.mainInstances = {};
    this.monkeyInstances = {};
  }
  /** @internal */
  async initialize(modulesMeta) {
    this.modulesMeta = modulesMeta;
    await this._loadAllMonkeysAndSyncsAndPreloads();
    await this._requireAllSpecifics("preload");
    await this._requireAllSpecifics("monkey");
    await this._requireAllSpecifics("sync");
  }
  get(moduleName) {
    if (!moduleName) return void 0;
    const moduleInfo = typeof moduleName === "string" ? parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    const module = this.modules[moduleInfo.relativeName];
    if (!module) {
      return void 0;
    }
    if (!module[SymbolInstalled] || !module[SymbolInstalled].state) {
      return void 0;
    }
    return module;
  }
  async use(moduleName) {
    if (!moduleName) throw new Error("should specify the module name");
    const moduleInfo = typeof moduleName === "string" ? parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    const relativeName = moduleInfo.relativeName;
    const moduleRepo = this.modulesMeta.modules[relativeName];
    if (!moduleRepo) throw new Error(`module not exists: ${relativeName}`);
    await this._install(relativeName, moduleRepo);
    return moduleRepo;
  }
  exists(moduleName) {
    if (!moduleName) return false;
    const moduleInfo = typeof moduleName === "string" ? parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    const moduleRepo = this.modulesMeta.modules[moduleInfo.relativeName];
    return !!moduleRepo;
  }
  async _loadAllMonkeysAndSyncsAndPreloads() {
    const moduleNames = [];
    for (const moduleName of this.modulesMeta.moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      const info = module.info;
      const shouldLoad = info.capabilities?.monkey || info.capabilities?.sync || info.capabilities?.preload;
      if (shouldLoad) {
        const moduleResource = module.resource;
        if (typeof moduleResource === "function") {
          moduleNames.push(moduleName);
        }
      }
    }
    await this.loadModules(moduleNames);
  }
  async loadModules(moduleNames) {
    if (moduleNames.length === 0) return;
    const promises = [];
    const moduleNamesLoading = [];
    for (const moduleName of moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      if (!module) throw new Error(`module not found: ${moduleName}`);
      const moduleResource = module.resource;
      if (typeof moduleResource === "function") {
        const promise = moduleResource();
        promises.push(promise);
        moduleNamesLoading.push(moduleName);
      }
    }
    const modulesResource = await Promise.all(promises);
    for (let i = 0; i < modulesResource.length; i++) {
      const moduleName = moduleNamesLoading[i];
      this.modulesMeta.modules[moduleName].resource = modulesResource[i];
    }
  }
  async _requireAllSpecifics(capabilityName) {
    const moduleNames = this.modulesMeta.moduleNames.filter((moduleName) => {
      const module = this.modulesMeta.modules[moduleName];
      return module.info.capabilities?.[capabilityName];
    });
    if (moduleNames.length > 0) {
      this.sys.meta.logger.child("module", "default").debug(`modules ${capabilityName}: ${moduleNames.join(",")}`);
    }
    for (const moduleName of moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      await this._install(moduleName, module);
    }
  }
  async _requireAllOthers() {
    for (const moduleName of this.modulesMeta.moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      const info = module.info;
      const shouldInstall = !info.capabilities?.monkey && !info.capabilities?.sync && !info.capabilities?.preload;
      if (shouldInstall) {
        await this._install(moduleName, module);
      }
    }
  }
  /** @internal */
  async _install(moduleName, moduleRepo) {
    if (this.modules[moduleName]) {
      const module2 = this.modules[moduleName];
      if (module2[SymbolInstalled].state) return;
      await module2[SymbolInstalled].wait();
      await this.sys.bean._getBean(`${moduleName}.scope.module`, false);
      return;
    }
    const module = moduleRepo;
    module[SymbolInstalled] = StateLock.create();
    this.modules[moduleName] = module;
    await this._installInner(moduleName, moduleRepo);
    module[SymbolInstalled].touch();
    await this.sys.bean._getBean(`${moduleName}.scope.module`, false);
    await this._monkeyModule(true, "moduleLoaded", module);
  }
  async _installInner(moduleName, moduleRepo) {
    if (typeof moduleRepo.resource === "function") {
      const moduleResource = moduleRepo.resource;
      moduleRepo.resource = await moduleResource();
    }
    if (moduleRepo.resource.MainSys) {
      this.mainInstances[moduleName] = this.sys.bean._newBeanSimple(moduleRepo.resource.MainSys, false, moduleRepo);
    }
    if (moduleRepo.resource.MonkeySys) {
      this.monkeyInstances[moduleName] = this.sys.bean._newBeanSimple(moduleRepo.resource.MonkeySys, false, moduleRepo);
    }
    await this._monkeyModule(true, "moduleLoading", moduleRepo);
    await this._registerResources(moduleRepo);
  }
  async _registerResources(module) {
    this._registerLocales(module);
    this._registerErrors(module);
    this._registerConstants(module);
    await this._registerConfig(module);
  }
  _registerErrors(module) {
    if (!module.resource.errors) return;
    this.sys.meta.error.errors[module.info.relativeName] = module.resource.errors;
  }
  _registerLocales(module) {
    this.sys.meta.locale._registerLocales(module.info.relativeName, module.resource.locales);
  }
  _registerConstants(module) {
    if (!module.resource.constants) return;
    const relativeName = module.info.relativeName;
    this.sys.constant.modules[relativeName] = deepExtend({}, module.resource.constants, this.sys.constant.modules[relativeName]);
  }
  async _registerConfig(module) {
    if (!module.resource.config) return;
    const config = await module.resource.config(this.sys, this.sys.config.meta);
    await this._monkeyModule(true, "configLoaded", module, config);
    const relativeName = module.info.relativeName;
    this.sys.config.modules[relativeName] = deepExtend({}, config, this.sys.config.modules[relativeName]);
    this.sys.configOriginal.modules[relativeName] = config;
  }
  /** @internal */
  async _monkeyModule(order, monkeyName, moduleTarget, ...monkeyData) {
    if (moduleTarget) {
      const mainInstance = this.mainInstances[moduleTarget.info.relativeName];
      if (mainInstance && mainInstance[monkeyName]) {
        await mainInstance[monkeyName](...monkeyData);
      }
    }
    await forEach$1(this.modulesMeta.moduleNames, order, async (key2) => {
      const moduleMonkey = this.modulesMeta.modules[key2];
      if (moduleMonkey.info.capabilities?.monkey) {
        const monkeyInstance = this.monkeyInstances[key2];
        if (monkeyInstance && monkeyInstance[monkeyName]) {
          if (moduleTarget === void 0) {
            await monkeyInstance[monkeyName](...monkeyData);
          } else {
            await monkeyInstance[monkeyName](moduleTarget, ...monkeyData);
          }
        }
      }
    });
    const sysMonkey = this.sys.meta.sysMonkey;
    if (sysMonkey && sysMonkey[monkeyName]) {
      if (moduleTarget === void 0) {
        await sysMonkey[monkeyName](...monkeyData);
      } else {
        await sysMonkey[monkeyName](moduleTarget, ...monkeyData);
      }
    }
  }
  /** @internal */
  _monkeyModuleSync(order, monkeyName, moduleTarget, ...monkeyData) {
    if (moduleTarget) {
      const mainInstance = this.mainInstances[moduleTarget.info.relativeName];
      if (mainInstance && mainInstance[monkeyName]) {
        mainInstance[monkeyName](...monkeyData);
      }
    }
    forEachSync(this.modulesMeta.moduleNames, order, (key2) => {
      const moduleMonkey = this.modulesMeta.modules[key2];
      if (moduleMonkey.info.capabilities?.monkey) {
        const monkeyInstance = this.monkeyInstances[key2];
        if (monkeyInstance && monkeyInstance[monkeyName]) {
          if (moduleTarget === void 0) {
            monkeyInstance[monkeyName](...monkeyData);
          } else {
            monkeyInstance[monkeyName](moduleTarget, ...monkeyData);
          }
        }
      }
    });
    const sysMonkey = this.sys.meta.sysMonkey;
    if (sysMonkey && sysMonkey[monkeyName]) {
      if (moduleTarget === void 0) {
        sysMonkey[monkeyName](...monkeyData);
      } else {
        sysMonkey[monkeyName](moduleTarget, ...monkeyData);
      }
    }
  }
}
class AppCookie extends BeanSimple {
  getItem(key2) {
    const cookieSource = cast(document);
    const cookies = cookieSource.cookie ? cookieSource.cookie.split("; ") : [];
    const l = cookies.length;
    let result = key2 ? void 0 : {};
    let i = 0;
    let parts;
    let name;
    let cookie;
    for (; i < l; i++) {
      parts = cookies[i].split("=");
      name = decode(parts.shift());
      cookie = parts.join("=");
      if (!key2) {
        cast(result)[name] = cookie;
      } else if (key2 === name) {
        result = read(cookie);
        break;
      }
    }
    return result;
  }
  setItem(key2, value, opts) {
    opts = opts || {};
    opts.path = opts.path || "/";
    let expire, expireValue;
    if (opts.expires !== void 0) {
      if (Object.prototype.toString.call(opts.expires) === "[object Date]") {
        expire = cast(opts.expires).toUTCString();
      } else if (typeof opts.expires === "string") {
        expire = parseExpireString(opts.expires);
      } else {
        expireValue = Number.parseFloat(opts.expires.toString());
        expire = Number.isNaN(expireValue) === false ? getString(expireValue * 864e5) : opts.expires;
      }
    }
    const keyValue = `${encode(key2)}=${stringifyCookieValue(value)}`;
    const cookie = [
      keyValue,
      expire !== void 0 ? `; Expires=${expire}` : "",
      // use expires attribute, max-age is not supported by IE
      opts.path ? `; Path=${opts.path}` : "",
      opts.domain ? `; Domain=${opts.domain}` : "",
      opts.sameSite ? `; SameSite=${opts.sameSite}` : "",
      opts.httpOnly ? "; HttpOnly" : "",
      opts.secure ? "; Secure" : "",
      opts.other ? `; ${opts.other}` : ""
    ].join("");
    {
      document.cookie = cookie;
    }
  }
  removeItem(key2, opts) {
    this.setItem(key2, "", Object.assign({
      expires: -1
    }, opts));
  }
}
function encode(string) {
  return encodeURIComponent(string);
}
function decode(string) {
  return decodeURIComponent(string);
}
function stringifyCookieValue(value) {
  return encode(value === Object(value) ? JSON.stringify(value) : `${value}`);
}
function read(string) {
  if (string === "") {
    return string;
  }
  if (string.indexOf('"') === 0) {
    string = string.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  string = decode(string.replace(/\+/g, " "));
  return string;
}
function parseExpireString(str) {
  let timestamp2 = 0;
  const days = str.match(/(\d+)d/);
  const hours = str.match(/(\d+)h/);
  const minutes = str.match(/(\d+)m/);
  const seconds = str.match(/(\d+)s/);
  if (days) {
    timestamp2 += days[1] * 864e5;
  }
  if (hours) {
    timestamp2 += hours[1] * 36e5;
  }
  if (minutes) {
    timestamp2 += minutes[1] * 6e4;
  }
  if (seconds) {
    timestamp2 += seconds[1] * 1e3;
  }
  return timestamp2 === 0 ? str : getString(timestamp2);
}
function getString(msOffset) {
  const time = /* @__PURE__ */ new Date();
  time.setMilliseconds(time.getMilliseconds() + msOffset);
  return time.toUTCString();
}
class SysMeta extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.module = void 0;
    this.component = void 0;
    this.logger = void 0;
    this.locale = void 0;
    this.error = void 0;
    this.event = void 0;
    this.cookie = void 0;
    this.sysMonkey = void 0;
    this.legacyRoutes = void 0;
  }
  __init__() {
    this.module = this.bean._newBeanSimple(SysModule, false);
    this.component = this.bean._newBeanSimple(SysComponent, false);
    this.logger = this.bean._newBeanSimple(SysLogger, false);
    this.locale = this.bean._newBeanSimple(SysLocale, false);
    this.error = this.bean._newBeanSimple(SysError, false);
    this.event = this.bean._newBeanSimple(AppEvent, false);
    this.cookie = this.bean._newBeanSimple(AppCookie, false);
  }
  /** @internal */
  async initialize(SysMonkey, legacyRoutes) {
    if (SysMonkey) {
      this.sysMonkey = this.bean._newBeanSimple(SysMonkey, false);
    }
    this.legacyRoutes = legacyRoutes;
  }
}
const SymbolSysInitializePromise = /* @__PURE__ */ Symbol("SymbolSysInitializePromise");
const SymbolSysClose = /* @__PURE__ */ Symbol("SymbolSysClose");
class ZovaSys {
  constructor() {
    this[SymbolSysInitializePromise] = void 0;
    this[SymbolSysClose] = void 0;
    this.bean = void 0;
    this.util = void 0;
    this.meta = void 0;
    this.config = void 0;
    this.configOriginal = void 0;
    this.env = void 0;
    this.envOriginal = void 0;
    this.constant = void 0;
    this.bean = BeanContainer.create(this, null, null);
    this.util = this.bean._newBeanSimple(SysUtil, false);
    this.meta = this.bean._newBeanSimple(SysMeta, false);
    zodEnhanceSys();
  }
  /** @internal */
  async initialize({
    modulesMeta,
    locales,
    config,
    env,
    SysMonkey,
    legacyRoutes
  }, envRuntime) {
    if (!this[SymbolSysInitializePromise]) {
      this[SymbolSysInitializePromise] = this._initializeInner({
        modulesMeta,
        locales,
        config,
        env,
        SysMonkey,
        legacyRoutes
      }, envRuntime);
    }
    return this[SymbolSysInitializePromise];
  }
  async _initializeInner({
    modulesMeta,
    locales,
    config,
    env,
    SysMonkey,
    legacyRoutes
  }, envRuntime) {
    this.env = this._prepareEnv(env, envRuntime);
    this.envOriginal = this.env;
    await this.meta.initialize(SysMonkey, legacyRoutes);
    await this.meta.component.initialize();
    await this.meta.locale.initialize(locales);
    await this.meta.error.initialize();
    this.config = await this._combineConfig(config);
    this.configOriginal = {
      modules: {}
    };
    this.constant = constantDefault;
    await this.meta.module.initialize(modulesMeta);
    await this.meta.module._monkeyModule(true, "sysInitialize");
    await this.meta.module._monkeyModule(true, "sysInitialized");
    await this.meta.module._monkeyModule(true, "sysReady");
    this._hookClose();
  }
  _hookClose() {
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        this.close();
      });
    }
  }
  close() {
    if (this[SymbolSysClose]) return;
    this[SymbolSysClose] = true;
    this.meta.module._monkeyModuleSync(false, "sysClose");
    this.bean.dispose();
  }
  async _combineConfig(config) {
    const _config = deepExtend({}, configDefault(this.env));
    for (const configFn of config) {
      deepExtend(_config, await configFn(this, _config.meta));
    }
    return _config;
  }
  // eslint-disable-next-line no-undef
  _prepareEnv(env, envRuntime) {
    if (!envRuntime) return env;
    const env2 = {
      ...env
    };
    for (const key2 of Object.keys(env2)) {
      if (envRuntime[key2] !== void 0) {
        env2[key2] = envRuntime[key2];
      }
    }
    return env2;
  }
}
const sys = new ZovaSys();
setSys(sys);
{
  window.sys = sys;
}
const PluginBean = {
  install(app) {
    app.mixin({
      created() {
        const ctx = this._.zova;
        if (ctx) {
          ctx.meta.component.activate();
        }
      }
    });
  }
};
async function bootstrap(app, options) {
  await sys.initialize(options);
  app.use(PluginBean);
  app.use(PluginFreeze);
}
const ClientOnly = defineComponent({
  name: "ClientOnly",
  inheritAttrs: true,
  setup(_props, {
    slots
  }) {
    const isMounted = ref$1(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      if (isMounted.value === false) {
        return slots.placeholder?.();
      } else {
        return slots.default?.();
      }
    };
  }
});
class CtxComponent extends BeanSimple {
  constructor(...args) {
    super(...args);
    this._bean_render_original = void 0;
  }
  activate() {
    if (this.ctx.disposed) return;
    const renderMethod = "render";
    const self2 = this;
    const instance = cast(this.ctx.instance);
    this._bean_render_original = instance[renderMethod];
    instance[renderMethod] = function(...args) {
      if (instance.isUnmounted) return;
      if (!self2.ctx.meta.state.inited.state) {
        return self2._bean_render_original.call(this, ...args);
      }
      const render = self2._getRender();
      if (!render) {
        return self2._bean_render_original.call(this, ...args);
      }
      return render.render();
    };
    instance.type.ssrRender = null;
    instance.ssrRender = null;
  }
  /** @internal */
  dispose() {
    const renderMethod = "render";
    const instance = cast(this.ctx.instance);
    instance[renderMethod] = this._bean_render_original;
    this._bean_render_original = null;
  }
  _getRender() {
    const render = this.bean._getBeanSyncOnly(BeanControllerIdentifier);
    if (!render) return;
    render.__updateControllerData?.();
    if (render.render) return render;
    return this.bean._getBeanSyncOnly(BeanRenderIdentifier);
  }
}
const SymbolHooksFns = /* @__PURE__ */ Symbol("SymbolHooksFns");
const SymbolHooksState = /* @__PURE__ */ Symbol("SymbolHooksState");
class CtxHooks extends BeanSimple {
  constructor(...args) {
    super(...args);
    this[SymbolHooksFns] = {};
    this[SymbolHooksState] = {};
  }
  /** @internal */
  dispose() {
    this[SymbolHooksFns] = void 0;
  }
  onCreated(fn) {
    this._onHook("created", fn);
  }
  onMounted(fn) {
    this._onHook("mounted", fn);
  }
  _onHook(type2, fn) {
    if (this[SymbolHooksState][type2]) {
      this.ctx.util.instanceScope(fn);
    } else {
      if (!this[SymbolHooksFns][type2]) {
        this[SymbolHooksFns][type2] = [];
      }
      this[SymbolHooksFns][type2].push(fn);
    }
  }
  /** @internal */
  async invokeHook(type2) {
    this[SymbolHooksState][type2] = true;
    const fns = this[SymbolHooksFns][type2];
    if (!fns) return;
    this[SymbolHooksFns][type2] = void 0;
    for (const fn of fns) {
      await this.ctx.util.instanceScope(fn);
    }
  }
}
let __id = 0;
class CtxState extends BeanSimple {
  constructor(...args) {
    super(...args);
    this._id = void 0;
    this._inited = void 0;
  }
  __init__() {
    this._id = ++__id;
    this._inited = StateLock.create();
  }
  get id() {
    return this._id;
  }
  get inited() {
    return this._inited;
  }
}
class CtxMeta extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.state = void 0;
    this.component = void 0;
    this.hooks = void 0;
  }
  get el() {
    return this.ctx.instance.vnode.el;
  }
  /** @internal */
  initialize() {
    this.state = this.bean._newBeanSimple(CtxState, true);
    this.component = this.bean._newBeanSimple(CtxComponent, false);
    this.hooks = this.bean._newBeanSimple(CtxHooks, false);
  }
  /** @internal */
  dispose() {
    this.component.dispose();
    this.hooks.dispose();
  }
}
class CtxUtil extends BeanSimple {
  instanceScope(fn, tracking) {
    if (this.ctx.disposed) {
      const error = new Error();
      error.code = 600;
      throw error;
    }
    const reset = setCurrentInstance(this.ctx.instance);
    if (!tracking) {
      pauseTracking();
    }
    try {
      return fn();
    } finally {
      if (!tracking) {
        resetTracking();
      }
      reset();
    }
  }
}
class ZovaContext {
  // config: ContextConfig;
  constructor(instance) {
    this.instance = void 0;
    this.app = void 0;
    this.bean = void 0;
    this.util = void 0;
    this.meta = void 0;
    this.disposed = void 0;
    markRaw(this);
    instance.zova = this;
    this.instance = instance;
    this.app = instance.appContext.app.zova;
    this.bean = BeanContainer.create(sys, this.app, this);
    this.util = this.bean._newBeanSimple(CtxUtil, false);
    this.meta = this.bean._newBeanSimple(CtxMeta, false);
    this.meta.initialize();
    this._zovaHostProvidersInit();
  }
  /** @internal */
  dispose() {
    if (this.disposed) return;
    this.meta.dispose();
    cast(this.instance).zova = null;
    cast(this).instance = null;
    cast(this).app = null;
    cast(this).bean = null;
    cast(this).meta = null;
    this.disposed = true;
  }
  _zovaHostProvidersInit() {
    let zovaHostProviders = cast(this.instance).zovaHostProviders;
    if (!zovaHostProviders) {
      if (this.instance.parent?.type.name === "AsyncComponentWrapper") {
        zovaHostProviders = cast(this.instance.parent).zovaHostProviders;
      }
    }
    this._zovaHostProvidersUpdate_inner(zovaHostProviders);
  }
  _zovaHostProvidersUpdate(zovaHostProviders) {
    nextTick(() => {
      this._zovaHostProvidersUpdate_inner(zovaHostProviders);
    });
  }
  _zovaHostProvidersUpdate_inner(zovaHostProviders) {
    if (!this.bean || !zovaHostProviders) return;
    for (const key2 in zovaHostProviders) {
      const beanInstance = this.bean._getBeanSyncOnly(key2);
      if (beanInstance !== zovaHostProviders[key2]) {
        this.bean._setBean(key2, zovaHostProviders[key2]);
      }
    }
  }
}
function useControllerPage(controllerBeanFullName, renderBeanFullName, styleBeanFullName) {
  const controllerData = {
    context: {}
  };
  _useController(controllerData, controllerBeanFullName, renderBeanFullName, styleBeanFullName);
}
function useController(controllerBeanFullName, renderBeanFullName, styleBeanFullName) {
  const slots = useSlots();
  const controllerData = {
    context: {
      slots
    }
  };
  _useController(controllerData, controllerBeanFullName, renderBeanFullName, styleBeanFullName);
}
async function _useController(controllerData, controllerBeanFullName, renderBeanFullName, styleBeanFullName) {
  const ctx = new ZovaContext(getCurrentInstance());
  if (ctx.app) {
    ctx.app.meta.module._monkeyModuleSync(true, "appContextInitialize", void 0, ctx);
  } else {
    sys.meta.module._monkeyModuleSync(true, "sysContextInitialize", void 0, ctx);
  }
  if (ctx.app) {
    ctx.app.meta.module._monkeyModuleSync(true, "controllerDataPrepare", void 0, controllerData, ctx);
  }
  {
    onBeforeUnmount(() => {
      if (ctx.disposed) return;
      setControllerRef(ctx, false);
      if (ctx.bean !== ctx.app.bean) {
        ctx.bean.dispose();
      }
    });
    onUnmounted(() => {
      ctx.dispose();
    });
  }
  async function __load() {
    if (ctx.disposed) return;
    await ctx.bean._newBeanInner(true, BeanControllerIdentifier, controllerData, void 0, controllerBeanFullName, true, false);
    if (styleBeanFullName) {
      if (ctx.disposed) return;
      await ctx.bean._newBeanInner(true, BeanStyleIdentifier, void 0, void 0, styleBeanFullName, true, false);
    }
    if (renderBeanFullName) {
      if (ctx.disposed) return;
      await ctx.bean._newBeanInner(true, BeanRenderIdentifier, void 0, void 0, renderBeanFullName, true, false);
    }
    if (ctx.disposed) return;
    ctx.meta.state.inited.touch();
    {
      ctx.util.instanceScope(() => {
        queuePostFlushCb(() => {
          setControllerRef(ctx, true);
          ctx.meta.hooks.invokeHook("mounted");
        });
      });
    }
  }
  ctx.meta.hooks.onCreated(async () => {
    if (ctx.disposed) return;
    try {
      return await __load();
    } catch (err) {
      if (ctx.disposed) return;
      throw err;
    }
  });
  {
    ctx.meta.hooks.invokeHook("created");
  }
}
function setControllerRef(ctx, on) {
  const controller = ctx.bean?._getBeanSyncOnly(BeanControllerIdentifier);
  if (!controller || controller[SymbolControllerRefDisable]) return;
  const controllerRef = controller.ctx.instance.vnode.props?.controllerRef;
  if (controllerRef) {
    controllerRef(on ? controller : void 0);
  }
}
function createZovaComponentPage(controller, render, style) {
  return defineComponent(() => {
    useControllerPage(controller, render, style);
    return () => {
    };
  });
}
function prepareComponentOptions(componentOptions) {
  return Object.assign({
    inheritAttrs: "auto"
  }, componentOptions);
}
function useApp() {
  const instance = getCurrentInstance();
  return instance?.appContext.app.zova;
}
class AppComponent extends BeanSimple {
  /** @internal */
  async initialize() {
  }
  /** @internal */
  _registerComponents(_moduleName, components) {
    if (!components) return;
    for (const key2 in components) {
      const component = components[key2];
      this._setComponentGlobal(component);
    }
  }
  _setComponentGlobal(component) {
    const options = component;
    if (component.name && options.meta?.global === true) {
      if (!this.app.vue.component(component.name)) {
        this.app.vue.component(component.name, component);
      }
    }
    return component;
  }
}
class AppError extends ErrorClass {
  /** @internal */
  async initialize() {
    await super.initialize();
    this.app.vue.config.errorHandler = (err, instance, info) => {
      return this._handleError(err, instance, info);
    };
    {
      window.addEventListener("unhandledrejection", (event) => {
        event.preventDefault();
        this._handleUnhandledError(event.reason, "unhandledrejection");
        return false;
      });
      window.addEventListener("error", (event) => {
        event.preventDefault();
        this._handleUnhandledError(event.error, "unhandlederror");
        return false;
      });
    }
  }
  /** @internal */
  createScopeError(moduleScope, errorCode) {
    const self2 = this;
    return {
      throw: (...args) => {
        return self2.throw(moduleScope, errorCode, ...args);
      },
      parseFail: (...args) => {
        return self2.parseFail(moduleScope, errorCode, ...args);
      }
    };
  }
  _handleUnhandledError(error, infoDefault) {
    if (error instanceof Error) {
      const errorInfo = error[SymbolErrorInstanceInfo];
      if (errorInfo) {
        delete error[SymbolErrorInstanceInfo];
      }
      this.app.vue.config.errorHandler(error, errorInfo?.instance, errorInfo?.info || infoDefault);
    }
  }
  _handleError(err, instance, info) {
    if (!this.app) {
      console.error(err);
      return;
    }
    const err2 = this.app.meta.event.emitSync("app:errorHandler", {
      err,
      instance,
      info
    }, (data) => {
      return data.err;
    });
    {
      if (!err2 || !(err2 instanceof Error)) return err2;
      if (!info || !["useMutationData"].includes(info)) {
        console.error(err2);
      }
    }
    return err2;
  }
}
class AppModule extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.modules = shallowReactive({});
    this.mainInstances = {};
    this.monkeyInstances = {};
  }
  /** @internal */
  async initialize() {
    await this._requireAllSpecifics("preload");
    await this._requireAllSpecifics("monkey");
    await this._requireAllSpecifics("sync");
  }
  get(moduleName, forceLoad) {
    if (!moduleName) return void 0;
    const moduleInfo = typeof moduleName === "string" ? parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    const module = this.modules[moduleInfo.relativeName];
    if (!module) {
      if (forceLoad !== false) {
        this.use(moduleInfo.relativeName);
      }
      return void 0;
    }
    if (!module[SymbolInstalled] || !module[SymbolInstalled].state) {
      return void 0;
    }
    return this.sys.meta.module.get(moduleName);
  }
  async use(moduleName) {
    if (!moduleName) throw new Error("should specify the module name");
    const moduleInfo = typeof moduleName === "string" ? parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    const relativeName = moduleInfo.relativeName;
    const moduleRepo = this.sys.meta.module.modulesMeta.modules[relativeName];
    if (!moduleRepo) throw new Error(`module not exists: ${relativeName}`);
    await this._install(relativeName, moduleRepo);
    return moduleRepo;
  }
  exists(moduleName) {
    return this.sys.meta.module.exists(moduleName);
  }
  async _requireAllSpecifics(capabilityName) {
    const moduleNames = this.sys.meta.module.modulesMeta.moduleNames.filter((moduleName) => {
      const module = this.sys.meta.module.modulesMeta.modules[moduleName];
      return module.info.capabilities?.[capabilityName];
    });
    for (const moduleName of moduleNames) {
      const module = this.sys.meta.module.modulesMeta.modules[moduleName];
      await this._install(moduleName, module);
    }
  }
  async _install(moduleName, moduleRepo) {
    await this.sys.meta.module._install(moduleName, moduleRepo);
    if (this.modules[moduleName]) {
      const module2 = this.modules[moduleName];
      if (module2[SymbolInstalled].state) return;
      await module2[SymbolInstalled].wait();
      await this.app.bean._getBean(`${moduleName}.scope.module`, false);
      return;
    }
    const module = {
      [SymbolInstalled]: StateLock.create()
    };
    this.modules[moduleName] = module;
    await this._installInner(moduleName, moduleRepo);
    module[SymbolInstalled].touch();
    await this.app.bean._getBean(`${moduleName}.scope.module`, false);
    await this._monkeyModule(true, "moduleLoaded", moduleRepo);
  }
  async _installInner(moduleName, moduleRepo) {
    if (moduleRepo.resource.Main) {
      this.mainInstances[moduleName] = this.app.bean._newBeanSimple(moduleRepo.resource.Main, false, moduleRepo);
    }
    if (moduleRepo.resource.Monkey) {
      this.monkeyInstances[moduleName] = this.app.bean._newBeanSimple(moduleRepo.resource.Monkey, false, moduleRepo);
    }
    await this._monkeyModule(true, "moduleLoading", moduleRepo);
    await this._registerResources(moduleRepo);
  }
  async _registerResources(module) {
    this._registerComponents(module);
  }
  _registerComponents(module) {
    this.app.meta.component._registerComponents(module.info.relativeName, module.resource.components);
  }
  /** @internal */
  async _monkeyModule(order, monkeyName, moduleTarget, ...monkeyData) {
    if (moduleTarget) {
      const mainInstance = this.mainInstances[moduleTarget.info.relativeName];
      if (mainInstance && mainInstance[monkeyName]) {
        await this.app.vue.runWithContext(async () => {
          await mainInstance[monkeyName](...monkeyData);
        });
      }
    }
    await forEach$1(this.sys.meta.module.modulesMeta.moduleNames, order, async (key2) => {
      const moduleMonkey = this.sys.meta.module.modulesMeta.modules[key2];
      if (moduleMonkey.info.capabilities?.monkey) {
        const monkeyInstance = this.monkeyInstances[key2];
        if (monkeyInstance && monkeyInstance[monkeyName]) {
          await this.app.vue.runWithContext(async () => {
            if (moduleTarget === void 0) {
              await monkeyInstance[monkeyName](...monkeyData);
            } else {
              await monkeyInstance[monkeyName](moduleTarget, ...monkeyData);
            }
          });
        }
      }
    });
    const appMonkey = this.app.meta.appMonkey;
    if (appMonkey && appMonkey[monkeyName]) {
      await this.app.vue.runWithContext(async () => {
        if (moduleTarget === void 0) {
          await appMonkey[monkeyName](...monkeyData);
        } else {
          await appMonkey[monkeyName](moduleTarget, ...monkeyData);
        }
      });
    }
  }
  /** @internal */
  _monkeyModuleSync(order, monkeyName, moduleTarget, ...monkeyData) {
    if (moduleTarget) {
      const mainInstance = this.mainInstances[moduleTarget.info.relativeName];
      if (mainInstance && mainInstance[monkeyName]) {
        this.app.vue.runWithContext(async () => {
          mainInstance[monkeyName](...monkeyData);
        });
      }
    }
    forEachSync(this.sys.meta.module.modulesMeta.moduleNames, order, (key2) => {
      const moduleMonkey = this.sys.meta.module.modulesMeta.modules[key2];
      if (moduleMonkey.info.capabilities?.monkey) {
        const monkeyInstance = this.monkeyInstances[key2];
        if (monkeyInstance && monkeyInstance[monkeyName]) {
          this.app.vue.runWithContext(async () => {
            if (moduleTarget === void 0) {
              monkeyInstance[monkeyName](...monkeyData);
            } else {
              monkeyInstance[monkeyName](moduleTarget, ...monkeyData);
            }
          });
        }
      }
    });
    const appMonkey = this.app.meta.appMonkey;
    if (appMonkey && appMonkey[monkeyName]) {
      this.app.vue.runWithContext(async () => {
        if (moduleTarget === void 0) {
          appMonkey[monkeyName](...monkeyData);
        } else {
          appMonkey[monkeyName](moduleTarget, ...monkeyData);
        }
      });
    }
  }
}
class AppMeta extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.module = void 0;
    this.component = void 0;
    this.locale = void 0;
    this.error = void 0;
    this.event = void 0;
    this.cookie = void 0;
    this.text = void 0;
    this.appMonkey = void 0;
  }
  __init__() {
    this.module = this.app.bean._newBeanSimple(AppModule, false);
    this.component = this.app.bean._newBeanSimple(AppComponent, false);
    this.locale = this.app.bean._newBeanSimple(AppLocale, false);
    this.error = this.app.bean._newBeanSimple(AppError, false);
    this.event = this.app.bean._newBeanSimple(AppEvent, false);
    this.cookie = this.app.bean._newBeanSimple(AppCookie, false);
    this.text = this.locale.createLocaleText();
  }
  /** @internal */
  async initialize(AppMonkey) {
    if (AppMonkey) {
      this.appMonkey = this.bean._newBeanSimple(AppMonkey, false);
    }
  }
}
class AppUtil extends BeanSimple {
  setLocaleErrors(localeErrors, localeDefault) {
    return zodSetLocaleErrors(this.app, localeErrors, localeDefault);
  }
}
const SymbolAppClose = /* @__PURE__ */ Symbol("SymbolAppClose");
class ZovaApplication {
  constructor(vue, ctxRoot) {
    this._reloadDelayTimer = 0;
    this[SymbolAppClose] = void 0;
    this.vue = void 0;
    this.bean = void 0;
    this.util = void 0;
    this.meta = void 0;
    this.ctx = void 0;
    markRaw(this);
    vue.zova = this;
    this.vue = vue;
    this.ctx = ctxRoot;
    this.bean = ctxRoot.bean;
    cast(this.bean).app = this;
    ctxRoot.app = this;
    this.util = this.bean._newBeanSimple(AppUtil, false);
    this.meta = this.bean._newBeanSimple(AppMeta, false);
    cast(ctxRoot.instance.appContext).reload = () => {
      this.reloadDelay();
    };
    {
      zodEnhance(this);
    }
  }
  /** @internal */
  async initialize({
    AppMonkey
  }) {
    sys.meta.module._monkeyModuleSync(true, "sysApplicationInitialize", void 0, this);
    await this.meta.initialize(AppMonkey);
    await this.meta.component.initialize();
    await this.meta.locale.initialize();
    await this.meta.error.initialize();
    await this.meta.module.initialize();
    await this.meta.module._monkeyModule(true, "appInitialize");
    await this.meta.module._monkeyModule(true, "appInitialized");
    await this.meta.module._monkeyModule(true, "appReady");
  }
  get sys() {
    return sys;
  }
  reload() {
    window.location.reload();
  }
  reloadDelay(cancel) {
    if (cancel) {
      if (this._reloadDelayTimer !== 0) {
        window.clearTimeout(this._reloadDelayTimer);
        this._reloadDelayTimer = 0;
      }
    } else {
      this.reloadDelay(true);
      this._reloadDelayTimer = window.setTimeout(() => {
        this.reload();
      }, 100);
    }
  }
  throw(code, ...args) {
    return this.meta.error.throw(void 0, code, ...args);
  }
  close() {
    if (this[SymbolAppClose]) return;
    this[SymbolAppClose] = true;
    this.meta.module._monkeyModuleSync(false, "appClose");
    this.bean.dispose();
    this.ctx.dispose();
  }
}
const SymbolLoggerMessage = /* @__PURE__ */ Symbol("SymbolLoggerMessage");
const formatLoggerFilter = format$2((info, opts) => {
  const level = typeof opts.level === "function" ? opts.level() : opts.level;
  if (!level) return false;
  if (opts.strict) {
    if (NpmConfigSetLevels[info.level] === NpmConfigSetLevels[level]) return __formatLoggerFilterCheckInfo(info);
    return false;
  }
  if (NpmConfigSetLevels[info.level] <= NpmConfigSetLevels[level] || opts.silly && info.level === "silly") return __formatLoggerFilterCheckInfo(info);
  return false;
});
const formatLoggerConsole = () => {
  return print(({
    timestamp: timestamp2,
    level,
    stack: stack2,
    message,
    name,
    beanFullName,
    durationMs,
    ...meta
  }) => {
    const textName = name ? ` ${colorize("verbose", `[${name}]`)}` : "";
    const textBeanFullName = beanFullName ? ` ${colorize("tip", `[${beanFullName}]`)}` : "";
    const textMessage = ` ${message}`;
    const textDurationMs = durationMs !== void 0 ? ` ${colorize("verbose", `+${durationMs}ms`)}` : "";
    const textStack = stack2 ? `
${stack2}` : "";
    const result = [`${timestamp2} ${level}${textName}${textBeanFullName}${textMessage}${textDurationMs}${textStack}`];
    if (!isEmptyObject(meta)) {
      const meta2 = {};
      for (const key2 in meta) {
        meta2[key2] = meta[key2];
      }
      result.push(meta2);
    }
    return result;
  });
};
function __formatLoggerFilterCheckInfo(info) {
  if (typeof info.message === "function") {
    if (info.message[SymbolLoggerMessage] === void 0) {
      info.message[SymbolLoggerMessage] = info.message();
    }
    info.message = info.message[SymbolLoggerMessage];
  }
  return info;
}
const PluginZova = {
  async install(vue, ctxRoot, {
    modulesMeta,
    locales,
    config,
    env,
    SysMonkey,
    AppMonkey,
    legacyRoutes
  }) {
    const app = new ZovaApplication(vue, ctxRoot);
    await app.initialize({
      modulesMeta,
      locales,
      config,
      env,
      SysMonkey,
      AppMonkey,
      legacyRoutes
    });
    return app;
  },
  async update(app, ctxRoot) {
    const bean = cast(app.bean);
    bean.ctx = ctxRoot;
    for (const key2 in bean[SymbolBeanContainerInstances]) {
      bean[SymbolBeanContainerInstances][key2].ctx = ctxRoot;
    }
    delete bean[SymbolBeanContainerInstances][BeanControllerIdentifier];
    delete bean[SymbolBeanContainerInstances][BeanRenderIdentifier];
    delete bean[SymbolBeanContainerInstances][BeanStyleIdentifier];
    Object.assign(bean[SymbolBeanContainerInstances], ctxRoot.bean[SymbolBeanContainerInstances]);
    ctxRoot.bean = bean;
    ctxRoot.app = app;
  }
};
function $customKey(key2) {
  return key2;
}
function useCustomRef(factory) {
  return customRef(factory);
}
function swapDeps(items, options) {
  const depsDynamic = _handleDependents(items, options);
  while (true) {
    if (!_swapDeps(depsDynamic, items, options)) break;
  }
}
function _handleDependents(items, options) {
  const keyDependents = options?.dependents || "dependents";
  const keyName = options?.name;
  const depsDynamic = {};
  for (const item of items) {
    const itemName = _getProperty(item, keyName);
    let dependents = typeof keyDependents === "function" ? keyDependents(item) : _getProperty(item, keyDependents);
    if (!dependents) continue;
    if (!Array.isArray(dependents)) {
      dependents = dependents.split(",");
    }
    for (const dep of dependents) {
      if (!depsDynamic[dep]) depsDynamic[dep] = [];
      if (depsDynamic[dep].findIndex((item2) => item2 === itemName) === -1) {
        depsDynamic[dep].push(itemName);
      }
    }
  }
  return depsDynamic;
}
function _swapDeps(depsDynamic, items, options) {
  const keyDependencies = options?.dependencies || "dependencies";
  const keyName = options?.name;
  let result = false;
  for (const item of items) {
    const name = _getProperty(item, keyName);
    let deps = (typeof keyDependencies === "function" ? keyDependencies(item) : _getProperty(item, keyDependencies)) || [];
    if (typeof deps === "string") deps = deps.split(",");
    if (depsDynamic[name]) {
      for (const depDynamic of depsDynamic[name]) {
        if (deps.findIndex((item2) => item2 === depDynamic) === -1) {
          deps.push(depDynamic);
        }
      }
    }
    for (const dep of deps) {
      if (_swapDep(items, dep, name, keyName)) result = true;
    }
  }
  return result;
}
function _swapDep(arr, a, b, keyName) {
  const indexA = arr.findIndex((item) => _getProperty(item, keyName) === a);
  const indexB = arr.findIndex((item) => _getProperty(item, keyName) === b);
  if (indexA === -1 || indexB === -1 || indexA < indexB) return false;
  arr.splice(indexB, 0, arr.splice(indexA, 1)[0]);
  return true;
}
function _getProperty(obj, name) {
  if (!obj) return void 0;
  const names = name.split(".");
  for (const name2 of names) {
    if (obj[name2] === void 0 || obj[name2] === null) {
      obj = obj[name2];
      break;
    }
    obj = obj[name2];
  }
  return obj;
}
const parseAnyOf = (schema, refs) => {
  return schema.anyOf.length ? schema.anyOf.length === 1 ? parseSchema(schema.anyOf[0], {
    ...refs,
    path: [...refs.path, "anyOf", 0]
  }) : `z.union([${schema.anyOf.map((schema2, i) => parseSchema(schema2, { ...refs, path: [...refs.path, "anyOf", i] })).join(", ")}])` : `z.any()`;
};
const parseBoolean = (_schema) => {
  return "z.boolean()";
};
const parseDefault = (_schema) => {
  return "z.any()";
};
const parseMultipleType = (schema, refs) => {
  return `z.union([${schema.type.map((type2) => parseSchema({ ...schema, type: type2 }, { ...refs, withoutDefaults: true })).join(", ")}])`;
};
const parseNot = (schema, refs) => {
  return `z.any().refine((value) => !${parseSchema(schema.not, {
    ...refs,
    path: [...refs.path, "not"]
  })}.safeParse(value).success, "Invalid input: Should NOT be valid against schema")`;
};
const parseNull = (_schema) => {
  return "z.null()";
};
const half = (arr) => {
  return [arr.slice(0, arr.length / 2), arr.slice(arr.length / 2)];
};
const originalIndex = /* @__PURE__ */ Symbol("Original index");
const ensureOriginalIndex = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (typeof item === "boolean") {
      newArr.push(item ? { [originalIndex]: i } : { [originalIndex]: i, not: {} });
    } else if (originalIndex in item) {
      return arr;
    } else {
      newArr.push({ ...item, [originalIndex]: i });
    }
  }
  return newArr;
};
function parseAllOf(schema, refs) {
  if (schema.allOf.length === 0) {
    return "z.never()";
  } else if (schema.allOf.length === 1) {
    const item = schema.allOf[0];
    return parseSchema(item, {
      ...refs,
      path: [...refs.path, "allOf", item[originalIndex]]
    });
  } else {
    const [left, right] = half(ensureOriginalIndex(schema.allOf));
    return `z.intersection(${parseAllOf({ allOf: left }, refs)}, ${parseAllOf({
      allOf: right
    }, refs)})`;
  }
}
function withMessage(schema, key2, get2) {
  const value = schema[key2];
  let r = "";
  if (key2 === "default" || value !== void 0) {
    const got = get2({ value, json: JSON.stringify(value) });
    if (got) {
      const opener = got[0];
      const prefix = got.length === 3 ? got[1] : "";
      const closer = got.length === 3 ? got[2] : got[1];
      r += opener;
      if (schema.errorMessage?.[key2] !== void 0) {
        r += prefix + JSON.stringify(schema.errorMessage[key2]);
      }
      r += closer;
    }
  }
  return r;
}
const parseArray = (schema, refs) => {
  if (Array.isArray(schema.items)) {
    return `z.tuple([${schema.items.map((v, i) => parseSchema(v, { ...refs, path: [...refs.path, "items", i] }))}])`;
  }
  let r = !schema.items ? "z.array(z.any())" : `z.array(${parseSchema(schema.items, {
    ...refs,
    path: [...refs.path, "items"]
  })})`;
  r += withMessage(schema, "minItems", ({ json }) => [
    `.min(${json}`,
    ", ",
    ")"
  ]);
  r += withMessage(schema, "maxItems", ({ json }) => [
    `.max(${json}`,
    ", ",
    ")"
  ]);
  return r;
};
const parseConst = (schema) => {
  return `z.literal(${JSON.stringify(schema.const)})`;
};
const parseEnum = (schema) => {
  if (schema.enum.length === 0) {
    return "z.never()";
  } else if (schema.enum.length === 1) {
    return `z.literal(${JSON.stringify(schema.enum[0])})`;
  } else if (schema.enum.every((x) => typeof x === "string")) {
    return `z.enum([${schema.enum.map((x) => JSON.stringify(x))}])`;
  } else {
    return `z.union([${schema.enum.map((x) => `z.literal(${JSON.stringify(x)})`).join(", ")}])`;
  }
};
const parseIfThenElse = (schema, refs) => {
  const $if = parseSchema(schema.if, { ...refs, path: [...refs.path, "if"] });
  const $then = parseSchema(schema.then, {
    ...refs,
    path: [...refs.path, "then"]
  });
  const $else = parseSchema(schema.else, {
    ...refs,
    path: [...refs.path, "else"]
  });
  return `z.union([${$then}, ${$else}]).superRefine((value,ctx) => {
  const result = ${$if}.safeParse(value).success
    ? ${$then}.safeParse(value)
    : ${$else}.safeParse(value);
  if (!result.success) {
    result.error.errors.forEach((error) => ctx.addIssue(error))
  }
})`;
};
const parseNumber = (schema) => {
  let r = withMessage(schema, "default", () => ["z.number(", ")"]);
  if (schema.type === "integer") {
    r += withMessage(schema, "type", () => [".int(", ")"]);
  } else {
    r += withMessage(schema, "format", ({ value }) => {
      if (value === "int64") {
        return [".int(", ")"];
      }
    });
  }
  r += withMessage(schema, "multipleOf", ({ value, json }) => {
    if (value === 1) {
      if (r.startsWith("z.number().int(")) {
        return;
      }
      return [".int(", ")"];
    }
    return [`.multipleOf(${json}`, ", ", ")"];
  });
  if (typeof schema.minimum === "number") {
    if (schema.exclusiveMinimum === true) {
      r += withMessage(schema, "minimum", ({ json }) => [
        `.gt(${json}`,
        ", ",
        ")"
      ]);
    } else {
      r += withMessage(schema, "minimum", ({ json }) => [
        `.gte(${json}`,
        ", ",
        ")"
      ]);
    }
  } else if (typeof schema.exclusiveMinimum === "number") {
    r += withMessage(schema, "exclusiveMinimum", ({ json }) => [
      `.gt(${json}`,
      ", ",
      ")"
    ]);
  }
  if (typeof schema.maximum === "number") {
    if (schema.exclusiveMaximum === true) {
      r += withMessage(schema, "maximum", ({ json }) => [
        `.lt(${json}`,
        ", ",
        ")"
      ]);
    } else {
      r += withMessage(schema, "maximum", ({ json }) => [
        `.lte(${json}`,
        ", ",
        ")"
      ]);
    }
  } else if (typeof schema.exclusiveMaximum === "number") {
    r += withMessage(schema, "exclusiveMaximum", ({ json }) => [
      `.lt(${json}`,
      ", ",
      ")"
    ]);
  }
  return r;
};
const parseOneOf = (schema, refs) => {
  return schema.oneOf.length ? schema.oneOf.length === 1 ? parseSchema(schema.oneOf[0], {
    ...refs,
    path: [...refs.path, "oneOf", 0]
  }) : `z.any().superRefine((x, ctx) => {
    const schemas = [${schema.oneOf.map((schema2, i) => parseSchema(schema2, {
    ...refs,
    path: [...refs.path, "oneOf", i]
  })).join(", ")}];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        path: ctx.path,
        code: "invalid_union",
        unionErrors: errors,
        message: "Invalid input: Should pass single schema",
      });
    }
  })` : "z.any()";
};
const expandJsdocs = (jsdocs) => {
  const lines = jsdocs.split("\n");
  const result = lines.length === 1 ? lines[0] : `
${lines.map((x) => `* ${x}`).join("\n")}
`;
  return `/**${result}*/
`;
};
const addJsdocs = (schema, parsed) => {
  const description = schema.description;
  if (!description) {
    return parsed;
  }
  return `
${expandJsdocs(description)}${parsed}`;
};
function parseObject(objectSchema, refs) {
  let properties = void 0;
  if (objectSchema.properties) {
    if (!Object.keys(objectSchema.properties).length) {
      properties = "z.object({})";
    } else {
      properties = "z.object({ ";
      properties += Object.keys(objectSchema.properties).map((key2) => {
        const propSchema = objectSchema.properties[key2];
        let result = `${JSON.stringify(key2)}: ${parseSchema(propSchema, {
          ...refs,
          path: [...refs.path, "properties", key2]
        })}`;
        if (refs.withJsdocs && typeof propSchema === "object") {
          result = addJsdocs(propSchema, result);
        }
        const hasDefault = typeof propSchema === "object" && propSchema.default !== void 0;
        const required = Array.isArray(objectSchema.required) ? objectSchema.required.includes(key2) : typeof propSchema === "object" && propSchema.required === true;
        const optional = !hasDefault && !required;
        return optional ? `${result}.optional()` : result;
      }).join(", ");
      properties += " })";
    }
  }
  const additionalProperties = objectSchema.additionalProperties !== void 0 ? parseSchema(objectSchema.additionalProperties, {
    ...refs,
    path: [...refs.path, "additionalProperties"]
  }) : void 0;
  let patternProperties = void 0;
  if (objectSchema.patternProperties) {
    const parsedPatternProperties = Object.fromEntries(Object.entries(objectSchema.patternProperties).map(([key2, value]) => {
      return [
        key2,
        parseSchema(value, {
          ...refs,
          path: [...refs.path, "patternProperties", key2]
        })
      ];
    }, {}));
    patternProperties = "";
    if (properties) {
      if (additionalProperties) {
        patternProperties += `.catchall(z.union([${[
          ...Object.values(parsedPatternProperties),
          additionalProperties
        ].join(", ")}]))`;
      } else if (Object.keys(parsedPatternProperties).length > 1) {
        patternProperties += `.catchall(z.union([${Object.values(parsedPatternProperties).join(", ")}]))`;
      } else {
        patternProperties += `.catchall(${Object.values(parsedPatternProperties)})`;
      }
    } else {
      if (additionalProperties) {
        patternProperties += `z.record(z.string(), z.union([${[
          ...Object.values(parsedPatternProperties),
          additionalProperties
        ].join(", ")}]))`;
      } else if (Object.keys(parsedPatternProperties).length > 1) {
        patternProperties += `z.record(z.string(), z.union([${Object.values(parsedPatternProperties).join(", ")}]))`;
      } else {
        patternProperties += `z.record(z.string(), ${Object.values(parsedPatternProperties)})`;
      }
    }
    patternProperties += ".superRefine((value, ctx) => {\n";
    patternProperties += "for (const key in value) {\n";
    if (additionalProperties) {
      if (objectSchema.properties) {
        patternProperties += `let evaluated = [${Object.keys(objectSchema.properties).map((key2) => JSON.stringify(key2)).join(", ")}].includes(key)
`;
      } else {
        patternProperties += `let evaluated = false
`;
      }
    }
    for (const key2 in objectSchema.patternProperties) {
      patternProperties += "if (key.match(new RegExp(" + JSON.stringify(key2) + "))) {\n";
      if (additionalProperties) {
        patternProperties += "evaluated = true\n";
      }
      patternProperties += "const result = " + parsedPatternProperties[key2] + ".safeParse(value[key])\n";
      patternProperties += "if (!result.success) {\n";
      patternProperties += `ctx.addIssue({
          path: [key],
          code: 'custom',
          message: \`Invalid input: Key matching regex /\${key}/ must match schema\`,
          params: {
            issues: result.error.issues
          }
        })
`;
      patternProperties += "}\n";
      patternProperties += "}\n";
    }
    if (additionalProperties) {
      patternProperties += "if (!evaluated) {\n";
      patternProperties += "const result = " + additionalProperties + ".safeParse(value[key])\n";
      patternProperties += "if (!result.success) {\n";
      patternProperties += `ctx.addIssue({
          path: [key],
          code: 'custom',
          message: \`Invalid input: must match catchall schema\`,
          params: {
            issues: result.error.issues
          }
        })
`;
      patternProperties += "}\n";
      patternProperties += "}\n";
    }
    patternProperties += "}\n";
    patternProperties += "})";
  }
  let output = properties ? patternProperties ? properties + patternProperties : additionalProperties ? additionalProperties === "z.never()" ? properties + ".strict()" : properties + `.catchall(${additionalProperties})` : properties : patternProperties ? patternProperties : additionalProperties ? `z.record(z.string(), ${additionalProperties})` : "z.record(z.string(), z.any())";
  if (its.an.anyOf(objectSchema)) {
    output += `.and(${parseAnyOf({
      ...objectSchema,
      anyOf: objectSchema.anyOf.map((x) => typeof x === "object" && !x.type && (x.properties || x.additionalProperties || x.patternProperties) ? { ...x, type: "object" } : x)
    }, refs)})`;
  }
  if (its.a.oneOf(objectSchema)) {
    output += `.and(${parseOneOf({
      ...objectSchema,
      oneOf: objectSchema.oneOf.map((x) => typeof x === "object" && !x.type && (x.properties || x.additionalProperties || x.patternProperties) ? { ...x, type: "object" } : x)
    }, refs)})`;
  }
  if (its.an.allOf(objectSchema)) {
    output += `.and(${parseAllOf({
      ...objectSchema,
      allOf: objectSchema.allOf.map((x) => typeof x === "object" && !x.type && (x.properties || x.additionalProperties || x.patternProperties) ? { ...x, type: "object" } : x)
    }, refs)})`;
  }
  return output;
}
const parseString = (schema) => {
  let r = withMessage(schema, "default", () => ["z.string(", ")"]);
  r += withMessage(schema, "format", ({ value }) => {
    switch (value) {
      case "email":
        return [".email(", ")"];
      case "ip":
        return [".ip(", ")"];
      case "ipv4":
        return ['.ip({ version: "v4"', ", message: ", " })"];
      case "ipv6":
        return ['.ip({ version: "v6"', ", message: ", " })"];
      case "uri":
        return [".url(", ")"];
      case "uuid":
        return [".uuid(", ")"];
      case "date-time":
        return [".datetime({ offset: true", ", message: ", " })"];
      case "time":
        return [".time(", ")"];
      case "date":
        return [".date(", ")"];
      case "binary":
        return [".base64(", ")"];
      case "duration":
        return [".duration(", ")"];
    }
  });
  r += withMessage(schema, "pattern", ({ json }) => [
    `.regex(new RegExp(${json})`,
    ", ",
    ")"
  ]);
  r += withMessage(schema, "minLength", ({ json }) => [
    `.min(${json}`,
    ", ",
    ")"
  ]);
  r += withMessage(schema, "maxLength", ({ json }) => [
    `.max(${json}`,
    ", ",
    ")"
  ]);
  r += withMessage(schema, "contentEncoding", ({ value }) => {
    if (value === "base64") {
      return [".base64(", ")"];
    }
  });
  const contentMediaType = withMessage(schema, "contentMediaType", ({ value }) => {
    if (value === "application/json") {
      return [
        '.transform((str, ctx) => { try { return JSON.parse(str); } catch (err) { ctx.addIssue({ code: "custom", message: "Invalid JSON" }); }}',
        ", ",
        ")"
      ];
    }
  });
  if (contentMediaType != "") {
    r += contentMediaType;
    r += withMessage(schema, "contentSchema", ({ value }) => {
      if (value && value instanceof Object) {
        return [`.pipe(${parseSchema(value)}`, ", ", ")"];
      }
    });
  }
  return r;
};
const omit = (obj, ...keys) => Object.keys(obj).reduce((acc, key2) => {
  if (!keys.includes(key2)) {
    acc[key2] = obj[key2];
  }
  return acc;
}, {});
const parseNullable = (schema, refs) => {
  return `${parseSchema(omit(schema, "nullable"), refs, true)}.nullable()`;
};
const parseSchema = (schema, refs = { seen: /* @__PURE__ */ new Map(), path: [] }, blockMeta) => {
  if (typeof schema !== "object")
    return schema ? "z.any()" : "z.never()";
  if (refs.parserOverride) {
    const custom = refs.parserOverride(schema, refs);
    if (typeof custom === "string") {
      return custom;
    }
  }
  let seen = refs.seen.get(schema);
  if (seen) {
    if (seen.r !== void 0) {
      return seen.r;
    }
    if (refs.depth === void 0 || seen.n >= refs.depth) {
      return "z.any()";
    }
    seen.n += 1;
  } else {
    seen = { r: void 0, n: 0 };
    refs.seen.set(schema, seen);
  }
  let parsed = selectParser(schema, refs);
  if (!blockMeta) {
    if (!refs.withoutDescribes) {
      parsed = addDescribes(schema, parsed);
    }
    if (!refs.withoutDefaults) {
      parsed = addDefaults(schema, parsed);
    }
    parsed = addAnnotations(schema, parsed);
  }
  seen.r = parsed;
  return parsed;
};
const addDescribes = (schema, parsed) => {
  if (schema.description) {
    parsed += `.describe(${JSON.stringify(schema.description)})`;
  }
  return parsed;
};
const addDefaults = (schema, parsed) => {
  if (schema.default !== void 0) {
    parsed += `.default(${JSON.stringify(schema.default)})`;
  }
  return parsed;
};
const addAnnotations = (schema, parsed) => {
  if (schema.readOnly) {
    parsed += ".readonly()";
  }
  return parsed;
};
const selectParser = (schema, refs) => {
  if (its.a.nullable(schema)) {
    return parseNullable(schema, refs);
  } else if (its.an.object(schema)) {
    return parseObject(schema, refs);
  } else if (its.an.array(schema)) {
    return parseArray(schema, refs);
  } else if (its.an.anyOf(schema)) {
    return parseAnyOf(schema, refs);
  } else if (its.an.allOf(schema)) {
    return parseAllOf(schema, refs);
  } else if (its.a.oneOf(schema)) {
    return parseOneOf(schema, refs);
  } else if (its.a.not(schema)) {
    return parseNot(schema, refs);
  } else if (its.an.enum(schema)) {
    return parseEnum(schema);
  } else if (its.a.const(schema)) {
    return parseConst(schema);
  } else if (its.a.multipleType(schema)) {
    return parseMultipleType(schema, refs);
  } else if (its.a.primitive(schema, "string")) {
    return parseString(schema);
  } else if (its.a.primitive(schema, "number") || its.a.primitive(schema, "integer")) {
    return parseNumber(schema);
  } else if (its.a.primitive(schema, "boolean")) {
    return parseBoolean();
  } else if (its.a.primitive(schema, "null")) {
    return parseNull();
  } else if (its.a.conditional(schema)) {
    return parseIfThenElse(schema, refs);
  } else {
    return parseDefault();
  }
};
const its = {
  an: {
    object: (x) => x.type === "object",
    array: (x) => x.type === "array",
    anyOf: (x) => x.anyOf !== void 0,
    allOf: (x) => x.allOf !== void 0,
    enum: (x) => x.enum !== void 0
  },
  a: {
    nullable: (x) => x.nullable === true,
    multipleType: (x) => Array.isArray(x.type),
    not: (x) => x.not !== void 0,
    const: (x) => x.const !== void 0,
    primitive: (x, p) => x.type === p,
    conditional: (x) => Boolean("if" in x && x.if && "then" in x && "else" in x && x.then && x.else),
    oneOf: (x) => x.oneOf !== void 0
  }
};
const jsonSchemaToZod = (schema, { module, name, type: type2, noImport, ...rest } = {}) => {
  if (type2 && (!name || module !== "esm")) {
    throw new Error("Option `type` requires `name` to be set and `module` to be `esm`");
  }
  let result = parseSchema(schema, {
    module,
    name,
    path: [],
    seen: /* @__PURE__ */ new Map(),
    ...rest
  });
  const jsdocs = rest.withJsdocs && typeof schema !== "boolean" && schema.description ? expandJsdocs(schema.description) : "";
  if (module === "cjs") {
    result = `${jsdocs}module.exports = ${name ? `{ ${JSON.stringify(name)}: ${result} }` : result}
`;
    if (!noImport) {
      result = `${jsdocs}const { z } = require("zod")

${result}`;
    }
  } else if (module === "esm") {
    result = `${jsdocs}export ${name ? `const ${name} =` : `default`} ${result}
`;
    if (!noImport) {
      result = `import { z } from "zod"

${result}`;
    }
  } else if (name) {
    result = `${jsdocs}const ${name} = ${result}`;
  }
  if (type2 && name) {
    let typeName = typeof type2 === "string" ? type2 : `${name[0].toUpperCase()}${name.substring(1)}`;
    result += `export type ${typeName} = z.infer<typeof ${name}>
`;
  }
  return result;
};
const socketEventRecord = {
  sysReady: "_a",
  sysPerformAction: "_b",
  sysPerformActionBack: "_c"
};
const socketEventRecordReverse = {
  _a: "sysReady",
  _b: "sysPerformAction",
  _c: "sysPerformActionBack"
};
const SymbolPerformActionId = /* @__PURE__ */ Symbol("SymbolPerformActionId");
const SymbolPerformActionRecord = /* @__PURE__ */ Symbol("SymbolPerformActionRecord");
const __cabloyEventPrefix = "_:";
const __closeReasonNormal = "Manual close";
class WebSocketClient {
  constructor(options) {
    this[SymbolPerformActionRecord] = {};
    this._ws = void 0;
    this._timeoutRetry = void 0;
    this._reconnectDelay = void 0;
    this._reconnectDelayMax = void 0;
    this._reconnectAttemptsMax = void 0;
    this._reconnectAttempts = 0;
    this.onReady = void 0;
    this.onEvent = void 0;
    this.onFallback = void 0;
    this.onOpen = void 0;
    this.onError = void 0;
    this.onClose = void 0;
    this._reconnectDelay = options?.reconnectDelay || 1e3;
    this._reconnectDelayMax = options?.reconnectDelayMax || 5e3;
    this._reconnectAttemptsMax = options?.reconnectAttemptsMax || Infinity;
  }
  get ws() {
    return this._ws;
  }
  connect(url, protocols) {
    this.disconnect();
    this._connect(url, protocols);
  }
  _connect(url, protocols) {
    const ws = this._ws = new WebSocket(url, protocols);
    const onMessage = (event) => {
      this._parseEvent(event);
    };
    const onOpen = (event) => {
      this.onOpen?.(event, this._reconnectAttempts);
      this._reconnectAttempts = 0;
    };
    const onError = (event) => {
      this.onError?.(event);
    };
    const onClose = (event) => {
      this._closeEvents();
      this._closeTimeoutRetry();
      ws.removeEventListener("message", onMessage);
      ws.removeEventListener("open", onOpen);
      ws.removeEventListener("error", onError);
      ws.removeEventListener("close", onClose);
      const reconnect = event.reason !== __closeReasonNormal && this._reconnectAttempts < this._reconnectAttemptsMax;
      this.onClose?.(event, reconnect);
      if (reconnect) {
        this._startTimeoutRetry(url, protocols);
      }
    };
    ws.addEventListener("message", onMessage);
    ws.addEventListener("open", onOpen);
    ws.addEventListener("error", onError);
    ws.addEventListener("close", onClose);
  }
  _closeTimeoutRetry() {
    if (this._timeoutRetry) {
      clearTimeout(this._timeoutRetry);
      this._timeoutRetry = void 0;
    }
  }
  _startTimeoutRetry(url, protocols) {
    this._closeTimeoutRetry();
    this._reconnectAttempts++;
    const delay = this._reconnectDelay * Math.min(this._reconnectAttempts, this._reconnectDelayMax);
    this._timeoutRetry = setTimeout(() => {
      this.connect(url, protocols);
    }, delay);
  }
  disconnect() {
    if (this._ws) {
      this._ws.close(1e3, __closeReasonNormal);
      this._ws = void 0;
    }
  }
  sendEvent(eventName, data) {
    if (!this._ws) throw new Error("ws closed");
    const eventNameInner = socketEventRecord[eventName] ?? eventName;
    this._ws.send(__cabloyEventPrefix + JSON.stringify([eventNameInner, data]));
  }
  _parseEvent(event) {
    const data = event.data;
    let packet;
    if (typeof data === "string" && data.startsWith(__cabloyEventPrefix)) {
      const packetInner = JSON.parse(data.substring(__cabloyEventPrefix.length));
      const eventName2 = socketEventRecordReverse[packetInner[0]] ?? packetInner[0];
      packet = [eventName2, packetInner[1]];
    } else {
      packet = [void 0, data];
    }
    const eventName = packet[0];
    const result = packet[1];
    if (eventName === "sysReady") {
      this.onReady?.();
    } else if (eventName === "sysPerformActionBack") {
      const id = result.i;
      const performActionBack = this[SymbolPerformActionRecord][id];
      delete this[SymbolPerformActionRecord][id];
      if (performActionBack) {
        if (result.c === 0) {
          performActionBack.resolve(result.d);
        } else {
          const err = new Error();
          err.code = result.c;
          err.message = result.m;
          performActionBack.reject(err);
        }
      }
    } else if (eventName !== void 0) {
      this.onEvent?.(eventName, result, event);
    } else {
      this.onFallback?.(event);
    }
    return packet;
  }
  performAction(method, path, options) {
    const id = (this[SymbolPerformActionId] ?? 0) + 1;
    this[SymbolPerformActionId] = id;
    return new Promise((resolve, reject) => {
      this[SymbolPerformActionRecord][id] = {
        resolve,
        reject
      };
      const data = {
        i: id,
        m: method,
        p: path,
        q: options?.query,
        b: options?.body,
        h: options?.headers
      };
      this.sendEvent("sysPerformAction", data);
    });
  }
  _closeEvents() {
    const callbacks = this[SymbolPerformActionRecord];
    this[SymbolPerformActionRecord] = {};
    for (const id in callbacks) {
      const callback = callbacks[id];
      const err = new Error();
      err.code = 400;
      callback.reject(err);
    }
  }
}
function mutate(target, fn) {
  if (!target) return target;
  const copyState = Array.isArray(target) ? target.slice() : Object.assign({}, target);
  const res = fn(copyState);
  return res === void 0 ? copyState : res;
}
export {
  ZodMetadata as $,
  jsonSchemaToZod as A,
  BeanSimple as B,
  evaluateSimple as C,
  usePrepareArg as D,
  celEnvBase as E,
  getProperty$1 as F,
  evaluateExpressions as G,
  objectAssignReactive as H,
  beanFullNameFromOnionName as I,
  toUpperCaseFirstChar as J,
  isPromise as K,
  BeanControllerBase as L,
  prepareComponentOptions as M,
  useController as N,
  disposeInstance as O,
  ProxyDisable as P,
  deepEqual as Q,
  SymbolControllerRefDisable as R,
  SymbolErrorInstanceInfo as S,
  BeanAopMethodBase as T,
  Use as U,
  Virtual as V,
  createZovaComponentAsync as W,
  UseScope as X,
  BeanRenderBase as Y,
  BeanControllerPageBase as Z,
  catchError as _,
  colorizer as a,
  StateLock as a0,
  sys as a1,
  $customKey as a2,
  extend as a3,
  combineParamsAndQuery as a4,
  parseName as a5,
  parseInfo as a6,
  useComputed as a7,
  combineQueries as a8,
  WebSocketClient as a9,
  useApp as aa,
  Emit as ab,
  ModelValue as ac,
  BeanStyleBase as ad,
  createZovaComponentPage as ae,
  BeanAopBase as af,
  polyfillDispose as ag,
  uuid as ah,
  ClientOnly as ai,
  isNilOrEmptyString as aj,
  hashkey as ak,
  Preload as al,
  mutate as am,
  defineBoot as an,
  PluginZova as ao,
  bootstrap as ap,
  formatLoggerConsole as b,
  combine as c,
  createBeanDecorator as d,
  errors as e,
  formatLoggerFilter as f,
  getOnionScenesMeta as g,
  deepExtend as h,
  swapDeps as i,
  appResource as j,
  compose as k,
  BeanInfo as l,
  cast as m,
  BeanBase as n,
  isNil as o,
  checkMeta as p,
  matchSelector as q,
  replaceTemplate as r,
  splatter as s,
  timestamp as t,
  appMetadata as u,
  BeanScopeBase as v,
  registerMappedClassMetadataKey as w,
  SymbolBeanFullName as x,
  useCustomRef as y,
  commonjsRequire as z
};
