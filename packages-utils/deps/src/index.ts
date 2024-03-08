export interface ISwapDepsItem {
  name: string;
  dependencies: string | string[];
}

export function swapDeps(items: ISwapDepsItem[]) {
  // eslint-disable-next-line
  while (true) {
    if (!_swapDeps(items)) break;
  }
}

function _swapDeps(items: ISwapDepsItem[]) {
  let result = false;
  for (const item of items) {
    let deps = item.dependencies || [];
    if (typeof deps === 'string') deps = deps.split(',');
    for (const dep of deps) {
      if (_swapDep(items, dep, item.name)) result = true;
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
