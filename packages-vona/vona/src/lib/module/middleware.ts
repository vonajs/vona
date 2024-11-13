import { swapDeps } from '@cabloy/deps';
import { VonaApplication } from '../../types/index.js';
import { MiddlewareLike } from './middleware/middlewareLike.js';

export default function (app: VonaApplication): [object, any[]] {
  // load
  loadAll(app);

  // handle dependents
  handleDependents(ebMiddlewaresGlobal);

  // load middlewares
  loadMiddlewares(ebMiddlewaresAll, ebMiddlewaresNormal, ebMiddlewaresGlobal);

  return [ebMiddlewaresNormal, ebMiddlewaresGlobal];
}

function loadAll(app: VonaApplication) {
  app.meta.middlewaresGuard = app.bean._newBean(MiddlewareLike, 'guard');
  app.meta.middlewaresInterceptor = app.bean._newBean(MiddlewareLike, 'interceptor');
  app.meta.middlewaresPipe = app.bean._newBean(MiddlewareLike, 'pipe');
  app.meta.middlewaresConnection = app.bean._newBean(MiddlewareLike, 'connection');
  app.meta.middlewaresPacket = app.bean._newBean(MiddlewareLike, 'packet');
}

function loadMiddlewares(ebMiddlewaresAll, ebMiddlewaresNormal, ebMiddlewaresGlobal) {
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
    }
  }

  // global order
  swap(ebMiddlewaresGlobal);
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
