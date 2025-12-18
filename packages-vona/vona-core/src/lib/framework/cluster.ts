import type { BootstrapOptions } from '../../types/interface/bootstrap.ts';
import cluster from 'node:cluster';
import { createApp, createAppMaster } from './createApp.ts';
import { handleProcessMaster, handleProcessWork } from './process.ts';

export async function startCluster(workers: number, bootstrapOptions: BootstrapOptions) {
  if (cluster.isPrimary) {
    handleProcessMaster();
    createAppMaster(bootstrapOptions);

    // console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < workers; i++) {
      cluster.fork();
    }

    cluster.on('message', (worker, message) => {
      if (message === 'reload-worker') {
        worker.process.kill('SIGTERM');
        cluster.fork();
      }
    });

    cluster.on('exit', (_worker, _code, _signal) => {
      console.log(`----------------- worker ${_worker.process.pid} died`, _code, _signal);
      // should not kill master self by manual
      // master -> worker, rather than worker -> master
      if (cluster.workers && Object.keys(cluster.workers).length === 0) {
        process.exit(0);
      }
    });
  } else {
    handleProcessWork();
    await createApp(bootstrapOptions);
    // console.log(`Worker ${process.pid} started`);
  }
}
