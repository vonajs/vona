export function deprecated(oldUsage, newUsage) {
  const message = '`'
    .concat(oldUsage, '` is deprecated and will be removed in a later version. Use `')
    .concat(newUsage, '` instead');

  console.warn(message);
}

export async function catchError<T>(
  fnMethod: (...args: any[]) => Promise<T>,
): Promise<[T, undefined] | [undefined, Error]> {
  let error: Error | undefined;
  let data: T | undefined;
  try {
    data = await fnMethod();
  } catch (err) {
    error = err as Error;
  }
  return error ? [undefined, error!] : [data!, undefined];
}

export async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function replaceTemplate(content: string, scope: object) {
  if (!content) return content;
  return content.toString().replace(/(\\)?\{\{ *([\w.]+) *\}\}/g, (block, skip, key) => {
    if (skip) {
      return block.substring(skip.length);
    }
    const value = getProperty<string>(scope, key);
    return value !== undefined ? value : '';
  });
}

export function setProperty<T>(obj: object, name: string, value: T) {
  const names = name.split('.');
  if (names.length === 1) {
    obj[name] = value;
  } else {
    for (let i = 0; i < names.length - 1; i++) {
      const _obj = obj[names[i]];
      if (_obj) {
        obj = _obj;
      } else {
        obj = obj[names[i]] = {};
      }
    }
    obj[names[names.length - 1]] = value;
  }
}

export function getProperty<T>(obj: object | undefined, name: string, sep?: string) {
  return _getProperty<T>(obj, name, sep, false);
}

export function getPropertyObject<T>(obj: object | undefined, name: string, sep?: string) {
  return _getProperty<T>(obj, name, sep, true);
}

const __keysIgnore = ['constructor', 'prototype', '__proto__'];
function _getProperty<T>(_obj: object | undefined, name: string, sep: string | undefined, forceObject: boolean): T | undefined {
  if (!_obj) return undefined;
  let obj = _obj as object;
  const names = name.split(sep || '.');
  // loop
  for (const _name of names) {
    const [name, index] = _parsePropertyKey(_name);
    if (__keysIgnore.includes(name)) throw new Error(`invalid prop: ${name}`);
    if (obj[name] === undefined) { // not check obj[name] === null
      if (forceObject) {
        if (index === undefined) {
          obj[name] = {};
        } else {
          obj[name] = [];
        }
      } else {
        obj = obj[name];
        break;
      }
    }
    obj = obj[name];
    if (index !== undefined) {
      obj = obj[index];
    }
  }
  return obj as T | undefined;
}

function _parsePropertyKey(name: string): [string, number | undefined] {
  const matched = name.match((/([^[]+)\[(\d+)\]/));
  if (!matched) return [name, undefined];
  return [matched[1], Number.parseInt(matched[2])];
}

export function createFunction(expression: string, scopeKeys?: string[]): Function {
  let fn: Function;
  try {
    const js = `return (${expression})`;
    fn = scopeKeys && scopeKeys.length > 0 ? new Function(scopeKeys.join(','), js) : new Function(js);
  } catch (_err) {
    fn = scopeKeys && scopeKeys.length > 0 ? new Function(scopeKeys.join(','), expression) : new Function(expression);
  }
  return fn;
}

export function evaluateSimple(expression: string, scope?: object) {
  const scopeKeys = scope ? Object.keys(scope) : undefined;
  const scopeValues = scope ? Object.values(scope) : undefined;
  const fn = createFunction(expression, scopeKeys);
  return scopeValues ? fn(...scopeValues) : fn();
}

export function getRandomInt(size: number, start: number = 0) {
  return Math.floor(Math.random() * size) + start;
}

export function combineParamsAndQuery(path: string, options?: { params?: object; query?: object }): string {
  return combineQueries(defaultPathSerializer(path, options?.params), options?.query);
}

export function combineQueries(pagePath?: string, queries?: Record<string, any>): string {
  pagePath = pagePath ?? '/';
  //
  if (!queries) return pagePath;
  //
  const query2: any[] = [];
  const parts: string[] = [];
  if (queries) {
    for (const key in queries) {
      const value = queries[key];
      if (value && typeof value === 'object') {
        query2.push([key, value]);
      } else {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }
  // query2
  for (const [key, value] of query2) {
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`);
  }
  if (parts.length === 0) return pagePath;
  //
  const str = parts.join('&');
  //
  const pos = pagePath.indexOf('?');
  if (pos === -1) return `${pagePath}?${str}`;
  if (pos === pagePath.length - 1) return `${pagePath}${str}`;
  return `${pagePath}&${str}`;
}

const PATH_PARAM_RE = /\{([^{}/]+)\}/g;
const PATH_PARAM_RE2 = /:([^/]+)/g;
export function defaultPathSerializer(pathName: string, pathParams?: Record<string, any>): string {
  pathParams = pathParams ?? {};
  for (const item of [PATH_PARAM_RE, PATH_PARAM_RE2]) {
    pathName = pathName.replace(item, (_, _part: string) => {
      if (_part.includes('?'))_part = _part.substring(0, _part.length - 1);
      const value = pathParams?.[_part];
      if (value === undefined || value === null) return '';
      if (typeof value === 'object') return encodeURIComponent(JSON.stringify(value));
      return encodeURIComponent(value);
    });
  }
  return pathName;
}

export function ensureArray(arr: any, sep?: string) {
  if (arr === undefined || arr === null) return undefined;
  if (arr === '') return [];
  if (Array.isArray(arr)) return arr;
  if (typeof arr === 'string' && sep !== null) return arr.split(sep ?? ',');
  return [arr];
}
