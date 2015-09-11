Router.configure({
    layoutTemplate: 'appBody',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Router.onBeforeAction('loading');

dataReadyHold = null;

if (Meteor.isClient) {
    // Keep showing the launch screen on mobile devices until we have loaded
    // the app's data
    //dataReadyHold = LaunchScreen.hold();
}

Router.map(function(){
    this.route('/', {
        name: 'home',
        path: '/',
        waitOn: function(){
            return Meteor.subscribe('gardenPlants');
        },
        data: function(){
            var eventDayRange = GardenPlant.eventDayRange.home;
            var targetDate = new Date().addDays(eventDayRange);
            return {
                eventDayRange: eventDayRange,
                upcomingEvents: function() {
                    return GardenPlants.find({
                            $or: [
                                {$and: [{'actions.water.nextDate': {$lt: targetDate}}, {'actions.water.required': true}]},
                                {$and: [{'actions.spray.nextDate': {$lt: targetDate}}, {'actions.spray.required': true}]},
                                {$and: [{'actions.fertilize.nextDate': {$lt: targetDate}}, {'actions.fertilize.required': true}]}
                            ]
                    });
                },
                unattendedPlants: function() {
                    return GardenPlants.find(
                        {
                            $or: [
                                    {watcher: {$size: 0}},
                                    {watcher: {$exists: false}}
                            ]
                        }
                    );
                }
            };
        }
    });
    this.route('/plants', {
        name: 'plants',
        path: '/plants',
        waitOn: function(){
            return Meteor.subscribe('plants');
        },
        data: function(){
            return { plants: Plants.find() };
        }
    });
    this.route('/plant-details/:_id', {
        name: 'plantDetails',
        path: '/plant-details/:_id',
        notFoundTemplate: 'plantNotFound',
        waitOn: function(){
            return Meteor.subscribe('plantDetails', this.params._id);
        },
        data: function() {
            return Plants.findOne({_id: this.params._id});
        }
    });
    this.route('/garden-plants', {
        name: 'gardenPlants',
        path: '/garden-plants',
        waitOn: function(){
            return [
                Meteor.subscribe('gardenPlants'),
                Meteor.subscribe('plants')
            ];
        },
        data: function(){
            return {
                gardenPlants: GardenPlants.find(),
                plants: Plants.find()
            };
        }
    });
    this.route('/garden-plant-details/:_id', {
        name: 'gardenPlantDetails',
        path: '/garden-plant-details/:_id',
        notFoundTemplate: 'plantNotFound',
        waitOn: function(){
            var gardenPlantId = this.params._id;
            return [
                Meteor.subscribe('gardenPlantDetails', gardenPlantId),
                Meteor.subscribe('plantSelectList'),
                Meteor.subscribe('gardenPlantEvents', gardenPlantId),
                Meteor.subscribe('gardenPlantPlant', gardenPlantId),
                Meteor.subscribe('gardenPlants')
            ];
        },
        data: function(){
            var gardenPlantId = this.params._id;
            return {
                gardenPlant: GardenPlants.findOne({_id: gardenPlantId}),
                plants: Plants.find({}, {name: 1}),
                gardenPlantEvents: GardenPlantEvents.find({gardenPlantId: gardenPlantId}),
                plant: function(){
                    var gardenPlant = GardenPlants.findOne({_id: gardenPlantId});
                    return Plants.findOne({_id: gardenPlant.plantId});
                },
                gardens: function(){
                    var result = GardenPlants.find().map(function(u){return u.garden ? u.garden : '';});
                    return _.uniq(result,true);
                }
            };
        }
    });
});