import { BeanTemp } from 'vona-module-a-bean';
import { Bean, cast } from 'vona';
import { BeanCliBase } from 'vona-module-a-cli';

import path from 'path';
import fse from 'fs-extra';
import eggBornUtils from 'egg-born-utils';
import bb from 'bluebird';
import xml2js from 'xml2js';

@BeanTemp({ scene: 'cli.tools' })
export class CliToolsIcons extends BeanCliBase {
  async execute({ user }: any) {
    const { argv } = this.context;
    // super
    await super.execute({ user });
    const moduleNames = argv._;
    const total = moduleNames.length;
    for (let index = 0; index < total; index++) {
      const moduleName = moduleNames[index];
      // log
      await this.console.log({
        progressNo: 0,
        total,
        progress: index,
        text: moduleName,
      });
      // generate
      await this._generateIcons({ moduleName });
    }
  }

  async _generateIcons({ moduleName }: any) {
    const module = this.helper.findModule(moduleName);
    if (!module) throw new Error(`module not found: ${moduleName}`);
    const modulePath = module.root;
    const iconsSrc = path.join(modulePath, 'icons/src');
    // groups
    const groups = await this._resolveGroups({ iconsSrc });
    for (const group of groups) {
      group.iconNames = await this._generateIconsGroup({ modulePath, iconsSrc, group });
    }
    // write to front
    const groupsFrontImport: any[] = [];
    const groupsFrontExport: any[] = [];
    for (const group of groups) {
      groupsFrontImport.push(`import _${group.name} from '../assets/icons/groups/${group.name}.svg';`);
      groupsFrontExport.push(`${group.name}: _${group.name},`);
    }
    const jsFront = `${groupsFrontImport.join('\n')}\n\nexport default {\n  ${groupsFrontExport.join('\n  ')}\n};\n`;
    const pathFront = path.join(modulePath, 'front/src/config');
    const fileFront = path.join(modulePath, 'front/src/config/icons.js');
    await fse.ensureDir(pathFront);
    await fse.writeFile(fileFront, jsFront);
    // write to backend
    const groupsBackend: any[] = [];
    for (const group of groups) {
      groupsBackend.push(`${group.name}: '${group.iconNames.join(',')}',`);
    }
    const jsBackend = `export default {\n  ${groupsBackend.join('\n  ')}\n};\n`;
    const pathBackend = path.join(modulePath, 'backend/src/meta/icons');
    const fileBackend = path.join(modulePath, 'backend/src/meta/icons/groups.js');
    await fse.ensureDir(pathBackend);
    await fse.writeFile(fileBackend, jsBackend);
  }

  async _generateIconsGroup({ modulePath, iconsSrc, group }: any) {
    // icons
    const files = await eggBornUtils.tools.globbyAsync(`${iconsSrc}/${group.name}/*.svg`);
    const iconNames = files.map(item => path.basename(item, '.svg'));
    // symbols
    const symbols: any[] = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const iconName = iconNames[index];
      const symbol = await this._combineSymbol({ file, iconName });
      symbols.push(symbol);
    }
    // xml
    const xml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
${symbols.join('\n')}
</svg>`;
    // write
    const pathDest = path.join(modulePath, 'front/src/assets/icons', 'groups');
    await fse.ensureDir(pathDest);
    const fileDest = path.join(pathDest, `${group.name}.svg`);
    await fse.writeFile(fileDest, xml);
    // ok
    return iconNames;
  }

  async _combineSymbol({ file, iconName }: any) {
    // svg
    const xml = await fse.readFile(file);
    const svg = cast(await this.parseXML({ xml }));
    // patch
    delete svg.defs;
    delete svg.metadata;
    // root
    const domRoot = svg.$;
    const attrs: any = { id: iconName };
    if (domRoot.preserveAspectRatio) attrs.preserveAspectRatio = domRoot.preserveAspectRatio;
    if (domRoot.viewBox) attrs.viewBox = domRoot.viewBox;
    svg.$ = attrs;
    return this.buildXML({ xml: svg, rootName: 'symbol' });
  }

  async _resolveGroups({ iconsSrc }: any) {
    const groupPaths = await eggBornUtils.tools.globbyAsync(`${iconsSrc}/*`, { onlyDirectories: true });
    return groupPaths.map(item => {
      return {
        name: path.basename(item),
      };
    });
  }

  async parseXML({ xml, trim = true, explicitArray = false, explicitRoot = false }: any) {
    const parser = new xml2js.Parser({ trim, explicitArray, explicitRoot });
    return await bb.fromCallback(cb => {
      parser.parseString(xml, cb);
    });
  }

  buildXML({ xml, cdata = true, headless = true, rootName = 'xml' }: any) {
    return new xml2js.Builder({ cdata, headless, rootName }).buildObject(xml);
  }
}
