const provider = moduleInfo.name;
export default {
  providers: {
    [provider]: {
      meta: {
        title: 'SMS',
        inline: true,
        mode: 'direct',
        bean: 'sms',
        render: 'blockSignin',
        icon: { f7: ':auth:sms' },
      },
    },
  },
};
