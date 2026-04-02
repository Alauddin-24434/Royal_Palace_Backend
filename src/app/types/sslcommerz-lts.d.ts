declare module "sslcommerz-lts" {
  interface SSLCommerzInitResponse {
    status: string;
    sessionkey: string;
    GatewayPageURL: string;
    redirectGatewayURL?: string;
    directPaymentURL?: string;
  }

  export default class SSLCommerzPayment {
    constructor(storeId: string, storePass: string, isLive: boolean);
    init(data: any): Promise<SSLCommerzInitResponse>;
  }
}
