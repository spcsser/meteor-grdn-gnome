Sensors = new Mongo.Collection('sensors');

Sensors.allow({
    insert: function(){
        return true;
    },
    update: function(userId){
        var user = Meteor.users.findOne(userId);
        return user != null;
    }
});

Sensor = {};
Sensor.formatTemperature = function(value){
    return value.toFixed(1) + '°C';
};
Sensor.formatDateTime = function(value){
    var returnValue = '';
    if(value instanceof Date){
        returnValue = value.toLocaleString();
    }
    return returnValue;
};