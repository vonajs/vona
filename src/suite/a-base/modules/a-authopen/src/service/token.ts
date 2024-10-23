import { Service, BeanBase } from 'vona';

import chalk from 'chalk';
import Table from 'cli-table3';
import eggBornUtils from 'egg-born-utils';

@Service()
export class ServiceToken extends BeanBase {
  async add({ name, host, clientID, clientSecret, log }: any) {
    // init file
    const { fileName, config } = await eggBornUtils.openAuthConfig.load();
    // config
    if (!config.tokens) config.tokens = {};
    config.tokens[name] = {
      host,
      clientID,
      clientSecret,
    };
    // save
    await eggBornUtils.openAuthConfig.save({ config });
    // log
    if (log) {
      console.log(chalk.cyan(`\n  ${fileName}\n`));
    }
    // ok
    return { fileName, config };
  }

  async delete({ name, log }: any) {
    // init file
    const { fileName, config } = await eggBornUtils.openAuthConfig.load();
    // config
    if (config.tokens && config.tokens[name]) {
      // delete
      delete config.tokens[name];
      // save
      await eggBornUtils.openAuthConfig.save({ config });
    }
    // log
    if (log) {
      console.log(chalk.cyan(`\n  ${fileName}\n`));
    }
    // ok
    return { fileName, config };
  }

  async get({ name }: any) {
    // init file
    const { config } = await eggBornUtils.openAuthConfig.load();
    return config.tokens && config.tokens[name];
  }

  async list({ log }: any) {
    // init file
    const { fileName, config } = await eggBornUtils.openAuthConfig.load();
    // log
    if (log) {
      // tokens
      if (!config.tokens) config.tokens = {};
      const table = new Table({
        head: ['Token Name', 'Host'],
        colWidths: [30, 50],
      });
      for (const tokenName in config.tokens) {
        const token = config.tokens[tokenName];
        table.push([tokenName, token.host]);
      }
      console.log(table.toString());
      // fileName
      console.log(chalk.cyan(`\n  ${fileName}\n`));
    }
    // ok
    return { fileName, config };
  }
}
