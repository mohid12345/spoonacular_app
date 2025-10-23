import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/recipe_app');

export { connection };
