import type { VonaConfigMeta, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';
import type { OutputOptions, RollupBuild, RollupOptions } from 'rollup';
import type { VonaBinConfigOptions } from './toolsBin/types.ts';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import babelImport from '@rollup/plugin-babel';
import commonjsImport from '@rollup/plugin-commonjs';
import jsonImport from '@rollup/plugin-json';
import resolveImport from '@rollup/plugin-node-resolve';
import swcImport from '@rollup/plugin-swc';
import { rimraf } from 'rimraf';
import { rollup } from 'rollup';
import { generateVonaMeta } from './toolsBin/generateVonaMeta.ts';

const commonjs = commonjsImport as any as typeof commonjsImport.default;
const resolve = resolveImport as any as typeof resolveImport.default;
const swc = swcImport as any as typeof swcImport.default;
const json = jsonImport as any as typeof jsonImport.default;
const babel = babelImport as any as typeof babelImport.default;

declare module '@cabloy/cli' {
  interface ICommandArgv {
    workers?: number;
    flavor?: VonaMetaFlavor;
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
      plugins: [
        resolve({
          preferBuiltins: true,
        }),
        json(),
        commonjs(),
        babel({
          include: '**/*.ts',
          extensions: ['.ts', '.tsx'],
          babelHelpers: 'bundled',
          skipPreflightCheck: true,
          babelrc: false,
          configFile: false,
          plugins: [
            ['babel-plugin-zova-bean-module'],
            ['babel-plugin-transform-typescript-metadata'],
            ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
            ['@babel/plugin-transform-class-properties', { loose: true }],
            ['@babel/plugin-transform-typescript'],
          ],
        }),
        swc({
          swc: {
            jsc: {
              experimental: {
                keepImportAssertions: true,
                emitAssertForImportAttributes: false,
              },
              parser: {
                syntax: 'typescript',
                tsx: true,
                decorators: true,
              },
              keepClassNames: true,
            },
            minify: process.env.BUILD_MINIFY === 'true',
          },
        }),
      ],
    };

    const outputOption: OutputOptions = {
      dir: path.join(projectPath, 'dist'),
      // file: path.join(projectPath, 'dist/index.js'),
      format: 'esm',
      sourcemap: process.env.BUILD_SOURCEMAP === 'true',
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
