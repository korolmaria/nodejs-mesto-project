import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 150 * 60 * 1000,
  limit: 1000,
});

export default limiter;
