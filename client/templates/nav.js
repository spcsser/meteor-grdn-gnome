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
           }
       ]
   }
});