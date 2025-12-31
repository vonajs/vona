export interface IErrorRenderOptions {
  returnHtml?: boolean;
}

declare module 'vona' {
  export interface VonaApplication {
    onerrorGeneral: (err: Error) => Promise<void>;
  }
}
