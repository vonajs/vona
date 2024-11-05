import { ApiSecurity } from './api-security.decorator.js';

export function ApiCookieAuth(name = 'cookie') {
  return ApiSecurity(name);
}
