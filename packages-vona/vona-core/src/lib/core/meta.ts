import type { IModule } from '@cabloy/module-info';
import type * as CelJS from 'cel-js' with { 'resolution-mode': 'import' };
import type { TypeModuleResourceLocaleModules, TypeModuleResourceLocales } from '../../types/index.ts';
import type { AppMonkeyConstructable } from '../../types/interface/monkey.ts';
import type { ErrorClass, IModuleLocaleText } from '../bean/index.ts';
import type { AppMetadata } from './metadata.ts';
import type { AppResource } from './resource.ts';
import { promisify } from 'node:util';
import { sleep } from '@cabloy/utils';
import * as celjs from 'cel-js';
import whyIsNodeRunning from 'why-is-node-running';
import { EnumAppEvent } from '../../types/index.ts';
import { BeanSimple } from '../bean/beanSimple.ts';
import { AppLocale, BeanScopeContainer } from '../bean/index.ts';
import { appMetadata } from './metadata.ts';
import { appResource } from './resource.ts';

const SymbolClosePromise = Symbol('SymbolClosePromise');

export class AppMeta extends BeanSimple {
  isProd: boolean;
  isTest: boolean;
  isLocal: boolean;
  error: ErrorClass;
  locale: AppLocale;
  text: IModuleLocaleText;
  scopeContainer: BeanScopeContainer;
  appMonkey?: AppMonkeyConstructable;
  celjs: typeof CelJS;
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
    // appMonkey
    this.appMonkey = this.app.options.AppMonkey;

    // env
    this.prepareEnv();

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

    // celjs
    this.celjs = celjs;
  }

  prepareEnv() {
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
    // close server
    await promisify(this.app.server.close).call(this.app.server);
    // appClose
    this.appClose = true;
    // hook: appClose
    await this.app.util.monkeyModule(this.app.meta.appMonkey, this.app.meta.modulesMonkey, 'appClose');
    // appClosed
    this.appClosed = true;
    // hook: appClosed
    await this.app.util.monkeyModule(this.app.meta.appMonkey, this.app.meta.modulesMonkey, 'appClosed');
    // todo: container dispose
    this.app.bean.dispose();
    // handles
    if (process.env.TEST_WHYISNODERUNNING === 'true' && this.app.meta.isTest) {
      await sleep(2000);
      const handles = (process as any)._getActiveHandles();
      if (handles.length > 0) {
        whyIsNodeRunning();
      }
    }
    // need not call process.exit
  }
}
