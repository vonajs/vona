import { Bean, BeanBase } from 'vona';

import assert from 'assert';

@Bean({ scene: 'event' })
export class EventUserVerify extends BeanBase {
  async execute(context, next) {
    const data = context.data;
    assert(data.profileUser.profileId > 0);
    // next
    await next();
  }
}
