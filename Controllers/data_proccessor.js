
const uuidv4 = require('uuid/v4');
const axios = require('axios')
var Memcached = require('memcached');
var memcached = new Memcached('192.168.1.220:11211');



async function writeData(body, res, influx) {
  const passKey = body.PASSKEY;
  delete body.PASSKEY;
  body.uuid = uuidv4();
  body.tempinc = fToC(parseFloat(body.tempinf))
  body.tempc = fToC(parseFloat(body.tempf))
  body.baromabsin = parseFloat(body.baromabsin)
  body.baromrelin = parseFloat(body.baromrelin)
  body.dailyrainin = parseFloat(body.dailyrainin)
  body.eventrainin = parseFloat(body.eventrainin)
  body.hourlyrainin = parseFloat(body.hourlyrainin)
  body.humidity = parseFloat(body.humidity)
  body.humidityin = parseFloat(body.humidityin)
  body.maxdailygust = parseFloat(body.maxdailygust)
  body.monthlyrainin = parseFloat(body.monthlyrainin)
  body.rainratein = parseFloat(body.rainratein)
  body.solarradiation = parseFloat(body.solarradiation)
  body.tempf = parseFloat(body.tempf)
  body.tempinf = parseFloat(body.tempinf)
  body.totalrainin = parseFloat(body.totalrainin)
  body.uv = parseFloat(body.uv)
  body.weeklyrainin = parseFloat(body.weeklyrainin)
  body.wh25batt = parseFloat(body.wh25batt)
  body.wh65batt = parseFloat(body.wh65batt)
  body.winddir = parseFloat(body.winddir)
  body.windgustmph = parseFloat(body.windgustmph)
  body.windspeedmph = parseFloat(body.windspeedmph)
  body.yearlyrainin = parseFloat(body.yearlyrainin)

  const fields = {
    uuid: body.uuid,
    baromabsin: body.baromabsin,
    baromrelin: body.baromrelin,
    dailyrainin: body.dailyrainin,
    dateutc: body.dateutc,
    eventrainin: body.eventrainin,
    freq: body.freq,
    hourlyrainin: body.hourlyrainin,
    humidity: body.humidity,
    humidityin: body.humidityin,
    maxdailygust: body.maxdailygust,
    model: body.model,
    monthlyrainin: body.monthlyrainin,
    rainratein: body.rainratein,
    solarradiation: body.solarradiation,
    stationtype: body.stationtype,
    tempf: body.tempf,
    tempinc: body.tempinc,
    tempc: body.tempc,
    tempinf: body.tempinf,
    totalrainin: body.totalrainin,
    uv: body.uv,
    weeklyrainin: body.weeklyrainin,
    wh25batt: body.wh25batt,
    wh65batt: body.wh65batt,
    winddir: body.winddir,
    windgustmph: body.windgustmph,
    windspeedmph: body.windspeedmph,
    yearlyrainin: body.yearlyrainin
  };

  await influx.writePoints([
    {
      measurement: 'weather',
      tags: { PASSKEY: passKey },
      fields: fields
    }
  ]).then(() => {

    axios.post('http://192.168.1.59:5000/weather', fields)
      .then((res) => {
        console.log(`Sent`)
      })
      .catch((error) => {
        console.error(error)
      })
    console.log("Written - " + body.uuid);
  }).catch(err => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  })
}

function fToC(fahrenheit) {
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  return fToCel;
}

module.exports = {
  writeData
}