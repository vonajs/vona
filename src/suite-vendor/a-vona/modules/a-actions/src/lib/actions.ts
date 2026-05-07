import type { IActionOptionsActions, IActionOptionsEvent } from '../types/actions.ts';

export function Event(_options: IActionOptionsEvent) {
  return 'ActionEvent';
}

export function Actions(_options: IActionOptionsActions) {
  return 'ActionActions';
}
