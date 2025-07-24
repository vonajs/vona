import fs from 'node:fs';
import { metadataCustomSnippet } from '@cabloy/cli';
import { catchError } from '@cabloy/utils';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
  }
}

const __snippet_import1 = 'import { $tableColumns } from \'vona-module-a-orm\';\n';
const __snippet_import2 = 'import { Entity<%=argv.resourceNameCapitalize%> } from \'../entity/<%=argv.resourceName%>.ts\';\n';
const __snippet_update = '...$tableColumns(() => Entity<%=argv.resourceNameCapitalize%>, \'name\'),';

export default metadataCustomSnippet({
  file: 'src/bean/meta.index.ts',
  language: 'plain',
  init: async ({ cli, argv, targetFile }) => {
    await catchError(() => {
      return cli.helper.invokeCli([
        ':create:bean',
        'meta',
        'index',
        `--module=${argv.module}`,
      ], { cwd: argv.projectPath });
    });
    return fs.readFileSync(targetFile).toString('utf8');
  },
  async transform({ cli, ast }) {
    // import1
    if (!ast.includes(__snippet_import1)) {
      const code = await cli.template.renderContent({ content: __snippet_import1 });
      ast = `${code}${ast}`;
    }
    // import2
    let code = await cli.template.renderContent({ content: __snippet_import2 });
    ast = `${code}${ast}`;
    // update
    code = await cli.template.renderContent({ content: __snippet_update });
    ast = ast.replace('indexes: {', `indexes: {\n${code}`);
    // ok
    return ast;
  },
});
