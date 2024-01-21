export const config = _app => {
  return {
    startups: {
      workerAlive: {
        bean: 'workerAlive',
      },
      databaseInit: {
        bean: 'databaseInit',
        debounce: true,
      },
      databaseName: {
        bean: 'databaseName',
      },
      instanceInit: {
        bean: 'instanceInit',
        instance: true,
        debounce: true,
      },
    },
    broadcasts: {
      columnsClear: {
        bean: 'columnsClear',
        instance: false,
      },
    },
    worker: {
      alive: {
        timeout: 7000,
      },
    },
  };
};
