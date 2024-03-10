import {} from '@cabloy/core';

export interface EntityShare extends EntityItemBase {
  uuid: string;
  userId: number;
  host: string;
  url: string;
}
