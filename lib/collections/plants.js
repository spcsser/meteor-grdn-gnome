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
    deletePlant: function(id){
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        Plants.remove(id);
    },
    createPlant: function(data){
        var updateDate = new Date(),
            userId = Meteor.userId();

        data.creatorUserId = userId;
        data.createdAt = updateDate;
        data.updaterUserId = userId;
        data.updatedAt = updateDate;

        Plants.insert(data);
    },
    updatePlant: function(id, updates){
        var updateDate = new Date();

        updates.updaterUserId = Meteor.userId();
        updates.updatedAt = updateDate;
        Plants.update(id, {$set: updates});
    }
});