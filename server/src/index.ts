import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connection } from './config/database';
import { UserRouter } from './routes/userRoutes';
import { RecipeRoutes } from './routes/recipeRoutes';

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
// app.use(cors({
//   origin: ['https://artsofkerala.shop', 'http://artsofkerala.shop', 'http://40.192.50.51', 'https://40.192.50.51', 
//     'http://localhost:5173/', 'http://127.0.0.1:5173'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use('/user', UserRouter);
app.use('/recipe', RecipeRoutes);

app.get('/', (req, res) => {
  res.send('welcome to my server');
});

app.listen(port, async () => {
  try {
    await connection;
    console.log('database is connected');
    console.log(`server is running at http://localhost:${port}`);
  } catch (error) {
    console.error('Database connection error:', error);
  }
});
