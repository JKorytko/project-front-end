app.module('teachers', function(teachers, app) {
    'use strict';

    var Collection = Backbone.Collection.extend({
        url: app.mainUrl + '/lectors/getLectors.php'
    });

    var collection = new Collection();

    teachers.collection = collection;

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/teachers/teachers.html',

        collection: collection,

        collectionEvents: {
            'sync': 'mediator'
        },

        events: {
            'click a.teacher': 'openTeacherDetails'
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

        openTeacherDetails: function(e) {
            var id = $(e.target).data('id');

            e.preventDefault();
            Backbone.history.navigate('teachers/' + id, true);
        }
    });

    teachers.show = function() {
        app.mainRegion.show(new View());
        collection.fetch();
    }
});
