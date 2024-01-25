const comment = {
  info: {
    title: 'Comments',
    persistence: true,
    uniform: {
      stats: {
        params: {
          module: 'a-message',
          name: 'message',
          nameSub: `${moduleInfo.relativeName}_comment`,
        },
        color: 'red',
      },
    },
  },
};
module.exports = comment;
