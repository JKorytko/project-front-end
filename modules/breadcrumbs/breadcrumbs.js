app.module('breadcrumbs', function(breadcrumbs, app) {
    'use strict';

    var requestDone = false,
        mappingModel = new Backbone.Model(),
        collection = new Backbone.Collection();

    var View = Marionette.ItemView.extend({
        template: 'modules/breadcrumbs/breadcrumbs.html',

        collection: collection,

        events: {
            'click .search-btn': 'search'
        },

        collectionEvents: {
            'reset': 'render'
        },

        search: function(e) {
            var $target = $(e.currentTarget),
                searchType = $target.data('search-type'),
                $input = $target.siblings('input'),
                searchWord = $input.val();

            //TODO: add validation
            e.preventDefault();
            Backbone.history.navigate(searchType.substring(1) + '/search/' + searchWord, true);
        }
    });

    app.on('start', function() {
        $.ajax({
            type: 'GET',
            dataType: 'JSON',
            url: app.mainUrl + '/supporting/getAll.php',
            success: function(data) {
                mappingModel.set(data);
                requestDone = true;
                app.breadcrumbsRegion.show(new View());
            }
        });
    });

    breadcrumbs.setBreadcrumbs = function() {
        var args = Array.prototype.slice.call(arguments),
            breadcrumbs = [],
            temp,
            i, l;

        if(requestDone) {
            for(i = 0, l = args.length; i < l; i++) {
                breadcrumbs[i] = {};
                if(args[i].mappingProp == undefined) {
                    _.extend(breadcrumbs[i], args[i]);
                }
                else {
                    if(args[i].double) {
                        breadcrumbs[i].url = args[i].url;
                        breadcrumbs[i].name = _.where(mappingModel.get(args[i].mappingProp), {id: args[i].mappingIndex})[0].name +
                            ', ' +
                            _.where(mappingModel.get(args[i].secondMappingProp), {id: args[i].secondMappingIndex})[0].name;
                    }
                    else {
                        //temp = TODO bug breadcrumbs
                        breadcrumbs[i].url = args[i].url;
                        breadcrumbs[i].name = _.where(mappingModel.get(args[i].mappingProp), {id: args[i].mappingIndex})[0].name;
                    }
                }
            }
            collection.reset(breadcrumbs);
        }
        else {
            setTimeout(function() {
                app.breadcrumbs.setBreadcrumbs.apply(null, args);
            }, 500);
        }
    }
});