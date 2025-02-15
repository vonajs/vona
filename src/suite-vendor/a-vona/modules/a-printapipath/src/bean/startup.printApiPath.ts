import { BeanBase } from 'vona';
import type { IMetaPrintApiPathExecute, IMetaPrintApiPathInfo } from 'vona-module-a-printapipath';
import type { IStartupExecute } from 'vona-module-a-startup';
import { Startup } from 'vona-module-a-startup';
import TableClass from 'cli-table3';
import chalk from 'chalk';

@Startup({ debounce: true, after: true, meta: { mode: 'local' } })
export class StartupPrintApiPath extends BeanBase implements IStartupExecute {
  async execute() {
    setTimeout(async () => {
      await this._print();
    }, 2000);
  }

  async _print() {
    //
    const outputs: IMetaPrintApiPathInfo[] = [];
    const onions = this.bean.onion.meta.getOnionsEnabledOfMeta('printApiPath');
    for (const onion of onions) {
      const beanInstance = this.bean._getBean<IMetaPrintApiPathExecute>(onion.beanOptions.beanFullName as any);
      const res = await beanInstance.execute();
      if (Array.isArray(res)) {
        outputs.push(...res);
      } else {
        outputs.push(res);
      }
    }
    //
    const table = new TableClass({
      head: ['Title', 'Path'],
      colWidths: [30, 80],
    });
    for (const output of outputs) {
      table.push([output.title, output.path]);
    }
    //
    // eslint-disable-next-line
    console.log(chalk.yellow('\n===== print api path ====='));
    // eslint-disable-next-line
    console.log(table.toString());
  }
}
