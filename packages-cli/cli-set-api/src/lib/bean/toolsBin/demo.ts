import { closeApp, createGeneralApp } from 'vona-core';

const argv = process.argv.slice(2);
const projectPath = argv[0];

await demoRun(projectPath);

async function demoRun(projectPath: string) {
  const app = await createGeneralApp(projectPath, { SERVER_LISTEN_DISABLE: 'true' });
  console.log(app, argv);
  await closeApp();
}
