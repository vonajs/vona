import type { IAuthProviderClientOptions } from '../types/authProvider.ts';
import { Entity, EntityBaseSimple } from 'vona-module-a-database';
import { Rule } from 'vona-module-a-openapi';

@Entity('aAuthProvider')
export class EntityAuthProvider extends EntityBaseSimple {
  @Rule()
  disabled: boolean;

  @Rule()
  module: string;

  @Rule()
  providerName: string;

  @Rule()
  clientName: string;

  @Rule()
  clientOptions: IAuthProviderClientOptions;
}
