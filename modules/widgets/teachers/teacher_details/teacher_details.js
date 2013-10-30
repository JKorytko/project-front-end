app.module('teachers.details', function(details, app) {
    'use strict';

    var Collection = Backbone.Collection.extend();

    var collection = new Collection();

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/teachers/teacher_details/teacher_details.html',

        collection: collection,

        collectionEvents: {
            'sync': 'render'
        },

        events: {
            'click a.semester': 'openList'
        },

        openList: function(e) {
            var $target = $(e.target),
                id = $target.data('id'),
                groupId = $target.data('group-id');

            e.preventDefault();
            Backbone.history.navigate('teachers/list/' + groupId + '/' + id, true);
        }
    });

    details.show = function(id) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/lectors/getLectors_detail.php?lectorId=' + id
        });
    }
});
