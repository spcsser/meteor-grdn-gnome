Gardens = new Mongo.Collection('gardens');

Garden = {};

Garden.plants = function(gardenId){
    return GardenPlants.find({gardenId: gardenId})
};

Garden.plantCount = function(gardenId){
    return Garden.plants(gardenId).count();
};