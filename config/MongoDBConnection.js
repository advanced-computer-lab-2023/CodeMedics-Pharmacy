const mongoose = require('mongoose');
const colors = require('colors');
async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {});
        console.log('MongoDB Connection: ${conn.connection.host}'.bgGreen.bold);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;