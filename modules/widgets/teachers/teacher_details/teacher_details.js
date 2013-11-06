app.module('teachers.details', function(details, app) {
    'use strict';

    var Collection = Backbone.Collection.extend();

    var collection = new Collection();

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/teachers/teacher_details/teacher_details.html',

        collection: collection,

        collectionEvents: {
            'sync': 'mediator'
        },

        events: {
            'click tr.subject-row': 'openList'
        },

        templateHelpers: {
            extraProps: {
                roleKey: 0
            }
        },

        mediator: function(coll, response) {
            console.log(response);
            this.templateHelpers.extraProps = response.extraProps;
            this.render();
        },

        openList: function(e) {
            var $target = $(e.currentTarget),
                id = $target.data('id'),
                groupId = $target.data('group-id');

            e.preventDefault();
            Backbone.history.navigate('teachers/list/' + groupId + '/' + id, true);
        }
    });

    details.show = function(id) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/lectors/getLectorsDetail.php?lectorId=' + id
        });
    }
});
