import { StringPrefixCel, StringPrefixRaw, StringPrefixRegexp } from './types.ts';

export function regexp(str: string) {
  return `${StringPrefixRegexp}${str}`;
}

export function cel(str: string) {
  return `${StringPrefixCel}${str}`;
}

export function raw(str: string) {
  return `${StringPrefixRaw}${str}`;
}
