// queues
const queues = {
  gateway: {
    bean: 'gateway',
    options: {
      worker: {
        concurrency: 10,
      },
    },
  },
};

export const config = _app => {
  return {
    queues,
  };
};
