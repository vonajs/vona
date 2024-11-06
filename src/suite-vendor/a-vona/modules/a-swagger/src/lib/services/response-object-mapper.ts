import { omit, pick } from 'lodash-es';
import { ApiResponseMetadata, ApiResponseSchemaHost } from '../decorators/index.js';
import { getSchemaPath } from '../utils/index.js';
import { MimetypeContentWrapper } from './mimetype-content-wrapper.js';

export class ResponseObjectMapper {
  private readonly mimetypeContentWrapper = new MimetypeContentWrapper();

  toArrayRefObject(response: Record<string, any>, name: string, produces: string[]) {
    const exampleKeys = ['example', 'examples'];
    return {
      ...omit(response, exampleKeys),
      ...this.mimetypeContentWrapper.wrap(produces, {
        schema: {
          type: 'array',
          items: {
            $ref: getSchemaPath(name),
          },
        },
        ...pick(response, exampleKeys),
      }),
    };
  }

  toRefObject(response: Record<string, any>, name: string, produces: string[]) {
    const exampleKeys = ['example', 'examples'];
    return {
      ...omit(response, exampleKeys),
      ...this.mimetypeContentWrapper.wrap(produces, {
        schema: {
          $ref: getSchemaPath(name),
        },
        ...pick(response, exampleKeys),
      }),
    };
  }

  wrapSchemaWithContent(response: ApiResponseSchemaHost & ApiResponseMetadata, produces: string[]) {
    if (!response.schema && !('example' in response) && !('examples' in response)) {
      return response;
    }
    const exampleKeys = ['example', 'examples'];
    const content = this.mimetypeContentWrapper.wrap(produces, {
      schema: response.schema,
      ...pick(response, exampleKeys),
    });
    return {
      ...omit(response, exampleKeys),
      ...content,
    };
  }
}
