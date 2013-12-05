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

    subjects.show = function(searchWord) {
        app.mainRegion.show(new View());
        if(searchWord) {
            collection.fetch({
                url: app.mainUrl + '/supporting/search.php?searchWord=' + encodeURIComponent(searchWord) + '&tableKey=3'
            });
        } else {
            collection.fetch();
        }
    }
});
