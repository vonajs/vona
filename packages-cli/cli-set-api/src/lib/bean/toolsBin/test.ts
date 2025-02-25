import os from 'node:os';
import path from 'node:path';
import { run } from 'node:test';
import eggBornUtils from 'egg-born-utils';
import { tap } from 'node:test/reporters';
import { resolveTemplatePath } from '../../utils.ts';

const argv = process.argv.slice(2);
const coverage = argv[0] === 'true';
const projectPath = argv[1];
const patterns = (argv[2] || '').split(',');

await testRun(coverage, projectPath, patterns);

async function testRun(coverage: boolean, projectPath: string, patterns: string[]) {
  // files
  const files = await eggBornUtils.tools.globbyAsync(patterns, {
    cwd: projectPath,
  });
  if (process.env.TEST_ONLY === 'true') {
    files.push(resolveTemplatePath('test/done-only.test.ts'));
  } else {
    files.push(resolveTemplatePath('test/done.test.ts'));
  }
  // concurrency
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
      files,
      setup: async () => {
        await createApp(projectPath);
      },
    } as any)
      .on('test:summary', async () => {
        resolve(undefined);
      })
      .on('test:pass', t => {
        if (t.name === '---done---') {
          closeApp();
        }
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
  }
}
