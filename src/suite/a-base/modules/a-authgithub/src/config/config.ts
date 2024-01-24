export const config = _app => {
  return {
    account: {
      github: {
        scenes: {
          default: {
            title: 'AuthDefault',
            clientID: '',
            clientSecret: '',
          },
        },
      },
    },
  };
};
