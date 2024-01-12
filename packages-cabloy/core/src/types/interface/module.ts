import { IModuleParseInfo } from '@cabloy/module-parse';

export interface IAppModulePackage {
  name: string;
  version: string;
  eggBornModule: {
    fileVersion: number;
    dependencies: Record<string, string>;
  };
  description: string;
  author: string;
  dependencies: string;
}
// todo:
export interface IAppModuleMain {
  beans: Record<string, any>;
  aops: Record<string, any>;
}

export interface IAppModule {
  name: string;
  info: IModuleParseInfo;
  root: string;
  pkg: string;
  package: IAppModulePackage;
  main: IAppModuleMain;
}

export interface IAppSuite {
  name: string;
  info: IModuleParseInfo;
  root: string;
  pkg: string;
  package: IAppModulePackage;
}
