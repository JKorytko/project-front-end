app.module('groups.details', function(details, app) {
    'use strict';

    var Collection = Backbone.CustomCollection.extend({
        sortingProps: {
            sortKey: 'student_name',
            order: -1
        }
    });

    var collection = new Collection();

    var View = Marionette.CustomView.extend({
        template: 'modules/widgets/groups/group_details/group_details.html',

        collection: collection,

        events: {
            'click a.student': 'showStudentsBook'
        },

        showStudentsBook: function(e) {
            var id = e.target.getAttribute('data-id'),
                groupId = e.target.getAttribute('data-group-id');

            console.log(groupId, id);
            e.preventDefault();
            Backbone.history.navigate('groups/' + groupId + '/' + id, true);
        }
    });

    details.show = function(id) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/groups/getGroupsDetails.php?groupId=' + id
        });
    }
});
