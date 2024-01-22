// const moduleInfo = module.info;

const content = {
  sidebar: {
    top: {
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
      panels: [],
      buttons: [
        { module: 'a-layoutpc', name: 'buttonViewPopup' },
        { module: 'a-layoutpc', name: 'buttonViewLayout' },
        { module: 'a-layoutpc', name: 'buttonTheme' },
        { module: 'a-layoutpc', name: 'buttonLanguage' },
        { module: 'a-layoutpc', name: 'buttonClock' },
      ],
    },
  },
};
const layout = {
  atomName: 'PC Layout(Authenticated)',
  atomStaticKey: 'layoutPC',
  atomRevision: 31,
  description: '',
  layoutTypeCode: 2,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
module.exports = layout;
