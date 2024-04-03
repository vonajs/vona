import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import eggBornUtils from 'egg-born-utils';
import { BeanCliBase } from 'cabloy-module-api-a-cli';

// const __storeTokenHost = 'https://portal.cabloy.com';
// const __storeTokenHost = 'http://localhost:9192';

export default class CliStoreBase extends BeanCliBase<ScopeModule> {
  commandName: any;
  tokenName: any;
  openAuthClient: any;
  _needReInstallDeps: boolean;

  constructor(commandName) {
    super();
    this.commandName = commandName;
    this.tokenName = `store.${commandName}`;
    this.openAuthClient = null;
  }

  get localToken() {
    return this.bean.scope('a-authopen').local.token;
  }

  get configModule() {
    return this.scope.config;
  }

  async meta({ user }: any) {
    // meta
    const meta = await super.meta({ user });
    // check if token exists
    const item = await this.localToken.get({ name: this.tokenName });
    if (item) {
      delete meta.groups;
    }
    // welcomes
    this._logHelperDocs({ welcomes: meta.info.welcomes, user });
    // ok
    return meta;
  }

  async execute({ user }: any) {
    // super
    await super.execute({ user });
    // token
    await this.addToken();
    // executeStoreCommand
    await this.executeStoreCommand();
  }

  async addToken() {
    const { argv } = this.context;
    const { clientID, clientSecret } = argv;
    if (clientID && clientSecret) {
      await this.localToken.add({
        name: this.tokenName,
        host: this.configModule.store.token.host,
        clientID,
        clientSecret,
      });
    }
  }

  async executeStoreCommand() {
    // token
    const token = await this.localToken.get({ name: this.tokenName });
    // OpenAuthClient
    this.openAuthClient = new eggBornUtils.OpenAuthClient({ token });
    // signin
    await this.openAuthClient.signin();
    // execute command
    try {
      // execute
      this._needReInstallDeps = false;
      await this._executeStoreCommand();
      //  logout
      await this.openAuthClient.logout();
      this.openAuthClient = null;
      // pnpmInstall/reload
      if (this._needReInstallDeps) {
        await this.helper.pnpmInstall();
        this.ctx.app.meta.reload.now();
      }
    } catch (err) {
      //  logout
      if (this.openAuthClient) {
        await this.openAuthClient.logout();
        this.openAuthClient = null;
      }
      throw err;
    }
  }

  async onExecuteStoreCommandEntity(/* { entityName, entityConfig }*/ _params: any): Promise<any> {}

  async _executeStoreCommand() {
    const { argv } = this.context;
    // entityNames
    let entityNames = argv._;
    if (entityNames.length === 0) {
      // load all entities
      const entitiesConfig = this.ctx.bean.util.getProperty(
        this.cabloyConfig.get(),
        `store.commands.${this.commandName}.entities`,
      );
      entityNames = entitiesConfig ? Object.keys(entitiesConfig) : [];
    }
    // loop
    const total = entityNames.length;
    const results: any[] = [];
    for (let index = 0; index < total; index++) {
      const entityName = entityNames[index];
      // log
      await this.console.log({
        progressNo: 0,
        total,
        progress: index,
        text: entityName,
      });
      // command entity
      const result = await this._executeStoreCommandEntity({ entityName });
      result.entityName = entityName;
      // result
      if (result.code && !result.message) {
        const args = result.args || [];
        result.message = this.ctx.parseSuccess.module(__ThisModule__, result.code, ...args).message;
      }
      if (result.message) {
        await this.console.log({ text: result.message });
      }
      results.push(result);
    }
    // log results
    await this._logResults({ results });
  }

  async _executeStoreCommandEntity({ entityName }: any) {
    try {
      // save to config
      let entityConfig = this.ctx.bean.util.getProperty(
        this.cabloyConfig.get(),
        `store.commands.${this.commandName}.entities.${entityName}`,
      );
      if (!entityConfig) {
        entityConfig = {};
        this.ctx.bean.util.setProperty(
          this.cabloyConfig.get(),
          `store.commands.${this.commandName}.entities.${entityName}`,
          entityConfig,
        );
        await this.cabloyConfig.save();
      }
      // onExecuteStoreCommandEntity
      return await this.onExecuteStoreCommandEntity({ entityName, entityConfig });
    } catch (err: any) {
      let message = err.message;
      if (message && typeof message === 'object') {
        message = JSON.stringify(message, null, 2);
      }
      return {
        code: err.code,
        message,
      };
    }
  }

  async _logResults({ results }: any) {
    // sort
    results.sort((a, b) => a.code - b.code);
    // table
    const table = this.helper.newTable({
      head: ['Entity Name', 'Message'],
      colWidths: [30, 80],
    });
    for (const result of results) {
      table.push([result.entityName, result.message]);
      table.push(['', this._getEntityURL(result.entityName)]);
    }
    await this.console.log({ text: table.toString() });
  }

  _getEntityURL(entityName) {
    const locale = this.openAuthClient.locale;
    return `https://store.cabloy.com/${locale === 'zh-cn' ? 'zh-cn/' : ''}articles/${entityName}.html`;
  }

  _getCabloyDocsURL({ slug, user }: any) {
    const locale = user.locale;
    return `https://cabloy.com/${locale === 'zh-cn' ? 'zh-cn/' : ''}articles/${slug}.html`;
  }

  _logHelperDocs({ welcomes, user }: any) {
    const configHelper = this.ctx.bean.util.getProperty(this.cabloyConfig.get(), 'cli.helper');
    if (configHelper === false) {
      return;
    }
    const url = this._getCabloyDocsURL({ slug: 'cli-store', user });
    const text = this.helper.chalk.keyword('cyan')(url);
    welcomes.push(`${this.ctx.text('CliStoreDocs')}: ${text}`);
  }
}
