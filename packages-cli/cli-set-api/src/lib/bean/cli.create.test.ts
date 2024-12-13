import { BeanCliBase, NameMeta } from '@cabloy/cli';
import path from 'path';
import fs from 'fs';
import { IModuleInfo } from '@cabloy/module-info';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    name: string;
    nameCapitalize: string;
    nameMeta: NameMeta;
  }
}

export class CliCreateTest extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // module name/info
    const moduleName = argv.module;
    argv.moduleInfo = this.helper.parseModuleInfo(moduleName);
    // check if exists
    const _module = this.helper.findModule(moduleName);
    if (!_module) {
      throw new Error(`module does not exist: ${moduleName}`);
    }
    // target dir
    const targetDir = await this.helper.ensureDir(_module.root);
    // name
    argv.nameCapitalize = this.helper.firstCharToUpperCase(argv.name);
    // nameMeta
    argv.nameMeta = this.helper.parseNameMeta(argv.name, ['test']);
    // directory
    const testDir = path.join(targetDir, 'test');
    const testFile = path.join(testDir, `${argv.name}.test.ts`);
    if (fs.existsSync(testFile)) {
      throw new Error(`test exists: ${testFile}`);
    }
    await this.helper.ensureDir(testDir);
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: testDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'create/test/boilerplate',
    });
  }
}
