import * as json5 from 'json5';

declare global {
  // eslint-disable-next-line
  var JSON5: typeof json5;
}
__patchJSON();

function __patchJSON() {
  // 2020-03-13T00:44:15.149Z
  // 2020-03-13T00:44:15Z
  const __dateTest = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  function __jsonReviver(k, v, reviver) {
    if (v && typeof v === 'string' && __dateTest.test(v)) {
      v = new Date(v);
    }
    if (!reviver) return v;
    return reviver(k, v);
  }

  // json
  const _jsonParse = JSON.parse;
  JSON.parse = function (source, reviver) {
    return _jsonParse(source, function (k, v) {
      return __jsonReviver(k, v, reviver);
    });
  };

  // json5
  const _json5Parse = json5.parse;
  // @ts-ignore ignore parse
  const parse = function (source, reviver) {
    return _json5Parse(source, function (k, v) {
      return __jsonReviver(k, v, reviver);
    });
  };

  globalThis.JSON5 = {
    parse,
    stringify: json5.stringify,
  } as typeof json5;
}
