GardenPlantEvents = new Mongo.Collection('garden-plant-events');

GardenPlantEvents.allow({
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
    waterGardenPlant: function(gardenPlantId){
        Meteor.call('insertGardenPlantEvent', 'water', gardenPlantId);
    },
    fertilizeGardenPlant: function(gardenPlantId){
        Meteor.call('insertGardenPlantEvent', 'fertilize', gardenPlantId);
    },
    sprayGardenPlant: function(gardenPlantId){
        Meteor.call('insertGardenPlantEvent', 'spray', gardenPlantId);
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
    }
});