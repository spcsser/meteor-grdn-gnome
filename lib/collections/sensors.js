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