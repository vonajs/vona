import { Bean } from '@cabloy/core';
import { BeanCliBase } from 'cabloy-module-api-a-cli';

@Bean({ scene: 'cli.create' })
export class CliCreateController extends BeanCliBase {
  async execute({ user }) {
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
    // render
    await this.template.renderBoilerplateAndSnippets({
      targetDir,
      moduleName: __ThisModule__,
      snippetsPath: 'create/controller/snippets',
      boilerplatePath: 'create/controller/boilerplate',
    });
    // reload
    this.ctx.app.meta.reload.now();
  }
}
