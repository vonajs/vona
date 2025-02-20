import type { IModule, ISuite, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';
import type * as CelJS from 'cel-js' with { 'resolution-mode': 'import' };
import type { TypeModuleResourceLocaleModules, TypeModuleResourceLocales } from '../../types/index.ts';
import type { IMonkeyApp, IMonkeySystem } from '../../types/interface/monkey.ts';
import type { ErrorClass, IModuleLocaleText } from '../bean/index.ts';
import type { AppMetadata } from './metadata.ts';
import type { AppResource } from './resource.ts';
import * as celjs from 'cel-js';
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
  flavor: VonaMetaFlavor;
  mode: VonaMetaMode;
  error: ErrorClass;
  locale: AppLocale;
  text: IModuleLocaleText;
  scopeContainer: BeanScopeContainer;
  appMonkey?: IMonkeyApp & IMonkeySystem;
  celjs: typeof CelJS;
  //
  resource: AppResource;
  metadata: AppMetadata;
  //
  suites: Record<string, ISuite>;
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
  appClosed: boolean;

  protected __init__() {
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
    (<any> this.resource).app = this.app;

    // metadata
    this.metadata = appMetadata;

    // celjs
    this.celjs = celjs;
  }

  prepareEnv() {
    this.isProd = this.app.config.configMeta.mode === 'prod';
    this.isTest = this.app.config.configMeta.mode === 'test';
    this.isLocal = this.app.config.configMeta.mode === 'local';
    this.flavor = this.app.config.configMeta.flavor;
    this.mode = this.app.config.configMeta.mode;
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
      this.app.on(EnumAppEvent.AppStarted, () => {
        resolve(true);
      });
      this.app.on(EnumAppEvent.AppStartError, err => {
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
    // set appClosed first
    this.appClosed = true;
    // hook: appClosed
    await this.app.util.monkeyModule(this.app.meta.appMonkey, this.app.meta.modulesMonkey, 'appClosed');
    // need not call process.exit
  }
}
