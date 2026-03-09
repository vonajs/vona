import type { TypeStrategyOptions } from '../types/authProvider.ts';

export class StrategyBase {
  name: string;
  redirect: (location: string) => void;
  error: (err: Error) => void;

  constructor(_options: TypeStrategyOptions, _verify: Function) {}

  authenticate(_req, _options) {
    throw new Error('Strategy#authenticate must be overridden by subclass');
  };
}
