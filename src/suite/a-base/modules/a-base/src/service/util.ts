import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import pMap from 'p-map';

@Service()
export class ServiceUtil extends BeanBase {
  async performAction({ params: _params }: any) {
    // // force innerAccess as false
    // params.innerAccess = false;
    // // performAction
    // return await this.bean.executor.performAction(params);
  }

  async performActions({ actions }: any) {
    // concurrency
    const mapper = async params => {
      let err;
      let res;
      try {
        res = await this.performAction({ params });
      } catch (error: any) {
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
