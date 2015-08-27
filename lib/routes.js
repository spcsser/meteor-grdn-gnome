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
        path: '/'
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
            return [
                Meteor.subscribe('gardenPlantDetails', this.params._id),
                Meteor.subscribe('plantSelectList'),
                Meteor.subscribe('gardenPlantEvents', this.params._id)
            ];
        },
        data: function(){
            return {
                gardenPlant: GardenPlants.findOne({_id: this.params._id}),
                plants: Plants.find({}, {name: 1}),
                gardenPlantEvents: GardenPlantEvents.find({gardenPlantId: this.params._id})
            };
        }
    });
});