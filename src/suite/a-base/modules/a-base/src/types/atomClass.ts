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
  enableRight: {
    mine: boolean;
    role: {
      scopes: boolean;
    };
  };
  detail: {
    inline: boolean;
    atomClassMain: { module: string; name: string };
  };
  fields: {
    mappings: {
      atomIdMain: string;
    };
    dicts: Record<string, object>;
  };
  layout: {
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
