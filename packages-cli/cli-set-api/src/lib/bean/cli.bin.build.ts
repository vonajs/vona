import type { glob } from '@cabloy/module-glob';
import type { VonaConfigMeta, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';
import type { LogLevel, LogOrStringHandler, OutputOptions, RollupBuild, RollupLog, RollupOptions } from 'rollup';
import type { VonaBinConfigOptions } from './toolsBin/types.ts';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import aliasImport from '@rollup/plugin-alias';
import babelImport from '@rollup/plugin-babel';
import commonjsImport from '@rollup/plugin-commonjs';
import jsonImport from '@rollup/plugin-json';
import resolveImport from '@rollup/plugin-node-resolve';
import replaceImport from '@rollup/plugin-replace';
import terserImport from '@rollup/plugin-terser';
import fse from 'fs-extra';
import { rimraf } from 'rimraf';
import { rollup } from 'rollup';
import { generateVonaMeta } from './toolsBin/generateVonaMeta.ts';

const commonjs = commonjsImport as any as typeof commonjsImport.default;
const resolve = resolveImport as any as typeof resolveImport.default;
// const swc = swcImport as any as typeof swcImport.default;
const json = jsonImport as any as typeof jsonImport.default;
const babel = babelImport as any as typeof babelImport.default;
const terser = terserImport as any as typeof terserImport.default;
const alias = aliasImport as any as typeof aliasImport.default;
const replace = replaceImport as any as typeof replaceImport.default;

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
    const { modulesMeta } = await generateVonaMeta(configMeta, configOptions);
    await rimraf(path.join(projectPath, 'dist'));
    await this._rollup(projectPath);
    await this._assets(projectPath, modulesMeta);
  }

  async _assets(projectPath: string, modulesMeta: Awaited<ReturnType<typeof glob>>) {
    const assetsPath = path.join(projectPath, 'dist/assets');
    for (const relativeName in modulesMeta.modules) {
      const module = modulesMeta.modules[relativeName];
      if (!module.package.files) continue;
      for (const scene of module.package.files) {
        if (['dist', 'cli', 'test'].includes(scene)) continue;
        const scenePath = path.join(module.root, scene);
        if (fse.existsSync(scenePath)) {
          const destPath = path.join(assetsPath, scene, relativeName);
          await fse.copy(scenePath, destPath);
        }
      }
    }
  }

  async _rollup(projectPath: string) {
    const aliasEntries: aliasImport.Alias[] = [];
    for (const name of ['better-sqlite3', 'mysql', 'oracledb', 'pg-native', 'pg-query-stream', 'sqlite3', 'tedious']) {
      aliasEntries.push({ find: name, replacement: 'vona-shared' });
    }
    const plugins = [
      alias({
        entries: aliasEntries,
      }),
      resolve({
        preferBuiltins: true,
      }),
      replace({
        values: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
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
          ['babel-plugin-zova-bean-module', { brandName: 'vona' }],
          ['babel-plugin-transform-typescript-metadata'],
          ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
          ['@babel/plugin-transform-class-properties', { loose: true }],
          ['@babel/plugin-transform-typescript'],
        ],
      }),
    ];
    if (process.env.BUILD_MINIFY === 'true') {
      plugins.push(terser({
        keep_classnames: true,
      }));
    }
    const inputOptions: RollupOptions = {
      input: path.join(projectPath, '.vona/app.ts'),
      plugins,
      onLog: (level: LogLevel, log: RollupLog, defaultHandler: LogOrStringHandler) => {
        if (log.code === 'CIRCULAR_DEPENDENCY' && process.env.BUILD_LOG_CIRCULAR_DEPENDENCY === 'false') return;
        if (log.code === 'THIS_IS_UNDEFINED' && log.message.includes('ramda/es/partialObject.js')) return;
        if (log.code === 'EVAL' && log.message.includes('depd/index.js')) return;
        if (log.code === 'EVAL' && log.message.includes('bluebird/js/release/util.js')) return;
        defaultHandler(level, log);
      },
    };

    const outputOption: OutputOptions = {
      dir: path.join(projectPath, 'dist'),
      // file: path.join(projectPath, 'dist/index.js'),
      format: 'esm',
      sourcemap: process.env.BUILD_SOURCEMAP === 'true',
      // https://github.com/rollup/rollup/issues/4166
      inlineDynamicImports: process.env.BUILD_INLINEDYNAMICIMPORTS === 'true',
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
