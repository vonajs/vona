import axios from 'axios';
import bodyCryptoFn from '../bodyCrypto.js';

export default function (Vue) {
  // bodyCrypto
  const bodyCrypto = bodyCryptoFn(Vue);

  // axios
  Vue.prototype.$meta.axios = axios;

  // api
  Vue.prototype.$meta.api = {};
  wrapApi(Vue, Vue.prototype.$meta.api, axios, null);

  // add a response interceptor
  if (!axios.__ebDefaultResponseDisable) {
    // response
    axios.interceptors.response.use(
      function (response) {
        bodyCrypto.decrypt(response);
        return response;
      },
      function (error) {
        bodyCrypto.decrypt(error.response);
        throw error;
      }
    );
    axios.interceptors.response.use(
      function (response) {
        const contentType = response.headers['content-type'];
        if (!contentType || contentType.indexOf('application/json') === -1) return response;
        if (response.data.code !== 0) {
          const error = new Error();
          error.code = response.data.code;
          error.message = response.data.message;
          error.config = response.config;
          return Promise.reject(error);
        }
        // check jwt
        if (Vue.prototype.$meta.config.base.jwt && response.data['eb-jwt-oauth']) {
          window.localStorage['eb-jwt-oauth'] = JSON.stringify(response.data['eb-jwt-oauth']);
        }
        // return data
        return response.data.data;
      },
      function (error) {
        if (error.response) {
          error.code = (error.response.data && error.response.data.code) || error.response.status;
          error.message = (error.response.data && error.response.data.message) || error.response.statusText;
        }
        return Promise.reject(error);
      }
    );

    // add a request interceptor
    axios.interceptors.request.use(function (config) {
      bodyCrypto.encrypt(config);
      return config;
    });

    axios.interceptors.request.use(
      function (config) {
        // jwt
        if (Vue.prototype.$meta.config.base.jwt) {
          if (!config.headers) config.headers = {};
          config.headers.Authorization = `Bearer ${Vue.prototype.$meta.util.getJwtAuthorization()}`;
        }
        // scene
        config.headers['x-scene'] = Vue.prototype.$meta.config.scene;
        // clientId
        const clientId = Vue.prototype.$meta.store.state.auth.clientId;
        if (clientId) {
          config.headers['x-clientid'] = clientId;
        }
        // config
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // response
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.code === 401) {
          // login
          if (Vue.prototype.$meta.vueLayout.started) {
            Vue.prototype.$meta.vueLayout.openLogin();
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // custom interceptor
  axios.__ebCustomInterceptorRequest &&
    axios.interceptors.request.use(
      axios.__ebCustomInterceptorRequest.resolve,
      axios.__ebCustomInterceptorRequest.reject
    );
  axios.__ebCustomInterceptorResponse &&
    axios.interceptors.response.use(
      axios.__ebCustomInterceptorResponse.resolve,
      axios.__ebCustomInterceptorResponse.reject
    );

  // beforeCreate
  const beforeCreate = function (ctx) {
    // api
    ctx.$api = {};
    wrapApi(Vue, ctx.$api, axios, ctx);
  };

  return { beforeCreate };
}

function wrapApi(Vue, obj, objBase, vueComponent) {
  ['delete', 'get', 'head', 'options', 'post', 'put', 'patch'].forEach(key => {
    overrideProperty({
      Vue,
      obj,
      key,
      objBase,
      vueComponent,
      combinePath: (moduleInfo, arg) => {
        return Vue.prototype.$meta.util.combineFetchPath(moduleInfo, arg);
      },
    });
  });
}

function overrideProperty({ Vue, obj, key, objBase, vueComponent, combinePath }) {
  Object.defineProperty(obj, key, {
    get() {
      return function () {
        const moduleInfo = vueComponent && vueComponent.$module && vueComponent.$module.info;
        const args = new Array(arguments.length);
        args[0] = combinePath(moduleInfo, arguments[0]);
        for (let i = 1; i < args.length; i++) {
          args[i] = arguments[i];
        }
        const res = checkDebounce({ Vue, key, objBase, args });
        if (res) return res;
        return objBase[key].apply(objBase, args);
      };
    },
  });
}

let __fnDebounce;
let __invokes = [];
function checkDebounce({ Vue, key, /* objBase,*/ args }) {
  // config
  const config = args[args.length - 1];
  if (!config || !config.debounce) return null;
  // fn
  if (!__fnDebounce) {
    __fnDebounce = Vue.prototype.$meta.util.debounce(apiDebounce, Vue.prototype.$meta.config.api.debounce);
  }
  // promise
  return new Promise((resolve, reject) => {
    const callback = function (err, res) {
      if (err) return reject(err);
      return resolve(res);
    };
    // push
    __invokes.push({ key, args, callback });
    __fnDebounce({ Vue });
  });
}

function apiDebounce({ Vue }) {
  // invokes
  const invokes = __invokes;
  __invokes = [];
  // actions
  const actions = invokes.map(item => {
    let url = item.args[0];
    const baseURL = Vue.prototype.$meta.util.getBaseURL();
    if (url.indexOf(baseURL) === 0) {
      url = url.substr(baseURL.length);
    }
    url = url.substr('/api'.length);
    const params = {
      method: item.key,
      url,
    };
    if (item.key === 'post') {
      params.body = item.args[1];
    }
    return params;
  });
  Vue.prototype.$meta.api
    .post('/a/base/util/performActions', { actions })
    .then(data => {
      for (let i = 0; i < invokes.length; i++) {
        const item = data[i];
        let err;
        if (item.err) {
          err = new Error();
          err.code = item.err.code;
          err.message = item.err.message;
        }
        invokes[i].callback(err, item.res);
      }
    })
    .catch(err => {
      // all err
      for (const item of invokes) {
        item.callback(err);
      }
    });
}
