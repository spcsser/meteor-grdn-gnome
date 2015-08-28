Meteor.methods({
    waterGardenPlant: function(gardenPlantId){
        Meteor.call('insertGardenPlantEvent', 'water', gardenPlantId);
        Meteor.call('updateActionDate', gardenPlantId, 'waterDate', 'waterInterval');
    },
    fertilizeGardenPlant: function(gardenPlantId){
        Meteor.call('insertGardenPlantEvent', 'fertilize', gardenPlantId);
        Meteor.call('updateActionDate', gardenPlantId, 'fertilizeDate', 'fertilizeInterval');
    },
    sprayGardenPlant: function(gardenPlantId){
        Meteor.call('insertGardenPlantEvent', 'spray', gardenPlantId);
        Meteor.call('updateActionDate', gardenPlantId, 'sprayDate', 'sprayInterval');
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
    updateActionDate: function(gardenPlantId, updateField, intervalField){
        var gardenPlant = GardenPlants.findOne({_id: gardenPlantId});
        var plant = Plants.findOne({_id: gardenPlant.plantId});
        var data = {};
        data[updateField] = new Date().addDays(plant[intervalField]);
        GardenPlants.update(
            {_id: gardenPlantId},
            {$set: data}
        );
    }
});