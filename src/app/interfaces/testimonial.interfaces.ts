import { Types } from "mongoose";

export interface ITestimonial{
    userId:Types.ObjectId;
    userName: string
    userImage: string
    roomId: string
    rating: number
    reviewText: string
    reviewDate: string

}