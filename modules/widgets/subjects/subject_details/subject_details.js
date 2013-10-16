app.module('subjects.details', function(details, app) {
    'use strict';

    var Collection = Backbone.Collection.extend();

    var collection = new Collection();

    details.collection = collection;

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/subjects/subject_details/subject_details.html',

        collection: collection,

        collectionEvents: {
            'sync': 'render'
        }
    });

    details.show = function(id) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: 'http://dev.myacademy.com.ua/subjects/getSubjects_details.php?subjectId=' + id
        });
    }
});
