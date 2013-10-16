app.module('students.recordBook', function(records, app) {
    'use strict';

    var Collection = Backbone.Collection.extend();

    var collection = new Collection();

    records.collection = collection;

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/students/students_record_book/students_record_book.html',

        collection: collection,

        collectionEvents: {
            'sync': 'someFun'
        },

        templateHelpers: {
            showId: function() {}
        },

        someFun: function(a,b,c) {
            this.templateHelpers.showId = function() {
                return [2,3];
            }
            this.render();
        }
    });

    records.show = function(id) {
        app.mainRegion.show(new View());
        collection.fetch({
            id: id,
            url: 'http://dev.myacademy.com.ua/students/recordbook.php?studentId=1&groupId=' + id
        });
    }
});
