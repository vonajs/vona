import type { VonaConfigMeta, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';
import type { OutputOptions, RollupBuild, RollupOptions } from 'rollup';
import type { VonaBinConfigOptions } from './toolsBin/types.ts';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import commonjsImport from '@rollup/plugin-commonjs';
import typescriptImport from '@rollup/plugin-typescript';
import { rimraf } from 'rimraf';
import { rollup } from 'rollup';
import { generateVonaMeta } from './toolsBin/generateVonaMeta.ts';

const commonjs = commonjsImport as any as typeof commonjsImport.default;
const typescript = typescriptImport as any as typeof typescriptImport.default;

declare module '@cabloy/cli' {
  interface ICommandArgv {
    force: boolean;
  }
}

export class CliBinBuild extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    await this._build(projectPath);
  }

  async _build(projectPath: string) {
    const { argv } = this.context;
    const mode: VonaMetaMode = 'prod';
    const flavor: VonaMetaFlavor = argv.flavor || 'normal';
    const configMeta: VonaConfigMeta = { flavor, mode };
    const configOptions: VonaBinConfigOptions = {
      appDir: projectPath,
      runtimeDir: '.vona',
      workers: argv.workers,
    };
    await generateVonaMeta(configMeta, configOptions);
    await rimraf(path.join(projectPath, 'dist'));
    await this._rollup(projectPath);
  }

  async _rollup(projectPath: string) {
    const inputOptions: RollupOptions = {
      input: path.join(projectPath, '.vona/app.ts'),
      output: [{ file: path.join(projectPath, 'dist/index.js'), format: 'es' }],
      plugins: [
        commonjs(),
        typescript({
          module: 'NodeNext',
          tsconfig: path.join(projectPath, './tsconfig.build.json'),
        }),
      ],
    };

    const outputOption: OutputOptions = {
      sourcemap: true,
      file: path.join(projectPath, 'dist/index.js'),
    };

    let bundle: RollupBuild | undefined;
    try {
      bundle = await rollup(inputOptions);
      await bundle.write(outputOption);
    } finally {
      if (bundle) {
        // closes the bundle
        await bundle.close();
      }
    }
  }
}
