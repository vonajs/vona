import type { WebSocket } from 'ws';

declare module 'vona' {

  export interface VonaContext {
    get ws(): WebSocket;
  }
}

declare module 'ws' {
  export interface WebSocket {
    id: string;
  }
}
