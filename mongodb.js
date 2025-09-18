require('dotenv').config();
//-------------------------------------------------------------------------------------------------------------//
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `${process.env.MONGODB_KEY}`;
//-5c115ae2bc1f34461ccc6bcd5986ab19b934658f------------------------------------------------------------------------------------------------------------//
const mdClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
//-------------------------------------------------------------------------------------------------------------/
(async () => {
    let flag = false;
    await mdClient.connect().then(() => { console.log("Connected to Database") }).catch(err => { console.log(err) });
    const db = mdClient.db('MyBotDataDB');
    const collection = await db.collections();
    collection.forEach(ele => {
        if (ele.namespace == "MyBotDataDB.AuthTable") {
            flag = true;
        }
    });
    if (flag == false) {
        await db.createCollection("AuthTable");
    }
})();
//-------------------------------------------------------------------------------------------------------------//

module.exports = mdClient;
