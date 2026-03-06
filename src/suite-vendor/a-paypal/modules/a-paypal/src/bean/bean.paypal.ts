import type { IUser } from 'vona-module-a-user';
import type { IPaypalOrderCreateOptions, IPaypalOrderCreatePayload } from '../types/paypal.ts';
import { combineQueries } from '@cabloy/utils';
import { Client, OrdersController } from '@paypal/paypal-server-sdk';
import { CheckoutPaymentIntent, Environment, LogLevel, OrderStatus } from '@paypal/paypal-server-sdk';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanPaypal extends BeanBase {
  createClient() {
    return new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: this.scope.config.client.clientId,
        oAuthClientSecret: this.scope.config.client.clientSecret,
      },
      timeout: 0,
      environment: this.app.meta.isLocal ? Environment.Sandbox : Environment.Production,
      logging: this.scope.config.client.logging
        ? {
            logLevel: LogLevel.Info,
            logRequest: {
              logBody: true,
            },
            logResponse: {
              logHeaders: true,
            },
          }
        : undefined,
    });
  }

  async createOrder(payload: IPaypalOrderCreatePayload, options: IPaypalOrderCreateOptions, user: IUser) {
    // create record
    const record = await this.scope.model.paypalRecord.insert({
      userId: user.id,
      status: 0,
      prepayId: undefined,
      payload,
      options,
    });
    const recordId = record.id;
    // url
    const returnUrl = combineQueries(options.returnUrl, { recordId });
    const cancelUrl = combineQueries(options.cancelUrl, { recordId });
    // create order
    const ordersController = new OrdersController(this.createClient());
    const res = await ordersController.createOrder({
      body: {
        intent: CheckoutPaymentIntent.Capture,
        applicationContext: {
          brandName: options.brandName,
          returnUrl,
          cancelUrl,
        },
        purchaseUnits: [{
          description: payload.remark,
          amount: {
            currencyCode: payload.currencyCode,
            value: payload.total,
          },
        }],
      },
    });
    if (!res.result || res.result.status !== OrderStatus.Created) {
      this.scope.error.TransactionException.throw();
    }
    // prepayId
    const prepayId = res.result.id;
    const approveUrl = res.result.links?.find(item => item.rel === 'approve')?.href;
    // save prepayId
    await this.scope.model.paypalRecord.update({
      id: recordId,
      prepayId,
    });
    // ok
    return { approveUrl };
  }
}
