Template.nav.helpers({
   navItems: function(){
       return Navigation.getItems();
   }
});

Navigation = {
    items: []
};
Navigation.addItem = function(pathName, label, options){
    if(Router.routes[pathName]){
        var uri = Router.routes[pathName].path({});
        Navigation.items.push(
            {
                uri: uri,
                label: label
            }
        );
    }
};
Navigation.init = function(){
    Navigation.addItem('home', 'Home');
    Navigation.addItem('plants', 'Plant-Wiki');
    Navigation.addItem('gardenPlants', 'Garden Plants');
};
Navigation.getItems = function(){
    if(Navigation.items.length === 0) {
        Navigation.init();
    }
    return Navigation.items;
};