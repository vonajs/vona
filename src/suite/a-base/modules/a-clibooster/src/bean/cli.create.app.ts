import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';

import { BeanCliBase } from 'vona-module-a-cli';

@BeanTemp({ scene: 'cli.create' })
export class CliCreateApp extends BeanCliBase {
  async execute({ user }: any) {
    const { argv } = this.context;
    // super
    await super.execute({ user });
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
    // appName
    let appName = argv.appName;
    appName = appName.replace(appName[0], appName[0].toLowerCase());
    argv.appName = appName;
    argv.appNameCapitalize = appName.replace(appName[0], appName[0].toUpperCase());
    argv.appKey = `app${argv.appNameCapitalize}`;
    // render
    await this.template.renderBoilerplateAndSnippets({
      targetDir,
      moduleName: __ThisModule__,
      snippetsPath: 'create/app/snippets',
      boilerplatePath: 'create/app/boilerplate',
    });
    // reload
    this.ctx.app.meta.reload.now();
  }
}
