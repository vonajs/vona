import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';

import { BeanCliBase } from 'vona-module-a-cli';

@BeanTemp({ scene: 'cli.create' })
export class CliCreateDetail extends BeanCliBase {
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
    // atomClassMain
    argv.atomClassMain = this.app.bean.util.parseAtomClass({
      module: argv.__ThisModule__,
      atomClassName: argv.atomClassMain,
    });
    // target dir
    const targetDir = await this.helper.ensureDir(_module.root);
    // render
    await this.template.renderBoilerplateAndSnippets({
      targetDir,
      moduleName: __ThisModule__,
      snippetsPath: 'create/atom-detail/snippets',
      boilerplatePath: 'create/atom-detail/boilerplate',
    });
    // reload
    this.ctx.app.meta.reload.now();
  }
}
