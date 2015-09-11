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

GardenPlant = {
    eventDayRange : {
        default: 2,
        home: 1
    }
};
GardenPlant.isActionRequired = function(plant, actionName){
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
GardenPlant.isActionUpcoming = function(plant, actionName, eventDayRange){
        var result = false;
    if(typeof eventDayRange === 'undefined'){
        eventDayRange = GardenPlant.eventDayRange.default;
    }
        if(plant) {
            if (plant.actions) {
                if (plant.actions[actionName]) {
                    if (plant.actions[actionName].nextDate) {
                        var days = Date.dateDiff('d', new Date(), plant.actions[actionName].nextDate);
                        result = eventDayRange >= days;
                    }
                }
            }
        }
        return result;
};
GardenPlant.isRequiredActionUpcoming = function(plant, actionName, eventDayRange){
    var result = false;
    if(typeof eventDayRange === 'undefined'){
        eventDayRange = GardenPlant.eventDayRange.default;
    }
    if(plant) {
        if (plant.hasOwnProperty('actions')) {
            if (plant.actions.hasOwnProperty(actionName)) {
                if (
                    plant.actions[actionName].required
                    && plant.actions[actionName].hasOwnProperty('nextDate')
                ) {
                    var days = Date.dateDiff('d', new Date(), plant.actions[actionName].nextDate);
                    result = eventDayRange >= days;
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

GardenPlant.isUserWatching = function(plant, userId){
    return _.contains(plant.watcher, userId);
};

GardenPlant.amIWatching = function(plant){
    return GardenPlant.isUserWatching(plant, Meteor.userId());
};

GardenPlant.amINotWatching = function(plant){
    return !GardenPlant.amIWatching(plant);
};