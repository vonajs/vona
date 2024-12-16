const __adapterDefault = (_context, chain) => {
  return {
    receiver: undefined,
    fn: chain,
  };
};

export function compose(chains, adapter) {
  if (!adapter) adapter = __adapterDefault;
  if (!chains) chains = [];
  return function (context, next?) {
    // last called middleware #
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index) return new Error('next() called multiple times');
      index = i;
      let receiver;
      let fn;
      const chain = chains[i];
      if (chain) {
        const obj = adapter(context, chain);
        if (!obj) return dispatch(i + 1);
        receiver = obj.receiver;
        fn = obj.fn;
        if (!fn) return new Error('fn is not defined');
      }
      if (i === chains.length) fn = next;
      if (!fn) return;
      return fn.call(receiver, context, function next() {
        return dispatch(i + 1);
      });
    }
  };
}

export function composeAsync(chains, adapter) {
  if (!adapter) adapter = __adapterDefault;
  if (!chains) chains = [];
  return function (context, next?) {
    // last called middleware #
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let receiver;
      let fn;
      const chain = chains[i];
      if (chain) {
        const obj = adapter(context, chain);
        if (!obj) return dispatch(i + 1);
        receiver = obj.receiver;
        fn = obj.fn;
        if (!fn) return Promise.reject(new Error('fn is not defined'));
      }
      if (i === chains.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        const res = fn.call(receiver, context, function next() {
          return dispatch(i + 1);
        });
        return Promise.resolve(res);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
