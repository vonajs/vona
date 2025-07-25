import { MixinClass } from './mixinClass.ts';
import { OmitClass } from './omitClass.ts';
import { PartialClass } from './partialClass.ts';
import { PickClass } from './pickClass.ts';

export const $Class = {
  mixin: MixinClass,
  omit: OmitClass,
  partial: PartialClass,
  pick: PickClass,
};
