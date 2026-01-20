import type { IActionExprOptions, IActionLogOptions, IActionVarOptions, IActionViewOptions } from '../types/actions.ts';

export function ActionExpr(_options: IActionExprOptions) {
  return 'actionExpr';
}

export function ActionVar(_options: IActionVarOptions) {
  return 'actionVar';
}

export function ActionLog(_options: IActionLogOptions) {
  return 'actionLog';
}

export function ActionView(_options: IActionViewOptions) {
  return 'actionView';
}
