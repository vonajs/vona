import { BeanCliBase } from '@cabloy/cli';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    force: boolean;
  }
}

export class CliToolsBuild extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    const force = argv.force;
    await this._build(projectPath, force);
  }

  async _build(_projectPath: string, force: boolean) {
    // count
    const count =
      Object.keys(this.modulesMeta.suites).length + this.modulesMeta.modulesArray.filter(item => !item.suite).length;
    // begin
    let counter = 0;
    const timeBegin = new Date();
    console.log('===> build begin');
    // args
    const tscArgs = ['-b'];
    if (force) {
      tscArgs.push('--force');
    }
    // suites
    for (const key in this.modulesMeta.suites) {
      const suite = this.modulesMeta.suites[key];
      console.log(`===>  ${++counter}/${count} suite: ${suite.info.originalName}`);
      await this.helper.processHelper.tsc(tscArgs, { cwd: suite.root });
    }
    // modules
    for (const module of this.modulesMeta.modulesArray) {
      if (!module.suite) {
        console.log(`===>  ${++counter}/${count} module: ${module.info.originalName}`);
        await this.helper.processHelper.tsc(tscArgs, { cwd: module.root });
      }
    }
    // end
    const timeEnd = new Date();
    console.log(`===> build end: ${(timeEnd.valueOf() - timeBegin.valueOf()) / 1000}s`);
  }
}
