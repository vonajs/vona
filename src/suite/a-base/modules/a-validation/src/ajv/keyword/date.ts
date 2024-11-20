import { VonaContext } from 'vona';
import moment from 'moment';

export default {
  errors: true,
  compile(schema) {
    const fun = function (this: VonaContext, data, _path, rootData, name) {
      if (!schema) return true;
      const ctx = this;
      if (Array.isArray(data)) {
        const res: any[] = [];
        for (const item of data) {
          const _date = transformDate(fun, ctx, item);
          if (_date === false) return false;
          res.push(_date);
        }
        rootData[name] = res;
        return true;
      }
      const _date = transformDate(fun, ctx, data);
      if (_date === false) return false;
      rootData[name] = _date;
      return true;
    };
    return fun;
  },
};

function transformDate(fun, ctx: VonaContext, data) {
  if (!data) return null; // support null
  const _date = moment(data);
  if (!_date.isValid()) {
    fun.errors = [{ keyword: 'x-date', params: [], message: ctx.app.text('Invalid Date') }];
    return false;
  }
  return _date.toDate();
}
