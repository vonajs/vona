import { ScopeModule } from '../resource/this.js';
import { Bean } from 'vona';
import { BeanAuthProviderBase } from 'vona-module-a-auth';

import Strategy from 'passport-github';
import StrategyMock from '../meta/passport/strategyMock.js';

@Bean({ scene: 'auth.provider' })
export class AuthProviderGithub extends BeanAuthProviderBase<ScopeModule> {
  get configModule() {
    return this.scope.config;
  }
  async getConfigDefault() {
    const configGitHub = this.configModule.account.github;
    return {
      scenes: configGitHub.scenes,
    };
  }
  checkConfigValid(config) {
    return this.allowStrategyMock || (!!config.clientID && !!config.clientSecret);
  }
  getStrategy() {
    return this.allowStrategyMock ? StrategyMock : Strategy;
  }
  async onVerify(accessToken, refreshToken, profile) {
    return {
      module: this.providerModule,
      provider: this.providerName,
      providerScene: this.providerScene,
      profileId: profile.id,
      profile: {
        userName: profile.username,
        realName: profile.displayName,
        avatar: profile.photos && profile.photos[0] && profile.photos[0].value,
        accessToken,
        refreshToken,
        profile,
      },
    };
  }
}
