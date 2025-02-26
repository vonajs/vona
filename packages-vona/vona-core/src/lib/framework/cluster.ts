import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';
import cluster from 'node:cluster';
import { createApp } from './createApp.ts';
import { handleProcessMaster, handleProcessWork } from './process.ts';

export async function startCluster(workers: number, bootstrapOptions: BootstrapOptions) {
  if (cluster.isPrimary) {
    handleProcessMaster();

    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < workers; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`, code, signal);
      if (cluster.workers && Object.keys(cluster.workers).length === 0) {
        process.kill(process.pid, 'SIGTERM');
      }
    });
  } else {
    handleProcessWork();
    await createApp(bootstrapOptions);
    console.log(`Worker ${process.pid} started`);
  }
}
