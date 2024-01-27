export interface IModelOptions {
  disableDeleted?: boolean;
  disableInstance?: boolean;
  cacheName?: {
    module?: string;
    name: string;
  };
  cacheKeyAux?: string;
  cacheNotKey?: boolean;
}
