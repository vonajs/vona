export interface AtomClass {
  module?: string;
  atomClassName?: string;
}

export type AtomClassParams = {
  id?: number;
  module?: string;
  atomClassName?: string;
};

export interface AtomClassMeta {
  //
  bean: string | { module: string; name: string };
  title: string;
  model: string;
  tableName: string;
  tableNameModes: Record<string | 'default', string>;
  //
  simple: boolean;
  itemOnly: boolean;
  inner: boolean;
  language: boolean;
  category: boolean;
  tag: boolean;
  history: boolean;
  comment: boolean;
  attachment: boolean;
  cms: boolean;
  enableRight?:
    | {
        mine: boolean;
        role:
          | {
              scopes: boolean;
            }
          | boolean;
      }
    | boolean;
  detail?: {
    inline: boolean;
    atomClassMain?: { module: string; name: string };
  };
  details?: Array<AtomClass>;
  fields?: {
    mappings?: {
      atomIdMain: string;
      lineNo: string;
    };
    dicts?: Record<string, object>;
  };
  layout?: {
    config: {
      atomList: string;
      atomItem: string;
    };
  };
}

export interface AtomClassBase extends AtomClassMeta {
  name: string;
  titleLocale: string;
  beanFullName: string;
}

export type AtomClassBaseRecord = Record<string, AtomClassBase>;
