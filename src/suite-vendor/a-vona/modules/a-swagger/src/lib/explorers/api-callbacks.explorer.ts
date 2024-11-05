import { Type } from 'vona';
import { DECORATORS } from '../constants.js';
import { getSchemaPath } from '../utils/index.js';
import { CallBackObject } from '../interfaces/callback-object.interface.js';

export const exploreApiCallbacksMetadata = (_instance: object, _prototype: Type<unknown>, method: object) => {
  const callbacksData = Reflect.getMetadata(DECORATORS.API_CALLBACKS, method);
  if (!callbacksData) return callbacksData;

  return callbacksData.reduce((acc, callbackData: CallBackObject<string | Function>) => {
    const { name: eventName, callbackUrl, method: callbackMethod, requestBody, expectedResponse } = callbackData;
    return {
      ...acc,
      [eventName]: {
        [callbackUrl]: {
          [callbackMethod]: {
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: getSchemaPath(requestBody.type),
                  },
                },
              },
            },
            responses: {
              [expectedResponse.status]: {
                description: expectedResponse.description || 'Your server returns this code if it accepts the callback',
              },
            },
          },
        },
      },
    };
  }, {});
};
