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
  IMiddlewareItem,
} from '../../types/index.js';
import { AppResource, appResource } from './resource.js';
import { AppMetadata, appMetadata } from './metadata.js';
import { VonaMetaFlavor, VonaMetaMode } from 'vona-shared';
import { MiddlewareLike } from '../module/middleware/middlewareLike.js';

export class AppMeta extends BeanSimple {
  workerId: string;
  inApp: boolean;
  inAgent: boolean;
  isProd: boolean;
  isTest: boolean;
  isLocal: boolean;
  flavor: VonaMetaFlavor;
  mode: VonaMetaMode;
  util: AppUtil;
  mockUtil: AppMockUtil;
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
  configs: Record<string, any>;
  constants: Record<string, any>;
  metas: Record<string, IModuleMeta>;
  locales: TypeModuleResourceLocales;
  localeModules: TypeModuleResourceLocaleModules;
  //
  middlewares: any[];
  middlewaresNormal: Record<string, IMiddlewareItem>;
  middlewaresGlobal: IMiddlewareItem[];
  middlewaresSocketIoConnection: any[];
  middlewaresSocketIoPacket: any[];
  middlewaresGuard: MiddlewareLike;
  middlewaresInterceptor: MiddlewareLike;
  middlewaresPipe: MiddlewareLike;
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

    // util
    this.util = this.app.bean._newBean(AppUtil);

    // mockUtil
    this.mockUtil = this.app.bean._newBean(AppMockUtil);

    // reload
    this.reload = this.app.bean._newBean(AppReload);

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
