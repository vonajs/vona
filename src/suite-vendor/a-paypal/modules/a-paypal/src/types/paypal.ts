export interface IPaypalOrderCreatePayload {
  remark: string;
  total: string;
  currencyCode: string;
}

export interface IPaypalOrderCreateOptions {
  brandName: string;
  returnUrl: string;
  cancelUrl: string;
}
