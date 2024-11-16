import { Type } from 'vona';
import { ClassTransformOptions } from './classTransformOptions.js';

export interface TransformerPackage {
  plainToClass<T>(cls: Type<T>, plain: unknown, options?: ClassTransformOptions): T | T[];
  classToPlain(object: unknown, options?: ClassTransformOptions): Record<string, any> | Record<string, any>[];
}
