app.module('students.recordBook', function(records, app) {
    'use strict';

    var Collection = Backbone.Collection.extend();

    var collection = new Collection();

    records.collection = collection;

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/students/students_record_book/students_record_book.html',

        collection: collection,

        collectionEvents: {
            'sync': 'render'
        },

        agent: function(one, two, three) {
            console.log(one, two, three)
        }
    });

    records.show = function(groupId, studentId) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/students/recordbook.php?studentId=' + studentId + '&groupId=' + groupId
        });
    }
});
