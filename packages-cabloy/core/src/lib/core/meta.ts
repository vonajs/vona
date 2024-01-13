import * as uuid from 'uuid';
import { AppMockUtil } from '../utils/mockUtil.js';
import { AppReload } from '../module/reload.js';
import { AppUtil } from '../utils/util.js';
import { BeanBase } from '../module/bean/beanBase.js';
import { AppMessenger } from '../module/messenger.js';
import { IMonkeyApp } from '../../types/interface/monkey.js';
import { AppRouter } from '../module/route.js';
import { AppLimiter, AppRedlock } from '../module/redis.js';
import { QueueClient } from '../module/queue/queueClient.js';
import { BroadcastClient } from '../module/broadcast/broadcastClient.js';
import { CabloyContext, IModule, ISuite } from '../../types/index.js';
import { AppResource, resource } from './resource.js';

export class AppMeta extends BeanBase {
  workerId: string = null as any;
  inApp: boolean = false;
  inAgent: boolean = false;
  isProd: boolean = false;
  isTest: boolean = false;
  isLocal: boolean = false;
  util: AppUtil = null as any;
  mockUtil: AppMockUtil = null as any;
  reload: AppReload = null as any;
  messenger: AppMessenger = null as any;
  appMonkey?: IMonkeyApp;
  router: AppRouter = null as any;
  limiter: AppLimiter = null as any;
  redlock: AppRedlock = null as any;
  queue: QueueClient = null as any;
  broadcast: BroadcastClient = null as any;
  //
  resource: AppResource = null as any;
  //
  beans: Record<string, any> = null as any;
  aops: Record<string, any> = null as any;
  //
  suites: Record<string, ISuite> = null as any;
  modules: Record<string, IModule> = null as any;
  modulesArray: IModule[] = null as any;
  modulesMonkey: Record<string, IModule> = null as any;
  //
  configs: Record<string, any> = null as any;
  constants: Record<string, any> = null as any;
  //
  middlewares: any[] = null as any;
  middlewaresNormal: Record<string, any> = null as any;
  middlewaresGlobal: any[] = null as any;
  middlewaresSocketIoConnection: any[] = null as any;
  middlewaresSocketIoPacket: any[] = null as any;
  //
  queues: Record<string, any> = null as any;
  broadcasts: Record<string, any> = null as any;
  schedules: Record<string, any> = null as any;
  //
  appReadyInstances: Record<string, any> = null as any;
  //
  __versionReady: boolean = false;
  __versionReadyError: Error = null as any;
  //
  _loadQueueWorkers: ({ subdomain }: { subdomain: string }) => void = null as any;
  _loadSchedules: ({ ctx }: { ctx: CabloyContext }) => Promise<void> = null as any;
  _runSchedule: (context) => Promise<any> = null as any;
  checkAppReady: () => Promise<boolean> = null as any;

  __init__() {
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
    this.resource = resource;
    this.resource.app = this.app;
  }

  prepareEnv() {
    // isProd
    this.isProd =
      this.app.config.env !== 'local' && this.app.config.env !== 'unittest' && this.app.config.env !== 'test';
    // isTest
    this.isTest = this.app.config.env === 'unittest' || this.app.config.env === 'test';
    // isLocal
    this.isLocal = this.app.config.env === 'local';
  }
}
