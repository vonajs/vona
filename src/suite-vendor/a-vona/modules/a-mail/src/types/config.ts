import type SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

export interface IMailClientRecord {
  system: never;
}

export interface IMailTransport extends SMTPTransport.Options {}
export interface IMailOptions extends SMTPTransport.MailOptions, Partial<SMTPTransport.Options> {}

export interface ConfigMailClient {
  transport: IMailTransport;
  defaults?: IMailOptions;
}

export interface ConfigMail {
  defaultClient: keyof IMailClientRecord;
  clients: Record<keyof IMailClientRecord, ConfigMailClient>;
}

declare module 'vona' {
  export interface VonaConfigEnv {
    // default
    MAIL_DEFAULT_CLIENT: string | undefined;
    // system
    MAIL_SYSTEM_TRANSPORT_SERVICE: string | undefined;
    MAIL_SYSTEM_TRANSPORT_HOST: string | undefined;
    MAIL_SYSTEM_TRANSPORT_PORT: string | undefined;
    MAIL_SYSTEM_TRANSPORT_SECURE: string | undefined;
    MAIL_SYSTEM_TRANSPORT_AUTH_USER: string | undefined;
    MAIL_SYSTEM_TRANSPORT_AUTH_PASS: string | undefined;
    MAIL_SYSTEM_DEFAULTS_FROM: string | undefined;
  }
}
