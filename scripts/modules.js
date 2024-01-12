const { ProcessHelper } = require('@cabloy/process-helper');
const mglob = require('@cabloy/module-glob');
const argv = require('./lib/parse_argv')('sync');

(async function () {
  await main();
})();

async function main() {
  // message
  const message = argv.args[0];
  const processHelper = new ProcessHelper(process.cwd());

  // loop
  // modules
  const { modules } = mglob.glob({
    projectPath: context.config.projectPath,
    disabledModules: context.config.configProject.base.disabledModules,
    disabledSuites: context.config.configProject.base.disabledSuites,
    log: true,
    type: 'backend',
  });
  console.log(modules);
}
