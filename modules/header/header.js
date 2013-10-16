app.module('header', function() {
    'use strict';

    var View = Marionette.ItemView.extend({
        template: 'modules/header/header.html'
    });

    app.on('start', function() {
        app.headerRegion.show(new View);
    });
});