export function isClass(fn) {
  // just check if is function
  return typeof fn === 'function';
}

export function isClassStrict(fn) {
  return typeof fn === 'function' && /^class(?:\s|{)/.test(fn.toString());
}

// function fnBody(fn) {
//   return fn
//     .toString()
//     .replace(/^[^{]*{\s*/, '')
//     .replace(/\s*}[^}]*$/, '');
// }

// export function isClassStrict(fn) {
//   return (
//     typeof fn === 'function' && (/^class(?:\s|{)/.test(fn.toString()) || /^.*classCallCheck\(/.test(fnBody(fn))) // babel.js
//   );
// }
