import { closeApp, useApp } from './useApp.ts';

export function handleProcessWork() {
  process.once('SIGUSR2', async () => {
    // console.log('------------SIGUSR2');
    await closeApp(true);
  });
  process.once('SIGINT', async () => {
    // console.log('------------SIGINT');
    await closeApp(true);
  });
  process.on('uncaughtException', err => {
    const app = useApp();
    if (!app) {
      console.error(err);
    } else {
      const logger = app.bean.logger.get('default');
      logger.error(err);
    }
  });
}

export function handleProcessMaster() {
  process.once('SIGUSR2', () => {
    // should not kill master self by manual
    // process.kill(process.pid, 'SIGTERM');
  });
  // should not kill master self by manual
  // process.once('SIGINT', () => {
  //   process.kill(process.pid, 'SIGTERM');
  // });
}
