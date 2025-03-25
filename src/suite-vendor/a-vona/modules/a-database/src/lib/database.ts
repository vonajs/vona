import type { IAopMethodOptionsDataSource } from '../bean/aopMethod.dataSource.ts';
import type { IAopMethodOptionsTransaction } from '../bean/aopMethod.transaction.ts';
import { Aspect } from 'vona-module-a-aspect';

function DataSource(options?: Partial<IAopMethodOptionsDataSource>): MethodDecorator {
  return Aspect.aopMethod('a-database:dataSource', options);
}

function Transaction(options?: Partial<IAopMethodOptionsTransaction>): MethodDecorator {
  return Aspect.aopMethod('a-database:transaction', options);
}

export const Database = {
  dataSource: DataSource,
  transaction: Transaction,
};
