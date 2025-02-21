import type { KoaApplicationOptions, VonaApplicationOptions } from '../../types/application/app.ts';
import type { VonaConfig } from '../../types/config/config.ts';
import type { VonaContext } from '../../types/context/index.ts';
import type { ApplicationError } from '../bean/resource/error/errorApplication.ts';
import http from 'node:http';
import KoaApplication from 'koa';
import { BeanContainer } from '../bean/beanContainer.ts';
import { AppUtil } from '../utils/util.ts';
import { contextBase } from './context.ts';
import { AppMeta } from './meta.ts';

export interface VonaApplication extends ApplicationError {}

export class VonaApplication extends KoaApplication {
  options: VonaApplicationOptions;
  config: VonaConfig;
  bean: BeanContainer;
  util: AppUtil;
  meta: AppMeta;

  constructor(options: VonaApplicationOptions) {
    const koaOptions: KoaApplicationOptions = {
      env: process.env.NODE_ENV,
      keys: options.config.server.keys,
      proxy: options.config.proxy.enabled,
      subdomainOffset:
    };
    super(koaOptions);
    this.options = options;
    this.config = options.config;
    this.bean = BeanContainer.create(this, undefined);
    this.util = this.bean._newBean(AppUtil);
    this.meta = this.bean._newBean(AppMeta);
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

  createAnonymousContext(req?: any) {
    const request = {
      headers: {
        'host': '127.0.0.1',
        'x-forwarded-for': '127.0.0.1',
      },
      query: {},
      querystring: '',
      host: '127.0.0.1',
      hostname: '127.0.0.1',
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
    return this.createContext(request as any, response);
  }
}
