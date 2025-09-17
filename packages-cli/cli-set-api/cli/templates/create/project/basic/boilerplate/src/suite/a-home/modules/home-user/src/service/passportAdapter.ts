import type { IPassportAdapter, IPassportBase } from 'vona-module-a-user';
import type { IPayloadData } from '../types/passport.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServicePassportAdapter extends BeanBase implements IPassportAdapter {
  async isAdmin(passport: IPassportBase | undefined): Promise<boolean> {
    if (!passport || !passport.roles) return false;
    return passport.roles.some(item => item.name === 'admin');
  }

  async setCurrent(passport: IPassportBase | undefined): Promise<IPassportBase | undefined> {
    return passport;
  }

  async serialize(passport: IPassportBase): Promise<IPayloadData> {
    const userId = passport.user!.id;
    const authId = passport.auth!.id;
    return { userId, authId };
  }

  async deserialize(payloadData: IPayloadData): Promise<IPassportBase | undefined> {
    const user = await this.bean.user.findOne({ id: payloadData.userId });
    if (!user) return;
    const auth = await this.bean.auth.findOne({ id: payloadData.authId });
    if (!auth) return;
    const roles = await this.bean.role.findAllByUserId(payloadData.userId);
    return { user, auth, roles };
  }
}
