app.module('teachers.details', function(details, app) {
    'use strict';

    var Collection = Backbone.CustomCollection.extend({
        url: app.mainUrl + '/lectors/getLectors.php',
        sortingProps: {
            sortKey: 'subject_title',
            order: -1
        }
    });

    var collection = new Collection();

    var View = Marionette.CustomView.extend({
        template: 'modules/widgets/teachers/teacher_details/teacher_details.html',

        collection: collection,

        events: {
            'click tr.subject-row': 'openList'
        },

        openList: function(e) {
            var $target = $(e.currentTarget),
                id = $target.data('id'),
                groupId = $target.data('group-id'),
                teacherId = $target.data('lector-id');

            e.preventDefault();
            Backbone.history.navigate('teachers/' + teacherId + '/list/' + groupId + '/' + id, true);
        }
    });

    details.show = function(id) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/lectors/getLectorsDetail.php?lectorId=' + id
        });
    }
});
