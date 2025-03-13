import type { IAuthProviderClientOptions } from '../types/authProvider.ts';
import { Entity, EntityBase } from 'vona-module-a-database';
import { Rule } from 'vona-module-a-openapi';

@Entity('aAuthProvider')
export class EntityAuthProvider extends EntityBase {
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
