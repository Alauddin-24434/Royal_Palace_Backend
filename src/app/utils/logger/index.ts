import { envVariable } from "../../config";
import { developmentLogger } from "./developmentLogger";
import { productionLogger } from "./productionLogger";




export const logger= envVariable.NODE_ENV === "production" ?  productionLogger : developmentLogger;