import type { IUserBase } from 'vona-module-a-user';
import { combineQueries, replaceTemplate } from '@cabloy/utils';
import { BeanBase, uuidv4 } from 'vona';
import { Service } from 'vona-module-a-bean';
import { $getUserEmail, $getUserName } from 'vona-module-a-user';
import { $apiPath } from 'vona-module-a-web';

@Service()
export class ServiceMail extends BeanBase {
  async emailConfirm(user: IUserBase) {
    const userId = user.id;
    const email = $getUserEmail(user);
    if (!email) throw new Error(`email should not empty: ${$getUserName(user)}`);
    // link
    const token = uuidv4();
    const callbackURLRelative = $apiPath('/mailconfirm/mail/emailConfirmCallback');
    const callbackURL = this.app.util.getAbsoluteUrlByApiPath(callbackURLRelative);
    const link = combineQueries(callbackURL, { token });
    // siteName
    const siteName = this.ctx.instance.title || this.app.meta.env.APP_TITLE;
    // email: subject
    const subject = replaceTemplate(this.scope.locale.ConfirmationEmailSubject(), {
      siteName,
    });
    // email: body
    const body = replaceTemplate(this.scope.locale.ConfirmationEmailBody(), {
      userName: $getUserName(user),
      link,
      siteName,
    });
    // send
    await this.bean.mail.send({ to: email, subject, text: body });
    // save
    await this.scope.cacheRedis.emailConfirm.set({ userId, email }, token);
  }
}
