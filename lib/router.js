Router.configure({
    layoutTemplate: 'appBody',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.onBeforeAction('loading');

dataReadyHold = null;

if (Meteor.isClient) {
    // Keep showing the launch screen on mobile devices until we have loaded
    // the app's data
    dataReadyHold = LaunchScreen.hold();
}

Router.route('home', {path: '/'});
Router.route('plants', {
    waitOn: function(){
      return Meteor.subscribe('plants');
    },
    data: function(){
        return { plants: Plants.find() };
    }
});
Router.route('plant-details', {
    path: '/plant-details/:_id',
    waitOn: function(){
        return Meteor.subscribe('plantDetails', this.params._id);
    },
    data: function() {
        return Plants.findOne({_id: this.params._id});
    }
});