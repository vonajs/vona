import { Virtual } from 'vona';
import { BeanAtomBasePerformActionBulk } from './bean.atomBase/bean.atomBase_performActionBulk.js';

@Virtual()
export class BeanAtomBase<_T = any> extends BeanAtomBasePerformActionBulk {}
