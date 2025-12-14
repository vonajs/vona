var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
import path from 'node:path';
import { sleep } from '@cabloy/utils';
import fse from 'fs-extra';
import { createGeneralApp, pathToHref } from 'vona-core';
import whyIsNodeRunning from 'why-is-node-running';
import parser from 'yargs-parser';
const __template = `import type { IArgv, VonaApplication } from 'vona';

export async function main(app: VonaApplication, _argv: IArgv) {
  console.log(import.meta.filename);
  console.log(app.config.meta);
  return 'Hello VonaJS';
}
`;
const projectPath = process.argv[2];
const argv = parser(process.argv.slice(3));
let mainFile;
if (argv._[0]?.endsWith('.ts')) {
    mainFile = argv._[0];
    argv._ = argv._.slice(1);
}
else {
    mainFile = 'index.ts';
}
await playRun(projectPath);
async function playRun(projectPath) {
    // create
    const app = await createGeneralApp(projectPath);
    // play
    const playFile = path.join(projectPath, `src/backend/play/${mainFile}`);
    if (!fse.existsSync(playFile)) {
        await fse.outputFile(playFile, __template);
    }
    // run
    const playInstance = await import(__rewriteRelativeImportExtension(pathToHref(playFile)));
    const res = await playInstance.main(app, argv);
    if (res !== undefined) {
        // eslint-disable-next-line no-console
        console.log(res);
    }
    // close
    await app.close();
    // handles
    if (process.env.TEST_WHYISNODERUNNING === 'true') {
        await sleep(2000);
        const handles = process._getActiveHandles();
        if (handles.length > 3) {
            whyIsNodeRunning();
        }
    }
}
