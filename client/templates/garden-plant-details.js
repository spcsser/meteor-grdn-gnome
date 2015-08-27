Template.gardenPlantDetails.helpers({
    'plantsList': function(){
        return this.plants.map(function(u){return {value: u._id, text: u.name};});
    }
});
