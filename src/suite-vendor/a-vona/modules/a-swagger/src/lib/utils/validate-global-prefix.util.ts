export const validateGlobalPrefix = (globalPrefix: string): boolean => {
  return !!globalPrefix && !globalPrefix.match(/^(\/?)$/);
};
