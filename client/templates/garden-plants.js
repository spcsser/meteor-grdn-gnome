GARDEN_PLANT_CONFIG = [
    {key: 'name'},
    {key: 'plantId'}
];

Template.gardenPlantListItem.helpers({
    'getPlantName': function(plantId){
        var plant = Plants.findOne({_id: plantId});
        return typeof plant === 'object' ? plant.name : '';
    }
});

Template.newGardenPlant.events({
    'submit .newGardenPlantForm': function(event) {
        event.preventDefault();

        var data = {name: '', plantId: null};
        GARDEN_PLANT_CONFIG.forEach(function(entry) {
            var $input = $(event.target).find("[name='" + entry.key + "']");
            data[entry.key] = $input.val();
        });

        Meteor.call('createGardenPlant', data);

        GARDEN_PLANT_CONFIG.forEach(function(entry){
            var $elem=$(event.target).find("[name='" + entry.key + "']");
            $elem.val('');
        });
    }
});