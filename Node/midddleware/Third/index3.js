// rate limit

const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

// create rate limiter

const limiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

app.use(limiter)


app.get("/", (req, res) => {
  res.send("Hi I am a home page!");
});
app.listen(3000, () => {
  console.log("server is running on port 3999");
});
