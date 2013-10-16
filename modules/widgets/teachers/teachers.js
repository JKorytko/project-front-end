app.module('teachers', function(teachers, app) {
    'use strict';

    var Collection = Backbone.Collection.extend({
        url: 'http://dev.myacademy.com.ua/lectors/getLectors.php'
    });

    var collection = new Collection();

    teachers.collection = collection;

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/teachers/teachers.html',

        collection: collection,

        collectionEvents: {
            'sync': 'render'
        },

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
