import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import type { IAuthProviderClientOptions } from '../types/authProvider.ts';
import { Api } from 'vona-module-a-openapi';
import { Entity, EntityBaseSimple } from 'vona-module-a-orm';

export interface IEntityOptionsAuthProvider extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsAuthProvider>('aAuthProvider')
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
