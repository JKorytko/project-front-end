app.module('subjects.list', function(list, app) {
    'use strict';

    var Collection = Backbone.CustomCollection.extend({
        sortingProps: {
            sortKey: 'name_student',
            order: -1
        }
    });

    var collection = new Collection();

    var View = Marionette.CustomView.extend({
        template: 'modules/widgets/subjects/list/list.html',

        collection: collection,

        events: {
            'click .edit_grades': 'showEditableList'
        },

        showEditableList: function(e) {
            e.preventDefault();
            Backbone.history.navigate(Backbone.history.fragment + '/edit', true);
        }
    });

    list.show = function(groupId, subjectId) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/subjects/vedomost.php?subjectId=' + subjectId + '&groupId=' + groupId
        });
    }
});
