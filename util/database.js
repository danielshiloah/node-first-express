const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoPw = process.env.TESTING_MONGODBPW;

const mongoConnect = (callback) => {
    MongoClient.connect(`mongodb+srv://Daniel_shiloah:${mongoPw}@cluster0.86kjd.mongodb.net/shop?retryWrites=true&w=majority`, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err)
        throw err;
    });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
