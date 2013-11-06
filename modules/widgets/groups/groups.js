app.module('groups', function(groups, app) {
    'use strict';

    var Collection = Backbone.Collection.extend({
        url: app.mainUrl + '/groups/getGroups.php'
    });

    var collection = new Collection();

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/groups/groups.html',

        collection: collection,

        collectionEvents: {
            'sync': 'mediator'
        },

        templateHelpers: {
            extraProps: {
                roleKey: 0
            }
        },

        events: {
            'click a.group': 'showGroup'
        },

        mediator: function(coll, response) {
            this.templateHelpers.extraProps = response.extraProps;
            this.render();
        },

        showGroup: function(e) {
            var id = e.target.getAttribute('data-id');

            e.preventDefault();
            Backbone.history.navigate('groups/' + id, true);
        }
    });

    groups.show = function() {
        app.mainRegion.show(new View());
        collection.fetch();
    }
});
