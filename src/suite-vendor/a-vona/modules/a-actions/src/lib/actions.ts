import type {
  IActionExprOptions,
  IActionLogOptions,
  IActionVarOptions,
  IActionViewOptions,
} from '../types/actions.ts';

export function ActionExpr(_options: IActionExprOptions) {
  return 'ActionExpr';
}

export function ActionVar(_options: IActionVarOptions) {
  return 'ActionVar';
}

export function ActionLog(_options: IActionLogOptions) {
  return 'ActionLog';
}

export function ActionView(_options: IActionViewOptions) {
  return 'ActionView';
}
