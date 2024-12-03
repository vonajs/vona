export interface IModelRecord {}

export interface IDecoratorModelOptions<T extends object = {}> {
  entity?: T;
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
