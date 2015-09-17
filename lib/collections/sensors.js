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

var FlowerPower = Meteor.npmRequire('flower-power');

FlowerPower.discoverAll(function(flowerPower){
    console.log(flowerPower);
});
