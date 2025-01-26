import { BeanBase, Next } from 'vona';
import { IDecoratorMiddlewareSystemOptions, IMiddlewareSystemExecute, MiddlewareSystem } from 'vona-module-a-aspect';

export interface IMiddlewareSystemOptionsSecurities extends IDecoratorMiddlewareSystemOptions {
  domainWhiteList: string[];
  protocolWhiteList: string[];
  defaultMiddleware: string | string[];
  csrf: {
    match?: any;
    ignore?: any;
    enable: boolean;
    type: 'ctoken' | 'referer' | 'all' | 'any';
    ignoreJSON: boolean;
    cookieName: string | string[];
    sessionName: string;
    headerName: string;
    bodyName: string | string[];
    queryName: string | string[];
    rotateWhenInvalid: boolean;
    useSession: boolean;
    cookieDomain?: string | Function;
    supportedRequests: any;
    refererWhiteList: string[];
    cookieOptions: {
      signed: boolean;
      httpOnly: boolean;
      overwrite: boolean;
    };
  };
  xframe: {
    match?: any;
    ignore?: any;
    enable: boolean;
    value: string;
  };
  hsts: {
    match?: any;
    ignore?: any;
    enable: boolean;
    maxAge: number;
    includeSubdomains: boolean;
  };
  methodnoallow: {
    match?: any;
    ignore?: any;
    enable: boolean;
  };
  noopen: {
    match?: any;
    ignore?: any;
    enable: boolean;
  };
  nosniff: {
    match?: any;
    ignore?: any;
    enable: boolean;
  };
  xssProtection: {
    match?: any;
    ignore?: any;
    enable: boolean;
    value: string;
  };
  csp: {
    match?: any;
    ignore?: any;
    enable: boolean;
    policy: any;
    reportOnly?: boolean;
    supportIE?: boolean;
  };
  referrerPolicy: {
    match?: any;
    ignore?: any;
    enable: boolean;
    value: string;
  };
  dta: {
    match?: any;
    ignore?: any;
    enable: boolean;
  };
  ssrf: {
    ipBlackList?: string[];
    ipExceptionList?: string[];
    hostnameExceptionList?: string[];
    checkAddress?: any;
  };
}

@MiddlewareSystem<IMiddlewareSystemOptionsSecurities>({
  dependencies: 'a-security:cors',
  domainWhiteList: [],
  protocolWhiteList: [],
  defaultMiddleware: 'csrf,hsts,methodnoallow,noopen,nosniff,csp,xssProtection,xframe,dta',
  csrf: {
    enable: false,
    type: 'ctoken',
    ignoreJSON: false,
    cookieName: 'csrfToken',
    sessionName: 'csrfToken',
    headerName: 'x-csrf-token',
    bodyName: '_csrf',
    queryName: '_csrf',
    rotateWhenInvalid: false,
    useSession: false,
    cookieDomain: undefined,
    supportedRequests: [{ path: /^\//, methods: ['POST', 'PATCH', 'DELETE', 'PUT', 'CONNECT'] }],
    refererWhiteList: [],
    cookieOptions: {
      signed: false,
      httpOnly: false,
      overwrite: true,
    },
  },
  xframe: {
    enable: true,
    value: 'SAMEORIGIN',
  },
  hsts: {
    enable: true,
    maxAge: 365 * 24 * 3600,
    includeSubdomains: false,
  },
  methodnoallow: {
    enable: true,
  },
  noopen: {
    enable: true,
  },
  nosniff: {
    enable: true,
  },
  xssProtection: {
    enable: true,
    value: '1; mode=block',
  },
  csp: {
    enable: true,
    policy: {},
    reportOnly: undefined,
    supportIE: undefined,
  },
  referrerPolicy: {
    enable: true,
    value: 'no-referrer-when-downgrade',
  },
  dta: {
    enable: true,
  },
  ssrf: {
    ipBlackList: undefined,
    ipExceptionList: undefined,
    hostnameExceptionList: undefined,
    checkAddress: undefined,
  },
})
export class MiddlewareSystemSecurities extends BeanBase implements IMiddlewareSystemExecute {
  async execute(_options: IMiddlewareSystemOptionsSecurities, next: Next) {
    // next
    return next();
  }
}
