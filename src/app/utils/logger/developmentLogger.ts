import { createLogger, format, transports } from "winston";



export const developmentLogger= createLogger({
    level: "debug",
    format:  format.combine(
        format.colorize(),
        format.timestamp({
            format:"HH:mm:ss"
        }),
        format.printf(({level, message, timestamp})=>{
            return `${timestamp} ${level} ${message}`;
        })
    ),
    transports : [new transports.Console()]
})