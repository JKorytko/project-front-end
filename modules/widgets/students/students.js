app.module('students', function(students, app) {
    'use strict';

    var Collection = Backbone.Collection.extend({
        url: 'http://dev.myacademy.com.ua/students/getStudents.php'
    });

    var collection = new Collection();

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/students/students.html',

        collection: collection,

        collectionEvents: {
            'sync': 'render'
        },

        events: {
            'click a.student': 'showStudentsBook'
        },

        showStudentsBook: function(e) {
            var id = e.target.getAttribute('data-id');

            e.preventDefault();
            Backbone.history.navigate('students/' + id, true);
        }
    });

    students.show = function() {
        app.mainRegion.show(new View());
        collection.fetch();
    }
});
