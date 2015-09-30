// the function to call to get related data
Related = function (value) {
    // is relation stored on this object or on destination object?
    var related = this[value] || null;
    if(!related){
        return this.relations[value](this._id);
    } else {
        return this.relations[value](related);
    }
};

Relations = function (relationKey) {
    this.relationKey = relationKey;
};

// shared prototype
Relations.prototype.gardenPlants = function (id) {
    var selector = {};
    selector[this.relationKey] = id;
    return GardenPlants.find(selector);
};

Relations.prototype.plantId = function (id) {
    return Plants.findOne({_id: id});
};

Relations.prototype.gardenPlantEvents = function(id) {
    var selector = {};
    selector[this.relationKey] = id;
    return GardenPlantEvents.find(selector);
};

Relations.prototype.sensorId = function(id) {
    return Sensors.findOne({_id: id});
};

Relations.prototype.sensorDatasets = function(id) {
    var selector = {};
    selector[this.relationKey] = id;
    return SensorDatasets.find(selector);
};