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
    addGardenPlant: function(plantId){
        var newId = Meteor.call('createGardenPlant',{plantId: plantId, name: 'No name'});
        if(Meteor.isClient){
            Router.go('gardenPlantDetails', {_id: newId});
        }
    },
    createGardenPlant: function(data){
        var updateDate = new Date(),
            userId = Meteor.userId(),
            plant = Plants.findOne({_id: data.plantId})
            ;

        data.creatorUserId = userId;
        data.createdAt = updateDate;
        data.updaterUserId = userId;
        data.updatedAt = updateDate;
        data.watcher = [];

        if(typeof plant === 'object'){
            data.waterDate = new Date().addDays(plant.waterInterval);
            data.sprayDate = new Date().addDays(plant.sprayInterval);
            data.fertilizeDate = new Date().addDays(plant.fertilizeInterval);
        }

        return GardenPlants.insert(data);
    },
    deleteGardenPlant: function(plantId){
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        GardenPlants.remove({_id: plantId});
    },
    addGardenPlantWatcher: function(gardenPlantId, userId){
        GardenPlants.update({_id: gardenPlantId}, {$push: {'watcher': userId}});
    },
    removeGardenPlantWatcher: function(gardenPlantId, userId){
        GardenPlants.update({_id: gardenPlantId}, {$pull: {'watcher': userId}});
    }
});