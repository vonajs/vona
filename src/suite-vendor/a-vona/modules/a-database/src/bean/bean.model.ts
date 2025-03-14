import { Virtual } from 'vona-module-a-bean';

import { BeanModelCrud } from './bean.model/bean.model_crud.ts';

@Virtual()
export class BeanModel<TRecord extends {} = any> extends BeanModelCrud<TRecord> {}
