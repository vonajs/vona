import type { TypeBehaviorRecordSelectorKeysStrict } from './behavior.ts';
import type { TypeComponentRecordSelectorKeysStrict } from './component.ts';
import type { TypeRenderComponentProvider } from './rest.ts';

export interface IFormProviderBehaviors {
  formField?: TypeBehaviorRecordSelectorKeysStrict<'formField'>;
  formFieldLayout?: TypeBehaviorRecordSelectorKeysStrict<'formFieldLayout'>;
  formFieldModel?: TypeBehaviorRecordSelectorKeysStrict<'formFieldModel'>;
}

export interface IFormProviderComponents {
  // table?: TypeComponentRecordSelectorKeysStrict<'restTable'>;
  formField?: TypeComponentRecordSelectorKeysStrict<'formField'>;
  text?: TypeRenderComponentProvider;
}

export interface IFormProvider {
  components?: IFormProviderComponents;
  behaviors?: IFormProviderBehaviors;
}
