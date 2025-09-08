const express = require('express');
const mongoose = require('mongoose');
const enrollmentRoutes = require('./routes/enrollment.route');

const app = express();
app.use(express.json());

app.use('/api/enrollments', enrollmentRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/testdb')
  .then(() => {
    console.log(' MongoDB Connected...');
    app.listen(5000, () => console.log(' Server running on http://localhost:5000'));
  })
  .catch(err => console.error(err));
