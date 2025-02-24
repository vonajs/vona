import os from 'node:os';
import path from 'node:path';
import { run } from 'node:test';
import { tap } from 'node:test/reporters';

const argv = process.argv.slice(2);
const coverage = argv[0] === 'true';
const projectPath = argv[1];
const patterns = (argv[2] || '').split(',');
// const patterns = ['src/suite-vendor/vona-test/modules/vona-test/test/bean.test.ts'];

let taskCounter = 0;

await testRun(coverage, projectPath, patterns);

async function testRun(coverage: boolean, projectPath: string, patterns: string[]) {
  let concurrency = 1;
  if (process.env.TEST_CONCURRENCY === 'true') {
    concurrency = os.cpus().length;
  } else if (process.env.TEST_CONCURRENCY === 'false') {
    concurrency = 1;
  } else {
    concurrency = Number.parseInt(process.env.TEST_CONCURRENCY!);
  }
  return new Promise(resolve => {
    run({
      isolation: 'none',
      concurrency,
      only: process.env.TEST_ONLY === 'true',
      coverage,
      coverageIncludeGlobs: ['src/**/*.ts'],
      cwd: projectPath,
      globPatterns: patterns,
      setup: async () => {
        await createApp(projectPath);
      },
    } as any)
      .on('test:summary', async () => {
        await closeApp();
        resolve(undefined);
      })
      .on('test:dequeue', () => {
        taskCounter++;
      })
      .on('test:fail', async () => {
        checkClose();
      })
      .on('test:complete', async () => {
        checkClose();
      })
      .compose(tap)
      .pipe(process.stdout);
  });
}

async function createApp(projectPath: string) {
  if (!globalThis.__app__) {
    const testFile = path.join(projectPath, '.vona/test.ts');
    const testInstance = await import(testFile);
    globalThis.__app__ = await testInstance.getApp();
  }
  return globalThis.__app__;
}

async function closeApp() {
  if (globalThis.__app__) {
    await globalThis.__app__.meta.close();
    delete globalThis.__app__;
    let handles = process._getActiveHandles();
    console.log('---------handles:', handles.length);
  }
}

async function checkClose() {
  setTimeout(() => {
    if (--taskCounter === 0) {
      closeApp();
    }
  }, 1000);
}