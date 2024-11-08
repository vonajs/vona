import { BeanCliBase } from '@cabloy/cli';
import { IModuleInfo } from '@cabloy/module-info';
import path from 'path';
import fs from 'fs';
import { __ThisSetName__ } from '../this.js';

const __decorators = {
  virtual: 'Virtual',
  aop: 'Aop',
};
const __boilerplates = {
  middleware: 'middleware',
};

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    sceneName: string;
    sceneNameCapitalize: string;
    beanName: string;
    beanNameCapitalize: string;
    //
    decoratorName: string;
    beanOptions: string;
  }
}

export class CliCreateBean extends BeanCliBase {
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
    const sceneName = argv.sceneName; // bean/summer.cache
    const sceneParts = sceneName.split('.');
    argv.sceneNameCapitalize = sceneParts.map(item => this.helper.firstCharToUpperCase(item)).join();
    // bean name
    const beanName = argv.beanName;
    argv.beanNameCapitalize = this.helper.firstCharToUpperCase(beanName);
    // decoratorName
    argv.decoratorName = __decorators[sceneName] || 'Bean';
    // beanOptions
    if (sceneName === 'aop') {
      argv.beanOptions = "{ match: 'some-bean-name' }";
    } else if (sceneName === 'bean') {
      argv.beanOptions = '';
    } else {
      argv.beanOptions = `{ scene: '${sceneName}' }`;
    }
    // directory
    const beanDir = path.join(targetDir, 'src/bean');
    const beanFile = path.join(beanDir, `${sceneName}.${beanName}.ts`);
    if (fs.existsSync(beanFile)) {
      throw new Error(`${sceneName} bean exists: ${beanName}`);
    }
    await this.helper.ensureDir(beanDir);
    // boilerplate name
    const boilerplateName = __boilerplates[sceneName] || 'bean';
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: beanDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: `create/${boilerplateName}/boilerplate`,
    });
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
  }
}
