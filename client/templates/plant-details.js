onSuccessPlant= function(id, fieldName) {
    return function(res, val){
        Meteor.call('updatePlant', id, fieldName, val);

        return {newValue: val};
    };
};

Template.plantDetails.helpers({
    onSuccessName: function(){
        return onSuccessPlant(this._id, 'name');
    },
    onSuccessScienceName: function(){
        return onSuccessPlant(this._id, 'scienceName');
    },
    onSuccessLightConditions: function(){
        return onSuccessPlant(this._id, 'lightConditions');
    },
    onSuccessWaterConditions: function(){
        return onSuccessPlant(this._id, 'waterConditions');
    },
    onSuccessFertilizeConditions: function(){
        return onSuccessPlant(this._id, 'fertilizeConditions');
    },
    onSuccessSprayConditions: function(){
        return onSuccessPlant(this._id, 'sprayConditions');
    },
    onSuccessWaterInterval: function(){
        return onSuccessPlant(this._id, 'waterInterval');
    },
    onSuccessFertilizeInterval: function(){
        return onSuccessPlant(this._id, 'fertilizeInterval');
    },
    onSuccessSprayInterval: function(){
        return onSuccessPlant(this._id, 'sprayInterval');
    }
});

Template.plantDetails.events({
   'click .addGardenPlant': function(){
       Meteor.call('addGardenPlant', this._id);
   }
});