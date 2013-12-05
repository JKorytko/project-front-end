app.module('groups', function(groups, app) {
    'use strict';

    var Collection = Backbone.CustomCollection.extend({
        url: app.mainUrl + '/groups/getGroups.php',
        sortingProps: {
            sortKey: 'group_name',
            order: -1
        }
    });

    var collection = new Collection();

    var View = Marionette.CustomView.extend({
        template: 'modules/widgets/groups/groups.html',

        collection: collection,

        events: {
            'click a.group': 'showGroup'
        },

        showGroup: function(e) {
            var id = e.target.getAttribute('data-id');

            e.preventDefault();
            Backbone.history.navigate('groups/' + id, true);
        }
    });

    groups.show = function(searchWord) {
        app.mainRegion.show(new View());
        if(searchWord) {
            collection.fetch({
                url: app.mainUrl + '/supporting/search.php?searchWord=' + encodeURIComponent(searchWord) + '&tableKey=1'
            });
        } else {
            collection.fetch();
        }
    }
});
