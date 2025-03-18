import type { Server } from 'node:http';
import type { KoaApplicationOptions, VonaApplicationOptions } from '../../types/application/app.ts';
import type { VonaConfig } from '../../types/config/config.ts';
import type { VonaContext } from '../../types/context/index.ts';
import type { ApplicationError } from '../bean/resource/error/errorApplication.ts';
import http from 'node:http';
import KoaApplication from 'koa';
import { BeanContainer } from '../bean/beanContainer.ts';
import { AppUtil } from '../utils/util.ts';
import { VonaAsyncLocalStorage } from './asyncLocalStorage.ts';
import { contextBase } from './context.ts';
import { AppMeta } from './meta.ts';

export interface VonaApplication extends ApplicationError {}

export class VonaApplication extends KoaApplication {
  options: VonaApplicationOptions;
  config: VonaConfig;
  bean: BeanContainer;
  util: AppUtil;
  meta: AppMeta;
  server: Server;
  ctxStorage: VonaAsyncLocalStorage;

  constructor(options: VonaApplicationOptions) {
    const koaOptions: KoaApplicationOptions = {
      env: process.env.NODE_ENV,
      keys: options.config.server.keys,
      proxy: options.config.proxy.enabled,
      subdomainOffset: options.config.server.subdomainOffset,
      proxyIpHeader: options.config.proxy.ipHeaders,
      maxIpsCount: options.config.proxy.maxIpsCount,
      asyncLocalStorage: false,
    };
    super(koaOptions);
    this.options = options;
    this.config = options.config;
    this.bean = BeanContainer.create(this, undefined);
    this.util = this.bean._newBean(AppUtil);
    this.meta = this.bean._newBean(AppMeta);
    // asyncLocalStorage
    this.ctxStorage = new VonaAsyncLocalStorage(this);
    // app.context
    for (const key of Reflect.ownKeys(contextBase)) {
      const desc = Object.getOwnPropertyDescriptor(contextBase, key)!;
      Object.defineProperty(this.context, key, desc);
    }
  }

  get ctx(): VonaContext {
    return this.currentContext as unknown as VonaContext;
  }

  get name() {
    return this.options.name;
  }

  createAnonymousContext(req?: any): VonaContext {
    const host = `localhost:${process.env.SERVER_LISTEN_PORT}`;
    const request = {
      headers: {
        'host': host,
        'x-forwarded-for': host,
      },
      query: {},
      querystring: '',
      host,
      hostname: 'localhost',
      protocol: 'http',
      secure: 'false',
      method: 'GET',
      url: '/',
      path: '/',
      socket: {
        remoteAddress: '127.0.0.1',
        remotePort: 7001,
      },
    };
    if (req) {
      for (const key in req) {
        if (key === 'headers' || key === 'query' || key === 'socket') {
          Object.assign(request[key], req[key]);
        } else {
          request[key] = req[key];
        }
      }
    }
    const response = new http.ServerResponse(request as any);
    return this.createContext(request as any, response) as unknown as VonaContext;
  }

  redirect(url: string, status?: 301 | 302): void {
    status = status ?? 302;
    this.throw(status, url);
  }
}
