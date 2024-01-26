const resources = [
  // markdown block
  {
    atomName: 'Audio',
    atomStaticKey: 'audio',
    atomRevision: 2,
    atomCategoryId: 'a-markdown:block.General',
    resourceType: 'a-markdown:block',
    resourceConfig: JSON.stringify({
      default: {
        audio: {
          name: '',
          url: '',
          artist: '',
          cover: '',
        },
        autoplay: false,
        loop: true,
      },
      validator: {
        module: __ThisModule__,
        validator: 'blockAudio',
      },
    }),
    resourceRoles: 'root',
  },
  {
    atomName: 'Embed Page',
    atomStaticKey: 'iframe',
    atomRevision: 2,
    atomCategoryId: 'a-markdown:block.General',
    resourceType: 'a-markdown:block',
    resourceConfig: JSON.stringify({
      default: {
        url: '',
        width: '',
        height: '',
      },
      validator: {
        module: __ThisModule__,
        validator: 'blockIFrame',
      },
    }),
    resourceRoles: 'root',
  },
];
export default resources;
