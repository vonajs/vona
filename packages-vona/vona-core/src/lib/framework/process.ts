import cluster from 'node:cluster';
import { closeApp } from './useApp.ts';

export function handleProcessWork() {
  process.once('SIGUSR2', async () => {
    await closeApp(true);
    console.log('------------SIGUSR2');
  });

  process.once('SIGINT', async () => {
    await closeApp(true);
    console.log('------------SIGINT');
  });
}

export function handleProcessMaster() {
  process.once('SIGUSR2', async () => {
    // for (const id in cluster.workers) {
    // process.kill(cluster.workers[id]!.id, 'SIGTERM');
    // }
    console.log('------------SIGUSR2 master');
  });
}
