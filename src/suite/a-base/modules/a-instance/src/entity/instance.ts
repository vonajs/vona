import {} from '@cabloy/core';

export interface EntityInstance extends Omit<EntityBase, 'iid'> {
  disabled: number;
  name: string;
  title: string;
  config: string;
}
