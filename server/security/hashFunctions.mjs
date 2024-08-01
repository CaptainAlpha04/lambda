import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

// Encryption and Decryption functions
const algorithm = 'aes-256-ctr';
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Ensure the key is a Buffer

// Encrypts the text
const encrypt = (text) => {
    const iv = crypto.randomBytes(16); // Generate a 16-byte IV
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

// Decrypts the hash
const decrypt = (hash) => {
    const [iv, encrypted] = hash.split(':');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);
    return decrypted.toString();
};

// Export the functions
export const hashChats = async (chat) => {
    return encrypt(chat);
}

export const unHashChats = async (hash) => {
    return decrypt(hash);
}
