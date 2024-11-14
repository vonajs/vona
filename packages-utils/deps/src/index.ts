export interface ISwapDepsItem {
  name: string;
  dependencies?: string | string[];
}

export interface ISwapDepsOptions {
  name?: string;
  dependencies?: ((item: ISwapDepsItem) => string | string[] | undefined) | string;
}

export function swapDeps(items: ISwapDepsItem[], options?: ISwapDepsOptions) {
  // eslint-disable-next-line
  while (true) {
    if (!_swapDeps(items, options)) break;
  }
}

function _swapDeps(items: ISwapDepsItem[], options?: ISwapDepsOptions) {
  const keyDependencies = options?.dependencies || 'dependencies';
  const keyName = options?.name || 'name';
  let result = false;
  for (const item of items) {
    const name = _getProperty(item, keyName);
    let deps =
      (typeof keyDependencies === 'function' ? keyDependencies(item) : _getProperty(item, keyDependencies)) || [];
    if (typeof deps === 'string') deps = deps.split(',');
    for (const dep of deps) {
      if (_swapDep(items, dep, name)) result = true;
    }
  }
  return result;
}

function _swapDep(arr: ISwapDepsItem[], a: string, b: string) {
  const indexA = arr.findIndex(item => item.name === a);
  const indexB = arr.findIndex(item => item.name === b);
  if (indexA === -1 || indexB === -1 || indexA < indexB) return false;
  arr.splice(indexB, 0, arr.splice(indexA, 1)[0]);
  return true;
}

function _getProperty(obj, name) {
  if (!obj) return undefined;
  const names = name.split('.');
  // loop
  for (const name of names) {
    if (obj[name] === undefined || obj[name] === null) {
      obj = obj[name];
      break;
    }
    obj = obj[name];
  }
  return obj;
}
