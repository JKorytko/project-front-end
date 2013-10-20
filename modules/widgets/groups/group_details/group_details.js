app.module('groups.details', function(details, app) {
    'use strict';

    var Collection = Backbone.Collection.extend();

    var collection = new Collection();

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/groups/group_details/group_details.html',

        collection: collection,

        collectionEvents: {
            'sync': 'render'
        },

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

    details.show = function(id) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/groups/getGroups_details.php?groupId=' + id
        });
    }
});
