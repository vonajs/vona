// queues
const queues = {
  overtime: {
    bean: 'overtime',
  },
};

export const config = _app => {
  return {
    queues,
  };
};
