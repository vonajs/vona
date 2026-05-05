import type { CurrencyOptions } from '@zhennann/currency';
import type { IResourceTableCellOptionsBase } from 'vona-module-a-openapi';

import type { TypeDateFormatPreset } from './date.ts';

export interface IResourceTableCellOptionsDate extends IResourceTableCellOptionsBase {
  preset?: TypeDateFormatPreset;
  format?: string;
}

export interface IResourceTableCellOptionsCurrency
  extends IResourceTableCellOptionsBase, CurrencyOptions {}

declare module 'vona-module-a-openapi' {
  export interface IResourceComponentTableCellRecord {
    // Input?: IInputOptions;
    // Captcha?: ICaptchaOptions;
    Currency?: IResourceTableCellOptionsCurrency;
    Date?: IResourceTableCellOptionsDate;
    // DateRange?: IDateRangeOptions;
    // Toggle?: IToggleOptions;
    // Select?: ISelectOptions;
    // Textarea?: ITextareaOptions;
    // ResourcePicker?: IResourcePickerOptions;
  }
}
