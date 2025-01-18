import { metadataCustomSnippet } from '@cabloy/cli';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    name: string;
  }
}

export default metadataCustomSnippet({
  file: 'package.json',
  language: 'json',
  async transform({ /* cli,*/ ast, argv }) {
    ast.dependencies[`vona-module-${argv.name}`] = 'workspace:^';
    // ok
    return ast;
  },
});
