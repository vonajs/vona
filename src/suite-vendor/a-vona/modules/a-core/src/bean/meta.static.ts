import { Meta } from 'vona-module-a-meta';
import { BeanStaticBase } from 'vona-module-a-static';

export interface MetaStatic {
  get: ((path: 'img/vona.svg') => string) & ((path: 'img/vona.png') => string);
}

@Meta()
export class MetaStatic extends BeanStaticBase {}
