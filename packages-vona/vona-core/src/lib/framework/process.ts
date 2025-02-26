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
    // for (const id in cluster.workers) {
    //   cluster.workers[id]?.process.kill('SIGTERM');
    // }
    // console.log('------------SIGUSR2 master');
  });
  process.once('SIGINT', () => {
    // console.log('------------SIGINT master');
  });
}
