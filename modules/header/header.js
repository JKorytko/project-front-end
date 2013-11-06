app.module('header', function(header, app) {
    'use strict';

    var model = new Backbone.Model();

    var View = Marionette.ItemView.extend({
        template: 'modules/header/header.html',

        model: model,

        modelEvents: {
            'change': 'render'
        },

        events: {
            'click #sign-in': 'login',
            'click #sign-out': 'logout'
        },

        login: function(e) {
            var self = this,
                login = this.$el.find('#login-input').val(),
                password = this.$el.find('#password-input').val();

            $.ajax({
                type: 'GET',
                dataType: 'JSON',
                url: app.mainUrl + '/users/getUsers.php?login=' + login + '&password=' + password,
                success: function(data) {
                    //TODO: add validation, errors input

                    if(data.login) {
                        window.location.reload();
                    }
                }
            });
            e.preventDefault();
        },

        logout: function(e) {
            var self = this;

            $.ajax({
                type: 'GET',
                url: app.mainUrl + '/users/logout.php',
                success: function() {
                    window.location.reload();
                }
            });
            e.preventDefault();
        }

        //TODO: check commented logic
        /*
        login: function(e) {
            var self = this,
                login = this.$el.find('#login-input').val(),
                password = this.$el.find('#password-input').val();

            $.ajax({
                type: 'GET',
                dataType: 'JSON',
                url: app.mainUrl + '/users/getUsers.php?login=' + login + '&password=' + password,
                success: function(data) {
                    //TODO: add validation, errors input

                    if(data.login) {
                        self.model.set({login: data.login});
                        app.mainRouter.controller[app.mainRouter.currentCallbackName](); //refresh current widget
                    }
                    else {
                        //self.model.set({login: null});
                    }
                }
            });
            e.preventDefault();
        },

        logout: function(e) {
            var self = this;

            $.ajax({
                type: 'GET',
                url: app.mainUrl + '/users/logout.php',
                success: function() {
                    self.model.set({login: null});
                    app.mainRouter.controller[app.mainRouter.currentCallbackName](); //refresh current widget
                }
            });
            e.preventDefault();
        }
        */
    });

    app.on('start', function() {
        //checking user's role request
        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: app.mainUrl + '/users/checkSession.php',
            success: function(d) {
                //TODO: delete this shit and set dataType to GET
                var jsonPart = d.split('<!--')[0],
                    data = JSON.parse(jsonPart);

                if(data.extraProps.login) {
                    model.set({login: data.extraProps.login});
                }
                else {
                    model.set({login: null});
                }

                app.headerRegion.show(new View());
            }
        });
    });
});