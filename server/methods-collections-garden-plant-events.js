Meteor.methods({
    waterGardenPlant: function(gardenPlantId){
        var actionName = 'water';
        Meteor.call('insertGardenPlantEvent', actionName, gardenPlantId);
        Meteor.call('updateActionDate', gardenPlantId, actionName);
    },
    fertilizeGardenPlant: function(gardenPlantId){
        var actionName = 'fertilize';
        Meteor.call('insertGardenPlantEvent', actionName, gardenPlantId);
        Meteor.call('updateActionDate', gardenPlantId, actionName);
    },
    sprayGardenPlant: function(gardenPlantId){
        var actionName = 'spray';
        Meteor.call('insertGardenPlantEvent', actionName, gardenPlantId);
        Meteor.call('updateActionDate', gardenPlantId, actionName);
    },
    insertGardenPlantEvent: function(eventType, gardenPlantId){
        var updateDate = new Date(),
            data = {
                event: eventType,
                gardenPlantId: gardenPlantId,
                creatorUserId: Meteor.userId(),
                createdAt: updateDate
            };

        return GardenPlantEvents.insert(data);
    },
    updateActionDate: function(gardenPlantId, actionName){
        var intervalField = actionName + 'Interval';
        var gardenPlant = GardenPlants.findOne({_id: gardenPlantId});
        var plant = Plants.findOne({_id: gardenPlant.plantId});
        var data = {};
        data['actions.' + actionName] = {
            action: actionName,
            nextDate: new Date().addDays(plant[intervalField])
        };
        GardenPlants.update(
            gardenPlantId,
            {$set: data}
        );
    }
});