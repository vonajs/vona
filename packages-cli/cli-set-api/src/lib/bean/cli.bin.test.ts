import type { glob } from '@cabloy/module-glob';
import type { VonaConfigMeta, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';
import type { VonaBinConfigOptions } from './toolsBin/types.ts';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import fse from 'fs-extra';
import { rimraf } from 'rimraf';
import { getAbsolutePathOfModule } from '../utils.ts';
import { generateVonaMeta } from './toolsBin/generateVonaMeta.ts';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    coverage?: boolean;
    flavor?: VonaMetaFlavor;
  }
}

export class CliBinTest extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    // test
    await this._test(projectPath);
  }

  async _test(projectPath: string) {
    const { argv } = this.context;
    const mode: VonaMetaMode = 'test';
    const flavor: VonaMetaFlavor = argv.flavor || 'normal';
    const configMeta: VonaConfigMeta = { flavor, mode };
    const configOptions: VonaBinConfigOptions = {
      appDir: projectPath,
      runtimeDir: '.vona',
      workers: 1,
    };
    const { modulesMeta } = await generateVonaMeta(configMeta, configOptions);
    await this._run(projectPath, modulesMeta);
    if (argv.coverage) {
      await this._outputCoverageReportViewer(projectPath);
    }
    await rimraf(path.join(projectPath, '.vona'));
  }

  async _run(projectPath: string, modulesMeta: Awaited<ReturnType<typeof glob>>) {
    const { argv } = this.context;
    // globs
    const patterns = this._combineTestPatterns(projectPath, modulesMeta);
    // testFile
    let testFile = path.join(import.meta.dirname, './toolsBin/test.ts');
    if (!fse.existsSync(testFile)) {
      testFile = path.join(import.meta.dirname, './toolsBin/test.js');
    }
    // run
    let args: string[] = [];
    if (argv.coverage) {
      args.push('--experimental-test-coverage');
    }
    if (process.env.TEST_WHYISNODERUNNING === 'true') {
      args.push('--import=why-is-node-running/include');
    }
    args = args.concat(['--experimental-transform-types', '--loader=ts-node/esm', testFile, projectPath, (!!argv.coverage).toString(), patterns.join(',')]);
    await this.helper.spawnExe({
      cmd: 'node',
      args,
      options: {
        cwd: projectPath,
      },
    });
  }

  async _outputCoverageReportViewer(projectPath: string) {
    // lcovCliFile
    const lcovCliFile = getAbsolutePathOfModule('@lcov-viewer/cli/lib/index.js', '');
    // run
    const args: string[] = [lcovCliFile, 'lcov', '-o', './coverage/report', './coverage/lcov.info'];
    await this.helper.spawnExe({
      cmd: 'node',
      args,
      options: {
        cwd: projectPath,
      },
    });
  }

  _combineTestPatterns(projectPath: string, modulesMeta: Awaited<ReturnType<typeof glob>>) {
    const patterns: string[] = [];
    for (const moduleName in modulesMeta.modules) {
      const module = modulesMeta.modules[moduleName];
      const testDir = path.join(module.root, 'test');
      if (fse.existsSync(testDir)) {
        const relativePath = path.relative(projectPath, module.root);
        patterns.push(`${relativePath}/test/**/*.ts`);
      }
    }
    return patterns;
  }
}
