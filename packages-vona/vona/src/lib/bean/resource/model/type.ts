export interface IDecoratorModelOptions {
  table?: string;
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
