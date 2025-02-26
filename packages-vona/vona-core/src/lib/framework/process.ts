import { closeApp } from './useApp.ts';

export function handleProcess() {
  process.once('SIGUSR2', async () => {
    await closeApp(true);
    console.log('------------SIGUSR2');
  });

  process.once('SIGINT', async () => {
    await closeApp(true);
    console.log('------------SIGINT');
  });
}
