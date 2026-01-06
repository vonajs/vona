export type TypeSchemaOrderLevel = 'core' | 'business' | 'max';

export interface ISchemaOrderParams {
  order: number;
  level?: TypeSchemaOrderLevel;
}
