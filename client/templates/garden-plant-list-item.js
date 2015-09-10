Template.gardenPlantListItem.events({
    'click .deleteGardenPlant': function(){
        Meteor.call('deleteGardenPlant', this._id);
    },
    'click .watchGardenPlant': function(){
        var userId = Meteor.userId();
        var gardenPlantId = this._id;
        if(userId && gardenPlantId){
            Meteor.call('addGardenPlantWatcher', gardenPlantId, userId);
        }
    }
});

Template.gardenPlantListItem.helpers({
    'getPlantName': function(plantId){
        var plant = Plants.findOne({_id: plantId});
        return typeof plant === 'object' ? plant.name : '';
    }
});