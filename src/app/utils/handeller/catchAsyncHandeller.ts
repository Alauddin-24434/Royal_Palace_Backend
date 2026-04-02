import { NextFunction, Request, RequestHandler, Response } from "express"



export const catchAsyncHandeller= (fn:RequestHandler)=>{
    return (req:Request, res:Response,next:NextFunction)=>{
        Promise.resolve(fn(req, res, next)).catch(next);
    }
} 