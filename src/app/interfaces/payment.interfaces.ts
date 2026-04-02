import {  Types } from "mongoose";
// interfaces/payment.interface.ts
export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}


export interface IPayment  {
  userId: Types.ObjectId; 
  bookingId: Types.ObjectId;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}




export interface GetPaymentsOptions {
  page?: number;
  limit?: number;
  status?: string;       
  searchTerm?: string;   
}
