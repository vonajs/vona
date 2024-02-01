export interface IModelOptions {
  disableDeleted?: boolean;
  disableInstance?: boolean;
  cache?: {
    module?: string;
    name: string;
  };
  cacheKeyAux?: string;
  cacheNotKey?: boolean;
}
