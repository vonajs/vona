import type { LogLevel, LogOrStringHandler, OutputOptions, RollupBuild, RollupLog, RollupOptions } from 'rollup';
import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import aliasImport from '@rollup/plugin-alias';
import babelImport from '@rollup/plugin-babel';
import commonjsImport from '@rollup/plugin-commonjs';
import jsonImport from '@rollup/plugin-json';
import resolveImport from '@rollup/plugin-node-resolve';
import terserImport from '@rollup/plugin-terser';
import { rimraf } from 'rimraf';
import { rollup } from 'rollup';

const commonjs = commonjsImport as any as typeof commonjsImport.default;
const resolve = resolveImport as any as typeof resolveImport.default;
// const swc = swcImport as any as typeof swcImport.default;
const json = jsonImport as any as typeof jsonImport.default;
const babel = babelImport as any as typeof babelImport.default;
const terser = terserImport as any as typeof terserImport.default;
const alias = aliasImport as any as typeof aliasImport.default;

declare module '@cabloy/cli' {
  interface ICommandArgv {
    minify: boolean;
    sourcemap: boolean;
  }
}

export class CliBinBuildModule extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    await this._build(projectPath);
  }

  async _build(projectPath: string) {
    await rimraf(path.join(projectPath, 'dist'));
    await this._rollup(projectPath);
  }

  async _rollup(projectPath: string) {
    const { argv } = this.context;
    const aliasEntries: aliasImport.Alias[] = [];
    for (const name of ['better-sqlite3', 'mysql', 'oracledb', 'pg-native', 'pg-query-stream', 'sqlite3', 'tedious', 'cloudflare:sockets']) {
      aliasEntries.push({ find: name, replacement: 'vona-shared' });
    }

    const plugins = [
      alias({
        entries: aliasEntries,
      }),
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
          ['babel-plugin-zova-bean-module', { brandName: 'vona' }],
          ['babel-plugin-transform-typescript-metadata'],
          ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
          ['@babel/plugin-transform-class-properties', { loose: true }],
          ['@babel/plugin-transform-typescript'],
        ],
      }),
    ];
    if (argv.minify) {
      plugins.push(terser({
        keep_classnames: true,
      }));
    }
    const inputOptions: RollupOptions = {
      input: path.join(projectPath, 'src/index.ts'),
      plugins,
      onLog: (level: LogLevel, log: RollupLog, defaultHandler: LogOrStringHandler) => {
        if (log.code === 'CIRCULAR_DEPENDENCY') return;
        if (log.code === 'THIS_IS_UNDEFINED' && (log.message.includes('ramda/es/partialObject.js') || log.message.includes("The 'this' keyword is equivalent to 'undefined' at the top level of an ES module"))) return;
        if (log.code === 'EVAL' && log.message.includes('depd/index.js')) return;
        if (log.code === 'EVAL' && log.message.includes('bluebird/js/release/util.js')) return;
        defaultHandler(level, log);
      },
    };

    const outputOption: OutputOptions = {
      dir: path.join(projectPath, 'dist'),
      // file: path.join(projectPath, 'dist/index.js'),
      format: 'esm',
      sourcemap: argv.sourcemap,
      // https://github.com/rollup/rollup/issues/4166
      inlineDynamicImports: true,
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
