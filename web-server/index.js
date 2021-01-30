const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3005, () => console.log('listening at 3005'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const db = new Datastore('./dbs/database.db');
db.loadDatabase();
console.log("Database is loaded, about to insert");
var doc = { hello: 'world'
    , n: 5
    , today: new Date()
    , nedbIsAwesome: true
    , notthere: null
    , notToBeSaved: undefined  // Will not be saved
    , fruits: [ 'apple', 'orange', 'pear' ]
    , infos: { name: 'nedb' }
};

// db.insert(doc, function (err, newDoc) {   // Callback is optional
//     // newDoc is the newly inserted document, including its _id
//     // newDoc has no key called notToBeSaved since its value was undefined
// });
app.get('/api', (request, response) => {
    db.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        console.log("Found");
        response.json(data);
    });
});

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    db.insert(data);
    response.json(data);
});