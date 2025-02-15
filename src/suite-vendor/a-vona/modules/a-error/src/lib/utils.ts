import type { VonaContext } from 'vona';

export function accepts(ctx: VonaContext) {
  if (ctx.acceptJSON) return 'json';
  if (ctx.acceptJSONP) return 'js';
  return 'html';
}
