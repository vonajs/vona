import { BeanCliBase, NameMeta } from '@cabloy/cli';
import { IModuleInfo } from '@cabloy/module-info';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    sceneName: string;
    sceneNameCapitalize: string;
    nameMeta: NameMeta;
    //
    decoratorName: string;
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
    if (!argv.sceneName) {
      argv.sceneName = this.sceneName;
    }
    argv.sceneNameCapitalize = this.helper.firstCharToUpperCase(argv.sceneName);
    // bean name
    if (!argv.beanName) {
      argv.beanName = argv.storeName || argv.styleName || argv.themeName || argv.toolName || argv.modelName;
    }
    // nameMeta
    argv.nameMeta = this.helper.parseNameMeta(argv.beanName);
    // directory
    let beanDir = path.join(targetDir, 'src/bean');
    if (argv.nameMeta.directory) {
      beanDir = path.join(beanDir, argv.nameMeta.directory);
    }
    const beanFile = path.join(beanDir, `${argv.sceneName}.${argv.nameMeta.full}.ts`);
    if (fs.existsSync(beanFile)) {
      throw new Error(`${argv.sceneName} bean exists: ${argv.beanName}`);
    }
    await this.helper.ensureDir(beanDir);
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: beanDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: 'create/bean/boilerplate',
    });
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
  }
}
