import { closeApp } from './useApp.ts';

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
    // todo: log
    // eslint-disable-next-line
    console.log(err);
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
