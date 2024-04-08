import { BeanCliBase } from './bean.cli.base.js';

export class LocalConsole {
  cli: BeanCliBase;

  constructor(cli) {
    this.cli = cli;
  }

  get options() {
    return this.cli.options;
  }

  get context() {
    return this.cli.options.context;
  }

  async log(data, options: any = {}) {
    if (!data) return;
    // data
    if (typeof data !== 'object') {
      data = { text: String(data) };
    }
    let { text } = data;
    // logPrefix
    const logPrefix = options.logPrefix;
    if (logPrefix) {
      text = this._adjustText(logPrefix, text);
    }
    // fallback
    if (!this.cli.terminal) {
      return console.log(text);
    }
  }

  _adjustText(prefix, text) {
    return String(text)
      .split('\n')
      .map(item => (item ? prefix + item : item))
      .join('\n');
  }
}
