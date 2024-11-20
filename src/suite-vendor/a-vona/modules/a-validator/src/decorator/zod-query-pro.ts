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
  _coerceWithNil(this, input, () => {
    input.data = Number(input.data);
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
  _coerceWithNil(this, input, () => {
    input.data = BigInt(input.data);
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
  _coerceWithNil(this, input, () => {
    if (input.data === 'false' || input.data === '0') {
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

const _parseDate = z.ZodDate.prototype._parse;
z.ZodDate.prototype._parse = function (this: z.ZodDate, input) {
  _coerceWithNil(this, input, () => {
    input.data = new Date(input.data);
  });
  return _parseDate.call(this, input);
};

/////////////////////////////////////////
/////////////////////////////////////////
//////////                     //////////
//////////      ZodObject      //////////
//////////                     //////////
/////////////////////////////////////////
/////////////////////////////////////////

const _parseObject = z.ZodObject.prototype._parse;
z.ZodObject.prototype._parse = function (input) {
  _coerceWithNil(this, input, () => {
    if (typeof input.data === 'string') {
      input.data = JSON.parse(input.data);
    }
  });
  return _parseObject.call(this, input);
};

////////////////////////////////////////
////////////////////////////////////////
//////////                    //////////
//////////      ZodArray      //////////
//////////                    //////////
////////////////////////////////////////
////////////////////////////////////////

const _parseArray = z.ZodArray.prototype._parse;
z.ZodArray.prototype._parse = function (input) {
  _coerceWithNil(this, input, () => {
    if (typeof input.data === 'string') {
      input.data = JSON.parse(input.data);
    }
  });
  return _parseArray.call(this, input);
};

///////////////////////////////////////////
///////////////////////////////////////////
//////////                       //////////
//////////      ZodOptional      //////////
//////////                       //////////
///////////////////////////////////////////
///////////////////////////////////////////

const _parseOptional = z.ZodOptional.prototype._parse;
z.ZodOptional.prototype._parse = function (this: z.ZodOptional<any>, input) {
  if (_getInnerType(this).typeName === 'ZodString') {
    _coerce(this, input);
  } else {
    _coerceWithNil(this, input);
  }
  return _parseOptional.call(this, input);
};

////////////////////////////////////////////
////////////////////////////////////////////
//////////                        //////////
//////////       ZodDefault       //////////
//////////                        //////////
////////////////////////////////////////////
////////////////////////////////////////////

const _parseDefault = z.ZodDefault.prototype._parse;
z.ZodDefault.prototype._parse = function (this: z.ZodDefault<any>, input) {
  if (_getInnerType(this).typeName === 'ZodString') {
    _coerce(this, input);
  } else {
    _coerceWithNil(this, input);
  }
  return _parseDefault.call(this, input);
};

///////////////////////////////////////
///////////////////////////////////////
//////////                     ////////
//////////      coerce        ////////
//////////                     ////////
///////////////////////////////////////
///////////////////////////////////////

function _coerce(_instance, input, fn?: Function) {
  if (!isNil(input.data)) {
    fn?.();
  }
}

function _coerceWithNil(_instance, input, fn?: Function) {
  if (!isNil(input.data)) {
    if (input.data === 'undefined' || input.data === '') {
      input.data = undefined;
    } else if (input.data === 'null') {
      input.data = null;
    } else {
      fn?.();
    }
  }
}

function _getInnerType(schema: any) {
  let innerType = schema._def.innerType;
  while (innerType._def.innerType) {
    innerType = innerType._def.innerType;
  }
  return innerType;
}

// function _coerce(instance, input, fn) {
//   if (instance._def.coerce !== false) {
//     if (instance._def.coerce === true) instance._def.coerce = undefined as any;
//     if (!isNil(input.data)) {
//       fn();
//     }
//   }
// }
