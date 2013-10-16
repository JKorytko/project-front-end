app.module('subjects', function(subjects, app) {
    'use strict';

    var Collection = Backbone.Collection.extend({
        url: 'http://dev.myacademy.com.ua/subjects/getSubjects.php'
    });

    var collection = new Collection();

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/subjects/subjects.html',

        collection: collection,

        collectionEvents: {
            'sync': 'render'
        },

        events: {
            'click a.subject': 'openSubjectDetails'
        },

        openSubjectDetails: function(e) {
            var id = $(e.target).data('id');

            e.preventDefault();
            Backbone.history.navigate('subjects/' + id, true);
        }
    });

    subjects.show = function() {
        app.mainRegion.show(new View());
        collection.fetch();
    }
});
