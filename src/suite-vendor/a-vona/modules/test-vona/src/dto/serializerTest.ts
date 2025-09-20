import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Serializer } from 'vona-module-a-serialization';
import { Dto } from 'vona-module-a-web';
import { SensitiveEmail } from '../lib/serializer.ts';

export interface IDtoOptionsSerializerTest extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsSerializerTest>()
export class DtoSerializerTest {
  @Serializer.exclude()
  @Api.field(v.min(6))
  password: string;

  @Serializer.transform('test-vona:email')
  email: string;

  @Serializer.transform(
    'a-serialization:sensitive',
    {
      // eslint-disable-next-line
      patternFrom: /(\w?)(\w+)(\w)(@\w+\.[a-z]+)/,
      patternTo: '$1****$3$4',
    },
  )
  @Api.field(v.email())
  email2: string;

  @SensitiveEmail()
  email3: string;

  @Api.field(
    v.openapi({
      serializerTransforms: {
        'a-serialization:sensitive': {
          // eslint-disable-next-line
          patternFrom: /(\w?)(\w+)(\w)(@\w+\.[a-z]+)/,
          patternTo: '$1****$3$4',
        },
      },
    }),
    v.email(),
  )
  email4: string;

  @Api.field(
    v.serializerTransform('a-serialization:sensitive', {
      // eslint-disable-next-line
      patternFrom: /(\w?)(\w+)(\w)(@\w+\.[a-z]+)/,
      patternTo: '$1****$3$4',
    }),
    v.email(),
  )
  email5: string;

  @Api.field(
    v.serializerSensitive({
      // eslint-disable-next-line
      patternFrom: /(\w?)(\w+)(\w)(@\w+\.[a-z]+)/,
      patternTo: '$1****$3$4',
    }),
    v.email(),
  )
  email6: string;
}
