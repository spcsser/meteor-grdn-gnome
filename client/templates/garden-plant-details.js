Template.gardenPlantDetails.helpers({
    plantsList: function(){
        return this.plants.map(function(u){return {value: u._id, text: u.name};});
    },
    amIWatchingGardenPlant: function(){
        return _.contains(this.gardenPlant.watcher, Meteor.userId());
    }
});

Template.gardenPlantActions.events({
    'click .waterGardenPlant': function(){
        Meteor.call('waterGardenPlant', this.gardenPlant._id);
    },
    'click .sprayGardenPlant': function(){
        Meteor.call('sprayGardenPlant', this.gardenPlant._id);
    },
    'click .fertilizeGardenPlant': function(){
        Meteor.call('fertilizeGardenPlant', this.gardenPlant._id);
    }
});

Template.gardenPlantDetails.events({
    'click .watchGardenPlant': function(){
        var userId = Meteor.userId();
        var gardenPlantId = this.gardenPlant._id;
        if(userId && gardenPlantId){
            Meteor.call('addGardenPlantWatcher', gardenPlantId, userId);
        }
    },
    'click .unwatchGardenPlant': function(){
        var userId = Meteor.userId();
        var gardenPlantId = this.gardenPlant._id;
        if(userId && gardenPlantId){
            Meteor.call('removeGardenPlantWatcher', gardenPlantId, userId);
        }
    }
});