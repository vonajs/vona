import type { IActionLogOptions, IActionViewOptions } from '../types/actions.ts';

export function ActionView(_options: IActionViewOptions) {
  return 'actionView';
}

export function ActionLog(_options: IActionLogOptions) {
  return 'actionLog';
}
