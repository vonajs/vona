import { catchErrorSync } from '@cabloy/utils';
import { closeApp, useApp } from './useApp.ts';

let __sigintHandled = false;

export function handleProcessWork() {
  process.on('SIGINT', async () => {
    if (__sigintHandled) return;
    __sigintHandled = true;
    // console.log('------------SIGINT');
    await closeApp(true);
  });
  process.once('SIGUSR2', async () => {
    // console.log('------------SIGUSR2');
    await closeApp(true);
  });
  process.on('uncaughtException', async err => {
    const app = useApp();
    if (!app) {
      console.error(err);
      process.kill(process.pid, 'SIGTERM');
    } else {
      const [logger] = catchErrorSync(() => {
        return app.meta.logger.get();
      });
      if (logger) {
        logger.error(err);
      } else {
        console.error(err);
      }
      if (!app.meta.appStarted) {
        await app.meta.logger.dispose();
        process.kill(process.pid, 'SIGTERM');
      }
    }
  });
}

export function handleProcessMaster() {
  process.on('SIGINT', () => {
    // donothing
  });
  process.once('SIGUSR2', () => {
    // should not kill master self by manual
    // process.kill(process.pid, 'SIGTERM');
  });
  // should not kill master self by manual
  // process.once('SIGINT', () => {
  //   process.kill(process.pid, 'SIGTERM');
  // });
}
