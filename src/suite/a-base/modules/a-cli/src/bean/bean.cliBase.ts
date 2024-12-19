import { BeanBase, Virtual } from 'vona';

import eggBornUtils from 'egg-born-utils';
import { ServiceConsole, ServiceHelper, ServiceTemplate } from '../index.js';

@Virtual()
export class BeanCliBase extends BeanBase {
  options: any;
  cabloyConfig: any;
  terminal: any;
  __console: ServiceConsole;
  __helper: ServiceHelper;
  __template: ServiceTemplate;

  protected __init__(options) {
    this.options = options;
    this.cabloyConfig = null;
    this.terminal = options.terminal !== false;
  }

  get console(): ServiceConsole {
    if (!this.__console) {
      this.__console = this.app.bean._newBean(ServiceConsole, this);
    }
    return this.__console;
  }

  get helper(): ServiceHelper {
    if (!this.__helper) {
      this.__helper = this.app.bean._newBean(ServiceHelper, this);
    }
    return this.__helper;
  }

  get template(): ServiceTemplate {
    if (!this.__template) {
      this.__template = this.app.bean._newBean(ServiceTemplate, this);
    }
    return this.__template;
  }

  get context() {
    return this.options.context;
  }

  async meta({ user: _user }: any): Promise<any> {
    await this._loadVonaConfig();
    const metaLocale = this._commandMeta();
    return metaLocale;
  }

  async execute({ user: _user }: any): Promise<any> {
    await this._loadVonaConfig();
  }

  async _loadVonaConfig() {
    const { argv } = this.context;
    this.cabloyConfig = eggBornUtils.cabloyConfig;
    await this.cabloyConfig.load({ projectPath: argv.projectPath });
  }

  _commandMeta() {
    const { command } = this.options;
    const { argv } = this.context;
    const meta: any = {};
    meta.info = this._commandMeta_info({ info: command.info, argv });
    meta.options = this._commandMeta_options({ options: command.options, argv });
    meta.groups = this._commandMeta_groups({ groups: command.groups, argv });
    return meta;
  }

  _commandMeta_groups({ groups }: any) {
    const metaGroups: any = {};
    if (groups) {
      for (const groupName in groups) {
        const group = groups[groupName];
        metaGroups[groupName] = this._commandMeta_group({ group });
      }
    }
    return metaGroups;
  }

  _commandMeta_group({ group }: any) {
    const metaGroup = {
      description: this.app.text(group.description),
      condition: group.condition,
      questions: {},
    };
    for (const key in group.questions) {
      const question = group.questions[key];
      metaGroup.questions[key] = {
        ...question,
        message: this.app.text(question.message),
      };
    }
    return metaGroup;
  }

  _commandMeta_options({ options }: any) {
    const metaOptions: any = {};
    if (options) {
      for (const key in options) {
        const option = options[key];
        metaOptions[key] = {
          ...option,
          description: this.app.text(option.description),
        };
      }
    }
    return metaOptions;
  }

  _commandMeta_info({ info, argv }: any) {
    // info
    const metaInfo: any = {
      version: info.version,
      title: this.app.text(info.title),
      usage: this.app.text(info.usage),
    };
    // usage
    if (!metaInfo.usage) {
      metaInfo.usage = `${this.app.text('Usage')}: npm run cli ${argv.cliFullName} -- [options] [-h] [-v] [-t]`;
    }
    // welcomes
    metaInfo.welcomes = this._commandMeta_info_welcomes({ info });
    // ok
    return metaInfo;
  }

  _commandMeta_info_welcomes({ info }: any) {
    let welcomes = info.welcomes || [];
    if (!Array.isArray(welcomes)) welcomes = [welcomes];
    welcomes = welcomes.map(item => this.app.text(item));
    // helper doc
    const configHelper = this.app.bean.util.getProperty(this.cabloyConfig.get(), 'cli.helper');
    if (configHelper !== false) {
      let url = `https://cabloy.com/${this.ctx.locale === 'zh-cn' ? 'zh-cn/' : ''}articles/cli-introduce.html`;
      url = this.helper.chalk.cyan(url);
      const text = `${this.app.text('CliDocs')}: ${url}`;
      welcomes.unshift(text);
    }
    return welcomes;
  }
}
