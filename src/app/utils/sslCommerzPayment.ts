import SSLCommerzPayment from "sslcommerz-lts";
import { AppError } from "../error/appError";
import { IBooking } from "../interfaces/booking.interfcae";

export const sslcommerzPaymentInit = async (booking: IBooking) => {

  const paymentData = {
    total_amount: booking.totalAmount, 
    currency: "BDT",
    tran_id: booking.transactionId,

    success_url: `${process.env.BASE_URL}/api/v1/payments/success?tran_id=${booking.transactionId}`,
    fail_url: `${process.env.BASE_URL}/api/v1/payments/fail`,
    cancel_url: `${process.env.BASE_URL}/api/v1/payments/cancel`,
    ipn_url: `${process.env.BASE_URL}/api/v1/payments/ipn`,

    product_name: "Hotel Room Booking",
    product_category: "Hotel",
    product_profile: "travel-vertical",

    hotel_name: "Royal Palace",
    length_of_stay: `${booking.nights} nights`,
    check_in_time: "12:00 PM",
    hotel_city: booking.city,

    cus_name: booking.name,
    cus_email: booking.email,
    cus_phone: booking.phone,
    cus_city: booking.city,
    cus_country: "Bangladesh",

    shipping_method: "NO",

    value_a: booking._id,
    value_b: booking.userId,
  };
  // console.log("2nd hit")

  const sslcz = new SSLCommerzPayment(
    process.env.SSL_STORE_ID!,
    process.env.SSL_STORE_PASS!,
    false,
  );
  const response = (await sslcz.init(paymentData)) as {
    status: string;
    GatewayPageURL?: string;
    failedreason?: string;
  };

  console.log(response);

  if (response.status === "FAILED") {
    throw new AppError(
      response.failedreason ?? "Payment initialization failed",
      500,
    );
  } else if (!response) {
    throw new AppError("Payment initialization failed", 500);
  } else {
    return {
      paymentUrl: response.GatewayPageURL,
    };
  }
};
