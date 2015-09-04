GARDEN_PLANT_CONFIG = [
    {key: 'name'},
    {key: 'plantId'}
];

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