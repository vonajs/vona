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

  @Api.field(v.serializerExclude(), v.min(6))
  password2: string;

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

  @Serializer.sensitive({
    // eslint-disable-next-line
    patternFrom: /(\w?)(\w+)(\w)(@\w+\.[a-z]+)/,
    patternTo: '$1****$3$4',
  })
  @Api.field(v.email())
  email3: string;

  @SensitiveEmail()
  email4: string;

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
  email5: string;

  @Api.field(
    v.serializerTransform('a-serialization:sensitive', {
      // eslint-disable-next-line
      patternFrom: /(\w?)(\w+)(\w)(@\w+\.[a-z]+)/,
      patternTo: '$1****$3$4',
    }),
    v.email(),
  )
  email6: string;

  @Api.field(
    v.serializerSensitive({
      // eslint-disable-next-line
      patternFrom: /(\w?)(\w+)(\w)(@\w+\.[a-z]+)/,
      patternTo: '$1****$3$4',
    }),
    v.email(),
  )
  email7: string;

  @Api.field()
  firstName: string;

  @Api.field()
  lastName: string;

  @Serializer.getter((data: DtoSerializerTest) => {
    return `${data.firstName} ${data.lastName}`;
  })
  @Api.field(v.optional())
  fullName: string;

  @Api.field(v.serializerGetter((data: DtoSerializerTest) => {
    return `${data.firstName} ${data.lastName}`;
  }), v.optional())
  fullName2: string;

  @Api.field(v.optional())
  get fullName3(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
