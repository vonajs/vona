import { Bean, BeanBase } from '@cabloy/core';

const Strategy = require('passport-github').Strategy;
import StrategyMock from '../meta/passport/strategyMock.js';

@Bean({ scene: 'auth.provider' })
export class AuthProviderGithub extends BeanBase {
  get configModule() {
    return this.ctx.config.module(moduleInfo.relativeName);
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
