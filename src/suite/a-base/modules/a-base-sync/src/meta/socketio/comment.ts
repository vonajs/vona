const comment = {
  info: {
    title: 'Comments',
    persistence: true,
    uniform: {
      stats: {
        params: {
          module: 'a-message',
          name: 'message',
          nameSub: `${__ThisModule__}_comment`,
        },
        color: 'red',
      },
    },
  },
};
export default comment;
