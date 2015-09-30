SensorDatasets = new Mongo.Collection('sensor-datasets');

SensorDatasets.allow({
    insert: function(){
        return true;
    }
});