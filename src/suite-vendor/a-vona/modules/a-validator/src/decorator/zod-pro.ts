import { isNil } from 'vona';
import { z } from 'zod';

/////////////////////////////////////////
/////////////////////////////////////////
//////////                     //////////
//////////      ZodString      //////////
//////////                     //////////
/////////////////////////////////////////
/////////////////////////////////////////

const _parseString = z.ZodString.prototype._parse;
z.ZodString.prototype._parse = function (this: z.ZodString, input) {
  _coerce(this, input, () => {
    input.data = String(input.data);
  });
  return _parseString.call(this, input);
};

const _parseNumber = z.ZodNumber.prototype._parse;
z.ZodNumber.prototype._parse = function (this: z.ZodNumber, input) {
  _coerce(this, input, () => {
    if (input.data === '') {
      input.data = undefined;
    } else {
      input.data = Number(input.data);
    }
  });
  return _parseNumber.call(this, input);
};

/** coerce */
function _coerce(instance, input, fn) {
  if (instance._def.coerce !== false) {
    if (instance._def.coerce === true) instance._def.coerce = undefined as any;
    if (!isNil(input.data)) {
      fn();
    }
  }
}
