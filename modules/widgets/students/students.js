app.module('students', function(students, app) {
    'use strict';

    var Collection = Backbone.CustomCollection.extend({
        url: app.mainUrl + '/students/getStudents.php',
        sortingProps: {
            sortKey: 'student_name',
            order: -1
        }
    });

    var collection = new Collection();

    var View = Marionette.CustomView.extend({
        template: 'modules/widgets/students/students.html',

        collection: collection,

        events: {
            'click a.student': 'showStudentsBook'
        },

        showStudentsBook: function(e) {
            var id = e.target.getAttribute('data-id'),
                groupId = e.target.getAttribute('data-group-id');

            e.preventDefault();
            Backbone.history.navigate('students/' + groupId + '/' + id, true);
        }
    });

    students.show = function(searchWord) {
        app.mainRegion.show(new View());
        if(searchWord) {
            collection.fetch({
                url: app.mainUrl + '/supporting/search.php?searchWord=' + encodeURIComponent(searchWord) + '&tableKey=2'
            });
        } else {
            collection.fetch();
        }
    }
});
