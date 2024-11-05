import { ApiSecurity } from './api-security.decorator.js';

export function ApiBearerAuth(name = 'bearer') {
  return ApiSecurity(name);
}
