app.module('teachers', function(teachers, app) {
    'use strict';

    var Collection = Backbone.CustomCollection.extend({
        url: app.mainUrl + '/lectors/getLectors.php',
        sortingProps: {
            sortKey: 'lector_name',
            order: -1
        }
    });

    var collection = new Collection();

    var View = Marionette.CustomView.extend({
        template: 'modules/widgets/teachers/teachers.html',

        collection: collection,

        events: {
            'click a.teacher': 'openTeacherDetails'
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
