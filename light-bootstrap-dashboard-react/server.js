const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');

const app = express();
const port = process.env.PORT || 5000;

const db = new Datastore('./dbs/database.db');
db.loadDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/get', (req, res) => {
    db.find({}, (err, data) => {
        if (err) {
            res.end();
            return;
        }
        console.log("Found");
        res.send({ express: data });
    });
});

app.post('/api/push', (req, res) => {
    console.log(req.body);
    db.insert(res);
    res.send(
        `I received your POST request. This is what you sent me: ${res}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));