import { __ThisModule__ } from '../.metadata/this.js';
import path from 'path';
import { BeanCliBase } from 'vona-module-a-cli';

export class CliCreatePageBase extends BeanCliBase {
  pageMode: string;

  constructor(pageMode) {
    super();
    this.pageMode = pageMode;
  }

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
    // pageName
    const pageName = argv.pageName;
    // pageName2
    const parts = pageName.split('/');
    const pageName2 = parts[parts.length - 1];
    argv.pageName2 = pageName2;
    // directory
    let pageDir = path.join(targetDir, 'front/src/pages');
    if (parts.length > 1) {
      pageDir = path.join(pageDir, parts.slice(0, parts.length - 1).join('/'));
    }
    await this.helper.ensureDir(pageDir);
    // render snippets
    await this.template.renderBoilerplateAndSnippets({
      targetDir,
      moduleName: __ThisModule__,
      snippetsPath: `create/${this.pageMode}/snippets`,
      boilerplatePath: null,
    });
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: pageDir,
      moduleName: __ThisModule__,
      snippetsPath: null,
      boilerplatePath: `create/${this.pageMode}/boilerplate`,
    });
    // need not reload
    // this.ctx.app.meta.reload.now();
  }
}
