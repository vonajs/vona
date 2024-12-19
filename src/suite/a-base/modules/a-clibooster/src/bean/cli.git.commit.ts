import { BeanTemp } from 'vona-module-a-bean';
import { IModule, ISuite } from 'vona';
import { BeanCliBase } from 'vona-module-a-cli';

@BeanTemp({ scene: 'cli.git' })
export class CliGitCommit extends BeanCliBase {
  async execute({ user }: any) {
    const { argv } = this.context;
    // super
    await super.execute({ user });
    // prepare entities
    const entities = await this.__prepareEntities();
    const total = entities.length;
    for (let index = 0; index < total; index++) {
      const entity = entities[index];
      // log
      await this.console.log({
        progressNo: 0,
        total,
        progress: index,
        text: entity.info.relativeName,
      });
      // git commit
      const message = argv.message;
      await this.helper.gitCommit({
        cwd: entity.root,
        message,
      });
    }
  }

  async __prepareEntities() {
    // load all entities
    const entityNames = this.app.bean.util.getProperty(this.cabloyConfig.get(), 'cli.commands.:git:commit.entities');
    // prepare
    const entities: (ISuite | IModule)[] = [];
    for (const entityName of entityNames) {
      // try suite
      let entity: ISuite | IModule = this.helper.findSuite(entityName);
      if (!entity) {
        // try module
        entity = this.helper.findModule(entityName);
      }
      if (!entity) {
        // not throw error
        const text = `entity does not exist: ${entityName}`;
        await this.console.log({ text });
      } else {
        entities.push(entity);
      }
    }
    return entities;
  }
}
