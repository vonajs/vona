import { isNil } from 'vona';
import { z, ZodNumber } from 'zod';

const _parseNumber = z.ZodNumber.prototype._parse;
z.ZodNumber.prototype._parse = function (this: ZodNumber, input) {
  if (this._def.coerce !== false) {
    if (this._def.coerce === true) this._def.coerce = undefined as any;
    if (!isNil(input.data)) {
      if (input.data === '') {
        input.data = undefined;
      } else {
        input.data = Number(input.data);
      }
    }
  }
  return _parseNumber.call(this, input);
};
