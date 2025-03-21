import type { WebSocket, WebSocketServer } from 'ws';

declare module 'vona' {

  export interface VonaApplication {
    wss: WebSocketServer;
  }

  export interface VonaContext {
    get ws(): WebSocket;
  }
}

declare module 'ws' {
  export interface WebSocket {
    namespace: string;
    id: string;
    isAlive: boolean;
  }
}
