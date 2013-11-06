app.module('subjects.list', function(list, app) {
    'use strict';

    var Collection = Backbone.Collection.extend();

    var collection = new Collection();

    list.collection = collection;

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/subjects/list/list.html',

        collection: collection,

        collectionEvents: {
            'sync': 'mediator'
        },

        templateHelpers: {
            extraProps: {
                roleKey: 0
            }
        },

        mediator: function(coll, response) {
            this.templateHelpers.extraProps = response.extraProps;
            this.render();
        }
    });

    list.show = function(groupId, subjectId) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/subjects/vedomost.php?subjectId=' + subjectId + '&groupId=' + groupId
        });
    }
});
