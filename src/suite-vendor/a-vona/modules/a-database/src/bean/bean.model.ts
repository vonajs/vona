import { Virtual } from 'vona-module-a-bean';

import { BeanModelCrudTable } from './bean.model/bean.model_crud_table.ts';

@Virtual()
export class BeanModel<TRecord extends {} = any> extends BeanModelCrudTable<TRecord> {}
