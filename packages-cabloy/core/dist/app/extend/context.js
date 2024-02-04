"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const raw_body_1 = __importDefault(require("raw-body"));
const inflation_1 = __importDefault(require("inflation"));
const ModuleInfo = __importStar(require("@cabloy/module-info"));
const metaCtx_js_1 = require("../../lib/core/metaCtx.js");
const dbTransaction_js_1 = __importDefault(require("../../lib/base/dbTransaction.js"));
const cast_js_1 = require("../../types/utils/cast.js");
const MODULE = Symbol.for('Context#__module');
const META = Symbol.for('Context#__meta');
const DATABASE = Symbol.for('Context#__database');
const DATABASEMETA = Symbol.for('Context#__databasemeta');
const INNERACCESS = Symbol.for('Context#__inneraccess');
const SUBDOMAIN = Symbol.for('Context#__subdomain');
const CTXCALLER = Symbol.for('Context#__ctxcaller');
const TAILCALLBACKS = Symbol.for('Context#__tailcallbacks');
const DBLEVEL = Symbol.for('Context#__dblevel');
const context = {
    get module() {
        const self = (0, cast_js_1.Cast)(this);
        if (this[MODULE] === undefined) {
            const url = this.req.mockUrl || this.req.url || '';
            let info;
            if (url.indexOf('/api/static/public/') === 0) {
                info = null;
            }
            else {
                info = ModuleInfo.parseInfo(ModuleInfo.parseName(url));
            }
            if (!info) {
                info = ModuleInfo.parseInfo('a-base');
            }
            if (info) {
                const module = self.app.meta.modules[info.relativeName];
                // should not throw error, because the url maybe not valid
                // if (!module) throw new Error(`module not found: ${info.relativeName}`);
                this[MODULE] = module || null;
            }
            else {
                this[MODULE] = null;
            }
        }
        return this[MODULE];
    },
    get meta() {
        const self = (0, cast_js_1.Cast)(this);
        if (!this[META]) {
            this[META] = self.bean._newBean(metaCtx_js_1.CtxMeta);
        }
        return this[META];
    },
    get db() {
        if (!this[DATABASE]) {
            this[DATABASE] = this.meta.util.createDatabase();
        }
        return this[DATABASE];
    },
    set db(value) {
        this[DATABASE] = value;
    },
    get dbMeta() {
        if (!this[DATABASEMETA]) {
            this[DATABASEMETA] = {
                master: true,
                transaction: new dbTransaction_js_1.default(this),
            };
        }
        return this[DATABASEMETA];
    },
    set dbMeta(metaCaller) {
        // transaction
        if (metaCaller.transaction.inTransaction) {
            this.dbMeta.master = false; // false only on metaCaller.transaction=true
            this.dbMeta.transaction = metaCaller.transaction;
        }
    },
    get transaction() {
        return this.dbMeta.transaction;
    },
    get innerAccess() {
        return this[INNERACCESS];
    },
    set innerAccess(value) {
        this[INNERACCESS] = value;
    },
    get dbLevel() {
        return this[DBLEVEL] || 0;
    },
    set dbLevel(value) {
        this[DBLEVEL] = value;
    },
    get subdomain() {
        return typeof this[SUBDOMAIN] === 'undefined' ? this.subdomains.join('.') : this[SUBDOMAIN];
    },
    set subdomain(value) {
        this[SUBDOMAIN] = value;
    },
    get ctxCaller() {
        return this[CTXCALLER];
    },
    set ctxCaller(value) {
        // ctxCaller
        this[CTXCALLER] = value;
        // innerAccess
        this.innerAccess = true;
        // transaction
        this.dbMeta = value.dbMeta;
        // dbLevel
        this.dbLevel = value.dbLevel;
    },
    get cache() {
        return this.bean.cache;
    },
    tail(cb) {
        if (!this.dbMeta.master) {
            this.ctxCaller.tail(cb);
        }
        else {
            this.tailCallbacks.push(cb);
        }
    },
    async tailDone() {
        while (true) {
            const cb = this.tailCallbacks.shift();
            if (!cb)
                break;
            await cb();
            // try {
            //   await cb();
            // } catch (err) {
            //   this.app.logger.error(err);
            // }
        }
    },
    get tailCallbacks() {
        if (!this[TAILCALLBACKS]) {
            this[TAILCALLBACKS] = [];
        }
        return this[TAILCALLBACKS];
    },
    successMore(list, index, size) {
        this.success({
            list,
            index: index + list.length,
            finished: size === -1 || size === 0 || list.length < size,
        });
    },
    async getPayload(options) {
        return await (0, raw_body_1.default)((0, inflation_1.default)(this.req), options);
    },
};
exports.default = context;
//# sourceMappingURL=context.js.map