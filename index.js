

/* global require, process */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//////////////////////////////////////////////////////////////
//                        MODULES                           //
//////////////////////////////////////////////////////////////
const config = require('./config'),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser');
;

const dataController = require("./Controllers/data_proccessor");


//////////////////////////////////////////////////////////////
//                      INITIALISE                          //
//////////////////////////////////////////////////////////////

const Influx = require('influx');

const influx = new Influx.InfluxDB({
    host: '172.17.0.7',
    database: 'wsdata',
    schema: [
      {
        measurement: 'weather',
        fields: {
            uuid: Influx.FieldType.STRING,
            baromabsin: Influx.FieldType.FLOAT,
            baromrelin: Influx.FieldType.FLOAT,
            dailyrainin: Influx.FieldType.FLOAT,
            dateutc: Influx.FieldType.STRING,
            eventrainin: Influx.FieldType.FLOAT,
            freq: Influx.FieldType.STRING,
            hourlyrainin: Influx.FieldType.FLOAT,
            humidity: Influx.FieldType.FLOAT,
            humidityin: Influx.FieldType.FLOAT,
            maxdailygust: Influx.FieldType.FLOAT,
            model: Influx.FieldType.STRING,
            monthlyrainin: Influx.FieldType.FLOAT,
            rainratein: Influx.FieldType.FLOAT,
            solarradiation: Influx.FieldType.FLOAT,
            stationtype: Influx.FieldType.STRING,
            tempf: Influx.FieldType.FLOAT,
            tempinf: Influx.FieldType.FLOAT,
            tempinc: Influx.FieldType.FLOAT,
            tempc: Influx.FieldType.FLOAT,
            totalrainin: Influx.FieldType.FLOAT,
            uv: Influx.FieldType.FLOAT,
            weeklyrainin: Influx.FieldType.FLOAT,
            wh25batt: Influx.FieldType.FLOAT,
            wh65batt: Influx.FieldType.FLOAT,
            winddir: Influx.FieldType.FLOAT,
            windgustmph: Influx.FieldType.FLOAT,
            windspeedmph: Influx.FieldType.FLOAT,
            yearlyrainin: Influx.FieldType.FLOAT
        },
        tags: [
            'PASSKEY'
        ]
      }
    ]
})

influx.createDatabase('wsdata');

var app = express();
var server = http.createServer(app);

server.listen(config[ process.env.NODE_ENV ].port);
console.log("listening on port " + config[ process.env.NODE_ENV ].port);

//////////////////////////////////////////////////////////////
//                   EXPRESS CONFIG                         //
//////////////////////////////////////////////////////////////
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});


//////////////////////////////////////////////////////////////
//                       Routes                             //
//////////////////////////////////////////////////////////////


app.post("/data/report/", (req, res) => dataController.writeData(req.body,res, influx));











