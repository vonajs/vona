import type { IPassportAdapter, IPassportBase } from 'vona-module-a-user';
import type { IPassport, IPayloadData } from '../types/passport.ts';
import { BeanBase } from 'vona';
import { $getRoleName } from 'vona-module-a-user';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServicePassportAdapter extends BeanBase implements IPassportAdapter {
  async isAdmin(passport: IPassport | undefined): Promise<boolean> {
    if (!passport || !passport.roles) return false;
    return passport.roles.some(item => $getRoleName(item) === 'admin');
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
    const user = await this.bean.userInner.findOne({ id: payloadData.userId });
    if (!user) return;
    const auth = await this.bean.authInner.findOne({ id: payloadData.authId });
    if (!auth) return;
    const roles = await this.bean.roleInner.findAllByUserId(payloadData.userId);
    return { user, auth, roles };
  }
}
