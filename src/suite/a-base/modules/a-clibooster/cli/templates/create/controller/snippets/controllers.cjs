const __snippet_declare = "export * from '../controller/<%=argv.controllerName%>.js'";

module.exports = {
  file: 'src/resource/controllers.ts',
  async transform({ cli, ast /* , ctx */ }) {
    // code
    const code = await cli.template.renderContent({ content: __snippet_declare });
    ast.before(code);
    // ok
    return ast;
  },
};
