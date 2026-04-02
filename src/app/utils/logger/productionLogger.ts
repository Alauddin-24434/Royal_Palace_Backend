import  { createLogger, format, transports,  } from "winston";

export const productionLogger = createLogger({
  level: "info",
  format: format.combine(
   
    format.timestamp({
        format:"HH:mm:ss"
    }),
     format.printf(({level, message, timestamp})=>{
            return `${timestamp} ${level} ${message}`;
        })
  ),
  
  transports: [new transports.Console()],
});
