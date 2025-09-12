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
      case 'string': return __parseString(inst, parse, payload, _);
      case 'number': return __parseNumber(inst, parse, payload, _);
      case 'bigint': return __parseBigInt(inst, parse, payload, _);
      case 'boolean': return __parseBoolean(inst, parse, payload, _);
      case 'date': return __parseDate(inst, parse, payload, _);
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

function __parseNumber(_inst, parse, payload: IParsePayload, _) {
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

function __parseBigInt(_inst, parse, payload: IParsePayload, _) {
  _coerceWithNil(payload, () => {
    payload.value = BigInt(payload.value);
  });
  return parse(payload, _);
}

//////////////////////////////////////////
//////////////////////////////////////////
/// ///////                     //////////
/// ///////      ZodBoolean      /////////
/// ///////                     //////////
//////////////////////////////////////////
//////////////////////////////////////////

function __parseBoolean(_inst, parse, payload: IParsePayload, _) {
  _coerceWithNil(payload, () => {
    if (payload.value === 'false' || payload.value === '0') {
      payload.value = false;
    } else {
      payload.value = Boolean(payload.value);
    }
  });
  return parse(payload, _);
}

///////////////////////////////////////
///////////////////////////////////////
/// ///////                     ///////
/// ///////      ZodDate        ///////
/// ///////                     ///////
///////////////////////////////////////
///////////////////////////////////////

function __parseDate(_inst, parse, payload: IParsePayload, _) {
  _coerceWithNil(payload, () => {
    payload.value = new Date(payload.value);
  });
  return parse(payload, _);
}

/////////////////////////////////////////
/////////////////////////////////////////
/// ///////                     /////////
/// ///////      ZodObject      /////////
/// ///////                     /////////
/////////////////////////////////////////
/////////////////////////////////////////

const _parseObject = z.ZodObject.prototype._parse;
z.ZodObject.prototype._parse = function (input) {
  _coerceWithNil(payload, () => {
    if (typeof payload.value === 'string') {
      payload.value = JSON.parse(payload.value);
    }
  });
  return parse(payload, _);
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
  _coerceWithNil(payload, () => {
    if (typeof payload.value === 'string') {
      if (payload.value.startsWith('[') && payload.value.endsWith(']')) {
        payload.value = JSON.parse(payload.value);
      } else {
        payload.value = payload.value.split(',');
      }
    }
  });
  return parse(payload, _);
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
  if (payload.value === null) {
    payload.value = undefined;
  }
  return parse(payload, _);
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
  return parse(payload, _);
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
  if (!isNil(payload.value)) {
    if (payload.value === 'undefined' || payload.value === '') {
      payload.value = undefined;
    } else if (payload.value === 'null') {
      payload.value = null;
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
//     if (!isNil(payload.value)) {
//       fn();
//     }
//   }
// }
