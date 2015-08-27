Template.gardenPlantDetails.helpers({
    'plantsList': function(){
        return this.plants.map(function(u){return {value: u._id, text: u.name};});
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