app.module('subjects', function(subjects, app) {
    'use strict';

    var Collection = Backbone.CustomCollection.extend({
        url: app.mainUrl + '/subjects/getSubjects.php',
        sortingProps: {
            sortKey: 'subject_title',
            order: -1
        }
    });

    var collection = new Collection();

    var View = Marionette.CustomView.extend({
        template: 'modules/widgets/subjects/subjects.html',

        collection: collection,

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
