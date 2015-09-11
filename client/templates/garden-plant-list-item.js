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
    },
    'click .waterGardenPlant': function(){
        Meteor.call('waterGardenPlant', this.plant._id);
    },
    'click .sprayGardenPlant': function(){
        Meteor.call('sprayGardenPlant', this.plant._id);
    },
    'click .fertilizeGardenPlant': function(){
        Meteor.call('fertilizeGardenPlant', this.plant._id);
    }
});

Template.gardenPlantListItem.helpers({
    'getPlantName': function(plantId){
        var plant = Plants.findOne({_id: plantId});
        return typeof plant === 'object' ? plant.name : '';
    }
});