const MongoClient = require('mongodb').MongoClient;

let instance = null;

class _db {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.url = 'mongodb://localhost:27017';
    this.dbName = 'test';
    MongoClient.connect(this.url, { useNewUrlParser: true }, (err, db1) => {
      if (err) {
        console.log('Connect dababase fail!');
        throw err;
      }

      this.client = db1.db(this.dbName);
    });

    this.instance = false;
    return instance;
  }
}

module.exports.db = _db;
