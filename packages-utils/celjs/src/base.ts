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

function _concat(...args: any[]): any[] {
  return [].concat(...args);
}
