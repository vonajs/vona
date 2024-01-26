const workflow = {
  info: {
    title: 'WorkFlows',
    persistence: true,
    uniform: {
      stats: {
        params: {
          module: 'a-message',
          name: 'message',
          nameSub: `${__ThisModule__}_workflow`,
        },
        color: 'red',
      },
    },
  },
};
export default workflow;
