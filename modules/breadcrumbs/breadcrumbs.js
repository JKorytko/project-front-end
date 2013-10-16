app.module('breadcrumbs', function() {
    'use strict';

    var View = Marionette.ItemView.extend({
        template: 'modules/breadcrumbs/breadcrumbs.html'
    });

    app.on('start', function() {
        app.breadcrumbsRegion.show(new View);
    });
});