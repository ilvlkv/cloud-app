const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
const fileRouter = require('./routers/fileRouter');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use('/auth', authRouter);
app.use('/files', fileRouter);

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test_database');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
