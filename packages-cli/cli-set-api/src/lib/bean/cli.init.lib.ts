import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import { __ThisSetName__ } from '../this.ts';

declare module '@cabloy/cli' {
  interface ICommandArgv {}
}

export class CliInitLib extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // module name/info
    const moduleName = argv._[0];
    if (!moduleName) return;
    argv.moduleInfo = this.helper.parseModuleInfo(moduleName);
    // check if exists
    const _module = this.helper.findModule(moduleName);
    if (!_module) {
      throw new Error(`module does not exist: ${moduleName}`);
    }
    // target dir
    const targetDir = await this.helper.ensureDir(_module.root);
    const mainFile = path.join(targetDir, 'src/lib/index.ts');
    if (fse.existsSync(mainFile)) {
      throw new Error(`lib exists: ${moduleName}`);
    }
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: path.join(targetDir, 'src'),
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'init/lib/boilerplate',
    });
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
  }
}
