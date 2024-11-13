import { swapDeps } from '@cabloy/deps';
import { VonaApplication } from '../../types/index.js';
import { appResource } from '../core/resource.js';
import { MiddlewareLike } from './middleware/middlewareLike.js';

export default function (app: VonaApplication): [object, any[]] {
  // use modulesArray
  const ebModulesArray = app.meta.modulesArray;

  // all middlewares
  app.meta.middlewares = [];
  const ebMiddlewaresAll = app.meta.middlewares;

  app.meta.middlewaresNormal = {};
  const ebMiddlewaresNormal: object = app.meta.middlewaresNormal;

  app.meta.middlewaresGlobal = [];
  const ebMiddlewaresGlobal = app.meta.middlewaresGlobal;

  app.meta.middlewaresSocketIoConnection = [];
  const ebMiddlewaresSocketIoConnection = app.meta.middlewaresSocketIoConnection;

  app.meta.middlewaresSocketIoPacket = [];
  const ebMiddlewaresSocketIoPacket = app.meta.middlewaresSocketIoPacket;

  // load
  loadAll(app);

  // load middlewares all
  loadMiddlewaresAll(ebMiddlewaresAll, ebModulesArray, app);

  // handle dependents
  handleDependents(ebMiddlewaresGlobal);

  // load middlewares
  loadMiddlewares(
    ebMiddlewaresAll,
    ebMiddlewaresNormal,
    ebMiddlewaresGlobal,
    ebMiddlewaresSocketIoConnection,
    ebMiddlewaresSocketIoPacket,
  );

  return [ebMiddlewaresNormal, ebMiddlewaresGlobal];
}

function loadAll(app: VonaApplication) {
  app.meta.middlewaresGuard = app.bean._newBean(MiddlewareLike, 'guard');
  app.meta.middlewaresInterceptor = app.bean._newBean(MiddlewareLike, 'interceptor');
  app.meta.middlewaresPipe = app.bean._newBean(MiddlewareLike, 'pipe');
}

function loadMiddlewares(
  ebMiddlewaresAll,
  ebMiddlewaresNormal,
  ebMiddlewaresGlobal,
  ebMiddlewaresSocketIoConnection,
  ebMiddlewaresSocketIoPacket,
) {
  // load
  for (const item of ebMiddlewaresAll) {
    // ignore other types, such as: socketio.connection/socketio.packet
    const type = item.options?.type;
    if (!type) {
      // normal
      ebMiddlewaresNormal[item.name] = item;
      if (item.options?.global) {
        ebMiddlewaresGlobal.push(item);
      }
    } else if (type === 'socketio.connection') {
      ebMiddlewaresSocketIoConnection.push(item);
    } else if (type === 'socketio.packet') {
      ebMiddlewaresSocketIoPacket.push(item);
    }
  }

  // global order
  swap(ebMiddlewaresGlobal);
  swap(ebMiddlewaresSocketIoConnection);
  swap(ebMiddlewaresSocketIoPacket);
}

function loadMiddlewaresAll(ebMiddlewaresAll, ebModulesArray, app) {
  for (const module of ebModulesArray) {
    _loadMiddlewaresAll_fromConfig(ebMiddlewaresAll, module, app);
    _loadMiddlewaresAll_fromMetadata(ebMiddlewaresAll, module);
  }
}

function _loadMiddlewaresAll_fromConfig(ebMiddlewaresAll, module, app) {
  const config = app.meta.configs[module.info.relativeName];
  if (!config.middlewares) return;
  for (const middlewareKey in config.middlewares) {
    const middlewareConfig = config.middlewares[middlewareKey];
    // bean
    const beanName = middlewareConfig.bean;
    if (!beanName) throw new Error(`bean not set for middleware: ${module.info.relativeName}.${middlewareKey}`);
    let bean;
    if (typeof beanName === 'string') {
      bean = {
        module: module.info.relativeName,
        name: beanName,
      };
    } else {
      bean = {
        module: beanName.module || module.info.relativeName,
        name: beanName.name,
      };
    }
    const beanFullName = `${bean.module}.middleware.${bean.name}`;
    const beanOptions = appResource.getBean(beanFullName);
    // push
    ebMiddlewaresAll.push({
      name: middlewareKey,
      options: middlewareConfig,
      beanOptions,
      fromConfig: true,
    });
  }
}

function _loadMiddlewaresAll_fromMetadata(ebMiddlewaresAll, module) {
  // todo: remove this line
  if (module.info.relativeName !== 'a-core' && module.info.relativeName !== 'a-database') return;
  const scene = 'middleware';
  const middlewares = appResource.scenes['middleware'][module.info.relativeName];
  if (!middlewares) return;
  for (const key in middlewares) {
    const beanOptions = middlewares[key];
    // push
    ebMiddlewaresAll.push({
      name: key.replace(`.${scene}.`, ':'),
      options: beanOptions.options,
      beanOptions,
    });
  }
}

function handleDependents(ebMiddlewaresGlobal) {
  for (const middleware of ebMiddlewaresGlobal) {
    let dependents = middleware.options.dependents;
    if (!dependents) continue;
    if (!Array.isArray(dependents)) {
      dependents = dependents.split(',');
    }
    for (const dep of dependents) {
      const middleware2 = ebMiddlewaresGlobal.find(item => item.name === dep);
      if (!middleware2) {
        throw new Error(`middleware ${dep} not found for dependents of ${middleware.name}`);
      }
      const options = middleware2.options;
      if (!options.dependencies) options.dependencies = [];
      if (!Array.isArray(options.dependencies)) {
        options.dependencies = options.dependencies.split(',');
      }
      if (options.dependencies.findIndex(item => item === middleware.name) === -1) {
        options.dependencies.push(middleware.name);
      }
    }
  }
}

function swap(middlewares) {
  swapDeps(middlewares, { name: 'name', dependencies: 'options.dependencies' });
}
