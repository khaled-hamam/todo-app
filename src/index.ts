import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import UsersController from './controllers/users.controller';
import TodosController from './controllers/todos.controller';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization']
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}.`);
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app';
mongoose.connect(MONGO_URI, err => {
  if (err) {
    throw new Error('Cannot connect to Database');
  }

  console.log('Connected to Database.');
});

// Controllers
new UsersController(app);
new TodosController(app);
