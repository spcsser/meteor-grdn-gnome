GardenPlants = new Mongo.Collection('garden-plants');

GardenPlants.allow({
    insert: function(userId){
        var user = Meteor.users.findOne(userId);
        return user != null;
    },
    update: function(userId){
        var user = Meteor.users.findOne(userId);
        return user != null;
    }
});

Meteor.methods({
    'addGardenPlant': function(plantId){
        var newId = GardenPlants.insert({plantId: plantId, name: 'No name'});
        if(Meteor.isClient){
            Router.go('gardenPlantDetails', {_id: newId});
        }
    }
});