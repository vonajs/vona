import { BeanCliBase } from '@cabloy/cli';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    force: boolean;
  }
}

export class CliBinTsc extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    const force = argv.force;
    await this._tsc(projectPath, force);
  }

  async _tsc(projectPath: string, force: boolean) {
    // count
    const count = 1 +
      Object.keys(this.modulesMeta.suites).length + this.modulesMeta.modulesArray.filter(item => !item.suite).length;
    // begin
    let counter = 0;
    const timeBegin = new Date();
    // eslint-disable-next-line
    console.log('===> build begin');
    // args
    const tscArgs = ['-b'];
    if (force) {
      tscArgs.push('--force');
    }
    // tsc: project
    // eslint-disable-next-line
    console.log(`===>  ${++counter}/${count} project`);
    await this.helper.processHelper.tsc(tscArgs, { cwd: projectPath });
    // suites
    for (const key in this.modulesMeta.suites) {
      const suite = this.modulesMeta.suites[key];
      // eslint-disable-next-line
      console.log(`===>  ${++counter}/${count} suite: ${suite.info.originalName}`);
      await this.helper.processHelper.tsc(tscArgs, { cwd: suite.root });
    }
    // modules
    for (const module of this.modulesMeta.modulesArray) {
      if (!module.suite) {
        // eslint-disable-next-line
        console.log(`===>  ${++counter}/${count} module: ${module.info.originalName}`);
        await this.helper.processHelper.tsc(tscArgs, { cwd: module.root });
      }
    }
    // end
    const timeEnd = new Date();
    // eslint-disable-next-line
    console.log(`===> build end: ${(timeEnd.valueOf() - timeBegin.valueOf()) / 1000}s`);
  }
}
