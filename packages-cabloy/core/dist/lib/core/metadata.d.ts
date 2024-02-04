import 'reflect-metadata';
export type MetadataKey = symbol | string;
export declare class AppMetadata {
    defineMetadata<V>(metadataKey: MetadataKey, metadataValue: V, target: object): void;
    getOwnMetadata<V>(metadataKey: MetadataKey, target: object): V | undefined;
    getMetadata<V>(metadataKey: MetadataKey, target: object, prop?: MetadataKey): V | undefined;
    getOwnMetadataArray<Entry>(metadataKey: MetadataKey, target: object): Array<Entry>;
    getOwnMetadataMap<K extends PropertyKey, V>(metadataKey: MetadataKey, target: any): Record<K, V>;
    getDesignType(target: object, prop?: MetadataKey): unknown;
}
export declare const appMetadata: AppMetadata;
//# sourceMappingURL=metadata.d.ts.map