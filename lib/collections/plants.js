Plants = new Mongo.Collection('plants');

Plants.allow({
    insert: function(userId){
        var user = Meteor.users.findOne(userId);
        return user != null;
    },
    update: function(userId){
        var user = Meteor.users.findOne(userId);
        return user != null;
    }
});

Meteor.methods({
    deletePlant: function(plantId){
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        Plants.remove(plantId);
    }
});