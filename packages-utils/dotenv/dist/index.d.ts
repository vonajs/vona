import type { DotenvParseOutput } from 'dotenv';
export declare function loadEnvs(meta: object, dir: string, prefix?: string, postfix?: string): DotenvParseOutput | undefined;
export declare function metaToScope(meta: object): {};
export declare function getEnvFiles(meta: object, dir: string, prefix: string, postfix?: string): string[] | undefined;
