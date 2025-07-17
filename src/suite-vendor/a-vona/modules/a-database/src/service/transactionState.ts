import type { ServiceTransactionChain } from './transactionChain.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceTransactionState extends BeanBase {
  private _chains: Record<string, ServiceTransactionChain> = {};
}
