import {
  schemaRenderActionBulk,
  schemaRenderActionBulkJsx,
  schemaRenderActionRow,
  schemaRenderActionRowJsx,
  schemaRenderCell,
  schemaRenderCellJsx,
  schemaRenderField,
  schemaRenderFieldJsx,
} from './v/component.ts';
import { schemaFilter, schemaFilterTransform } from './v/filter.ts';
import {
  schemaEmail,
  schemaIPv4,
  schemaIPv6,
  schemaLowercase,
  schemaMax,
  schemaMin,
  schemaRegex,
  schemaTableIdentity,
  schemaToLowerCase,
  schemaToUpperCase,
  schemaTrim,
  schemaUppercase,
  schemaUrl,
  schemaUuid,
} from './v/helpers.ts';
import { schemaDescription, schemaExample, schemaOpenapi, schemaTitle } from './v/openapi.ts';
import {
  schemaRenderOrder,
  schemaRenderFieldSource,
  schemaRenderVisible,
  schemaRenderReadonly,
  schemaRenderLayout,
  schemaRenderDisableNotifyChanged,
} from './v/rest.ts';
import {
  schemaSerializerCustom,
  schemaSerializerExclude,
  schemaSerializerGetter,
  schemaSerializerReplace,
  schemaSerializerTransform,
} from './v/serializer.ts';
import {
  schemaArray,
  schemaDefault,
  schemaLazy,
  schemaLooseObject,
  schemaObject,
  schemaOptional,
  schemaRequired,
  schemaStrictObject,
} from './v/system.ts';
import { schemaZodRefine, schemaZodTransform } from './v/zod.ts';

export const v = {
  required: schemaRequired,
  optional: schemaOptional,
  default: schemaDefault,
  object: schemaObject,
  strictObject: schemaStrictObject,
  looseObject: schemaLooseObject,
  array: schemaArray,
  lazy: schemaLazy,
  // helpers
  email: schemaEmail,
  url: schemaUrl,
  uuid: schemaUuid,
  ipv4: schemaIPv4,
  ipv6: schemaIPv6,
  min: schemaMin,
  max: schemaMax,
  trim: schemaTrim,
  toLowerCase: schemaToLowerCase,
  toUpperCase: schemaToUpperCase,
  lowercase: schemaLowercase,
  uppercase: schemaUppercase,
  regex: schemaRegex,
  tableIdentity: schemaTableIdentity,
  // serializer
  serializerExclude: schemaSerializerExclude,
  serializerTransform: schemaSerializerTransform,
  serializerReplace: schemaSerializerReplace,
  serializerGetter: schemaSerializerGetter,
  serializerCustom: schemaSerializerCustom,
  // filter
  filter: schemaFilter,
  filterTransform: schemaFilterTransform,
  // openapi
  openapi: schemaOpenapi,
  title: schemaTitle,
  description: schemaDescription,
  example: schemaExample,
  // render
  renderLayout: schemaRenderLayout,
  renderVisible: schemaRenderVisible,
  renderReadonly: schemaRenderReadonly,
  renderOrder: schemaRenderOrder,
  renderDisableNotifyChanged: schemaRenderDisableNotifyChanged,
  renderFieldSource: schemaRenderFieldSource,
  // component
  renderField: schemaRenderField,
  renderFieldJsx: schemaRenderFieldJsx,
  renderCell: schemaRenderCell,
  renderCellJsx: schemaRenderCellJsx,
  renderActionRow: schemaRenderActionRow,
  renderActionRowJsx: schemaRenderActionRowJsx,
  renderActionBulk: schemaRenderActionBulk,
  renderActionBulkJsx: schemaRenderActionBulkJsx,
  // zod
  zodRefine: schemaZodRefine,
  zodTransform: schemaZodTransform,
};
