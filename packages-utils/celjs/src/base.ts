import { Environment } from '@marcbachmann/cel-js';

export const celEnvBase = new Environment({
  unlistedVariablesAreDyn: true,
  enableOptionalTypes: true,
  homogeneousAggregateLiterals: false,
});

const params: string[] = [];
for (let i = 0; i < 10; i++) {
  params.push('dyn');
  celEnvBase.registerFunction(`concat(${params.join(',')}):list`, _concat);
}

celEnvBase.registerFunction('join(list):string', list => {
  return _join(list);
});
celEnvBase.registerFunction('join(list,string):string', (list, sep) => {
  return _join(list, sep);
});

celEnvBase.registerOperator('string + int', (str, n) => str + String(n));
celEnvBase.registerOperator('int + string', (n, str) => String(n) + str);

function _concat(...args: any[]): any[] {
  return [].concat(...args);
}

function _join(list?: [], sep?: string): string {
  if (!list) return '';
  return list.join(sep);
}
