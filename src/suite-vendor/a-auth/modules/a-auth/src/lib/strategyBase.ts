import type { Request } from 'koa';
import type { TypeStrategyOptions } from '../types/authProvider.ts';
import OAuth2Strategy from 'passport-oauth2';

export class StrategyBase extends OAuth2Strategy {
  name: string;
  redirect: (location: string) => void;
  error: (err: Error) => void;

  constructor(options: TypeStrategyOptions, verify: Function) {
    super(options, verify);
  }

  authenticate(req: Request, options: TypeStrategyOptions) {
    return super.authenticate(req, options);
  };
}
