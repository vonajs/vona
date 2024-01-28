export default {
  providers: {
    authsimple: {
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
