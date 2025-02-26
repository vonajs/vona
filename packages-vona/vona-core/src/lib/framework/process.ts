import { closeApp } from './useApp.ts';

process.once('SIGUSR2', async () => {
  console.log('------------SIGUSR2');
  await closeApp();
  process.kill(process.pid, 'SIGTERM');
});

process.once('SIGINT', async () => {
  console.log('------------SIGINT');
  await closeApp();
  process.kill(process.pid, 'SIGTERM');
});
