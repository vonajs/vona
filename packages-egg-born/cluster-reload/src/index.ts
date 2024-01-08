// https://github.com/node-modules/cluster-reload

import os from 'os';
import cluster from 'cluster';

// Windows not support SIGQUIT https://nodejs.org/api/process.html#process_signal_events
const KILL_SIGNAL = 'SIGTERM';
let reloading = false;
let reloadPedding = false;
function reload(count) {
  if (reloading) {
    reloadPedding = true;
    return;
  }
  if (!count) {
    count = os.cpus().length;
  }
  reloading = true;
  // find out all alive workers
  const aliveWorkers = [] as any;
  let worker;
  for (const id in cluster.workers) {
    worker = cluster.workers[id];
    if (worker.state === 'disconnected') {
      continue;
    }
    aliveWorkers.push(worker);
  }

  let firstWorker;
  let newWorker;

  function reset() {
    // don't leak
    newWorker.removeListener('listening', reset);
    newWorker.removeListener('error', reset);

    if (firstWorker) {
      // console.log('firstWorker %s %s', firstWorker.id, firstWorker.state);
      firstWorker.kill(KILL_SIGNAL);
      setTimeout(function () {
        firstWorker.process.kill(KILL_SIGNAL);
      }, 100);
    }
    reloading = false;
    if (reloadPedding) {
      // has reload jobs, reload again
      reloadPedding = false;
      reload(count);
    }
  }

  firstWorker = aliveWorkers[0];
  newWorker = cluster.fork();
  newWorker.on('listening', reset).on('exit', reset);

  // kill other workers
  for (let i = 1; i < aliveWorkers.length; i++) {
    worker = aliveWorkers[i];
    // console.log('worker %s %s', worker.id, worker.state);
    worker.kill(KILL_SIGNAL);
  }

  // keep workers number as before
  const left = count - 1;
  for (let j = 0; j < left; j++) {
    cluster.fork();
  }
}

export = reload;
