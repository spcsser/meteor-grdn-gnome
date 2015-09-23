Meteor.methods({
    'updateSensorData': function(sensorId, data){
        data.createDate = new Date();
        data.sensorId = sensorId;
        SensorDatasets.insert(data);

        var updateData = {data: {}};
        updateData[data.name] = {
            name: data.name,
            createDate: data.createDate,
            value: data.value
        };
        Sensors.update({_id: sensorId},{$set: updateData});
    }
});