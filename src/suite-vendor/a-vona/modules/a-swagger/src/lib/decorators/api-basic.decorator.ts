import { ApiSecurity } from './api-security.decorator.js';

export function ApiBasicAuth(name = 'basic') {
  return ApiSecurity(name);
}
