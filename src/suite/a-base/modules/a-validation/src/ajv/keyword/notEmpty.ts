import { VonaContext } from 'vona';

export default {
  errors: true,
  compile(schema, schemaProperty) {
    const fun = function (this: VonaContext, data, _path, rootData) {
      // notEmpty=false
      if (!schema) return true;
      // ctx
      const ctx = this;
      // ignoreNotEmpty
      const ignoreNotEmpty = ctx.app.bean.util.getProperty(ctx.meta, 'validateHost.options.ignoreNotEmpty');
      if (ignoreNotEmpty) {
        // not check
        return true;
      }
      // expression
      const expression = schema && schema.expression;
      if (expression) {
        const res = evaluateExpression({ expression, rootData, ctx });
        if (!res) return true;
      }
      if (checkIfEmpty(schema, schemaProperty, data)) {
        (<any>fun).errors = [{ keyword: 'notEmpty', params: [], message: this.text('RequiredField') }];
        return false;
      }
      return true;
    };
    return fun;
  },
};

function evaluateExpression({ expression, rootData, ctx }) {
  try {
    const globals = {
      ...rootData,
      _meta: {
        host: ctx.meta && ctx.meta.validateHost,
        user: ctx.state.user && ctx.state.user.op,
      },
    };
    return ctx.app.bean.util.evaluateExpression({ expression, globals });
  } catch (err) {
    console.log(expression, rootData);
    throw err;
  }
}

function checkIfEmpty(schema, schemaProperty, value) {
  const type = schemaProperty.type;
  // ignoreZero
  let ignoreZero = schema.ignoreZero;
  if (ignoreZero === undefined) {
    ignoreZero = type !== 'number' && type !== 'integer';
  }
  if (schema.ignoreZero && value === 0) return false;
  return !value;
}
