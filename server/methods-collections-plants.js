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

        if(!data.sprayInterval){
            data.sprayInterval = 0;
        }
        if(!data.waterInterval){
            data.waterInterval = 0;
        }
        if(!data.fertilizeInterval){
            data.fertilizeInterval = 0;
        }

        Plants.insert(data);
    },
    updatePlant: function(id, fieldName, value){
        var updateDate = new Date(),
            data = {};
        data[fieldName] = value;
        data.updaterUserId = Meteor.userId();
        data.updatedAt = updateDate;
        Plants.update(id, {$set: data});
    }
});