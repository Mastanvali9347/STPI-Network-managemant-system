require('dotenv').config();

const normalizeOrigins = (value) => {
  if (!value) {
    return process.env.NODE_ENV === 'development'
      ? ['http://localhost:5173']
      : [];
  }

  return Array.from(
    new Set(
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((urlOrOrigin) => {
          const normalized = urlOrOrigin.replace(/\/*$/, '');
          try {
            const url = new URL(normalized);
            return url.origin;
          } catch {
            try {
              const url = new URL(`http://${normalized}`);
              return url.origin;
            } catch {
              return normalized;
            }
          }
        })
    )
  );
};

module.exports = {
  port: process.env.PORT || 5001,
  mongoUri:
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/stpi_network',
  jwtSecret: process.env.JWT_SECRET || 'stpi_dev_secret_change_in_production',
  clientUrls: normalizeOrigins(process.env.CLIENT_URL || process.env.CLIENT_URLS),
  nodeEnv: process.env.NODE_ENV || 'development',
};
