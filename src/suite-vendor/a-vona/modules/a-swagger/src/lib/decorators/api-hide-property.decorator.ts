/* eslint-disable @typescript-eslint/no-empty-function */
export function ApiHideProperty(): PropertyDecorator {
  return (_target: Record<string, any>, _propertyKey: string | symbol) => {};
}
