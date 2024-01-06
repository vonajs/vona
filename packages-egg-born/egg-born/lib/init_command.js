const Command = require('@zhennann/egg-init');
const path = require('path');
const randomize = require('randomatic');
const uuid = require('uuid');

module.exports = class EggBornCommand extends Command {
  constructor(options) {
    super(options);
  }
  printUsage() {
    this.log(`usage:
        - cd ${this.targetDir}
        - pnpm install
        - npm run cli
        - npm run db:reset
        - npm run test:backend
        - npm run dev:backend
        - npm run dev:front
        - npm run build:front
        - npm run start:backend
        - npm run start:backend-daemon
        - npm run stop:backend
        - npm run debug:backend
        - npm run cov:backend
        - npm run lint
        - npm run format
      `);
  }

  async askForVariable(targetDir, templateDir) {
    const locals = await super.askForVariable(targetDir, templateDir);
    // targetDir
    locals.targetDir = this.targetDir.replace(/\\/gi, '/');
    // publicDir
    locals.publicDir = path.join(require('os').homedir(), 'cabloy', locals.name).replace(/\\/gi, '/');
    // mysql
    locals.mysqlRootPassword = randomize('*', 16, { exclude: '\\\'"$' });
    locals.mysqlUserPassword = randomize('*', 16, { exclude: '\\\'"$' });
    locals.mysqlUserName = 'web_user';
    // safeKeys
    locals.safeKeys = `${uuid.v4()}_${Date.now()}_${random(100, 10000)}`;
    // ready
    return locals;
  }
};

function random(start, end) {
  return Math.floor(Math.random() * (end - start) + start);
}
