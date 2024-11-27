import { isEmpty, isFunction, omit } from 'lodash-es';
import { DECORATORS } from '../constants.js';
import { ApiPropertyOptions, ApiResponseMetadata, ApiResponseSchemaHost } from '../decorators/index.js';
import { LinksObject, SchemaObject } from '../interfaces/open-api-spec.interface.js';
import { isBuiltInType } from '../utils/is-built-in-type.util.js';
import { MimetypeContentWrapper } from './mimetype-content-wrapper.js';
import { ModelPropertiesAccessor } from './model-properties-accessor.js';
import { ResponseObjectMapper } from './response-object-mapper.js';
import { SchemaObjectFactory } from './schema-object-factory.js';
import { SwaggerTypesMapper } from './swagger-types-mapper.js';
import { cast } from 'vona';

export type FactoriesNeededByResponseFactory = {
  linkName: (controllerKey: string, methodKey: string, fieldKey: string) => string;
  operationId: (controllerKey: string, methodKey: string) => string;
};

export class ResponseObjectFactory {
  private readonly mimetypeContentWrapper = new MimetypeContentWrapper();
  private readonly modelPropertiesAccessor = new ModelPropertiesAccessor();
  private readonly swaggerTypesMapper = new SwaggerTypesMapper();
  private readonly schemaObjectFactory = new SchemaObjectFactory(this.modelPropertiesAccessor, this.swaggerTypesMapper);
  private readonly responseObjectMapper = new ResponseObjectMapper();

  create(
    response: ApiResponseMetadata,
    produces: string[],
    schemas: Record<string, SchemaObject>,
    factories: FactoriesNeededByResponseFactory,
  ) {
    const { type, isArray } = response as ApiResponseMetadata;
    response = omit(response, ['isArray']);

    if (!type) {
      return this.responseObjectMapper.wrapSchemaWithContent(response as ApiResponseSchemaHost, produces);
    }

    if (isBuiltInType(type as Function)) {
      const typeName = type && isFunction(type) ? (type as Function).name : (type as string);
      const swaggerType = this.swaggerTypesMapper.mapTypeToOpenAPIType(typeName);

      const exampleKeys = ['example', 'examples'];
      if (isArray) {
        const content = this.mimetypeContentWrapper.wrap(produces, {
          schema: {
            type: 'array',
            items: {
              type: swaggerType,
            },
          },
        });
        return {
          ...omit(response, exampleKeys),
          ...content,
        };
      }

      const content = this.mimetypeContentWrapper.wrap(produces, {
        schema: {
          type: swaggerType,
        },
      });
      return {
        ...omit(response, exampleKeys),
        ...content,
      };
    }
    const name = this.schemaObjectFactory.exploreModelSchema(type as Function, schemas);
    if (isFunction(type) && cast(type).prototype) {
      const { prototype } = cast(type);
      const links: LinksObject = {};

      const properties = this.modelPropertiesAccessor.getModelProperties(prototype);

      const generateLink = (
        controllerPrototype: { constructor: { name: string } },
        method: Function,
        parameter: string,
        field: string,
      ) => {
        const linkName = factories.linkName(controllerPrototype.constructor.name, method.name, field);

        links[linkName] = {
          operationId: factories.operationId(controllerPrototype.constructor.name, method.name),
          parameters: {
            [parameter]: `$response.body#/${field}`,
          },
        };
      };

      // links defined by @ApiProperty({link: () => type}) and @ApiDefaultGetter
      for (const key of properties) {
        const metadata: ApiPropertyOptions = Reflect.getMetadata(DECORATORS.API_MODEL_PROPERTIES, prototype, key) ?? {};

        if (!metadata.link) {
          continue;
        }

        const linkedType = metadata.link();

        const linkedGetterInfo = Reflect.getMetadata(DECORATORS.API_DEFAULT_GETTER, linkedType.prototype);

        if (!linkedGetterInfo) {
          continue;
        }

        const { getter, parameter, prototype: controllerPrototype } = linkedGetterInfo;

        generateLink(controllerPrototype, getter, parameter, key);
      }

      // links defind by @ApiLink
      const customLinks = Reflect.getMetadata(DECORATORS.API_LINK, prototype);

      for (const customLink of customLinks ?? []) {
        const { method, parameter, field, prototype: controllerPrototype } = customLink;

        generateLink(controllerPrototype, method, parameter, field);
      }

      if (!isEmpty(links)) {
        // merge links into the response links provided by the user - the provided links
        // prevail against the new ones in case of conflict
        response.links = Object.assign(links, response.links);
      }
    }
    if (isArray) {
      return this.responseObjectMapper.toArrayRefObject(response, name, produces);
    }
    return this.responseObjectMapper.toRefObject(response, name, produces);
  }
}
