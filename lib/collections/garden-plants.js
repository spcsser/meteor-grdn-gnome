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

GardenPlant = {}
GardenPlant.isActionRequired= function(plant, actionName){
        var result = false;
        if(plant) {
            if (plant.actions) {
                if (plant.actions[actionName]) {
                    if (plant.actions[actionName].required) {
                        result = plant.actions[actionName].required;
                    }
                }
            }
        }
        return result;
};
GardenPlant.isActionUpcoming= function(plant, actionName, eventDayRange){
        var result = false;
        if(plant) {
            if (plant.actions) {
                if (plant.actions[actionName]) {
                    if (plant.actions[actionName].nextDate) {
                        var days = Date.dateDiff('d', new Date(), plant.actions[actionName].nextDate);
                        result = eventDayRange > days;
                    }
                }
            }
        }
        return result;
};