app.module('home', function(home, app) {
    'use strict';

    var View = Marionette.ItemView.extend({
        template: 'modules/widgets/home/home.html'
    })

    home.show = function() {
        app.mainRegion.show(new View());
    }
});