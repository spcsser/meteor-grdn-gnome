Meteor.methods({
    'updateSensorData': function(sensorId, data){
        data.createDate = new Date();
        data.sensorId = sensorId;
        SensorDatasets.insert(data);
    }
});