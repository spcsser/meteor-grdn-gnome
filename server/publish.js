Meteor.publish('plants', function() {
    return Plants.find({});
});

Meteor.publish('plantDetails', function(plantId) {
    return Plants.find({_id: plantId});
});
