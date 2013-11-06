app.module('subjects', function(subjects, app) {
    'use strict';

    var Collection = Backbone.Collection.extend({
        url: app.mainUrl + '/subjects/getSubjects.php'
    });

    var collection = new Collection();

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/subjects/subjects.html',

        collection: collection,

        collectionEvents: {
            'sync': 'mediator'
        },

        events: {
            'click a.subject': 'openSubjectDetails'
        },

        templateHelpers: {
            extraProps: {
                roleKey: 0
            }
        },

        mediator: function(coll, response) {
            this.templateHelpers.extraProps = response.extraProps;
            this.render();
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
