import os from 'node:os';
import { run } from 'node:test';
import { tap } from 'node:test/reporters';

const argv = process.argv.slice(2);

await testRun(argv[0]);

async function testRun(projectPath: string) {
  return new Promise(resolve => {
    run({
      isolation: 'none',
      concurrency: os.cpus().length,
      // only: false,
      // coverage:false,
      // files: ['src/suite-vendor/vona-test/modules/vona-test/test/bean.test.ts'],
      cwd: projectPath,
      globPatterns: ['.assets/test/*.test.ts'],
      setup: async () => {
        console.log('setup:', new Date());
      },
    } as any)
      .on('test:summary', () => {
        resolve(undefined);
      })
      .compose(tap)
      .pipe(process.stdout);
  });
}
