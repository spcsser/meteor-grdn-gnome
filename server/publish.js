Meteor.publish('plants', function() {
    return Plants.find();
});

Meteor.publish('plantDetails', function(plantId) {
    return Plants.find({_id: plantId});
});

Meteor.publish('gardenPlants', function(){
   return GardenPlants.find();
});

Meteor.publish('gardenPlantDetails', function(gardenPlantId){
   return GardenPlants.find({_id: gardenPlantId});
});

Meteor.publish('plantSelectList', function(){
    return Plants.find({}, {name: 1});
});

Meteor.publish('gardenPlantEvents', function(gardenPlantId){
    return GardenPlantEvents.find({gardenPlantId: gardenPlantId});
});

Meteor.publish('userData', function(){
   return Meteor.users.find({}, {name: 1, email: 1})
});