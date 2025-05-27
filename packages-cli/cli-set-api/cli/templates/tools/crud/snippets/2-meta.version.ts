import fs from 'node:fs';
import { metadataCustomSnippet } from '@cabloy/cli';
import { catchError } from '@cabloy/utils';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
  }
}

const __snippet_update = `if (options.version === <%=argv.fileVersion%>) {
  const entity<%=argv.resourceNameCapitalize%> = this.scope.entity.<%=argv.resourceName%>;
  await this.bean.model.createTable(entity<%=argv.resourceNameCapitalize%>.$table, table => {
    table.basicFields();
    table.string(entity<%=argv.resourceNameCapitalize%>.$column('name'), 50);
    table.string(entity<%=argv.resourceNameCapitalize%>.$column('description'), 255);
  });
}`;

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
  async transform({ cli, ast }) {
    // update
    ast.replace('async update(_options: IMetaVersionUpdateOptions) {$$$1}', 'async update(options: IMetaVersionUpdateOptions) {$$$1}');
    const code = await cli.template.renderContent({ content: __snippet_update });
    ast.replace('async update($$$0) {$$$1}', `async update($$$0) {$$$1 \n ${code}}`);
    // ok
    return ast;
  },
});
