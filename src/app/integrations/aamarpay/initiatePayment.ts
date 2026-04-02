import axios from "axios";
import { envVariable } from "../../config";

// 🧾 Type: Payment Payload
export interface PaymentPayload {
  amount: number;
  transactionId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

// 🎯 Type: Expected AamarPay Response
export interface AamarPayResponse {
  payment_url?: string;
  [key: string]: any;
}

// 🔁 Initiate Payment Request to AamarPay
export const initiatePayment = async ({
  amount,
  transactionId,
  name,
  email,
  phone,
  address,
  city,
}: PaymentPayload): Promise<AamarPayResponse> => {
  const payload = {
    store_id: envVariable.AAMARPAY_STORE_ID,
    signature_key: envVariable.AAMARPAY_SIGNATURE_KEY,
    currency: "BDT",
    amount,
    cus_add1: address,
    cus_add2: address,
    cus_city: city,
    cus_country: "Bangladesh",
    tran_id: transactionId,
    success_url: `${envVariable.SUCCESS_URL}?transactionId=${transactionId}`,
    fail_url: `${envVariable.FAIL_URL}?transactionId=${transactionId}`,
    cancel_url: `${envVariable.CANCEL_URL}?transactionId=${transactionId}`,
    cus_name: name,
    cus_email: email,
    cus_phone: phone,
    desc: `Booking for room`,
    type: "json",
  };

  const response = await axios.post("https://sandbox.aamarpay.com/jsonpost.php", payload);

  return response.data;
};
