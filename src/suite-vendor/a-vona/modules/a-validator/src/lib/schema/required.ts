import { z } from 'zod';
import { locale } from '../../.metadata/index.js';

type CustomParams = z.CustomErrorParams & { fatal?: boolean };

export function required<T>(params?: string | CustomParams, fatal?: boolean) {
  const p = (typeof params === 'string' ? { message: params } : params) || {};
  const _fatal = p.fatal ?? fatal ?? true;
  const customMessage = p.message ?? locale('ZodError_invalid_type_required');
  const p2 = { ...p, customMessage, message: undefined };
  return z.custom<T>(
    data => {
      return data !== undefined; // not include null
    },
    p2,
    _fatal,
  );
}
