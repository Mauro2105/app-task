const mongoose = require('mongoose');
require('dotenv');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('MongoDB Connected...');
    } catch (e) {
        console.error('Error connecting to MongoDB', e)
    }
};

module.exports = connectDB;