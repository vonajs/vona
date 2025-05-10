import fs from 'node:fs';
import { metadataCustomSnippet } from '@cabloy/cli';
import { catchError } from '@cabloy/utils';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
  }
}

export default metadataCustomSnippet({
  file: 'src/bean/meta.version.ts',
  language: 'gogo',
  init: async ({ cli, argv, targetFile }) => {
    await catchError(() => {
      return cli.helper.invokeCli([
        ':create:bean',
        'meta',
        'version',
        `--module=${argv.module}`,
      ], { cwd: argv.projectPath });
    });
    return fs.readFileSync(targetFile).toString('utf8');
  },
  async transform({ ast, argv }) {
    console.log(argv);
    return ast;
  },
});
