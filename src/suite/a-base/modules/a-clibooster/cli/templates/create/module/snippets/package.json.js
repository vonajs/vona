module.exports = {
  file: 'package.json',
  parseOptions: {
    language: 'json',
  },
  async transform({ /* cli,*/ ast /* , ctx*/ }) {
    ast.dependencies['cabloy-module-api-<%=argv.moduleInfo.relativeName%>'] = 'workspace:^';
    // ok
    return ast;
  },
};
