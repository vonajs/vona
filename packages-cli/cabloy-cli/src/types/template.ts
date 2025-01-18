import { IGlobBeanFile, OnionSceneMeta } from '@cabloy/module-info';
import { BeanCliBase } from '../lib/bean.cli.base.js';
import { ICommandContext } from './argv.js';
import { GoGoAST } from 'gogocode';

export interface IMetadataCustomGenerateOptions {
  cli: BeanCliBase;
  sceneName: string;
  sceneNameCapitalize: string;
  sceneMeta: OnionSceneMeta;
  moduleName: string;
  modulePath: string;
  globFiles: IGlobBeanFile[];
}

export type TypeMetadataCustomGenerate = (options: IMetadataCustomGenerateOptions) => Promise<string>;

export interface IEjsData extends ICommandContext {
  cli: BeanCliBase;
}

export interface IAstData<LANGUAGE extends TypeParseOptionLanguage> extends ICommandContext {
  cli: BeanCliBase;
  ast: LANGUAGE extends 'plain' ? string : LANGUAGE extends 'json' ? object : GoGoAST;
  snippet: ISnippet<LANGUAGE>;
}

export type TypeParseOptionLanguage = 'plain' | 'json' | 'gogo' | '';
export interface IParseOptions<LANGUAGE> {
  language?: LANGUAGE;
}
export interface ISnippet<LANGUAGE extends TypeParseOptionLanguage = ''> {
  file: string | ((ejsData: IEjsData) => string);
  init?: string;
  parseOptions?: IParseOptions<LANGUAGE>;
  transform: (astData: IAstData<LANGUAGE>) => Promise<any>;
}
export function metadataCustomSnippet<LANGUAGE extends TypeParseOptionLanguage>(snippet: ISnippet<LANGUAGE>) {
  return snippet;
}
