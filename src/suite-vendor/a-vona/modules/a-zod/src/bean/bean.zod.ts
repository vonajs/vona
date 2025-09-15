import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanZod extends BeanBase {
  customError(path: string[], message: string): Error {
    const error = new Error();
    error.code = 422;
    error.message = [
      {
        code: 'custom',
        path,
        message,
      },
    ] as any;
    return error;
  }
}
