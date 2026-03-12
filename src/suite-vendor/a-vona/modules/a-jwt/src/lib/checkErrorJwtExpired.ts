import { ErrorMessageJwtExpired } from './const.ts';

// throw error only when ErrorMessageJwtExpired
export function checkErrorJwtExpired(err: Error | undefined, headers: any) {
  if (err && err.message === ErrorMessageJwtExpired &&
    (headers['x-vona-jwt-authtoken'] === true || headers['x-vona-jwt-authtoken'] === 'true')) {
    throw err;
  }
}
