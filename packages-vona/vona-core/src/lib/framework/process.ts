import { catchError, catchErrorSync } from '@cabloy/utils';
import { closeApp, useApp } from './useApp.ts';

let __sigintHandled = false;

async function _closeAppInner() {
  const timeout = setTimeout(() => {
    // eslint-disable-next-line no-console
    console.log('Cleanup timed out. Forcing termination...');
    process.exit(1);
  }, 5000);
  const [_, err] = await catchError(() => {
    return closeApp();
  });
  if (err) {
    console.error(err);
  }
  clearTimeout(timeout);
  process.exit(err ? 1 : 0);
}

export function handleProcessWork() {
  process.on('SIGINT', async () => {
    if (__sigintHandled) return;
    __sigintHandled = true;
    // console.log('------------SIGINT');
    await _closeAppInner();
  });
  process.on('SIGUSR2', async () => {
    // console.log('------------SIGUSR2');
    await _closeAppInner();
  });
  process.on('uncaughtException', async err => {
    const app = useApp();
    if (!app) {
      console.error(err);
      process.exit(1);
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
        process.exit(1);
      }
    }
  });
}

export function handleProcessMaster() {
  process.on('SIGINT', () => {
    // donothing
  });
  process.on('SIGUSR2', () => {
    // donothing
  });
}
