app.module('subjects.details', function(details, app) {
    'use strict';

    var Collection = Backbone.CustomCollection.extend({
        sortingProps: {
            sortKey: 'group_name',
            order: -1
        }
    });

    var collection = new Collection();

    var View = Marionette.CustomView.extend({
        template: 'modules/widgets/subjects/subject_details/subject_details.html',

        collection: collection,

        events: {
            'click tr.subject-row': 'openList'
        },

        openList: function(e) {
            var $target = $(e.currentTarget),
                id = $target.data('id'),
                groupId = $target.data('group-id');

            e.preventDefault();
            Backbone.history.navigate('subjects/list/' + groupId + '/' + id, true);
        }
    });

    details.show = function(id) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/subjects/getSubjectsDetails.php?subjectId=' + id
        });
    }
});
