onSuccess= function(id, fieldName) {
    return function(res, val){
        var updates = {};
        updates[fieldName] = val;
        Plants.update(id, {$set: updates});
    };
};

Template.plantDetails.helpers({
    onSuccessName: function(){
        var id = this._id;
        return onSuccess(id, 'name');
    },
    onSuccessScienceName: function(){
        var id = this._id;
        return onSuccess(id, 'scienceName');
    }
});