import { BeanCliBase, CmdOptions } from '@cabloy/cli';
import { IModuleInfo } from '@cabloy/module-info';
import path from 'path';
import fs from 'fs';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    sceneName: string;
    sceneNameCapitalize: string;
    name: string;
    nameCapitalize: string;
  }
}

export class CliCreateBeanBase extends BeanCliBase {
  sceneName: string;

  constructor(options: CmdOptions, sceneName) {
    super(options);
    this.sceneName = sceneName;
  }

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
    // scene name
    if (!argv.sceneName) {
      argv.sceneName = this.sceneName;
    }
    argv.sceneNameCapitalize = this.helper.firstCharToUpperCase(argv.sceneName);
    // name
    argv.nameCapitalize = this.helper.firstCharToUpperCase(argv.name);
    // directory
    const beanDir = path.join(targetDir, `src/${argv.sceneName}`);
    const beanFile = path.join(beanDir, `${argv.name}.ts`);
    if (fs.existsSync(beanFile)) {
      throw new Error(`${argv.sceneName} exists: ${argv.name}`);
    }
    await this.helper.ensureDir(beanDir);
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: beanDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: `create/${argv.sceneName}/boilerplate`,
    });
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
  }
}
