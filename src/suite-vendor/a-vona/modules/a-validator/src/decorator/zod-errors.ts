import { z } from 'zod';

export function setErrorMap(fn: Function) {
  const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type) {
      if (issue.expected === 'string') {
        return { message: 'bad type!' };
      }
    }
    if (issue.code === z.ZodIssueCode.custom) {
      return { message: `less-than-${(issue.params || {}).minimum}` };
    }
    fn();
    return { message: ctx.defaultError };
  };

  z.setErrorMap(customErrorMap);
}
