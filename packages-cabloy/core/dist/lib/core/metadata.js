"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appMetadata = exports.AppMetadata = void 0;
require("reflect-metadata");
class AppMetadata {
    defineMetadata(metadataKey, metadataValue, target) {
        Reflect.defineMetadata(metadataKey, metadataValue, target);
    }
    getOwnMetadata(metadataKey, target) {
        return Reflect.getOwnMetadata(metadataKey, target);
    }
    getMetadata(metadataKey, target, prop) {
        if (prop) {
            return Reflect.getMetadata(metadataKey, target, prop);
        }
        return Reflect.getMetadata(metadataKey, target);
    }
    getOwnMetadataArray(metadataKey, target) {
        let own = this.getOwnMetadata(metadataKey, target);
        if (!own) {
            const parent = this.getMetadata(metadataKey, target);
            if (parent) {
                own = parent.slice();
            }
            else {
                own = [];
            }
            this.defineMetadata(metadataKey, own, target);
        }
        return own;
    }
    getOwnMetadataMap(metadataKey, target) {
        let own = this.getOwnMetadata(metadataKey, target);
        if (!own) {
            const parent = this.getMetadata(metadataKey, target);
            if (parent) {
                own = Object.assign({}, parent);
            }
            else {
                own = {};
            }
            this.defineMetadata(metadataKey, own, target);
        }
        return own;
    }
    getDesignType(target, prop) {
        return this.getMetadata('design:type', target, prop);
    }
}
exports.AppMetadata = AppMetadata;
exports.appMetadata = new AppMetadata();
//# sourceMappingURL=metadata.js.map