const schemas = require('./meta/validation/schemas.js');
// socketio
const socketioMessageSystem = require('./meta/socketio/messageSystem.js');
const meta = {
  base: {
    atoms: {},
  },
  validation: {
    validators: {},
    keywords: {},
    schemas: {},
  },
  socketio: {
    messages: {
      messageSystem: socketioMessageSystem,
    },
  },
};
export default meta;
