import { __ThisModule__ } from '../resource/this.js';
import { Bean } from '@cabloy/core';
import { BeanCliBase } from 'cabloy-module-api-a-cli';

import fs from 'fs';
import path from 'path';

@Bean({ scene: 'cli.create' })
export class CliCreateModule extends BeanCliBase {
  async execute({ user }: any) {
    const { argv } = this.context;
    // super
    await super.execute({ user });
    // suite name/info
    const suiteName = argv.suite;
    if (suiteName) {
      argv.suiteInfo = this.helper.parseSuiteInfo(suiteName);
      // check if exists
      argv._suite = this.helper.findSuite(suiteName);
      if (!argv._suite) {
        throw new Error(`suite does not exist: ${suiteName}`);
      }
    }
    // module name/info
    const moduleName = argv.name;
    argv.moduleInfo = this.helper.parseModuleInfo(moduleName);
    argv.relativeNameCapitalize = this.helper.relativeNameToCapitalize(argv.moduleInfo.relativeName);
    // check if exists
    const _module = this.helper.findModule(moduleName);
    if (!argv.force && _module) {
      throw new Error(`module exists: ${moduleName}`);
    }
    // target dir
    let targetDir;
    if (suiteName) {
      targetDir = path.join(argv._suite.root, 'modules', moduleName);
    } else {
      targetDir = path.join(argv.projectPath, 'src/module', moduleName);
    }
    if (!argv.force && fs.existsSync(targetDir)) {
      throw new Error(`module exists: ${moduleName}`);
    }
    // template
    const template = argv.template;
    // render module snippets for suite
    if (suiteName) {
      await this.template.renderBoilerplateAndSnippets({
        targetDir: argv._suite.root,
        moduleName: __ThisModule__,
        snippetsPath: `create/${template}/snippets`,
        boilerplatePath: null,
      });
    }
    // render module boilerplate
    targetDir = await this.helper.ensureDir(targetDir);
    await this.template.renderBoilerplateAndSnippets({
      targetDir,
      moduleName: __ThisModule__,
      snippetsPath: null,
      boilerplatePath: `create/${template}/boilerplate`,
    });
    // npm install
    // await this.helper.pnpmInstall();
    // reload
    // this.ctx.app.meta.reload.now();
  }
}
