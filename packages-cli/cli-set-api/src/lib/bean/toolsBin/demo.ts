import path from 'node:path';
import { sleep } from '@cabloy/utils';
import fse from 'fs-extra';
import { createGeneralApp, pathToHref } from 'vona-core';
import whyIsNodeRunning from 'why-is-node-running';
import parser from 'yargs-parser';

const __template = `import type { IArgv, VonaApplication } from 'vona';

export async function main(app: VonaApplication, _argv: IArgv) {
  console.log(import.meta.filename);
  console.log(app.config.meta);
}
`;

const projectPath = process.argv[2];
const argv = parser(process.argv.slice(3));

let mainFile: string;
if (argv._[0]?.endsWith('.ts')) {
  mainFile = argv._[0];
  argv._ = argv._.slice(1);
} else {
  mainFile = 'index.ts';
}

await demoRun(projectPath);

async function demoRun(projectPath: string) {
  // create
  const app = await createGeneralApp(projectPath);
  // demo
  const demoFile = path.join(projectPath, `src/backend/demo/${mainFile}`);
  if (!fse.existsSync(demoFile)) {
    await fse.outputFile(demoFile, __template);
  }
  // run
  const demoInstance = await import(pathToHref(demoFile));
  await demoInstance.main(app, argv);
  // close
  await app.close();
  // handles
  if (process.env.TEST_WHYISNODERUNNING === 'true') {
    await sleep(2000);
    const handles = (process as any)._getActiveHandles();
    if (handles.length > 3) {
      whyIsNodeRunning();
    }
  }
}
