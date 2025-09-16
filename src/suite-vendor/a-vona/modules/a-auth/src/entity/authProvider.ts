import type { IDecoratorEntityOptions } from 'vona-module-a-orm';
import type { IAuthProviderClientOptions, IAuthProviderRecord } from '../types/authProvider.ts';
import { Api } from 'vona-module-a-openapi';
import { Entity, EntityBaseSimple } from 'vona-module-a-orm';
import z from 'zod';

export interface IEntityOptionsAuthProvider extends IDecoratorEntityOptions {}

@Entity<IEntityOptionsAuthProvider>('aAuthProvider')
export class EntityAuthProvider extends EntityBaseSimple {
  @Api.field()
  disabled: boolean;

  @Api.field(z.string())
  providerName: keyof IAuthProviderRecord;

  @Api.field()
  clientName: string;

  @Api.field()
  clientOptions: IAuthProviderClientOptions;
}
