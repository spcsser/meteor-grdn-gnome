Template.nav.helpers({
   navItems: function(){
       return [
           {
               uri: Router.routes['home'].path({}),
               label: 'Home'
           },
           {
               uri: Router.routes['plants'].path({}),
               label: 'Plant-Wiki'
           },
           {
               uri: Router.routes['gardenPlants'].path({}),
               label: 'Garden Plants'
           }
       ]
   }
});