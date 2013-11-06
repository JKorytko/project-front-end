(function(Marionette, Backbone) {
    'use strict';

    //parse logic
    Backbone.Collection.prototype.parse = function(resp, options) {
        return resp.tableProps;
    }

    //template preLoading system
    Marionette.TemplateCache.TemplateCaches = {};

    Marionette.TemplateCache.preloadTemplate = function (templateURL) {
        var loader = $.Deferred();

        if (!templateURL || templateURL.length === 0) {
            console.error('template url isn\'t valid!');
            return;
        }
        $.get(templateURL, function (template) {
            if (!template || template.length == 0) {
                console.error('template ' + templateURL + ' is empty!')
            }
            Marionette.TemplateCache.TemplateCaches[templateURL] = template;
            loader.resolve();
        });
        return loader;
    };

    Marionette.TemplateCache.preloadTemplates = function (templateURLs) {
        var loadAllTemplates = $.Deferred(),
            loadTemplatePromises = [],
            templatesRemainingToLoad

        if(templateURLs.length === 0) {
            loadAllTemplates.resolve();
        }
        _.each(templateURLs, function (templateURL, index) {
            loadTemplatePromises[index] = Marionette.TemplateCache.preloadTemplate(templateURLs[index]);
        });
        templatesRemainingToLoad = loadTemplatePromises.length;
        _.each(loadTemplatePromises, function (aLoadPromise) {
            $.when(aLoadPromise).done(function () {
                templatesRemainingToLoad--;
                if (templatesRemainingToLoad === 0) {
                    loadAllTemplates.resolve();
                }
            });
        });
        return loadAllTemplates;
    };

    Marionette.TemplateCache.get = function(templateURL) {
        return _.template(Marionette.TemplateCache.TemplateCaches[templateURL]);
    }
})(Marionette, Backbone);