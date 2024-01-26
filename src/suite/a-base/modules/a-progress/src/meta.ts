// import schemas from './meta/validation/schemas.js';
// socketio
import socketioProgress from './meta/socketio/progress.js';
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
      progress: socketioProgress,
    },
  },
};
export default meta;
