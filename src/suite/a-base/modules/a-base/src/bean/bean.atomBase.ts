import { Virtual } from 'vona-module-a-bean';

import { BeanAtomBasePerformActionBulk } from './bean.atomBase/bean.atomBase_performActionBulk.js';

@Virtual()
export class BeanAtomBase<_T = any> extends BeanAtomBasePerformActionBulk {}
