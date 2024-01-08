const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const authRoutes = require('./Routes/authRoutes');
const jobRoute = require('./Routes/jobRoutes');

const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoute);

app.get('/health', (req, res) => {
    res.json({
        serverName: 'Job List Server',
        currentTime: new Date().toLocaleTimeString(),
        state: 'active'
    })
});

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
})
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

app.use("/", async (req, res) => {
    res.status(200).json("Server is up and Running")
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

