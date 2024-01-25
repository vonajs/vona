const content = {
  sidebar: {
    top: {
      hidden: true,
      buttons: [
        { module: 'a-layoutpc', name: 'buttonAppHome' },
        // { module: 'a-layoutpc', name: 'buttonSearch' },
        { module: 'a-layoutpc', name: 'buttonFullscreen' },
        { module: 'a-layoutpc', name: 'buttonAppMine' },
      ],
    },
    left: {
      panels: [],
    },
    right: {
      panels: [],
    },
    bottom: {
      hidden: true,
      panels: [],
      buttons: [{ module: 'a-layoutpc', name: 'buttonClock' }],
    },
  },
};
const layout = {
  atomName: 'PC Layout(Anonymous)',
  atomStaticKey: 'layoutPCAnonymous',
  atomRevision: 15,
  description: '',
  layoutTypeCode: 2,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
module.exports = layout;
