import { z } from 'zod';
import { isNil } from './utils.ts';

interface IParsePayload {
  value: any;
  issues: any[];
}

let ZodMetadata: any;
export function setParseAdapter(zodMetadata: any) {
  ZodMetadata = zodMetadata;
  ((z.core) as any).setParseAdapter(__parseAdapter);
}

function __parseAdapter(inst: z.ZodType, parse) {
  return (payload: IParsePayload, _) => {
    const type = inst.type;
    switch (type) {
      case 'string':return __parseString(inst, parse, payload, _);
    }
    return parse(payload, _);
  };
}

/////////////////////////////////////////
/////////////////////////////////////////
/// ///////                     /////////
/// ///////      ZodString      /////////
/// ///////                     /////////
/////////////////////////////////////////
/////////////////////////////////////////

function __parseString(inst, parse, payload: IParsePayload, _) {
  const metadata = ZodMetadata?.getOpenapiMetadata(inst);
  if (metadata?.format === 'binary' && !isNil(payload.value)) {
    // ignore upload file
    return payload;
  }
  _coerce(payload, () => {
    payload.value = String(payload.value);
  });
  return parse(payload, _);
}

/////////////////////////////////////////
/////////////////////////////////////////
/// ///////                     /////////
/// ///////      ZodNumber      /////////
/// ///////                     /////////
/////////////////////////////////////////
/////////////////////////////////////////

function __parseNumber(inst, parse, payload: IParsePayload, _) {
  _coerceWithNil(payload, () => {
    payload.value = Number(payload.value);
  });
  return parse(payload, _);
}

/////////////////////////////////////////
/////////////////////////////////////////
/// ///////                     /////////
/// ///////      ZodBigInt      /////////
/// ///////                     /////////
/////////////////////////////////////////
/////////////////////////////////////////

const _parseBigInt = z.ZodBigInt.prototype._parse;
z.ZodBigInt.prototype._parse = function (this: z.ZodBigInt, input) {
  _coerceWithNil(input, () => {
    input.data = BigInt(input.data);
  });
  return _parseBigInt.call(this, input);
};

//////////////////////////////////////////
//////////////////////////////////////////
/// ///////                     //////////
/// ///////      ZodBoolean      /////////
/// ///////                     //////////
//////////////////////////////////////////
//////////////////////////////////////////

const _parseBoolean = z.ZodBoolean.prototype._parse;
z.ZodBoolean.prototype._parse = function (this: z.ZodBoolean, input) {
  _coerceWithNil(input, () => {
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
/// ///////                     ///////
/// ///////      ZodDate        ///////
/// ///////                     ///////
///////////////////////////////////////
///////////////////////////////////////

const _parseDate = z.ZodDate.prototype._parse;
z.ZodDate.prototype._parse = function (this: z.ZodDate, input) {
  _coerceWithNil(input, () => {
    input.data = new Date(input.data);
  });
  return _parseDate.call(this, input);
};

/////////////////////////////////////////
/////////////////////////////////////////
/// ///////                     /////////
/// ///////      ZodObject      /////////
/// ///////                     /////////
/////////////////////////////////////////
/////////////////////////////////////////

const _parseObject = z.ZodObject.prototype._parse;
z.ZodObject.prototype._parse = function (input) {
  _coerceWithNil(input, () => {
    if (typeof input.data === 'string') {
      input.data = JSON.parse(input.data);
    }
  });
  return _parseObject.call(this, input);
};

////////////////////////////////////////
////////////////////////////////////////
/// ///////                    /////////
/// ///////      ZodArray      /////////
/// ///////                    /////////
////////////////////////////////////////
////////////////////////////////////////

const _parseArray = z.ZodArray.prototype._parse;
z.ZodArray.prototype._parse = function (input) {
  _coerceWithNil(input, () => {
    if (typeof input.data === 'string') {
      if (input.data.startsWith('[') && input.data.endsWith(']')) {
        input.data = JSON.parse(input.data);
      } else {
        input.data = input.data.split(',');
      }
    }
  });
  return _parseArray.call(this, input);
};

///////////////////////////////////////////
///////////////////////////////////////////
/// ///////                       /////////
/// ///////      ZodOptional      /////////
/// ///////                       /////////
///////////////////////////////////////////
///////////////////////////////////////////

const _parseOptional = z.ZodOptional.prototype._parse;
z.ZodOptional.prototype._parse = function (this: z.ZodOptional<any>, input) {
  if (_getTypeName(_getInnerType(this)) === 'ZodString') {
    _coerce(input);
  } else {
    _coerceWithNil(input);
  }
  if (input.data === null) {
    input.data = undefined;
  }
  return _parseOptional.call(this, input);
};

////////////////////////////////////////////
////////////////////////////////////////////
/// ///////                        /////////
/// ///////       ZodDefault       /////////
/// ///////                        /////////
////////////////////////////////////////////
////////////////////////////////////////////

const _parseDefault = z.ZodDefault.prototype._parse;
z.ZodDefault.prototype._parse = function (this: z.ZodDefault<any>, input) {
  if (_getTypeName(_getInnerType(this)) === 'ZodString') {
    _coerce(input);
  } else {
    _coerceWithNil(input);
  }
  return _parseDefault.call(this, input);
};

///////////////////////////////////////
///////////////////////////////////////
/// ///////                     ///////
/// ///////      coerce         ///////
/// ///////                     ///////
///////////////////////////////////////
///////////////////////////////////////

function _coerce(payload: IParsePayload, fn?: Function) {
  if (!isNil(payload.value)) {
    fn?.();
  }
}

function _coerceWithNil(input, fn?: Function) {
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

export function coerceWithNil(data: any, fn?: Function) {
  const input = { data };
  _coerceWithNil(input, fn);
  return data;
}

function _getInnerType(schema: any) {
  let innerType = schema._def.innerType;
  if (!innerType) return schema;
  while (innerType._def.innerType) {
    innerType = innerType._def.innerType;
  }
  return innerType;
}

function _getTypeName(schema: any) {
  let typeName = schema.typeName;
  while (!typeName) {
    schema = schema._def;
    typeName = schema.typeName;
  }
  return typeName;
}

export function getTypeName(schema: any) {
  return _getTypeName(_getInnerType(schema));
}

// function _coerce(instance, input, fn) {
//   if (instance._def.coerce !== false) {
//     if (instance._def.coerce === true) instance._def.coerce = undefined as any;
//     if (!isNil(input.data)) {
//       fn();
//     }
//   }
// }
