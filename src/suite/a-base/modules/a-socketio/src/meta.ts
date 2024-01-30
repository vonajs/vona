import schemas from './meta/validation/schemas.js';
// socketio
import socketioMessageSystem from './meta/socketio/messageSystem.js';
export const meta = {
  base: {
    atoms: {},
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
  socketio: {
    messages: {
      messageSystem: socketioMessageSystem,
    },
  },
};
