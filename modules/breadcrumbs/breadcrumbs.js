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

            e.preventDefault();
            if(searchWord.length !== 1) {
                Backbone.history.navigate(searchType.substring(1) + '/search/' + searchWord, true);
            }
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

    var setBreadcrumbs = function() {
        var args = Array.prototype.slice.call(arguments),
            breadcrumbs = [],
            tempArr,
            i, l;

        if(requestDone) {
            for(i = 0, l = args.length; i < l; i++) {
                breadcrumbs[i] = {};
                if(args[i].mappingProp == undefined) {
                    _.extend(breadcrumbs[i], args[i]);
                }
                else {
                    //console.log(mappingModel.get(args[i].mappingProp))
                    if(args[i].double) {
                        breadcrumbs[i].url = args[i].url;
                        breadcrumbs[i].name = _.where(mappingModel.get(args[i].mappingProp), {id: args[i].mappingIndex})[0].name +
                            ', ' +
                            _.where(mappingModel.get(args[i].secondMappingProp), {id: args[i].secondMappingIndex})[0].name;
                    }
                    else {
                        tempArr = _.where(mappingModel.get(args[i].mappingProp), {id: args[i].mappingIndex});
                        if(tempArr.length > 0) {
                            breadcrumbs[i].url = args[i].url;
                            breadcrumbs[i].name = _.where(mappingModel.get(args[i].mappingProp), {id: args[i].mappingIndex})[0].name;
                        }
                    }
                }
            }
            collection.reset(breadcrumbs);
        }
        else {
            setTimeout(function() {
                setBreadcrumbs.apply(null, args);
            }, 500);
        }
    }

    app.breadcrumbs.indexBC = function() {
        setBreadcrumbs({name: '\u0413\u043B\u0430\u0432\u043D\u0430\u044F'}); //Главная
    }

    app.breadcrumbs.showGroupsBC = function() {
        setBreadcrumbs({name: '\u0413\u0440\u0443\u043F\u043F\u044B', url: '#groups'}); //Группы
    }

    app.breadcrumbs.showGroupDetailsBC = function (id) {
        setBreadcrumbs(
            {
                url: '#groups',
                name: '\u0413\u0440\u0443\u043F\u043F\u044B'
            },
            {
                url: '#groups/' + id,
                mappingProp: 'groups',
                mappingIndex: id
            }
        );
    }

    app.breadcrumbs.showSBFromGroupsBC = function(groupId, studentId) {
        setBreadcrumbs(
            {
                url: '#groups',
                name: '\u0413\u0440\u0443\u043F\u043F\u044B'
            },
            {
                url: '#groups/' + groupId,
                mappingProp: 'groups',
                mappingIndex: groupId
            },
            {
                mappingProp: 'students',
                mappingIndex: studentId
            }
        );
    }

    app.breadcrumbs.showStudentsBC = function() {
        setBreadcrumbs({name: '\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B', url: '#students'}); //Студенты
    }

    app.breadcrumbs.showStudentsBookBC = function(studentId) {
        setBreadcrumbs(
            {
                url: '#students',
                name: '\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B'
            },
            {
                mappingProp: 'students',
                mappingIndex: studentId
            }
        );
    }

    app.breadcrumbs.showSubjectsBC = function() {
        setBreadcrumbs({name: '\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B', url: '#subjects'}); //Предметы
    }

    app.breadcrumbs.showSubjectDetailsBC = function(id) {
        setBreadcrumbs(
            {
                url: '#subjects',
                name: '\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B'
            },
            {
                mappingProp: 'subjects',
                mappingIndex: id
            }
        );
    }

    app.breadcrumbs.showListFromSubjectsBC = function(subjectId, groupId) {
        setBreadcrumbs(
            {
                url: '#subjects',
                name: '\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B'
            },
            {
                url: '#subjects/' + subjectId,
                mappingProp: 'subjects',
                mappingIndex: subjectId
            },
            {
                mappingProp: 'groups',
                mappingIndex: groupId
            }
        );
    }

    app.breadcrumbs.showTeachersBC = function() {
        setBreadcrumbs(
            {
                name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438', //Преподаватели
                url: '#teachers'
            }
        );
    }

    app.breadcrumbs.showTeacherDetailsBC = function(id) {
        setBreadcrumbs(
            {
                url: '#teachers',
                name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438'
            },
            {
                mappingProp: 'lectors',
                mappingIndex: id
            }
        );
    }

    app.breadcrumbs.showListBC = function(teacherId, subjectId, groupId) {
        setBreadcrumbs(
            {
                url: '#teachers',
                name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438'
            },
            {
                url: '#teachers/' + teacherId,
                mappingProp: 'lectors',
                mappingIndex: teacherId
            },
            {
                double: true,
                mappingProp: 'subjects',
                mappingIndex: subjectId,
                secondMappingProp: 'groups',
                secondMappingIndex: groupId
            }
        );
    }


});