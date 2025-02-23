import os from 'node:os';
import { run } from 'node:test';
import { tap } from 'node:test/reporters';
import { closeApp, createApp } from 'vona-mock';

const argv = process.argv.slice(2);
const coverage = argv[0] === 'true';
const projectPath = argv[1];
const patterns = (argv[2] || '').split(',');

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
      .compose(tap)
      .pipe(process.stdout);
  });
}
