import type { TypeSchemaScene } from 'vona-module-a-openapi';

export type TypeSchemaOrderLevel = 'core' | 'business' | 'max';

export interface ISchemaOrderParams {
  order: number;
  level?: TypeSchemaOrderLevel;
  scene?: TypeSchemaScene;
}
