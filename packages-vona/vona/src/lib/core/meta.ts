import * as uuid from 'uuid';
import { AppMockUtil } from '../utils/mockUtil.js';
import { AppReload } from '../module/reload/reload.js';
import { AppUtil } from '../utils/util.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { AppMessenger } from '../module/messenger.js';
import { IMonkeyApp, IMonkeySystem } from '../../types/interface/monkey.js';
import { AppRouter } from '../module/route.js';
import { AppLimiter, AppRedlock } from '../module/redis.js';
import { QueueClient } from '../module/queue/queueClient.js';
import { BroadcastClient } from '../module/broadcast/broadcastClient.js';
import {
  VonaContext,
  IModule,
  IModuleMeta,
  ISuite,
  TypeModuleResourceLocaleModules,
  TypeModuleResourceLocales,
} from '../../types/index.js';
import { AppResource, appResource } from './resource.js';
import { AppMetadata, appMetadata } from './metadata.js';
import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';
import { Onion } from '../module/onion/onion.js';
import { BeanScopeContainer, AppLocale, ErrorClass, IModuleLocaleText } from '../bean/index.js';

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
  queue: QueueClient;
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
  onionMiddleware: Onion;
  onionGuard: Onion;
  onionInterceptor: Onion;
  onionPipe: Onion;
  onionConnection: Onion;
  onionPacket: Onion;
  //
  queues: Record<string, any>;
  broadcasts: Record<string, any>;
  schedules: Record<string, any>;
  //
  appReady: boolean;
  appReadyInstances: Record<string, any>;
  //
  __versionReady: boolean;
  __versionReadyError: Error;
  //
  _loadQueueWorkers: ({ subdomain }: { subdomain: string }) => void;
  _loadSchedules: ({ ctx }: { ctx: VonaContext }) => Promise<void>;
  _runSchedule: (context) => Promise<any>;
  checkAppReady: () => Promise<boolean>;

  protected __init__() {
    // workerId
    this.workerId = uuid.v4();

    // app or agent
    this.inApp = this.app.type === 'application';
    this.inAgent = this.app.type === 'agent';

    // env
    this.prepareEnv();

    // locale
    this.locale = this.bean._newBean(AppLocale);

    // text
    this.text = this.locale.createLocaleText();

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
    this.isProd = this.app.config.env === 'prod';
    this.isTest = this.app.config.env === 'unittest' || this.app.config.env === 'test';
    this.isLocal = this.app.config.env === 'local';
    this.flavor = this.app.options.flavor || process.env.META_FLAVOR || 'normal';
    this.mode = this.app.config.env as VonaMetaMode;
  }
}
