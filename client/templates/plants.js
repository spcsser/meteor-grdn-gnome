PLANT_CONFIG = [
    {key: 'name', label: 'Name'},
    {key: 'scienceName', label: 'Scientific name'}
];

Template.plants.helpers({
    plantListConfig: function() {
        return PLANT_CONFIG;
    }
});

Template.newPlant.helpers({
    plantListConfig: function() {
        return PLANT_CONFIG;
    }
});

Template.newPlant.events({
    'submit .newPlantForm': function(event) {
        event.preventDefault();

        var data = {name:'',scienceName:''};
        PLANT_CONFIG.forEach(function(entry){
            var $input = $(event.target).find("[name='" + entry.key + "']");
            if($input.val()) {
                data[entry.key] = $input.val();
            }
        });

        Meteor.call('createPlant', data);

        PLANT_CONFIG.forEach(function(entry){
            $(event.target).find("[name='" + entry.key + "']").val('');
        });
    }
});

Template.plantListItem.events({
    'click .plant-delete': function(){
        Meteor.call('deletePlant', this._id);
    }
});
