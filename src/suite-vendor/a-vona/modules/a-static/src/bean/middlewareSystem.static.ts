import { isObject, isString } from '@cabloy/utils';
import assert from 'node:assert';
import path from 'node:path';
import { BeanBase, compose, Next } from 'vona';
import { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute, MiddlewareSystem } from 'vona-module-a-aspect';
import { LRU } from 'ylru';
import { existsSync, mkdirSync } from 'node:fs';
import range from 'koa-range';
import staticCache from '@cabloy/koa-static-cache';

interface IStaticDirItem {
  prefix: string;
  dir: string;
}

export interface IMiddlewareSystemOptionsStatic extends IDecoratorMiddlewareSystemOptions {
  prefix: string;
  dir?: string;
  dirs: (string | IStaticDirItem)[];
  // support lazy load
  dynamic: boolean;
  preload: boolean;
  buffer?: boolean;
  maxFiles: number;
  maxAge?: number;
  alias: Record<string, string>;
  getFullPath: Function;
}

@MiddlewareSystem<IMiddlewareSystemOptionsStatic>({
  dependencies: 'a-core:notfound',
  prefix: '/api/static/',
  dirs: [],
  dynamic: true,
  preload: false,
  maxFiles: 1000,
  alias: {
    '/favicon.ico': '/api/static/home/index/img/vona.png',
  },
  getFullPath: getFullPath,
  // maxAge: undefined,
  // buffer: false,
  // dir: '',
})
export class MiddlewareSystemStatic extends BeanBase implements IMiddlewareSystemExecute {
  private _composer: any;

  async execute(options: IMiddlewareSystemOptionsStatic, next: Next) {
    return this._getComposer(options)(this.ctx, next);
  }

  _getComposer(options: IMiddlewareSystemOptionsStatic) {
    if (!this._composer) {
      const middlewares = this._createMiddlewares(options);
      this._composer = compose(middlewares);
    }
    return this._composer;
  }

  _createMiddlewares(options: IMiddlewareSystemOptionsStatic) {
    options = Object.assign(
      {
        maxAge: this.app.meta.isProd ? 31536000 : 0,
        buffer: this.app.meta.isProd ? true : false,
        dir: path.join(this.app.options.baseDir, 'app/public'),
      },
      options,
    );

    const dirs = (options.dirs || []).concat(options.dir!);

    const prefixs: string[] = [];

    function rangeMiddleware(ctx, next) {
      // if match static file, and use range middleware.
      const isMatch = prefixs.some(p => ctx.path.startsWith(p));
      if (isMatch) {
        return range(ctx, next);
      }
      return next();
    }

    const middlewares = [rangeMiddleware];

    for (const dirObj of dirs) {
      assert(isObject(dirObj) || isString(dirObj), '`config.static.dir` must be `string | Array<string|object>`.');

      let newOptions: any;

      if (isString(dirObj)) {
        // copy origin options to new options ensure the safety of objects
        newOptions = Object.assign({}, options, { dir: dirObj });
      } else {
        assert(isString(dirObj.dir), '`config.static.dir` should contains `[].dir` property when object style.');
        newOptions = Object.assign({}, options, dirObj);
      }

      if (newOptions.dynamic && !newOptions.files) {
        newOptions.files = new LRU(newOptions.maxFiles);
      }

      if (newOptions.prefix) {
        prefixs.push(newOptions.prefix);
      }

      // ensure directory exists
      if (!existsSync(newOptions.dir)) {
        mkdirSync(newOptions.dir, { recursive: true });
      }

      this.app.loggers.coreLogger.info(
        '[egg-static] starting static serve %s -> %s',
        newOptions.prefix,
        newOptions.dir,
      );

      middlewares.push(staticCache(newOptions));
    }

    return middlewares;
  }
}

function getFullPath(ctx, dir, filename, _options) {
  const parts = filename.split(path.sep);
  const wordFirst = parts.shift();
  // public
  if (wordFirst === 'public') {
    const fullPath = path.normalize(path.join(dir, parts.join(path.sep)));
    // files that can be accessd should be under options.dir
    if (fullPath.indexOf(dir) !== 0) return null;
    return fullPath;
  }
  // static
  const moduleRelativeName = `${wordFirst}-${parts.shift()}`;
  const module = ctx.app.meta.modules[moduleRelativeName];
  if (!module) return null;
  const staticPath = path.join(module.root, 'static');
  const fullPath = path.normalize(path.join(staticPath, parts.join(path.sep)));
  // files that can be accessd should be under options.dir
  if (fullPath.indexOf(staticPath) !== 0) return null;
  return fullPath;
}
