import { AppMockUtil } from '../utils/mockUtil.js';
import { AppReload } from '../module/reload/reload.js';
import { AppUtil, uuidv4 } from '../utils/util.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { AppMessenger } from '../module/messenger.js';
import { IMonkeyApp, IMonkeySystem } from '../../types/interface/monkey.js';
import { AppRouter } from '../module/route.js';
import { AppLimiter, AppRedlock } from '../module/redis.js';
import { BroadcastClient } from '../module/broadcast/broadcastClient.js';
import {
  IModule,
  IModuleMeta,
  ISuite,
  TypeModuleResourceLocaleModules,
  TypeModuleResourceLocales,
  EnumAppEvent,
  IDecoratorMiddlewareOptionsGlobal,
  IDecoratorGuardOptionsGlobal,
  IDecoratorInterceptorOptionsGlobal,
  IDecoratorPipeOptionsGlobal,
  IDecoratorFilterOptionsGlobal,
  IDecoratorSocketConnectionOptions,
  IDecoratorSocketPacketOptions,
  IDecoratorAopOptions,
  IDecoratorEntityOptions,
  IDecoratorControllerOptions,
  IDecoratorModelOptions,
  IDecoratorMetaOptions,
  IDecoratorSummerCacheOptions,
  IDecoratorStartupOptions,
  IDecoratorQueueOptions,
} from '../../types/index.js';
import { AppResource, appResource } from './resource.js';
import { AppMetadata, appMetadata } from './metadata.js';
import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';
import { Onion } from '../module/onion/onion.js';
import { BeanScopeContainer, AppLocale, ErrorClass, IModuleLocaleText, createAppText } from '../bean/index.js';

export class AppMeta extends BeanSimple {
  workerId: string;
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
  util: AppUtil;
  mockUtil: AppMockUtil;
  scopeContainer: BeanScopeContainer;
  reload: AppReload;
  messenger: AppMessenger;
  appMonkey?: IMonkeyApp & IMonkeySystem;
  router: AppRouter;
  limiter: AppLimiter;
  redlock: AppRedlock;
  broadcast: BroadcastClient;
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
  metas: Record<string, IModuleMeta>;
  locales: TypeModuleResourceLocales;
  localeModules: TypeModuleResourceLocaleModules;
  //
  onionMiddleware: Onion<IDecoratorMiddlewareOptionsGlobal>;
  onionGuard: Onion<IDecoratorGuardOptionsGlobal>;
  onionInterceptor: Onion<IDecoratorInterceptorOptionsGlobal>;
  onionPipe: Onion<IDecoratorPipeOptionsGlobal>;
  onionFilter: Onion<IDecoratorFilterOptionsGlobal>;
  onionSocketConnection: Onion<IDecoratorSocketConnectionOptions>;
  onionSocketPacket: Onion<IDecoratorSocketPacketOptions>;
  onionAop: Onion<IDecoratorAopOptions>;
  onionEntity: Onion<IDecoratorEntityOptions>;
  onionModel: Onion<IDecoratorModelOptions>;
  onionController: Onion<IDecoratorControllerOptions>;
  onionMeta: Onion<IDecoratorMetaOptions>;
  onionSummerCache: Onion<IDecoratorSummerCacheOptions>;
  onionStartup: Onion<IDecoratorStartupOptions>;
  onionQueue: Onion<IDecoratorQueueOptions>;
  //
  broadcasts: Record<string, any>;
  schedules: Record<string, any>;
  //
  appReady: boolean;
  appReadyInstances: Record<string, boolean>;
  //
  __versionReady: boolean;
  __versionReadyError: Error;
  _loadSchedules: () => Promise<void>;
  _runSchedule: (context) => Promise<any>;

  protected __init__() {
    // workerId
    this.workerId = uuidv4();

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

    // util
    this.util = this.bean._newBean(AppUtil);

    // mockUtil
    this.mockUtil = this.bean._newBean(AppMockUtil);

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
