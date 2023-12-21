const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const authRoutes = require('./Routes/authRoutes');
//const jobRoutes = require('./Routes/job');

const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

//app.use('/api/job', jobRoutes);
app.get('/health', (req, res) => {
    res.json({
        serverName: 'Job List Server',
        currentTime: new Date().toLocaleTimeString(),
        state: 'active'
    })
});

app.use("/", async (req, res) => {
    res.status(200).json("Server is up and Running")
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() =>  console.log(`Server running on http://localhost:${process.env.PORT}`))
      .catch((error) => console.log(error))
});

