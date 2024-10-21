module.exports = {
  file: 'src/index.ts',
  parseOptions: {
    language: 'plain',
  },
  async transform({ /* cli,*/ ast, argv }) {
    ast = ast.replace('export {};', '');
    ast += `import 'vona-module-${argv.name}';\n`;
    // ok
    return ast;
  },
};
