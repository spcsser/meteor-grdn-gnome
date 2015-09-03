Template.upcomingEvents.helpers({
    'upcomingEventsByName': function(actionName, interval){

        actionName = typeof actionName === 'string' ? actionName : '?';
        interval = typeof interval === 'Number' ? interval : 30 ;

        var today = new Date().addDays(interval);
        var query = {};

        actionName = 'actions.' + actionName + '.nextDate';
        query[actionName] = {$elemMatch: {$lte: today}};
        return GardenPlants.find(query);
    }
});