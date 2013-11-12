app.module('students', function(students, app) {
    'use strict';

    var Collection = Backbone.Collection.extend({
        url: app.mainUrl + '/students/getStudents.php'
    });

    var collection = new Collection();

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/students/students.html',

        collection: collection,

        collectionEvents: {
            'sync': 'mediator'
        },

        events: {
            'click a.student': 'showStudentsBook'
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

        showStudentsBook: function(e) {
            var id = e.target.getAttribute('data-id'),
                groupId = e.target.getAttribute('data-group-id');

            console.log(groupId, id)
            e.preventDefault();
            Backbone.history.navigate('students/' + groupId + '/' + id, true);
        }
    });

    students.show = function() {
        app.mainRegion.show(new View());
        collection.fetch();
    }
});
