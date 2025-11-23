import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import type { DtoPlay } from '../dto/play.ts';
import { BeanBase } from 'vona';
import { Arg, Controller, Web } from 'vona-module-a-web';
import parser from 'yargs-parser';

export interface IControllerOptionsPlay extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPlay>('play')
export class ControllerPlay extends BeanBase {
  @Web.post()
  async index(@Arg.body() play: DtoPlay) {
    const argv = parser(play.args);
    let mainFile: string;
    if (argv._[0]?.endsWith('.ts')) {
      mainFile = argv._[0];
      argv._ = argv._.slice(1);
    } else {
      mainFile = 'index.ts';
    }

    // await playRun(projectPath);
  }

  // async playRun(projectPath: string) {
  // // create
  //   const app = await createGeneralApp(projectPath);
  //   // play
  //   const playFile = path.join(projectPath, `src/backend/play/${mainFile}`);
  //   if (!fse.existsSync(playFile)) {
  //     await fse.outputFile(playFile, __template);
  //   }
  //   // run
  //   const playInstance = await import(pathToHref(playFile));
  //   const res = await playInstance.main(app, argv);
  //   if (res !== undefined) {
  //   // eslint-disable-next-line no-console
  //     console.log(res);
  //   }
  //   // close
  //   await app.close();
  //   // handles
  //   if (process.env.TEST_WHYISNODERUNNING === 'true') {
  //     await sleep(2000);
  //     const handles = (process as any)._getActiveHandles();
  //     if (handles.length > 3) {
  //       whyIsNodeRunning();
  //     }
  //   }
  // }
}
