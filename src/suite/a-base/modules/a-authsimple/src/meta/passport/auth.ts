const provider = moduleInfo.name;
export default {
  providers: {
    [provider]: {
      meta: {
        title: 'User/Password',
        inline: true,
        mode: 'direct',
        bean: 'simple',
        render: 'blockSignin',
        icon: { f7: ':auth:password' },
      },
    },
  },
};
