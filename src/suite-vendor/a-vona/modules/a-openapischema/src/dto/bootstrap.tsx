import type { IOpenApiOptionsResourceMeta } from 'vona-module-a-openapi';
import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api } from 'vona-module-a-openapiutils';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsBootstrap extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsBootstrap>()
export class DtoBootstrap {
  @Api.field()
  apiPath: string;

  @Api.field()
  resourceMeta: IOpenApiOptionsResourceMeta;
}
