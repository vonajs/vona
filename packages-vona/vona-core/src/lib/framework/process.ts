import { closeApp } from './useApp.ts';

export function handleProcessWork() {
  process.once('SIGUSR2', async () => {
    console.log('------------SIGUSR2');
    await closeApp(true);
  });
  process.once('SIGINT', async () => {
    console.log('------------SIGINT');
    await closeApp(true);
  });
}

export function handleProcessMaster() {
  process.once('SIGUSR2', () => {
    // should not kill master self by manual
    // process.kill(process.pid, 'SIGTERM');
  });
  process.once('SIGINT', () => {
    process.kill(process.pid, 'SIGTERM');
  });
}
