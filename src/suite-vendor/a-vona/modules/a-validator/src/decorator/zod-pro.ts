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

/////////////////////////////////////////
/////////////////////////////////////////
//////////                     //////////
//////////      ZodNumber      //////////
//////////                     //////////
/////////////////////////////////////////
/////////////////////////////////////////

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

/////////////////////////////////////////
/////////////////////////////////////////
//////////                     //////////
//////////      ZodBigInt      //////////
//////////                     //////////
/////////////////////////////////////////
/////////////////////////////////////////

const _parseBigInt = z.ZodBigInt.prototype._parse;
z.ZodBigInt.prototype._parse = function (this: z.ZodBigInt, input) {
  _coerce(this, input, () => {
    if (input.data === '') {
      input.data = undefined;
    } else {
      input.data = BigInt(input.data);
    }
  });
  return _parseBigInt.call(this, input);
};

//////////////////////////////////////////
//////////////////////////////////////////
//////////                     ///////////
//////////      ZodBoolean      //////////
//////////                     ///////////
//////////////////////////////////////////
//////////////////////////////////////////

const _parseBoolean = z.ZodBoolean.prototype._parse;
z.ZodBoolean.prototype._parse = function (this: z.ZodBoolean, input) {
  _coerce(this, input, () => {
    if (input.data === 'undefined' || input.data === '') {
      input.data = undefined;
    } else if (input.data === 'null') {
      input.data = null;
    } else if (input.data === 'false' || input.data === '0') {
      input.data = false;
    } else {
      input.data = Boolean(input.data);
    }
  });
  return _parseBoolean.call(this, input);
};

///////////////////////////////////////
///////////////////////////////////////
//////////                     ////////
//////////      ZodDate        ////////
//////////                     ////////
///////////////////////////////////////
///////////////////////////////////////

/** coerce */
function _coerce(_instance, input, fn) {
  if (!isNil(input.data)) {
    fn();
  }
}

// function _coerce(instance, input, fn) {
//   if (instance._def.coerce !== false) {
//     if (instance._def.coerce === true) instance._def.coerce = undefined as any;
//     if (!isNil(input.data)) {
//       fn();
//     }
//   }
// }
