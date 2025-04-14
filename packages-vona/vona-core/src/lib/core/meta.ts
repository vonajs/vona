import type { IModule } from '@cabloy/module-info';
import type { TypeModuleResourceLocaleModules, TypeModuleResourceLocales } from '../../types/index.ts';
import type { AppMonkeyConstructable } from '../../types/interface/monkey.ts';
import type { ErrorClass, IModuleLocaleText } from '../bean/index.ts';
import type { AppMetadata } from './metadata.ts';
import type { AppResource } from './resource.ts';
import cluster from 'node:cluster';

import { EnumAppEvent } from '../../types/index.ts';
import { BeanSimple } from '../bean/beanSimple.ts';
import { AppLocale, BeanScopeContainer } from '../bean/index.ts';
import { CtxCounter } from './ctxCounter.ts';
import { AppLogger } from './logger.ts';
import { appMetadata } from './metadata.ts';
import { appResource } from './resource.ts';

const SymbolClosePromise = Symbol('SymbolClosePromise');

export class AppMeta extends BeanSimple {
  ctxCounter: CtxCounter;
  isProd: boolean;
  isTest: boolean;
  isLocal: boolean;
  error: ErrorClass;
  logger: AppLogger;
  locale: AppLocale;
  text: IModuleLocaleText;
  scopeContainer: BeanScopeContainer;
  appMonkey?: AppMonkeyConstructable;
  //
  resource: AppResource;
  metadata: AppMetadata;
  //
  modules: Record<string, IModule>;
  modulesArray: IModule[];
  modulesMonkey: Record<string, IModule>;
  //
  constants: Record<string, any>;
  locales: TypeModuleResourceLocales;
  localeModules: TypeModuleResourceLocaleModules;
  //
  appReady: boolean;
  appReadyInstances: Record<string, boolean>;
  //
  appStarted: boolean;
  appStartError: Error;
  //
  appClose: boolean;
  appClosed: boolean;

  protected __init__() {
    // ctxCounter
    this.ctxCounter = new CtxCounter();

    // appMonkey
    this.appMonkey = this.app.options.AppMonkey;

    // env
    this._prepareEnv();

    // logger
    this.logger = this.bean._newBean(AppLogger);

    // locale
    this.locale = this.bean._newBean(AppLocale);

    // text
    this.text = this.locale.createLocaleText();

    // scopeContainer
    this.scopeContainer = this.bean._newBean(BeanScopeContainer);

    // resource
    this.resource = appResource;
    (this.resource as any).app = this.app;

    // metadata
    this.metadata = appMetadata;
  }

  private _prepareEnv() {
    const mode = this.app.config.meta.mode;
    this.isProd = mode === 'prod';
    this.isTest = mode === 'test';
    this.isLocal = mode === 'local';
  }

  async waitAppStarted() {
    return new Promise((resolve, reject) => {
      // check once
      if (this.appStarted) {
        resolve(true);
      }
      if (this.appStartError) {
        reject(this.appStartError);
      }
      // listen
      this.app.once(EnumAppEvent.AppStarted, () => {
        resolve(true);
      });
      this.app.once(EnumAppEvent.AppStartError, err => {
        reject(err);
      });
    });
  }

  async close() {
    if (!this[SymbolClosePromise]) {
      this[SymbolClosePromise] = this._closeInner();
    }
    return this[SymbolClosePromise];
  }

  private async _closeInner() {
    if (process.env.SERVER_WORKERS !== '1') {
      // disconnect
      cluster.worker?.disconnect();
    } else {
      // close server
      if (this.app.server) {
        this.app.server.close();
        // maybe hang up using await
        // await promisify(this.app.server.close).call(this.app.server);
      }
    }
    // appClose
    this.appClose = true;
    // hook: appClose
    await this.app.util.monkeyModule(this.app.meta.appMonkey, this.app.meta.modulesMonkey, 'appClose');
    // ctx counter
    await this.app.meta.ctxCounter.awaitUntilZero();
    // appClosed
    this.appClosed = true;
    // hook: appClosed
    await this.app.util.monkeyModule(this.app.meta.appMonkey, this.app.meta.modulesMonkey, 'appClosed');
    // container dispose
    await this.app.bean.dispose();
    // logger dispose
    await this.app.meta.logger.dispose();
    // need not call process.exit
  }
}
