import type { TypeStrategyOptions } from 'vona-module-a-auth';
import type { IAuthProviderGithubClientOptions } from '../bean/authProvider.github.ts';
import OAuth2Strategy from 'passport-oauth2';
import { uuidv4 } from 'vona';

export class StrategyMock extends OAuth2Strategy {
  name: string;
  _userProfileURL: string;
  _oauth2: any;

  constructor(options: TypeStrategyOptions<IAuthProviderGithubClientOptions>, verify: Function) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || 'https://github.com/login/oauth/authorize';
    options.tokenURL = options.tokenURL || 'https://github.com/login/oauth/access_token';
    options.scopeSeparator = options.scopeSeparator || ',';
    options.customHeaders = options.customHeaders || {};

    if (!options.customHeaders['User-Agent']) {
      options.customHeaders['User-Agent'] = options.userAgent || 'passport-github';
    }

    super(options, verify);

    this.name = 'github-mock';
    this._userProfileURL = options.userProfileURL || 'https://api.github.com/user';
    this._oauth2.useAuthorizationHeaderforGET(true);

    this._oauth2.getOAuthAccessToken = function (_code, params, callback) {
      const accessToken = uuidv4();
      const refreshToken = uuidv4();
      callback(null, accessToken, refreshToken, params);
    };
  }

  userProfile(_accessToken, done) {
    const mockId = 'mock-github-user';
    const profile = {
      id: mockId,
      username: mockId,
      displayName: mockId,
    };
    done(null, profile);
  }
}
