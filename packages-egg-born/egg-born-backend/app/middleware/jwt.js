const koajwt = require('koa-jwt2');
const jsonwebtoken = require('jsonwebtoken');
const utility = require('utility');

function __checkIfJWT(ctx) {
  return !ctx.ctxCaller && (!!ctx.get('authorization') || ctx.query.hasOwnProperty('eb-jwt'));
}

function __getToken(ctx) {
  // only valid for the top ctx
  if (ctx.ctxCaller) return null;
  // 1. check header
  let token;
  if (ctx.get('authorization')) {
    const parts = ctx.get('authorization').split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    }
  }
  if (token) return token;

  // 2. check query
  token = ctx.query['eb-jwt'];
  if (token) return token;

  // not found
  return null;
}

function __splitCookie(cookie) {
  const pos = cookie.indexOf('=');
  const name = cookie.substr(0, pos);
  const value = cookie.substr(pos + 1);
  return { name, value };
}

function __parseCookiesRequest(str) {
  const cookies = {};
  const cookiesArray = (str || '')
    .split(';')
    .map(cookie => cookie.trim())
    .filter(cookie => !!cookie);
  for (const cookie of cookiesArray) {
    const { name, value } = __splitCookie(cookie);
    cookies[name] = value;
  }
  return cookies;
}

function __parseCookiesResponse(cookiesArray) {
  const cookies = {};
  for (const cookie of cookiesArray) {
    const { name, value } = __splitCookie(cookie.split(';')[0]);
    cookies[name] = value;
  }
  return cookies;
}

function __combineCookies(cookies) {
  const cookiesArray = [];
  for (const name in cookies) {
    cookiesArray.push(`${name}=${cookies[name]}`);
  }
  return cookiesArray.join('; ');
}

function __combineJwtToken(app, options, token, key) {
  const payload = {
    token,
    exp: Date.now() + app.config.jwt.oauth[key].maxAge,
  };
  return jsonwebtoken.sign(payload, options.secret);
}

function __combineJwtTokens(app, options, token) {
  app.config.jwt;
  // accessToken
  const accessToken = __combineJwtToken(app, options, token, 'accessToken');
  // refreshToken
  const refreshToken = __combineJwtToken(app, options, token, 'refreshToken');
  return {
    accessToken,
    expireTime: Date.now() + app.config.jwt.oauth.accessToken.maxAge,
    refreshToken,
  };
}

function __checkIfRefreshToken(app, jwt) {
  return !jwt.exp || jwt.exp - Date.now() > app.config.jwt.oauth.accessToken.maxAge;
}

module.exports = (options, app) => {
  options.secret = options.secret || app.config.keys.split(',')[0];
  options.getToken = __getToken;
  const _koajwt = koajwt(options);
  async function _handleNext(ctx, next) {
    // cookies
    let cookiesRequest;
    let isRefreshToken;
    const useJwt = __checkIfJWT(ctx);
    // set cookie
    if (useJwt) {
      // clear cookie CABLOY_SESS forcely
      cookiesRequest = __parseCookiesRequest(ctx.request.headers.cookie);
      delete cookiesRequest.CABLOY_SESS;
      if (ctx.state.jwt) {
        // check exp
        const isValid = !ctx.state.jwt.exp || ctx.state.jwt.exp > Date.now();
        if (isValid) {
          isRefreshToken = __checkIfRefreshToken(app, ctx.state.jwt);
          // token
          const token = ctx.state.jwt.token;
          const res = ctx.cookies.keys.decrypt(utility.base64decode(token, true, 'buffer'));
          let cookiesJwt = res ? res.value.toString() : undefined;
          if (cookiesJwt) {
            cookiesJwt = __parseCookiesRequest(cookiesJwt);
            cookiesRequest = Object.assign({}, cookiesJwt, cookiesRequest);
          }
        }
      }
      // set cookie
      ctx.request.headers.cookie = __combineCookies(cookiesRequest);
    }
    // next
    await next();
    // check cookie
    if (useJwt && ctx.response.type === 'application/json' && (isRefreshToken || ctx.response.get('set-cookie'))) {
      // parse
      const cookiesNew = __parseCookiesResponse(ctx.response.get('set-cookie'));
      // assign
      Object.assign(cookiesRequest, cookiesNew);
      // combine
      const cookiesRes = __combineCookies(cookiesRequest);
      // jwt
      const token = utility.base64encode(ctx.cookies.keys.encrypt(cookiesRes), true);
      const oauth = __combineJwtTokens(app, options, token);
      if (!ctx.response.body) ctx.response.body = {};
      ctx.response.body['eb-jwt-oauth'] = oauth;
      // clear response header
      ctx.res.removeHeader('set-cookie');
    }
  }
  return async function jwt(ctx, next) {
    let error;
    try {
      await _koajwt(ctx, async () => {
        try {
          await _handleNext(ctx, next);
        } catch (err) {
          error = err;
        }
      });
    } catch (err) {
      // next to get anonymous token
      await next();
    }
    if (error) throw error;
  };
};
