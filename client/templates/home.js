Template.upcomingEvents.helpers({
    'upcomingEventsByName': function(actionName, interval){

        actionName = typeof actionName === 'string' ? actionName : '?';
        interval = typeof interval === 'Number' ? interval : 30 ;

        var today = new Date().addDays(interval);
        var query = {};

        actionName = 'actions.' + actionName + '.nextDate';
        query[actionName] = {$elemMatch: {$lte: today}};
        var result = GardenPlants.find(query);
        return result;
    }
});

Template.upcomingGardenPlantEvent.helpers({
    isActionRequired: function(){
        var result = false;
        if(this.plant) {
            if (this.plant.actions) {
                if (this.plant.actions[this.actionName]) {
                    if (this.plant.actions[this.actionName].required) {
                        result = this.plant.actions[this.actionName].required;
                    }
                }
            }
        }
        return result;
    },
    isActionUpcoming: function(){
        var result = false;
        if(this.plant) {
            if (this.plant.actions) {
                if (this.plant.actions[this.actionName]) {
                    if (this.plant.actions[this.actionName].nextDate) {
                        var days = Date.dateDiff('d', new Date(), this.plant.actions[this.actionName].nextDate);
                        result = this.eventDayRange > days;
                        console.log(result, this.eventDayRange, days);
                    }
                }
            }
        }
        return result;
    }
});