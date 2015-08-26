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