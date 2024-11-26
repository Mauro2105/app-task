const express = require('express');
const cors = require('cors');
const connectDB = require('./src/database/db');
const taskRoutes = require('./src/routes/taskRoutes');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
