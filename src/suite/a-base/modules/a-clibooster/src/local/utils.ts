import { Local, BeanBase } from '@cabloy/core';
import { BeanCliBase } from 'cabloy-module-api-a-cli';
import path from 'path';
import fse from 'fs-extra';

const __JSContent = `import { BeanCliBase } from 'cabloy-module-api-a-cli';

export default class Demo extends BeanCliBase {
  // npm run cli :tools:demo
  // npm run cli :tools:demo execute
  async execute({ user }) {
    await super.execute({ user });
    await this.argv({ user });
    return await this.print();
  }

  // npm run cli :tools:demo argv
  async argv({ user }) {
    await this.console.log({ text: user.userName });
  }

  // npm run cli :tools:demo print
  async print() {
    // welcome
    await this.console.log('\\n==== Welcome to CabloyJS! ====\\n');
    // chalk
    let text = this.helper.chalk.keyword('orange')('chalk test');
    await this.console.log({ text });
    // boxen
    text = this.helper.boxen({ text: 'boxen test' });
    await this.console.log({ text });
    // table
    const table = this.helper.newTable({
      head: ['Name', 'Sex'],
      colWidths: [20, 20],
    });
    table.push(['Tom', 'M']);
    table.push(['Jane', 'F']);
    await this.console.log({ text: 'table test' });
    await this.console.log({ text: table.toString() });
    // ok
    return 'hello world';
  }
}
`;

@Local()
export class LocalUtils extends BeanBase {
  async demoExecute({ method, argv, cli, user }: { method: string; argv; cli: BeanCliBase; user }) {
    // js file
    const jsFile = await this._prepareJSFile({ cli });
    // require
    const DemoClass = await import(jsFile);
    // demo
    const demo = this.ctx.bean._newBean(DemoClass.default, {
      method,
      context: { argv },
      progressId: cli.options.progressId,
      terminal: false,
    });
    if (!demo[method]) throw new Error(`method not found: ${method}`);
    // execute
    const timeBegin = new Date();
    let result;
    if (argv.transaction === false) {
      result = await demo[method]({ user });
    } else {
      result = await this.ctx.transaction.begin(async () => {
        return await demo[method]({ user });
      });
    }
    const timeEnd = new Date();
    const duration = timeEnd.valueOf() - timeBegin.valueOf();
    // ok
    return { timeBegin, timeEnd, duration, result };
  }

  async _prepareJSFile({ cli }: any) {
    // prepare
    const jsFile = path.join(process.cwd(), 'src/backend/demo/index.mts');
    const exists = await fse.exists(jsFile);
    if (!exists) {
      await fse.outputFile(jsFile, __JSContent);
    }
    // log
    let log = cli.helper.chalk.keyword('cyan')('> ./src/backend/demo/index.mts');
    await cli.console.log(log);
    const url = this.ctx.bean.base.getAbsoluteUrl('/api/a/clibooster/tools/demo');
    log = cli.helper.chalk.keyword('cyan')(`> ${url}\n`);
    await cli.console.log(log);
    // ok
    return jsFile;
  }
}
