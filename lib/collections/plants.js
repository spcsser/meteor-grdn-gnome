Plants = new Mongo.Collection('plants',
    {
        transform : function(doc){
            doc.related = Related;
            doc.relations = new Relations('plantId');
            return doc;
        }
    }
);

Plants.allow({
    insert: function(userId){
        var user = Meteor.users.findOne(userId);
        return user != null;
    },
    update: function(userId){
        var user = Meteor.users.findOne(userId);
        return user != null;
    }
});