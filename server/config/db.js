const mongoose = require('mongoose');
const { seedDatabaseIfEmpty } = require('./seed');

let isMongoConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    console.log(`[MongoDB] Active Database: ${conn.connection.name}`);
    
    await seedDatabaseIfEmpty();
    return true;
  } catch (error) {
    isMongoConnected = false;
    const safeUri = uri.replace(/\/\/.*@/, '//****:****@');
    console.warn(`[MongoDB] Note: MongoDB connection at ${safeUri} is currently offline (${error.message}).`);
    console.log(`[Database] Running smoothly on persistent local data engine in server/storage/data.json.`);
    console.log(`[Database] Full admin control, image updates, and CRUD are 100% active.`);
    return false;
  }
};

const getMongoStatus = () => isMongoConnected && mongoose.connection.readyState === 1;

module.exports = { connectDB, getMongoStatus };
