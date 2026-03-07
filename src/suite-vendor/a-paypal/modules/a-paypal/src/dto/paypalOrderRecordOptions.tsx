import type { TableIdentity } from 'table-identity';
import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import type { IPaypalOrderSceneRecord } from '../types/paypal.ts';
import { Api, v } from 'vona-module-a-openapiutils';
import { Dto } from 'vona-module-a-web';
import z from 'zod';

export interface IDtoOptionsPaypalOrderRecordOptions extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPaypalOrderRecordOptions>()
export class DtoPaypalOrderRecordOptions {
  @Api.field()
  brandName: string;

  @Api.field()
  returnUrl: string;

  @Api.field()
  cancelUrl: string;

  @Api.field()
  returnTo: string;

  @Api.field(z.string())
  scene: keyof IPaypalOrderSceneRecord;

  @Api.field(v.tableIdentity())
  orderId: TableIdentity;
}
