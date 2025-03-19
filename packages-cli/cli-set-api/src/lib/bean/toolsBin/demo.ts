import { closeApp, createGeneralApp } from 'vona-core';

const projectPath = process.argv[2];
const argv = process.argv.slice(3);

await demoRun(projectPath);

async function demoRun(projectPath: string) {
  const app = await createGeneralApp(projectPath, { SERVER_LISTEN_DISABLE: 'true' });
  console.log(app, argv);
  await closeApp();
}
