export const validatePath = (inputPath: string): string => {
  return inputPath.charAt(0) !== '/' ? '/' + inputPath : inputPath;
};
