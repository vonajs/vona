import type { Address } from 'nodemailer/lib/mailer/index.js';
import type { IMailClientRecord, IMailOptions } from '../types/config.ts';
import nodemailer from 'nodemailer';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanMail extends BeanBase {
  async send(mail: IMailOptions, clientName?: keyof IMailClientRecord) {
    await this.scope.model.mail.insert({
      clientName,
      from: __parseFrom(mail.from),
      to: __parseTo(mail.to),
      subject: mail.subject,
      message: mail,
    });
  }
}

function __parseFrom(address: string | Address | undefined): string | undefined {
  if (!address) return address;
  if (typeof address === 'object') return address.address;
  return address;
}

function __parseTo(address: string | Address | Array<string | Address> | undefined): string | undefined {
  if (!address) return address;
  if (!Array.isArray(address)) return __parseFrom(address);
  return address.map(item => __parseFrom(item)).join(',');
}
