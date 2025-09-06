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
