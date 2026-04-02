import axios from "axios";
import { envVariable } from "../../config";

// 🔍 Verify Payment using AamarPay API
export const verifyPayment = async (transactionId: string) => {
  try {
    const verificationUrl = `https://sandbox.aamarpay.com/api/v1/trxcheck/request.php`;

    const response = await axios.get(verificationUrl, {
      params: {
        store_id: envVariable.AAMARPAY_STORE_ID,
        signature_key: envVariable.AAMARPAY_SIGNATURE_KEY,
        request_id: transactionId,
        type: "json",
      },
    });

    const { pay_status, amount, status_title, payment_type } = response.data;

    return { pay_status, amount, status_title, payment_type };
  } catch (error: any) {
    return {
      status: "error",
      message: "Verification failed",
      error: error.message || error,
    };
  }
};
