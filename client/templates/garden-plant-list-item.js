Template.gardenPlantListItem.events({
    'click .garden-plant-delete': function(){
        Meteor.call('deleteGardenPlant', this._id);
    }
});

Template.gardenPlantListItem.helpers({
    'getPlantName': function(plantId){
        var plant = Plants.findOne({_id: plantId});
        return typeof plant === 'object' ? plant.name : '';
    }
});