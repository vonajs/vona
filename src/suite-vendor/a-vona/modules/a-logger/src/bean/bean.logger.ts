import type { ILoggerClientRecord } from '../types/logger.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceLoggerClient } from '../service/loggerClient.ts';

@Bean()
export class BeanLogger extends BeanBase {
  getClient(clientName?: keyof ILoggerClientRecord) {
    return this.app.bean._getBeanSelector(ServiceLoggerClient, clientName);
  }
}
