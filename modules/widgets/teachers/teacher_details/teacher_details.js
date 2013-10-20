app.module('teachers.details', function(details, app) {
    'use strict';

    var Collection = Backbone.Collection.extend();

    var collection = new Collection();

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/teachers/teacher_details/teacher_details.html',

        collection: collection,

        collectionEvents: {
            'sync': 'render'
        }
    });

    details.show = function(id) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/lectors/getLectors_detail.php?lectorId=' + id
        });
    }
});
