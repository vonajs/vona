import path from 'node:path';
import fse from 'fs-extra';
import { createGeneralApp, pathToHref } from 'vona-core';
import parser from 'yargs-parser';

const __template = `import type { IArgv, VonaApplication } from 'vona';

export async function main(app: VonaApplication, _argv: IArgv) {}
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
  const app = await createGeneralApp(projectPath, { SERVER_LISTEN_DISABLE: 'true' });
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
}
