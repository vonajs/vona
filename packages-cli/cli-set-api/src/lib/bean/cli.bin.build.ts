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
import { generateConfigDefine, getAbsolutePathOfModule, getOutDir, getOutReleasesDir } from '../utils.ts';
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
    const { env, modulesMeta } = await generateVonaMeta(configMeta, configOptions);
    const outDir = path.join(projectPath, getOutDir());
    await rimraf(outDir);
    await this._rollup(projectPath, env, outDir);
    await this._assets(projectPath, modulesMeta, outDir);
    await rimraf(path.join(projectPath, '.vona'));
    // copy
    const outReleasesDir = path.join(projectPath, getOutReleasesDir());
    await rimraf(outReleasesDir);
    fse.copySync(outDir, outReleasesDir);
    // copy
    if (process.env.BUILD_COPY_DIST) {
      const envDist = path.isAbsolute(process.env.BUILD_COPY_DIST)
        ? process.env.BUILD_COPY_DIST
        : path.join(projectPath, process.env.BUILD_COPY_DIST);
      const outDirCopy = path.join(envDist, path.basename(outDir));
      fse.removeSync(outDirCopy);
      fse.copySync(
        outDir,
        outDirCopy,
      );
    }
    if (process.env.BUILD_COPY_RELEASE) {
      const envRelease = path.isAbsolute(process.env.BUILD_COPY_RELEASE)
        ? process.env.BUILD_COPY_RELEASE
        : path.join(projectPath, process.env.BUILD_COPY_RELEASE);
      const outReleasesDirCopy = path.join(envRelease, path.basename(outReleasesDir));
      fse.removeSync(outReleasesDirCopy);
      fse.copySync(
        outDir,
        outReleasesDirCopy,
      );
    }
  }

  async _assets(_projectPath: string, modulesMeta: Awaited<ReturnType<typeof glob>>, outDir: string) {
    const assetsPath = path.join(outDir, 'assets');
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

  async _rollup(projectPath: string, env: NodeJS.ProcessEnv, outDir: string) {
    const aliasEntries: aliasImport.Alias[] = [];
    for (const name of ['better-sqlite3', 'mysql', 'oracledb', 'pg-native', 'pg-query-stream', 'sqlite3', 'tedious', 'cloudflare:sockets']) {
      aliasEntries.push({ find: name, replacement: 'vona-shared' });
    }

    const replaceValues = generateConfigDefine(env, ['NODE_ENV', 'META_MODE', 'META_FLAVOR']);

    const babelPluginZovaBeanModule = getAbsolutePathOfModule('babel-plugin-zova-bean-module', '');
    const babelPluginTransformTypescriptMetadata = getAbsolutePathOfModule('babel-plugin-transform-typescript-metadata', '');
    const babelPluginProposalDecorators = getAbsolutePathOfModule('@babel/plugin-proposal-decorators', '');
    const babelPluginTransformClassProperties = getAbsolutePathOfModule('@babel/plugin-transform-class-properties', '');
    const babelPluginTransformTypescript = getAbsolutePathOfModule('@babel/plugin-transform-typescript', '');

    const plugins = [
      alias({
        entries: aliasEntries,
      }),
      resolve({
        preferBuiltins: true,
      }),
      replace({
        values: replaceValues,
        preventAssignment: false,
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
          [babelPluginZovaBeanModule, { brandName: 'vona' }],
          [babelPluginTransformTypescriptMetadata],
          [babelPluginProposalDecorators, { version: 'legacy' }],
          [babelPluginTransformClassProperties, { loose: true }],
          [babelPluginTransformTypescript],
        ],
      }),
    ];
    if (process.env.BUILD_MINIFY === 'true') {
      plugins.push(terser({
        keep_classnames: true,
      }));
    }
    const inputOptions: RollupOptions = {
      input: path.join(projectPath, '.vona/bootstrap.ts'),
      plugins,
      onLog: (level: LogLevel, log: RollupLog, defaultHandler: LogOrStringHandler) => {
        if (log.code === 'CIRCULAR_DEPENDENCY' && process.env.BUILD_LOG_CIRCULAR_DEPENDENCY === 'false') return;
        if (log.code === 'THIS_IS_UNDEFINED' && (log.message.includes('ramda/es/partialObject.js') || log.message.includes("The 'this' keyword is equivalent to 'undefined' at the top level of an ES module"))) return;
        if (log.code === 'EVAL' && log.message.includes('depd/index.js')) return;
        if (log.code === 'EVAL' && log.message.includes('bluebird/js/release/util.js')) return;
        defaultHandler(level, log);
      },
    };

    const outputOption: OutputOptions = {
      dir: outDir,
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
