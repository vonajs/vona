import { Meta } from 'vona-module-a-meta';
import { BeanAssetBase } from 'vona-module-a-static';

export interface TypeAssetGetPath {
  static: 'img/vona.svg' | 'img/vona.png';
}

@Meta()
export class MetaAsset extends BeanAssetBase<TypeAssetGetPath> {}
