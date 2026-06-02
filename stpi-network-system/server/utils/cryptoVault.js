/**
 * AES-256-GCM credential vault — WiFi passwords at rest in MongoDB.
 * Set WIFI_VAULT_KEY in production (32+ char secret).
 */
const crypto = require('crypto');

const ALGO = 'aes-256-gcm';

const deriveKey = () => {
  const secret =
    process.env.WIFI_VAULT_KEY ||
    process.env.JWT_SECRET ||
    'stpi-dev-wifi-vault-key-change-in-production';
  return crypto.createHash('sha256').update(secret).digest();
};

const encrypt = (plaintext) => {
  if (!plaintext) return '';
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, deriveKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (payload) => {
  if (!payload) return null;
  const [ivHex, tagHex, dataHex] = payload.split(':');
  if (!ivHex || !tagHex || !dataHex) return null;
  const decipher = crypto.createDecipheriv(
    ALGO,
    deriveKey(),
    Buffer.from(ivHex, 'hex')
  );
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(dataHex, 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString('utf8');
};

module.exports = { encrypt, decrypt };
