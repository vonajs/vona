import { Environment } from '@marcbachmann/cel-js';

export const celEnvBase = new Environment({
  unlistedVariablesAreDyn: true,
  enableOptionalTypes: true,
  homogeneousAggregateLiterals: false,
});
