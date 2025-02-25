import { closeApp, createTestApp } from 'vona-core';

const argv = process.argv.slice(2);
const projectPath = argv[0];

await dbResetRun(projectPath);

async function dbResetRun(projectPath: string) {
  await createTestApp(projectPath);
  await closeApp();
}
