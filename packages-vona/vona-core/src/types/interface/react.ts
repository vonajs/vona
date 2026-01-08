import 'react';

declare module 'react' {
  // eslint-disable-next-line
  interface HTMLAttributes<T> {
    name?: string;
    value?: string;
  }
}
