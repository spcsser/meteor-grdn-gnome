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
    onSuccessFertilizerConditions: function(){
        return onSuccess(this._id, 'fertilizerConditions');
    },
    onSuccessSprayConditions: function(){
        return onSuccess(this._id, 'sprayConditions');
    },
    onSuccessWaterInterval: function(){
        return onSuccess(this._id, 'waterInterval');
    },
    onSuccessFertilizerInterval: function(){
        return onSuccess(this._id, 'fertilizerInterval');
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