const connectDB = require('./MongoDBConnection');
const MyModel = require('../models/Patient'); //just change the model name to delete all records from that model

async function deleteAllRecords() {
    try {
        await connectDB();

        const result = await MyModel.deleteMany({});
        console.log(`${result.deletedCount} documents deleted.`);
    } catch (error) {
        console.error('Error:', error);
    }
}
module.exports = {deleteAllRecords};