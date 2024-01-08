import cluster from 'cluster';
import reload from './reload.js';

export default function (this: any) {
  this.log('[master] reload workers...');
  for (const id in cluster.workers) {
    const worker: any = cluster.workers[id];
    worker.isDevReload = true;
  }
  reload(this, this.options.workers);
}
