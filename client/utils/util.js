Template.registerHelper('gt', function(base, compare){
    return base > compare;
});

Template.registerHelper('lt', function(base, compare){
    return base < compare;
});

Template.registerHelper('gte', function(base, compare){
    return base >= compare;
});

Template.registerHelper('lte', function(base, compare){
    return base <= compare;
});

Template.registerHelper('isUserLoggedIn', function(){
   return Meteor.user() != null;
});

Template.registerHelper('isNotUserLoggedIn', function(){
    return Meteor.user() === null;
});

Template.registerHelper('printUnit', function(amount, unit, unitPlural){
    unitPlural = (typeof unitPlural === 'undefined' ? 's' : unitPlural);
    amount = (typeof amount === 'undefined' ? 0 : amount);
    return amount + ' ' + (amount > 1 ? unitPlural : unit);
});

Template.registerHelper('diffToday', function(targetDate, datePart){
    var today = new Date();
    datePart = typeof datePart === 'undefined' ? 'd' : datePart;
    targetDate = typeof targetDate === 'undefined' ? new Date() : targetDate;
    return Date.dateDiff(datePart, today, targetDate);
});

Template.registerHelper('_', function(){
    return _;
});

Template.registerHelper('GardenPlant', function(){
    return GardenPlant;
});

Template.registerHelper('Sensor', function(){
   return Sensor;
});