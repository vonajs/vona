export type PowerPartial<T> = {
  [U in keyof T]?:
  T[U] extends (...args: any) => any
    ? (args: Parameters<T[U]>) => PowerPartialFunctionResult<ReturnType<T[U]>>
    : T[U] extends object ? PowerPartial<T[U]> : T[U];
};

type PowerPartialFunctionResult<T> = T extends Promise<infer R> ? Promise<PowerPartial<R>> : PowerPartial<T>;
