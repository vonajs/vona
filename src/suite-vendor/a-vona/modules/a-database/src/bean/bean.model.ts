import { Virtual } from 'vona-module-a-bean';

import { BeanModelCrud2 } from './bean.model/bean.model_crud2.ts';

@Virtual()
export class BeanModel<TRecord extends {} = any> extends BeanModelCrud2<TRecord> {}
