import type { TypeBehaviorRecordSelectorKeys, TypeBehaviorRecordSelectorKeysStrict } from './behavior.ts';
import type { TypeComponentRecordSelectorKeysStrict } from './component.ts';
import type { TypeFormFieldRenderComponentProvider } from './rest.ts';

export interface IFormProviderBehaviors {
  formField?: TypeBehaviorRecordSelectorKeysStrict<'formField'>;
  formFieldModel?: TypeBehaviorRecordSelectorKeys<'formFieldModel'>;
  formFieldLayout?: TypeBehaviorRecordSelectorKeys<'formFieldLayout'>;
}

export interface IFormProviderComponents {
  formField?: TypeComponentRecordSelectorKeysStrict<'formField'>;
  text?: TypeFormFieldRenderComponentProvider;
  password?: TypeFormFieldRenderComponentProvider;
  currency?: TypeFormFieldRenderComponentProvider;
}

export interface IFormProvider {
  components?: IFormProviderComponents;
  behaviors?: IFormProviderBehaviors;
}
