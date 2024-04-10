const rateLimit = require("express-rate-limit");
const TooManyRequest = require("../errorConstructors/TooManyRequest");

// Define the rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
});

module.exports.limiter = (req, res, next) => {
  limiter(req, res, (err) => {
    if (err.name === "TooManyRequests") {
      next(
        new TooManyRequest(
          "Your exceeded the request limit, please try again later"
        )
      );
    } else {
      next();
    }
  });
};
