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
    //dataReadyHold = LaunchScreen.hold();
}

Router.map(function(){
    this.route('home', {path: '/'});
    this.route('plants', {
        waitOn: function(){
            return Meteor.subscribe('plants');
        },
        data: function(){
            return { plants: Plants.find() };
        }
    });
    this.route('plantDetails', {
        path: '/plant-details/:_id',
        notFoundTemplate: 'plantNotFound',
        data: function() {
            var result = Plants.findOne({_id: this.params._id});
            console.log(result);
            return result;
        }
    });
    this.route('notFound', {
        path: '*'
    });
});