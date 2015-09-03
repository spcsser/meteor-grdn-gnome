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
        data.garden = null;
        data.actions = {
            water: {
                action: 'water',
                nextDate: null,
                required: false
            },
            spray: {
                action: 'spray',
                nextDate: null,
                required: false
            },
            fertilize: {
                action: 'fertilize',
                nextDate: null,
                required: false
            }
        };

        if(typeof plant === 'object'){
            if(plant.waterInterval > 0){
                data.actions.water.nextDate = new Date().addDays(plant.waterInterval);
                data.actions.water.required = true;
            }

            if(plant.sprayInterval > 0){
                data.actions.spray.nextDate = new Date().addDays(plant.sprayInterval);
                data.actions.spray.required = true;
            }
            if(plant.fertilizeInterval > 0){
                data.actions.fertilize.nextDate = new Date().addDays(plant.fertilizeInterval);
                data.actions.fertilize.required = true;
            }
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
        GardenPlants.update({_id: gardenPlantId}, {$push: {watcher: userId}});
    },
    removeGardenPlantWatcher: function(gardenPlantId, userId){
        GardenPlants.update({_id: gardenPlantId}, {$pull: {watcher: userId}});
    },
    updateGardenPlant: function(gardenPlantId, fieldName, value){
        var updateDate = new Date(),
            data = {};
        data[fieldName] = value;
        data.updaterUserId = Meteor.userId();
        data.updatedAt = updateDate;
        GardenPlants.update(gardenPlantId, {$set: data});
    }
});