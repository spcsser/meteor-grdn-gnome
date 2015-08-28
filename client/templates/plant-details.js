onSuccess= function(id, fieldName) {
    return function(res, val){
        var updates = {};
        updates[fieldName] = val;

        Meteor.call('updatePlant', id, updates);

        return {newValue: val};
    };
};

Template.plantDetails.helpers({
    onSuccessName: function(){
        return onSuccess(this._id, 'name');
    },
    onSuccessScienceName: function(){
        return onSuccess(this._id, 'scienceName');
    },
    onSuccessLightConditions: function(){
        return onSuccess(this._id, 'lightConditions');
    },
    onSuccessWaterConditions: function(){
        return onSuccess(this._id, 'waterConditions');
    },
    onSuccessFertilizeConditions: function(){
        return onSuccess(this._id, 'fertilizeConditions');
    },
    onSuccessSprayConditions: function(){
        return onSuccess(this._id, 'sprayConditions');
    },
    onSuccessWaterInterval: function(){
        return onSuccess(this._id, 'waterInterval');
    },
    onSuccessFertilizeInterval: function(){
        return onSuccess(this._id, 'fertilizeInterval');
    },
    onSuccessSprayInterval: function(){
        return onSuccess(this._id, 'sprayInterval');
    }
});

Template.plantDetails.events({
   'click .add-garden-plant': function(){
       Meteor.call('addGardenPlant', this._id);
   }
});