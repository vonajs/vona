import fs from 'node:fs';
import { metadataCustomSnippet } from '@cabloy/cli';
import { catchError } from '@cabloy/utils';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
  }
}

const __snippet_import1 = 'import { $tableColumns } from \'vona-module-a-orm\';';
const __snippet_import2 = 'import { Entity<%=argv.resourceNameCapitalize%> } from \'../entity/<%=argv.resourceName%>.ts\';';
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
        '--nometadata',
        '--noformat',
      ], { cwd: argv.projectPath });
    });
    return fs.readFileSync(targetFile).toString('utf8');
  },
  async transform({ cli, ast }) {
    // import1
    if (!ast.includes(__snippet_import1)) {
      const code = await cli.template.renderContent({ content: __snippet_import1 });
      ast = ast.replace('import { Meta } from \'vona-module-a-meta\';', `import { Meta } from 'vona-module-a-meta';\n${code}`);
    }
    // import2
    let code = await cli.template.renderContent({ content: __snippet_import2 });
    ast = ast.replace('import { $tableColumns } from \'vona-module-a-orm\';', `import { $tableColumns } from 'vona-module-a-orm';\n${code}`);
    // update
    code = await cli.template.renderContent({ content: __snippet_update });
    ast = ast.replace('indexes: {', `indexes: {\n    ${code}\n  `);
    // ok
    return ast;
  },
});
