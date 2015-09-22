var FlowerPower = Meteor.npmRequire('flower-power');

FP = {};
FP.connectSensorByUuid = Meteor.bindEnvironment(function(uuid){
    FlowerPower.discoverById(uuid, FP.discoveredSensorCallback);
});
FP.discoveredSensorCallback = Meteor.bindEnvironment(function(flowerPower){
    var sensorItem = Sensors.findOne({uuid: flowerPower.uuid});
    if(sensorItem == null){
        sensorItem = {
            id: flowerPower.id,
            uuid: flowerPower.uuid,
            name: flowerPower.name,
            data: []
        };
        Sensors.insert(sensorItem);
        SyncedCron.add({
            data: {id: sensorItem.id, uuid: sensorItem.uuid},
            name: 'Sensor read for ' + sensorItem.uuid,
            schedule: function(parser){
                return parser.text('every 1 hours');
            },
            job: function(){
                FP.connectSensorByUuid(this.data.uuid);
            }
        });
    }
    flowerPower.connectAndSetup(Meteor.bindEnvironment(function(error){
        if(error){
            console.log('Error on connect', error);
            return;
        }
        flowerPower.readAirTemperature(Meteor.bindEnvironment(function(err, data){
            Meteor.call('updateSensorData', sensorItem._id, {name: 'airTemperature', type: 'temperature', data: data});
        }));
        flowerPower.readSoilTemperature(Meteor.bindEnvironment(function(err, data){
            Meteor.call('updateSensorData', sensorItem._id, {name: 'soilTemperature', type: 'temperature', data: data});
        }));
        flowerPower.readSoilMoisture(Meteor.bindEnvironment(function(err, data){
            Meteor.call('updateSensorData', sensorItem._id, {name: 'soilMoisture', type: 'humidity', data: data});
        }));
        flowerPower.readSunlight(Meteor.bindEnvironment(function(err, data){
            Meteor.call('updateSensorData', sensorItem._id, {name: 'sunlight', type: 'light', data: data});
        }));
        flowerPower.readSoilElectricalConductivity(Meteor.bindEnvironment(function(err, data){
            Meteor.call('updateSensorData', sensorItem._id, {name: 'soilConductivity', type: 'conductivity', data: data});
        }));
    }));
});


FlowerPower.discoverAll(FP.discoveredSensorCallback);