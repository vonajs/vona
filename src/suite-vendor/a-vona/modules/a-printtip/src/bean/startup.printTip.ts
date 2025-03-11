import type { IStartupExecute } from 'vona-module-a-startup';
import type { IMetaPrintTipExecute, IMetaPrintTipInfo } from '../types/printTip.ts';
import chalk from 'chalk';
import { BeanBase } from 'vona';
import { Startup } from 'vona-module-a-startup';

const __tipBegin = '=================== tip: begin ===================';
const __tipEnd = '=================== tip: end =====================';

@Startup({ debounce: true, after: true, meta: { mode: 'local' } })
export class StartupPrintTip extends BeanBase implements IStartupExecute {
  async execute() {
    setTimeout(async () => {
      await this._print();
    }, this.scope.config.delay);
  }

  async _print() {
    //
    const outputs: IMetaPrintTipInfo[] = [];
    const onions = this.bean.onion.meta.getOnionsEnabledOfMeta('printTip');
    for (const onion of onions) {
      const beanInstance = this.bean._getBean<IMetaPrintTipExecute>(onion.beanOptions.beanFullName as any);
      const res = await beanInstance.execute();
      if (Array.isArray(res)) {
        outputs.push(...res);
      } else {
        outputs.push(res);
      }
    }
    //
    const message = outputs.map(output => `${chalk.magenta(output.title)}: ${chalk.cyan(output.path)}`).join('\n');
    const text = `\n${chalk.yellow(__tipBegin)}\n${message}\n${chalk.yellow(__tipEnd)}`;
    this.$logger.silly(text);
  }
}
