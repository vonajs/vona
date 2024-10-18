export interface IModelOptions {
  disableDeleted?: boolean;
  disableInstance?: boolean;
  disableUpdateTime?: boolean;
  cache?: {
    module?: string;
    name: string;
  };
  cacheKeyAux?: string;
  cacheNotKey?: boolean;
}
