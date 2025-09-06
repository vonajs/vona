import type { TransportOptions } from 'nodemailer';
import type SMTPConnection from 'nodemailer/lib/smtp-connection/index.js';
import type SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

export interface IMailClientRecord {
  default: never;
  system: never;
}

export interface IMailTransport extends SMTPTransport.MailOptions, TransportOptions, SMTPConnection.Options {}
export interface IMailOptions extends SMTPTransport.MailOptions {}

export interface ConfigMailClient {
  transport: IMailTransport;
  defaults?: IMailOptions;
}

export interface ConfigMail {
  defaultClient: keyof IMailClientRecord;
  clients: Record<keyof IMailClientRecord, ConfigMailClient>;
}
