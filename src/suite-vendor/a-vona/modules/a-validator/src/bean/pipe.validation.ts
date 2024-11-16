import {
  RouteHandlerArgumentMeta,
  BeanBase,
  IPipeTransform,
  Pipe,
  IDecoratorPipeOptionsGlobal,
  HttpStatus,
  Type,
  createArgumentPipeParse,
} from 'vona';
import { ValidatorOptions } from '../types/validatorOptions.js';
import { ClassTransformOptions } from '../types/classTransformOptions.js';

export interface IPipeOptionsValidation extends IDecoratorPipeOptionsGlobal, ValidatorOptions {
  transform: boolean;
  disableErrorMessages?: boolean;
  transformOptions: ClassTransformOptions;
  errorHttpStatusCode: HttpStatus;
  validateCustomDecorators?: boolean;
  expectedType?: Type<any>;
}

@Pipe<IPipeOptionsValidation>({
  global: true,
  transform: true,
  transformOptions: {
    strategy: 'exposeAll',
    ignoreDecorators: false,
    enableCircularCheck: false,
    enableImplicitConversion: false,
    excludeExtraneousValues: false,
    exposeDefaultValues: false,
    exposeUnsetFields: false,
  },
  validateCustomDecorators: false,
  //
  enableDebugMessages: false,
  skipUndefinedProperties: false,
  skipNullProperties: false,
  skipMissingProperties: false,
  whitelist: false,
  forbidNonWhitelisted: false,
  forbidUnknownValues: false,
  disableErrorMessages: false,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  groups: undefined,
  always: false,
  strictGroups: false,
  dismissDefaultMessages: false,
  validationError: {
    target: false,
    value: false,
  },
  stopAtFirstError: false,
})
export class PipeValidation extends BeanBase implements IPipeTransform<any> {
  async transform(value: any, metadata: RouteHandlerArgumentMeta, options: IPipeOptionsValidation) {
    if (options.expectedType) {
      metadata = { ...metadata, metaType: options.expectedType };
    }

    const metatype = metadata.metatype;
    if (!metatype || !this.toValidate(metadata)) {
      return this.isTransformEnabled ? this.transformPrimitive(value, metadata) : value;
    }
    const originalValue = value;
    value = this.toEmptyIfNil(value);

    const isNil = value !== originalValue;
    const isPrimitive = this.isPrimitive(value);
    this.stripProtoKeys(value);
    let entity = classTransformer.plainToClass(metatype, value, this.transformOptions);

    const originalEntity = entity;
    const isCtorNotEqual = entity.constructor !== metatype;

    if (isCtorNotEqual && !isPrimitive) {
      entity.constructor = metatype;
    } else if (isCtorNotEqual) {
      // when "entity" is a primitive value, we have to temporarily
      // replace the entity to perform the validation against the original
      // metatype defined inside the handler
      entity = { constructor: metatype };
    }

    const errors = await this.validate(entity, this.validatorOptions);
    if (errors.length > 0) {
      throw await this.exceptionFactory(errors);
    }
    if (isPrimitive) {
      // if the value is a primitive value and the validation process has been successfully completed
      // we have to revert the original value passed through the pipe
      entity = originalEntity;
    }
    if (this.isTransformEnabled) {
      return entity;
    }
    if (isNil) {
      // if the value was originally undefined or null, revert it back
      return originalValue;
    }
    // we check if the number of keys of the "validatorOptions" is higher than 1 (instead of 0)
    // because the "forbidUnknownValues" now fallbacks to "false" (in case it wasn't explicitly specified)
    const shouldTransformToPlain = Object.keys(this.validatorOptions).length > 1;
    return shouldTransformToPlain ? classTransformer.classToPlain(entity, this.transformOptions) : value;
  }
}

export const ValidationPipe = createArgumentPipeParse('a-validator:validation');
