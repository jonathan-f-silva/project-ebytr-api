import mongoose from 'mongoose';

const MONGO_HOST = process.env.DB_HOST || 'localhost';
const MONGO_DB_URL = `mongodb://${MONGO_HOST}:27017/Ebytr`;

const connectToDatabase = (mongoDatabaseURI = MONGO_DB_URL) =>
  mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
