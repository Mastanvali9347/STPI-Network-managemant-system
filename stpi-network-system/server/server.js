require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { port, clientUrls } = require('./config/env');
const networkRoutes = require('./routes/networkRoutes');
const enterpriseRoutes = require('./routes/enterpriseRoutes');
const wifiRoutes = require('./routes/wifiRoutes');
const errorHandler = require('./middleware/errorHandler');
const { initSockets } = require('./sockets/index');

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || clientUrls.includes(origin)) {
      return callback(null, true);
    }
    console.warn(
      `[CORS] Rejected origin: "${origin}".\n` +
      `       Allowed origins: ${clientUrls.length ? clientUrls.join(', ') : '(none — is CLIENT_URL set in env?)'}.\n` +
      `       Set CLIENT_URL on Render to include the Vercel URL.`
    );
    callback(new Error(`CORS origin denied: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

console.log('[CORS] Allowed origins:', clientUrls.length ? clientUrls.join(', ') : 'none');

const io = new Server(server, {
  cors: {
    ...corsOptions,
    methods: ['GET', 'POST'],
  },
});

// Handle preflight OPTIONS requests for all routes (regex used for path-to-regexp v8+ compatibility)
app.options(/.*/, cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    server: 'running',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/network', networkRoutes);
app.use('/api/enterprise', enterpriseRoutes);
app.use('/api/wifi', wifiRoutes);

app.use(errorHandler);

initSockets(io);

const bootstrapWifi = async () => {
  const wifiManagement = require('./services/wifiManagementService');
  try {
    await wifiManagement.seedVault();
    await wifiManagement.tick();
    console.log('[WiFi] Enterprise SSID vault ready');
  } catch (err) {
    console.warn('[WiFi] Vault bootstrap:', err.message);
  }
};

connectDB().then(bootstrapWifi);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `Port ${port} is already in use. Set PORT in server/.env (e.g. 5001). ` +
        'On Windows, PostgreSQL sometimes binds to port 5000.'
    );
  } else {
    console.error('Server failed to start:', err.message);
  }
  process.exit(1);
});

module.exports = { app, server, io };
