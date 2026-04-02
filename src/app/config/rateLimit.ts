import rateLimit from "express-rate-limit";


const rateLimiter = rateLimit({
    windowMs: 15 * 16 * 1000, //15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP, please try again after 15 minutes",
    legacyHeaders:false    // Disable X-RateLimit-* headers
});
    
export default rateLimiter;