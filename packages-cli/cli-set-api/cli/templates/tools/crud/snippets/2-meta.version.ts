import { metadataCustomSnippet } from '@cabloy/cli';

declare module '@cabloy/cli' {
  interface ICommandArgv {
  }
}

export default metadataCustomSnippet({
  file: 'meta.version.ts',
  language: 'gogo',
  init: async ({ cli, targetFile }) => {

  },
  async transform({ ast, argv }) {
    argv.fileVersion = ast.vonaModule.fileVersion = 1 + (ast.vonaModule.fileVersion ?? 0);
    return ast;
  },
});
