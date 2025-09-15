import type { IInterceptorOptionsUpload } from '../bean/interceptor.upload.ts';
import { Aspect } from 'vona-module-a-aspect';

function Upload(options?: Partial<IInterceptorOptionsUpload>): MethodDecorator {
  return Aspect.interceptor('a-upload:upload', options);
}

export const File = {
  upload: Upload,
};
