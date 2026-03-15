import { B as BeanSimple, n as BeanBase, m as cast, x as SymbolBeanFullName, h as deepExtend, y as useCustomRef, V as Virtual, l as BeanInfo, v as BeanScopeBase, d as createBeanDecorator } from "./zova-QgocPMzS.js";
import { Bean, Service, Scope } from "./a-bean-Bxu0OKjI.js";
import { e as experimental_createQueryPersister, u as useQuery, h as hashKey, a as useMutation, Q as QueryCache, b as QueryClient, V as VueQueryPlugin, c as hydrate, d as defaultShouldDehydrateQuery, f as useQueryClient } from "./tanstack-query-D5lEwADt.js";
import { l as localforage } from "./localforage-DLcenR3h.js";
import { m as markRaw } from "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveMaxAgeTime(maxAge, query) {
  return typeof maxAge === "function" ? maxAge(query) : maxAge;
}
const __ThisModule__ = "a-model";
class CookieWrapper extends BeanSimple {
  constructor(...args) {
    super(...args);
    this.options = void 0;
    this.query = void 0;
  }
  __init__(options, query) {
    this.options = options;
    this.query = query;
  }
  getItem(key) {
    return this.app.meta.cookie.getItem(key);
  }
  setItem(key, value) {
    const configScope = this.bean.scope(__ThisModule__).config;
    const opts = {
      ...configScope.persister.cookie.options
    };
    let maxAge = resolveMaxAgeTime(this.options.maxAge, this.query);
    if (maxAge !== void 0) {
      if (maxAge === Infinity) maxAge = 1e3 * 60 * 60 * 24 * 365;
      opts.expires = new Date(Date.now() + maxAge);
    }
    this.app.meta.cookie.setItem(key, value, opts);
  }
  removeItem(key) {
    this.app.meta.cookie.removeItem(key);
  }
}
class BeanModelLast extends BeanBase {
  constructor(selector) {
    super();
    this.selector = void 0;
    if (this.$onionOptions?.enableSelector) {
      this.selector = selector ?? "";
    }
  }
  async __init__(_selector) {
  }
  get $onionOptions() {
    return super.$onionOptions;
  }
  get self() {
    return cast(this);
  }
  get scopeSelf() {
    return this.bean.scope(__ThisModule__);
  }
}
class BeanModelPersister extends BeanModelLast {
  _persisterLoad_inner(storage, storageKey, storedData, query, options) {
    if (!storedData) return void 0;
    const persistedQuery = options.deserialize ? options.deserialize(storedData, options.deserializeDefault) : options.deserializeDefault(storedData);
    if (persistedQuery.state.dataUpdatedAt) {
      const queryAge = Date.now() - persistedQuery.state.dataUpdatedAt;
      const expired = queryAge > (resolveMaxAgeTime(options.maxAge, query) ?? Infinity);
      const busted = persistedQuery.buster !== options.buster;
      if (expired || busted) {
        storage.removeItem(storageKey);
      } else {
        query.setState({
          dataUpdatedAt: persistedQuery.state.dataUpdatedAt,
          errorUpdatedAt: persistedQuery.state.errorUpdatedAt
        });
        return persistedQuery.state.data;
      }
    } else {
      storage.removeItem(storageKey);
    }
  }
  $persisterLoad(queryKey) {
    const query = this.self.$queryFind({
      queryKey
    });
    if (!query) return void 0;
    const options = this._adjustPersisterOptions(query.meta?.persister);
    if (!options) return void 0;
    const storage = this._getPersisterStorage(options, query);
    if (!storage) return void 0;
    const storageKey = this._getPersisterStorageKey(options, query);
    try {
      const storedData = storage.getItem(storageKey);
      if (options.sync) {
        return this._persisterLoad_inner(storage, storageKey, storedData, query, options);
      } else {
        return storedData.then((storedData2) => {
          return this._persisterLoad_inner(storage, storageKey, storedData2, query, options);
        });
      }
    } catch (err) {
      storage.removeItem(storageKey);
    }
  }
  $persisterSave(queryKey) {
    const query = this.self.$queryFind({
      queryKey
    });
    if (!query) return;
    const options = this._adjustPersisterOptions(query.meta?.persister);
    if (!options) return;
    const storage = this._getPersisterStorage(options, query);
    if (!storage) return;
    const storageKey = this._getPersisterStorageKey(options, query);
    const params = {
      state: query.state,
      queryKey: query.queryKey,
      queryHash: query.queryHash,
      buster: options.buster
    };
    const data = options.serialize ? options.serialize(params, options.serializeDefault) : options.serializeDefault(params);
    if (options.sync === true) {
      storage.setItem(storageKey, data);
    } else {
      setTimeout(() => {
        storage.setItem(storageKey, data);
      }, 0);
    }
  }
  $persisterRemove(queryKey) {
    const query = this.self.$queryFind({
      queryKey
    });
    if (!query) return;
    const options = this._adjustPersisterOptions(query.meta?.persister);
    if (!options) return;
    const storage = this._getPersisterStorage(options, query);
    if (!storage) return;
    const storageKey = this._getPersisterStorageKey(options, query);
    if (options.sync === true) {
      storage.removeItem(storageKey);
    } else {
      setTimeout(() => {
        storage.removeItem(storageKey);
      }, 0);
    }
  }
  _createPersister(options) {
    options = this._adjustPersisterOptions(options);
    if (!options) return void 0;
    return experimental_createQueryPersister({
      storage: this._getPersisterStorage(options),
      maxAge: options.maxAge,
      refetchOnRestore: options.refetchOnRestore,
      prefix: options.prefix,
      buster: options.buster
    }).persisterFn;
  }
  _adjustPersisterOptions(options) {
    if (options === false) return void 0;
    if (options === void 0 || options === true) {
      options = {};
    } else {
      options = {
        ...options
      };
    }
    options.storage = options.storage ?? (options.sync ? "local" : "db");
    options.maxAge = options.maxAge ?? this.scopeSelf.config.persister.maxAge[options.storage];
    options.refetchOnRestore = options.refetchOnRestore ?? this.scopeSelf.config.persister.refetchOnRestore;
    options.prefix = options.prefix ?? this._getPersisterPrefix();
    options.buster = options.buster ?? this._getPersisterBuster();
    options.serializeDefault = options.serializeDefault ?? JSON.stringify;
    options.deserializeDefault = options.deserializeDefault ?? JSON.parse;
    return options;
  }
  _getPersisterStorageKey(options, query) {
    if (options.storageKeySimplify) return String(query.queryKey[query.queryKey.length - 1]);
    return `${options.prefix}-${query.queryHash}`;
  }
  _getPersisterStorage(options, query) {
    options = this._adjustPersisterOptions(options);
    if (!options) return void 0;
    if (options.storage === "cookie") return this.bean._newBeanSimple(CookieWrapper, false, options, query);
    if (options.storage === "local") return localStorage;
    if (options.storage === "db") return localforage;
  }
  _getPersisterPrefix() {
    return `${this.sys.env.APP_NAME}-query`;
  }
  _getPersisterBuster() {
    return this.sys.env.APP_VERSION;
  }
  _forceQueryKeyPrefix(queryKey) {
    if (!queryKey) queryKey = [];
    if (!this._prefixIsBeanFullName(queryKey[0])) {
      const prefixes = [this[SymbolBeanFullName]];
      if (this.$onionOptions?.enableSelector) {
        prefixes.push(this.selector);
      }
      queryKey = prefixes.concat(queryKey);
    }
    return queryKey;
  }
  _prefixIsBeanFullName(prefix) {
    return prefix === this[SymbolBeanFullName];
  }
}
class BeanModelLocal extends BeanModelPersister {
  $serializeLocal(obj) {
    return JSON.stringify(obj?.state?.data);
  }
  $deserializeLocal(value) {
    return {
      state: {
        data: value ? JSON.parse(value) : void 0,
        dataUpdateCount: 0,
        dataUpdatedAt: Date.now(),
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: false,
        status: "success",
        fetchStatus: "idle"
      },
      queryKey: void 0,
      queryHash: void 0,
      buster: this._getPersisterBuster()
    };
  }
}
class BeanModelCookie extends BeanModelLocal {
  $serializeCookie(obj) {
    return String(obj?.state?.data ?? "");
  }
  $deserializeCookie(value) {
    return {
      state: {
        data: value,
        dataUpdateCount: 0,
        dataUpdatedAt: Date.now(),
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: false,
        status: "success",
        fetchStatus: "idle"
      },
      queryKey: void 0,
      queryHash: void 0,
      buster: this._getPersisterBuster()
    };
  }
  _cookieCoerce(value, cookieType) {
    if (value === void 0 || value === "") return void 0;
    if (!cookieType || cookieType === "auto") {
      return value === "true" ? true : value === "false" ? false : value;
    } else if (cookieType === "boolean") {
      return value === "true" ? true : value === "false" ? false : Boolean(Number(value));
    } else if (cookieType === "number") {
      return Number(value);
    } else if (cookieType === "date") {
      return new Date(value);
    } else if (cookieType === "string") {
      return value;
    }
    return value;
  }
}
class BeanModelQuery extends BeanModelCookie {
  $setQueryData(queryKey, updater, persisterSave, options) {
    queryKey = this._forceQueryKeyPrefix(queryKey);
    const data = this.$queryClient.setQueryData(queryKey, updater, options);
    if (data === void 0) {
      if (persisterSave) {
        this.$persisterRemove(queryKey);
      }
      this.$setQueryDataDirect(queryKey, data);
    } else {
      if (persisterSave) {
        this.$persisterSave(queryKey);
      }
    }
    return data;
  }
  $queryFind(filters) {
    filters = this.$normalizeFilters(filters);
    return this.$queryClient.getQueryCache().find(filters);
  }
  $invalidateQueries(filters, options) {
    filters = this.$normalizeFilters(filters);
    return this.$queryClient.invalidateQueries(filters, options);
  }
  $refetchQueries(filters, options) {
    filters = this.$normalizeFilters(filters);
    return this.$queryClient.refetchQueries(filters, options);
  }
  $setQueryDataDirect(queryKey, value) {
    const query = this.$queryFind({
      queryKey,
      exact: true
    });
    query?.setData(value);
  }
  async $clear() {
    const queries = this.$queryClient.getQueryCache().getAll();
    for (const query of queries) {
      query?.setData(void 0);
    }
    await localforage.clear();
  }
  $normalizeFilters(filters) {
    if (!filters) filters = {};
    const queryKey = this._forceQueryKeyPrefix(cast(filters).queryKey);
    return {
      ...filters,
      queryKey
    };
  }
}
class BeanModelUseQuery extends BeanModelQuery {
  $useQuery(options, queryClient) {
    const queryKey = this.self._forceQueryKeyPrefix(options.queryKey);
    const persister = this._createPersister(options.meta?.persister);
    const optionsDefault = {};
    if (!cast(options).meta?.disableErrorEffect) {
      optionsDefault.throwOnError = (error, query) => {
        let errorInfo = cast(options).meta?.errorInfo;
        if (typeof errorInfo === "function") {
          errorInfo = errorInfo(error, query);
        }
        if (!error.message.includes("useQuery:")) {
          error.message = `useQuery: [${queryKey.join(", ")}]: ${error.message}`;
        }
        this.$errorHandler(error, errorInfo ?? "useQuery");
        return false;
      };
    }
    options = Object.assign(optionsDefault, options, {
      queryKey,
      persister
    });
    const sync = typeof options.meta?.persister === "object" && options.meta?.persister?.sync;
    if (sync !== true) {
      const staleTime = options.staleTime ?? this.scopeSelf.config.query.staleTime.async;
      const queryCache = this.$queryFind({
        queryKey
      });
      const queryCacheExists = queryCache?.state.data !== void 0;
      options.staleTime = (query) => {
        if (this.ctx.meta.$ssr.isRuntimeSsrPreHydration && queryCacheExists) {
          return resolveStaleTime(this.scopeSelf.config.query.staleTime.ssr, query);
        }
        return resolveStaleTime(staleTime, query);
      };
    }
    return this.ctx.util.instanceScope(() => {
      return useQuery(options, queryClient);
    });
  }
}
const SymbolUseQueries = /* @__PURE__ */ Symbol("SymbolUseQueries");
const SymbolUseComputeds = /* @__PURE__ */ Symbol("SymbolUseComputeds");
class BeanModelUseState extends BeanModelUseQuery {
  constructor(...args) {
    super(...args);
    this[SymbolUseQueries] = {};
    this[SymbolUseComputeds] = {};
  }
  async $loadStateDb(dbData) {
    return await dbData;
  }
  $useStateDb(options, queryClient) {
    options = deepExtend({
      meta: {
        maxAge: this.scopeSelf.config.persister.maxAge.local
      }
    }, options, {
      enabled: false,
      staleTime: Infinity,
      meta: {
        ssr: {
          dehydrate: false
        },
        persister: {
          storage: "db",
          sync: false
        }
      }
    });
    const self = this;
    return useCustomRef(() => {
      return {
        get() {
          return self._handleAsyncDataGet(options, queryClient, true);
        },
        set(value) {
          self._handleSyncDataSet(options, queryClient, true, value);
        }
      };
    });
  }
  $useStateLocal(options, queryClient) {
    options = deepExtend({
      meta: {
        persister: {
          serializeDefault: (obj) => {
            return this.$serializeLocal(obj);
          },
          deserializeDefault: (value) => {
            return this.$deserializeLocal(value);
          },
          storageKeySimplify: true
        }
      }
    }, options, {
      enabled: false,
      staleTime: Infinity,
      meta: {
        persister: {
          storage: "local",
          sync: true
        }
      }
    });
    const self = this;
    return useCustomRef(() => {
      return {
        get() {
          return self._handleSyncDataGet(options, queryClient, true);
        },
        set(value) {
          self._handleSyncDataSet(options, queryClient, true, value);
        }
      };
    });
  }
  $useStateCookie(options, queryClient) {
    options = deepExtend({
      meta: {
        persister: {
          serializeDefault: (obj) => {
            return this.$serializeCookie(obj);
          },
          deserializeDefault: (value) => {
            const cookieType = options.meta.persister.cookieType;
            return this.$deserializeCookie(this._cookieCoerce(value, cookieType));
          },
          storageKeySimplify: true
        }
      }
    }, options, {
      enabled: false,
      staleTime: Infinity,
      meta: {
        persister: {
          storage: "cookie",
          sync: true
        }
      }
    });
    const self = this;
    return useCustomRef(() => {
      return {
        get() {
          return self._handleSyncDataGet(options, queryClient, true);
        },
        set(value) {
          self._handleSyncDataSet(options, queryClient, true, value);
        }
      };
    });
  }
  $useStateMem(options, queryClient) {
    options = deepExtend({}, options, {
      enabled: false,
      staleTime: Infinity,
      meta: {
        persister: false
      }
    });
    const self = this;
    return useCustomRef(() => {
      return {
        get() {
          return self._handleSyncDataGet(options, queryClient, false);
        },
        set(value) {
          self._handleSyncDataSet(options, queryClient, false, value);
        }
      };
    });
  }
  $useStateComputed(options) {
    const queryKey = this.self._forceQueryKeyPrefix(options.queryKey);
    const queryHash = hashKey(queryKey);
    if (!this[SymbolUseComputeds][queryHash]) {
      this[SymbolUseComputeds][queryHash] = this.$useComputed(options.queryFn, options.debugOptions);
    }
    return this[SymbolUseComputeds][queryHash];
  }
  $useStateData(options, queryClient) {
    const queryKey = this.self._forceQueryKeyPrefix(options.queryKey);
    const queryHash = hashKey(queryKey);
    if (!this[SymbolUseQueries][queryHash]) {
      const useQuery2 = this.$useQuery(options, queryClient);
      this[SymbolUseQueries][queryHash] = useQuery2;
      if (!options.meta?.disableSuspenseOnInit) {
        useQuery2.suspense();
      }
    }
    return this[SymbolUseQueries][queryHash];
  }
  _handleAsyncDataGet(options, queryClient, persister) {
    const query = this.$useStateData(options, queryClient);
    if (query.data !== void 0) return query.data;
    return this._handleAsyncDataGet_inner(options, queryClient, persister);
  }
  async _handleAsyncDataGet_inner(options, queryClient, persister) {
    const queryKey = options.queryKey;
    const query = this.$useStateData(options, queryClient);
    if (persister) {
      const data = await this.$persisterLoad(queryKey);
      if (data !== void 0) {
        this.$setQueryData(queryKey, data, false);
      }
    }
    if (query.data === void 0) {
      this._handleSyncDataGet_defaultData(queryKey, options);
    }
    return query.data;
  }
  _handleSyncDataGet(options, queryClient, persister) {
    const queryKey = options.queryKey;
    const query = this.$useStateData(options, queryClient);
    if (query.data !== void 0) return query.data;
    if (persister) {
      const data = this.$persisterLoad(queryKey);
      if (data !== void 0) {
        this.$setQueryData(queryKey, data, false);
      }
    }
    if (query.data === void 0) {
      this._handleSyncDataGet_defaultData(queryKey, options);
    }
    return query.data;
  }
  _handleSyncDataGet_defaultData(queryKey, options) {
    let defaultData = options.meta?.defaultData;
    if (typeof defaultData === "function") {
      defaultData = defaultData();
    }
    if (defaultData !== void 0) {
      this.$setQueryData(queryKey, defaultData, false);
    }
  }
  _handleSyncDataSet(options, queryClient, persister, value) {
    const queryKey = options.queryKey;
    const query = this.$useStateData(options, queryClient);
    this.$setQueryData(queryKey, value, persister);
    return query;
  }
}
class BeanModelUseStateGeneral extends BeanModelUseState {
  $useState(stateType, options, queryClient) {
    switch (stateType) {
      case "db":
        return this.$useStateDb(options, queryClient);
      case "local":
        return this.$useStateLocal(options, queryClient);
      case "cookie":
        return this.$useStateCookie(options, queryClient);
      case "mem":
        return this.$useStateMem(options, queryClient);
      case "data":
        return this.$useStateData(options, queryClient);
    }
  }
}
const SymbolUseMutations = /* @__PURE__ */ Symbol("SymbolUseMutations");
class BeanModelUseMutation extends BeanModelUseStateGeneral {
  constructor(...args) {
    super(...args);
    this[SymbolUseMutations] = {};
  }
  $useMutation(mutationOptions, queryClient) {
    return this.ctx.util.instanceScope(() => {
      return useMutation(mutationOptions, queryClient);
    });
  }
  $useMutationData(mutationOptions, queryClient) {
    let mutationKey = cast(mutationOptions).mutationKey;
    if (!mutationKey || mutationKey.length === 0) throw new Error("should specify mutationKey");
    mutationKey = this.self._forceQueryKeyPrefix(mutationKey);
    const mutationHash = hashKey(mutationKey);
    if (!this[SymbolUseMutations][mutationHash]) {
      const optionsDefault = {};
      if (!cast(mutationOptions).meta?.disableErrorEffect) {
        optionsDefault.onError = (error, variables, context) => {
          let errorInfo = cast(mutationOptions).meta?.errorInfo;
          if (typeof errorInfo === "function") {
            errorInfo = errorInfo(error, variables, context);
          }
          this.$errorHandler(error, errorInfo ?? "useMutationData");
        };
      }
      mutationOptions = Object.assign(optionsDefault, mutationOptions, {
        mutationKey
      });
      this[SymbolUseMutations][mutationHash] = this.$useMutation(mutationOptions, queryClient);
    }
    return this[SymbolUseMutations][mutationHash];
  }
}
class BeanModelFirst extends BeanModelUseMutation {
}
var _dec$2, _dec2$2, _dec3, _class$2;
let BeanModelBase = (_dec$2 = Bean(), _dec2$2 = Virtual(), _dec3 = BeanInfo({
  module: "a-model"
}), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3(_class$2 = class BeanModelBase2 extends BeanModelFirst {
}) || _class$2) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1;
let ServiceStorage = (_dec$1 = Service(), _dec2$1 = BeanInfo({
  module: "a-model"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class ServiceStorage2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this._queryClient = void 0;
  }
  async moduleLoaded() {
    let options = this.scope.config.queryClientConfig.defaultOptions;
    const queryCache = new QueryCache();
    const queryClient = this._queryClient = new QueryClient({
      defaultOptions: options,
      queryCache
    });
    const vueQueryPluginOptions = {
      queryClient
    };
    this.app.vue.use(VueQueryPlugin, vueQueryPluginOptions);
  }
  async appInitialize() {
    if (this.ctx.meta.$ssr.isRuntimeSsrPreHydration) {
      hydrate(this._queryClient, this.ctx.meta.$ssr.stateDefer.query);
    }
  }
}) || _class$1) || _class$1);
const defaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    gcTime: 1e3 * 60 * 5
  },
  dehydrate: {
    shouldDehydrateQuery(query) {
      if (query.meta?.ssr?.dehydrate === false) return false;
      if (typeof query.meta?.persister === "object" && query.meta?.persister?.sync) return false;
      return defaultShouldDehydrateQuery(query);
    },
    shouldDehydrateMutation(_mutation) {
      return false;
    }
  }
};
const config = (_sys) => {
  return {
    persister: {
      maxAge: {
        cookie: void 0,
        // undefined: session cookie
        local: Infinity,
        db: 1e3 * 60 * 60 * 24
        // 24 hours
      },
      cookie: {
        options: {}
      },
      refetchOnRestore: true
    },
    query: {
      staleTime: {
        async: 0,
        ssr: Infinity
      }
    },
    queryClientConfig: {
      defaultOptions
    }
  };
};
class Monkey extends BeanSimple {
  constructor(moduleSelf) {
    super();
    this._moduleSelf = void 0;
    this._storage = void 0;
    this._moduleSelf = moduleSelf;
  }
  async getStorage() {
    if (!this._storage) {
      this._storage = await this.bean._newBean(ServiceStorage, false);
    }
    return this._storage;
  }
  async appInitialize() {
    const storage = await this.getStorage();
    await storage.appInitialize();
  }
  async moduleLoading(_module) {
  }
  async moduleLoaded(module) {
    if (this._moduleSelf === module) {
      const storage = await this.getStorage();
      await storage.moduleLoaded();
    }
  }
  async beanInit(bean, beanInstance) {
    bean.defineProperty(beanInstance, "$queryClient", {
      enumerable: false,
      configurable: true,
      get() {
        return markRaw(useQueryClient());
      }
    });
  }
}
var _dec, _dec2, _class;
let ScopeModuleAModel = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-model"
}), _dec(_class = _dec2(_class = class ScopeModuleAModel2 extends BeanScopeBase {
}) || _class) || _class);
function Model(options) {
  return createBeanDecorator("model", "ctx", true, options);
}
async function $QueryAutoLoad(fn) {
  return _QueryAutoLoadInner(fn);
}
async function $QueriesAutoLoad(fn1, fn2, fn3, fn4, fn5, ...fns) {
  let promises = [_QueryAutoLoadInner(fn1), _QueryAutoLoadInner(fn2), _QueryAutoLoadInner(fn3), _QueryAutoLoadInner(fn4), _QueryAutoLoadInner(fn5)];
  if (fns.length > 0) {
    promises = promises.concat(fns.map((fn) => _QueryAutoLoadInner(fn)));
  }
  return await Promise.all(promises);
}
async function _QueryAutoLoadInner(fn) {
  if (!fn) return;
  const query = fn();
  if (query && query.data === void 0) {
    await query.suspense();
  }
  return query;
}
export {
  $QueriesAutoLoad,
  $QueryAutoLoad,
  BeanModelBase,
  Model,
  Monkey,
  ScopeModuleAModel,
  ServiceStorage,
  config,
  resolveMaxAgeTime,
  resolveStaleTime
};
