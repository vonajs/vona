import type { IAuthProviderClientOptions } from '../types/authProvider.ts';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';
import { Api } from 'vona-module-a-openapi';

@Entity('aAuthProvider')
export class EntityAuthProvider extends EntityBaseSimple {
  @Api.field()
  disabled: boolean;

  @Api.field()
  module: string;

  @Api.field()
  providerName: string;

  @Api.field()
  clientName: string;

  @Api.field()
  clientOptions: IAuthProviderClientOptions;
}
