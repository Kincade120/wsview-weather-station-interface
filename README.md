# wsview weather station data ingester

A nodejs service to accept data from a ws weather station.

## Usage

The application is enclosed in a dockerfile for easy deployment and exposes port 1509. You will need to configure the weather station to send data to this service.

![alt text](https://i.imgur.com/jSPNBxq.jpg)

The service writes data into an Influx DB that is running locally on my network and passes it onto a RaspberryPi that displays the data. You can change that to write data to any location you wish to use.

```bash
$ docker build -t wsview:interface .
$ docker run wsview:interface
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

