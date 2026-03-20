import type { CurrencyOptions } from '@zhennann/currency';
import type {
  ICaptchaOptions,
  IResourcePickerOptions,
  ISelectOptions,
  ITextareaOptions,
  IToggleOptions,
  TypeDateFormat,
} from 'vona-module-a-openapi';

export interface ISchemaComponentRecord {
  currency: CurrencyOptions;
  date: TypeDateFormat;
  captcha: ICaptchaOptions;
  toggle: IToggleOptions;
  select: ISelectOptions;
  resourcePicker: IResourcePickerOptions;
  textarea: ITextareaOptions;
}
