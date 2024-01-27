import { Virtual } from '@cabloy/core';
import { BeanAtomBasePerformActionBulk } from './bean.atomBase/bean.atomBase_performActionBulk.js';

@Virtual({ scene: 'bean' })
export class BeanAtomBase extends BeanAtomBasePerformActionBulk {}
