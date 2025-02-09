import 'dotenv/config';

const configs = {
  DB_PORT: process.env.MONGO_PORT || 27017,
  DB_HOST: process.env.MONGO_HOST || 'mongodb://localhost',
  DB: process.env.MONGO_DB || 'mestodb',
  PORT: process.env.PORT || 3000,
};

export default configs;
