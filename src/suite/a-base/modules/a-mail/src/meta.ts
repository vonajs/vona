import schemas from './meta/validation/schemas.js';
// socketio
import socketioMessageMail from './meta/socketio/messageMail.js';
import socketioChannelMail from './meta/socketio/channelMail.js';
// static
import staticResources from './meta/static/resources.js';
// meta
export const meta = {
  base: {
    atoms: {},
    statics: {
      'a-base.resource': {
        items: staticResources,
      },
    },
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
  socketio: {
    messages: {
      mail: socketioMessageMail,
    },
    channels: {
      mail: socketioChannelMail,
    },
  },
};
