export interface IZodRefineExecute<T = any, R = any> {
  execute(value: T, metadata: RouteHandlerArgumentMeta, options: IDecoratorZodRefineOptions): Promise<R>;
}
