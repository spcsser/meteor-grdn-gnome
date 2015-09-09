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

GardenPlant = {};
GardenPlant.isActionRequired = function(plant, actionName){
    console.log(plant, actionName);
        var result = false;
        if(plant) {
            if (plant.actions) {
                if (plant.actions[actionName]) {
                    if (plant.actions[actionName].required) {
                        result = plant.actions[actionName].required;
                        console.log(result);
                    }
                }
            }
        }
        return result;
};
GardenPlant.isActionUpcoming = function(plant, actionName, eventDayRange){
    console.log(plant, actionName, eventDayRange);
        var result = false;
        if(plant) {
            if (plant.actions) {
                if (plant.actions[actionName]) {
                    if (plant.actions[actionName].nextDate) {
                        var days = Date.dateDiff('d', new Date(), plant.actions[actionName].nextDate);
                        console.log(days);
                        result = eventDayRange > days;
                    }
                }
            }
        }
        return result;
};

GardenPlant.actionCssMapping = function(actionName){
    var mapping={
        'water' : 'tint',
        'spray' : 'cloud',
        'fertilize' : 'eyedropper'
    };
    return mapping[actionName];
};