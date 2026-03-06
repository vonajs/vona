import type { IUser } from 'vona-module-a-user';
import type { IPaypalOrderCreateOptions, IPaypalOrderCreatePayload } from '../types/paypal.ts';
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

  async createOrder(payload: IPaypalOrderCreatePayload, options: IPaypalOrderCreateOptions, _user: IUser) {
    // create order
    const ordersController = new OrdersController(this.createClient());
    const res = await ordersController.createOrder({
      body: {
        intent: CheckoutPaymentIntent.Capture,
        applicationContext: {
          brandName: options.brandName,
          returnUrl: options.returnUrl,
          cancelUrl: options.cancelUrl,
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
    // const prepayId = res.result.id;
    // const approveUrl = res.result.links?.find(item => item.rel === 'approve')?.href;
  }
}
