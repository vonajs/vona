import type { IMailClientRecord, IMailOptions } from '../types/config.ts';
import nodemailer from 'nodemailer';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanMail extends BeanBase {
  async send(mail: IMailOptions, clientName?: keyof IMailClientRecord) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'maddison53@ethereal.email',
        pass: 'jn7jnAPss4f63QBp6D',
      },
    });
    transporter.sendMail();
  }
}
