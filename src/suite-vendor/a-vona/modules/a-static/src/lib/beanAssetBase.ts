import { BeanBase, SymbolModuleBelong } from 'vona';

export class BeanAssetBase<TypeAssetGetPath> extends BeanBase {
  get<K extends keyof TypeAssetGetPath, V extends TypeAssetGetPath[K]>(scene: K, assetPath: V): string {
    return this.app.util.getAssetPathPhysical(this[SymbolModuleBelong], scene as any, assetPath as any);
  }
}
