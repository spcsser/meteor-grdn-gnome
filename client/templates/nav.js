Template.nav.helpers({
   navItems: function(){
       return Navigation.items;
   }
});

Navigation = {
    items: []
};
Navigation.addItem = function(pathName, label, options){
    Navigation.items.push(
        {
            uri: Router.routes[pathName].path({}),
            label: label
        }
    );
};

Navigation.addItem('home', 'Home');
Navigation.addItem('gardens', 'Garden Estates');
Navigation.addItem('plants', 'Plant-Wiki');
Navigation.addItem('gardenPlants', 'Garden Plants');