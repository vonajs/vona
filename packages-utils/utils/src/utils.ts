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

export function getProperty<T>(obj: object, name: string, sep?: string) {
  return _getProperty<T>(obj, name, sep, false);
}

export function getPropertyObject<T>(obj: object, name: string, sep?: string) {
  return _getProperty<T>(obj, name, sep, true);
}

function _getProperty<T>(obj: object, name: string, sep: string | undefined, forceObject: boolean): T | undefined {
  if (!obj) return undefined;
  const names = name.split(sep || '.');
  // loop
  for (const name of names) {
    if (obj[name] === undefined || obj[name] === null) {
      if (forceObject) {
        obj[name] = {};
      } else {
        obj = obj[name];
        break;
      }
    }
    obj = obj[name];
  }
  return obj as T | undefined;
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

export function evaluateSimple(expression: string) {
  const fn = createFunction(expression);
  return fn();
}

export function getRandomInt(size: number, start: number = 0) {
  return Math.floor(Math.random() * size) + start;
}

export function combineQueries(url?: string, queries?: Record<string, any>): string {
  //
  if (!queries) return url || '';
  //
  const parts: string[] = [];
  for (const key of Object.keys(queries)) {
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`);
  }
  if (parts.length === 0) return url || '';
  //
  const str = parts.join('&');
  //
  if (!url) return `?${str}`;
  //
  const pos = url.indexOf('?');
  if (pos === -1) return `${url}?${str}`;
  if (pos === url.length - 1) return `${url}${str}`;
  return `${url}&${str}`;
}
