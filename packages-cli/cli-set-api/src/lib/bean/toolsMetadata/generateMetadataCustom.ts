import type { BeanCliBase } from '@cabloy/cli';
import type { IMetadataCustomGenerateOptions } from '@cabloy/cli';
import type { OnionSceneMeta } from '@cabloy/module-info';
import path from 'node:path';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { globBeanFiles } from './utils.ts';

export async function generateMetadataCustom(
  cli: BeanCliBase,
  sceneName: string,
  sceneMeta: OnionSceneMeta,
  moduleName: string,
  modulePath: string,
) {
  const sceneNameCapitalize = toUpperCaseFirstChar(sceneName);
  const globFiles = await globBeanFiles(sceneName, sceneMeta, moduleName, modulePath);
  if (globFiles.length === 0) return '';
  // custom
  const jsFile = path.join(sceneMeta.module!.root, sceneMeta.metadataCustom!);
  return await cli.helper.importDynamic(jsFile, async instance => {
    const options: IMetadataCustomGenerateOptions = {
      cli,
      sceneName,
      sceneNameCapitalize,
      sceneMeta,
      moduleName,
      modulePath,
      globFiles,
    };
    return await instance.default(options);
  });
}
