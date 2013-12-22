app.module('footer', function(header, app) {
    'use strict';

    var View = Marionette.ItemView.extend({
        template: 'modules/footer/footer.html',

        className: 'container'
    });

    app.on('start', function() {
        app.footerRegion.show(new View());
    });
});