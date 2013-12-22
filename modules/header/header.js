app.module('header', function(header, app) {
    'use strict';

    var model = new Backbone.Model({isNew: true});

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

        wrongLoginPass: function() {
            this.$el.find('form').addClass('error');
            this.$el.find('form input').one('focus', function(e) {
                $(e.currentTarget).closest('form').removeClass('error');
            });
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

                    if(data.login) {
                        window.location.reload();
                    } else {
                        self.wrongLoginPass();
                    }

                }
            });
            e.preventDefault();
        },

        logout: function(e) {
            $.ajax({
                type: 'GET',
                url: app.mainUrl + '/users/logout.php',
                success: function() {
                    window.location.reload();
                }
            });
            e.preventDefault();
        }
    });

    app.on('start', function() {
        app.headerRegion.show(new View());
        //checking user's role request
        $.ajax({
            type: 'GET',
            dataType: 'JSON',
            url: app.mainUrl + '/users/checkSession.php',
            success: function(data) {

                if(data.extraProps.login) {
                    model.set({login: data.extraProps.login, isNew: false});
                }
                else {
                    model.set({login: null, isNew: false});
                }

            }
        });
    });
});