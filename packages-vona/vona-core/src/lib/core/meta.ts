import { AppReload } from '../module/reload/reload.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { AppMessenger } from '../module/messenger.js';
import { IMonkeyApp, IMonkeySystem } from '../../types/interface/monkey.js';
import {
  IModule,
  ISuite,
  TypeModuleResourceLocaleModules,
  TypeModuleResourceLocales,
  EnumAppEvent,
} from '../../types/index.js';
import { AppResource, appResource } from './resource.js';
import { AppMetadata, appMetadata } from './metadata.js';
import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';
import { BeanScopeContainer, AppLocale, ErrorClass, IModuleLocaleText, createAppText } from '../bean/index.js';

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
  __versionReady: boolean;
  __versionReadyError: Error;

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
    createAppText(this.app);

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

  async waitAppReady() {
    return new Promise((resolve, reject) => {
      // check once
      if (this.__versionReady) {
        resolve(true);
      }
      if (this.__versionReadyError) {
        reject(this.__versionReadyError);
      }
      // listen
      this.app.on(EnumAppEvent.AppReady, () => {
        resolve(true);
      });
      this.app.on(EnumAppEvent.AppReadyError, err => {
        reject(err);
      });
    });
  }
}
