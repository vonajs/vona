import { ApiSecurity } from './api-security.decorator.js';

export function ApiOAuth2(scopes: string[], name = 'oauth2') {
  return ApiSecurity(name, scopes);
}
