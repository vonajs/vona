import { ErrorJwtExpiredMessage, ErrorJwtExpiredName } from './const.ts';

// throw error only when ErrorMessageJwtExpired
export function checkErrorJwtExpiredAndThrow(err: Error | undefined, headers: any) {
  if (checkErrorJwtExpiredRaw(err) && (headers['x-vona-jwt-authtoken'] === true || headers['x-vona-jwt-authtoken'] === 'true')) {
    throw err;
  }
}

export function checkErrorJwtExpiredRaw(err: Error | undefined) {
  return err && (err.message === ErrorJwtExpiredMessage || err.name === ErrorJwtExpiredName);
}
