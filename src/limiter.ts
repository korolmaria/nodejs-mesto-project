import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.LIMIT_REQUEST || 100),
});

export default limiter;
