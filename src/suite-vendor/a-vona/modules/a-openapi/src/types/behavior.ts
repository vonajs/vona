export interface IBehaviorRecord {}

export type TypeBehaviorRecordSelector<PREFIX extends string> = {
  [K in keyof IBehaviorRecord as K extends `${string}:${PREFIX}${string}` ? K : never]: IBehaviorRecord[K];
};
export type TypeBehaviorRecordSelectorKeys<PREFIX extends string> = keyof TypeBehaviorRecordSelector<PREFIX>;

export type TypeBehaviorRecordSelectorStrict<PREFIX extends string> = {
  [K in keyof IBehaviorRecord as K extends `${string}:${PREFIX}` ? K : never]: IBehaviorRecord[K];
};
export type TypeBehaviorRecordSelectorKeysStrict<PREFIX extends string> = keyof TypeBehaviorRecordSelectorStrict<PREFIX>;
