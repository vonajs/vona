import { Serializer } from 'vona-module-a-serialization';

export function SensitiveEmail(): PropertyDecorator {
  return Serializer.replace({
    // eslint-disable-next-line
    patternFrom: /(\w?)(\w+)(\w)(@\w+\.[a-z]+)/,
    patternTo: '$1****$3$4',
  });
}
