import type { IPassportAdapter, IPassportBase } from 'vona-module-a-user';
import type { IPassport, IPayloadData } from '../types/passport.ts';
import type { IUser } from '../types/user.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServicePassportAdapter extends BeanBase implements IPassportAdapter {
  async isAdmin(user: IUser): Promise<boolean> {
    return user.name === 'admin';
  }

  async setCurrent(passport: IPassport | undefined): Promise<IPassport | undefined> {
    return passport;
  }

  async serialize(passport: IPassportBase): Promise<IPayloadData> {
    const userId = passport.user!.id;
    const authId = passport.auth!.id;
    return { userId, authId };
  }

  async deserialize(payloadData: IPayloadData): Promise<IPassportBase | undefined> {
    const user = await this.bean.userInner.get({ id: payloadData.userId });
    if (!user) return;
    const auth = await this.bean.authInner.get({ id: payloadData.authId });
    if (!auth) return;
    return { user, auth };
  }
}
