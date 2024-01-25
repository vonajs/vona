import { BeanBase, Local } from '@cabloy/core';

const pMap = require('p-map');

@Local()
export class LocalUtil extends BeanBase {
  async performAction({ params }) {
    // force innerAccess as false
    params.innerAccess = false;
    // performAction
    return await this.ctx.meta.util.performAction(params);
  }

  async performActions({ actions }) {
    // concurrency
    const mapper = async params => {
      let err;
      let res;
      try {
        res = await this.performAction({ params });
      } catch (error) {
        err = {
          code: error.code || 500,
          message: error.message,
        };
      }
      return { err, res };
    };
    return await pMap(actions, mapper, { concurrency: 10 });
  }
}
