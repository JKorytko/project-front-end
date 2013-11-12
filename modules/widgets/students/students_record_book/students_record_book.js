app.module('students.recordBook', function(records, app) {
    'use strict';

    var Collection = Backbone.Collection.extend();

    var collection = new Collection();

    records.collection = collection;

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/students/students_record_book/students_record_book.html',

        collection: collection,

        collectionEvents: {
            'sync': 'mediator'
        },

        templateHelpers: {
            extraProps: {
                roleKey: 0
            }
        },

        mediator: function(coll, response) {
            this.templateHelpers.extraProps = response.extraProps;
            this.render();
        }
    });

    records.show = function(groupId, studentId) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/students/recordbook.php?studentId=' + studentId + '&groupId=' + groupId
        });
    }
});
