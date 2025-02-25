import { createWriteStream } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { run } from 'node:test';
import TableClass from 'cli-table3';
import eggBornUtils from 'egg-born-utils';
import fse from 'fs-extra';
import { lcov, tap } from 'node:test/reporters';
import { closeApp } from 'vona-core';
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
  // coverage
  let coverageIncludeGlobs: string[] = [];
  if (coverage) {
    if (fse.existsSync(path.join(projectPath, 'packages-vona/vona-core'))) {
      coverageIncludeGlobs = coverageIncludeGlobs.concat(['packages-vona/vona-core/**/*.ts', 'src/module-vendor/**/*.ts', 'src/suite-vendor/**/*.ts']);
    } else {
      coverageIncludeGlobs = coverageIncludeGlobs.concat(['src/module/**/*.ts', 'src/suite/**/*.ts']);
    }
  }
  return new Promise(resolve => {
    const testStream = run({
      isolation: 'none',
      concurrency,
      only: process.env.TEST_ONLY === 'true',
      coverage,
      coverageIncludeGlobs,
      cwd: projectPath,
      files,
      setup: async () => {
        await createApp(projectPath);
      },
    } as any)
      .on('test:coverage', data => {
        outputCoverageReport(data.summary.totals);
      })
      .on('test:summary', async () => {
        resolve(undefined);
      })
      .on('test:pass', t => {
        if (t.name === '---done---') {
          closeApp();
        }
      });
    if (coverage) {
      const reporterDir = path.join(projectPath, 'coverage');
      fse.ensureDirSync(reporterDir);
      const reporter = createWriteStream(path.join(reporterDir, 'lcov.info'));
      testStream.compose(lcov)
        .pipe(reporter);
    } else {
      testStream.compose(tap)
        .pipe(process.stdout);
    }
  });
}

async function createApp(projectPath: string) {
  const testFile = path.join(projectPath, '.vona/test.ts');
  const testInstance = await import(testFile);
  await testInstance.getApp();
}

function outputCoverageReport(totals: CoverageTotals) {
  // table
  const table = new TableClass({
    head: ['', 'Total', 'Covered', 'Percent'],
    colWidths: [15, 15, 15, 25],
  });
  table.push(['Lines', totals.totalLineCount, totals.coveredLineCount, totals.coveredLinePercent]);
  table.push(['Branches', totals.totalBranchCount, totals.coveredBranchCount, totals.coveredBranchPercent]);
  table.push(['Functions', totals.totalFunctionCount, totals.coveredFunctionCount, totals.coveredFunctionPercent]);
  // eslint-disable-next-line
  console.log(table.toString());
}

interface CoverageTotals {
  /**
   * The total number of lines.
   */
  totalLineCount: number;
  /**
   * The total number of branches.
   */
  totalBranchCount: number;
  /**
   * The total number of functions.
   */
  totalFunctionCount: number;
  /**
   * The number of covered lines.
   */
  coveredLineCount: number;
  /**
   * The number of covered branches.
   */
  coveredBranchCount: number;
  /**
   * The number of covered functions.
   */
  coveredFunctionCount: number;
  /**
   * The percentage of lines covered.
   */
  coveredLinePercent: number;
  /**
   * The percentage of branches covered.
   */
  coveredBranchPercent: number;
  /**
   * The percentage of functions covered.
   */
  coveredFunctionPercent: number;
};
