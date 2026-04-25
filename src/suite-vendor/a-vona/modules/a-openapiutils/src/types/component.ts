import type { CurrencyOptions } from '@zhennann/currency';
import type {
  ICaptchaOptions,
  IDateRangeOptions,
  IResourcePickerOptions,
  ISelectOptions,
  ITextareaOptions,
  IToggleOptions,
  IDateOptions,
  IInputOptions,
} from 'vona-module-a-openapi';

export interface ISchemaComponentRecord {
  input: IInputOptions;
  currency: CurrencyOptions;
  date: IDateOptions;
  dataRange: IDateRangeOptions;
  captcha: ICaptchaOptions;
  toggle: IToggleOptions;
  select: ISelectOptions;
  resourcePicker: IResourcePickerOptions;
  textarea: ITextareaOptions;
}
