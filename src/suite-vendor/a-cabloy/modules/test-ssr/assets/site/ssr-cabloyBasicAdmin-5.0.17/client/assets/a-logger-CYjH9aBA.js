import { AopMethod, Scope, UseAopMethod } from "./a-bean-Bxu0OKjI.js";
import { T as BeanAopMethodBase, x as SymbolBeanFullName, G as evaluateExpressions, m as cast, l as BeanInfo, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$1, _dec2$1, _class$1;
let AopMethodLog = (_dec$1 = AopMethod({
  level: "info"
}), _dec2$1 = BeanInfo({
  module: "a-logger"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class AopMethodLog2 extends BeanAopMethodBase {
  get(options, next, receiver, prop) {
    const context = this._getContext(options, receiver);
    const message = `${receiver[SymbolBeanFullName]}#${prop}(get)`;
    const logger = this.sys.meta.logger.child(options.childName, options.clientName);
    const profiler = logger.startTimer();
    try {
      const res = next();
      this._logResult(profiler, context, res, options, message);
      return res;
    } catch (err) {
      this._logError(profiler, context, err, options, message);
      throw err;
    }
  }
  set(options, value, next, receiver, prop) {
    const context = this._getContext(options, receiver);
    const message = `${receiver[SymbolBeanFullName]}#${prop}(set)`;
    const logger = this.sys.meta.logger.child(options.childName, options.clientName);
    const profiler = logger.startTimer();
    try {
      const res = next();
      this._logValue(profiler, context, value, options, message);
      return res;
    } catch (err) {
      this._logError(profiler, context, err, options, message);
      throw err;
    }
  }
  execute(options, _args, next, receiver, prop) {
    const context = this._getContext(options, receiver);
    const message = `${receiver[SymbolBeanFullName]}#${prop}`;
    const logger = this.sys.meta.logger.child(options.childName, options.clientName);
    if (options.args !== false) {
      const info = {
        level: options.level,
        message
      };
      if (context) info.context = context;
      if (_args.length > 0) info.args = _args;
      logger.log(info);
    }
    const profiler = logger.startTimer();
    try {
      const res = next();
      if (res?.then) {
        return res.then((res2) => {
          options.result !== false && this._logResult(profiler, context, res2, options, message);
          return res2;
        }).catch((err) => {
          this._logError(profiler, context, err, options, message);
          throw err;
        });
      }
      options.result !== false && this._logResult(profiler, context, res, options, message);
      return res;
    } catch (err) {
      this._logError(profiler, context, err, options, message);
      throw err;
    }
  }
  _getContext(options, receiver) {
    return evaluateExpressions(options.context, {
      self: receiver,
      sys: cast(receiver).sys,
      app: cast(receiver).app,
      ctx: cast(receiver).ctx
    });
  }
  _logValue(profiler, context, value, options, message) {
    const info = {
      level: options.level,
      message
    };
    if (context) info.context = context;
    info.value = value;
    profiler.done(info);
  }
  _logResult(profiler, context, res, options, message) {
    const info = {
      level: options.level,
      message
    };
    if (context) info.context = context;
    if (res !== void 0) info.result = res;
    profiler.done(info);
  }
  _logError(profiler, context, err, _options, message) {
    const info = {
      level: "error",
      message
    };
    if (context) info.context = context;
    if (err) info.error = err;
    profiler.done(info);
  }
}) || _class$1) || _class$1);
var _dec, _dec2, _class;
let ScopeModuleALogger = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-logger"
}), _dec(_class = _dec2(_class = class ScopeModuleALogger2 extends BeanScopeBase {
}) || _class) || _class);
function Log(options) {
  return UseAopMethod("a-logger:log", options);
}
export {
  AopMethodLog,
  Log,
  ScopeModuleALogger
};
