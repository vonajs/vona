import { HttpStatus, RequestMethod, Type } from '@nestjs/common';
import { HTTP_CODE_METADATA, METHOD_METADATA } from '@nestjs/common/constants.js';
import { isEmpty } from '@nestjs/common/utils/shared.utils.js';
import { get, mapValues, omit } from 'lodash-es';
import { DECORATORS } from '../constants.js';
import { ApiResponse, ApiResponseMetadata } from '../decorators/index.js';
import { SchemaObject } from '../interfaces/open-api-spec.interface.js';
import { METADATA_FACTORY_NAME } from '../plugin/plugin-constants.js';
import { FactoriesNeededByResponseFactory, ResponseObjectFactory } from '../services/response-object-factory.js';
import { mergeAndUniq } from '../utils/merge-and-uniq.util.js';

const responseObjectFactory = new ResponseObjectFactory();

export const exploreGlobalApiResponseMetadata = (
  schemas: Record<string, SchemaObject>,
  metatype: Type<unknown>,
  factories: FactoriesNeededByResponseFactory,
) => {
  const responses: ApiResponseMetadata[] = Reflect.getMetadata(DECORATORS.API_RESPONSE, metatype);
  const produces = Reflect.getMetadata(DECORATORS.API_PRODUCES, metatype);
  return responses
    ? {
        responses: mapResponsesToSwaggerResponses(responses, schemas, produces, factories),
      }
    : undefined;
};

export const exploreApiResponseMetadata = (
  schemas: Record<string, SchemaObject>,
  factories: FactoriesNeededByResponseFactory,
  instance: object,
  prototype: Type<unknown>,
  method: Function,
) => {
  applyMetadataFactory(prototype, instance);

  const responses = Reflect.getMetadata(DECORATORS.API_RESPONSE, method);
  if (responses) {
    const classProduces = Reflect.getMetadata(DECORATORS.API_PRODUCES, prototype);
    const methodProduces = Reflect.getMetadata(DECORATORS.API_PRODUCES, method);
    const produces = mergeAndUniq<string[]>(get(classProduces, 'produces'), methodProduces);
    return mapResponsesToSwaggerResponses(responses, schemas, produces, factories);
  }
  const status = getStatusCode(method);
  if (status) {
    return { [status]: { description: '' } };
  }
  return undefined;
};

const getStatusCode = (method: Function) => {
  const status = Reflect.getMetadata(HTTP_CODE_METADATA, method);
  if (status) {
    return status;
  }
  const requestMethod: RequestMethod = Reflect.getMetadata(METHOD_METADATA, method);
  switch (requestMethod) {
    case RequestMethod.POST:
      return HttpStatus.CREATED;
    default:
      return HttpStatus.OK;
  }
};

const omitParamType = (param: Record<string, any>) => omit(param, 'type');
const mapResponsesToSwaggerResponses = (
  responses: ApiResponseMetadata[],
  schemas: Record<string, SchemaObject>,
  produces: string[] = ['application/json'],
  factories: FactoriesNeededByResponseFactory,
) => {
  produces = isEmpty(produces) ? ['application/json'] : produces;

  const openApiResponses = mapValues(responses, (response: ApiResponseMetadata) =>
    responseObjectFactory.create(response, produces, schemas, factories),
  );
  return mapValues(openApiResponses, omitParamType);
};

function applyMetadataFactory(prototype: Type<unknown>, instance: object) {
  const classPrototype = prototype;
  do {
    if (!prototype.constructor) {
      return;
    }
    if (!prototype.constructor[METADATA_FACTORY_NAME]) {
      continue;
    }
    const metadata = prototype.constructor[METADATA_FACTORY_NAME]();
    const methodKeys = Object.keys(metadata).filter(key => typeof instance[key] === 'function');
    methodKeys.forEach(key => {
      const { summary, deprecated, tags, ...meta } = metadata[key];

      if (Object.keys(meta).length === 0) {
        return;
      }
      if (meta.status === undefined) {
        meta.status = getStatusCode(instance[key]);
      }
      ApiResponse(meta, { overrideExisting: false })(
        classPrototype,
        key,
        Object.getOwnPropertyDescriptor(classPrototype, key) as any,
      );
    });
  } while ((prototype = Reflect.getPrototypeOf(prototype) as Type<any>) && prototype !== Object.prototype && prototype);
}
