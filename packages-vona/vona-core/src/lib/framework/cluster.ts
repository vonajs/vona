import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';
import cluster from 'node:cluster';
import { createApp, createAppMaster } from './createApp.ts';
import { handleProcessMaster, handleProcessWork } from './process.ts';

export async function startCluster(workers: number, bootstrapOptions: BootstrapOptions) {
  if (cluster.isPrimary) {
    handleProcessMaster();
    createAppMaster(bootstrapOptions);

    for (let i = 0; i < workers; i++) {
      cluster.fork();
    }

    cluster.on('message', (worker, message) => {
      if (message === 'reload-worker') {
        cluster.fork();
        worker.process.kill('SIGTERM');
      }
    });

    cluster.on('exit', (_worker, _code, _signal) => {
      // console.log(`----------------- worker ${_worker.process.pid} died`, _code, _signal);
      if (cluster.workers && Object.keys(cluster.workers).length === 0) {
        process.exit(0);
      }
    });
  } else {
    handleProcessWork();
    await createApp(bootstrapOptions);
  }
}
