import { AppReload } from '../module/reload/reload.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { AppMessenger } from '../module/messenger.js';
import { IMonkeyApp, IMonkeySystem } from '../../types/interface/monkey.js';
import { TypeModuleResourceLocaleModules, TypeModuleResourceLocales, EnumAppEvent } from '../../types/index.js';
import { AppResource, appResource } from './resource.js';
import { AppMetadata, appMetadata } from './metadata.js';
import { IModule, ISuite, VonaMetaFlavor, VonaMetaMode } from '@cabloy/module-info';
import { BeanScopeContainer, AppLocale, ErrorClass, IModuleLocaleText } from '../bean/index.js';
import type * as CelJS from 'cel-js' with { 'resolution-mode': 'import' };

export class AppMeta extends BeanSimple {
  inApp: boolean;
  inAgent: boolean;
  isProd: boolean;
  isTest: boolean;
  isLocal: boolean;
  flavor: VonaMetaFlavor;
  mode: VonaMetaMode;
  error: ErrorClass;
  locale: AppLocale;
  text: IModuleLocaleText;
  scopeContainer: BeanScopeContainer;
  reload: AppReload;
  messenger: AppMessenger;
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

  protected __init__() {
    // app or agent
    this.inApp = this.app.type === 'application';
    this.inAgent = this.app.type === 'agent';

    // env
    this.prepareEnv();

    // locale
    this.locale = this.bean._newBean(AppLocale);

    // text
    this.text = this.locale.createLocaleText();

    // scopeContainer
    this.scopeContainer = this.bean._newBean(BeanScopeContainer);

    // reload
    this.reload = this.bean._newBean(AppReload);

    // resource
    this.resource = appResource;
    (<any>this.resource).app = this.app;

    // metadata
    this.metadata = appMetadata;
  }

  prepareEnv() {
    this.isProd = this.app.config.configMeta.mode === 'prod';
    this.isTest = this.app.config.configMeta.mode === 'unittest';
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
}
