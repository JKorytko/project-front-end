app.module('mainRouter', function(mainRouter, app) {
    'use strict';

    var Controller = Marionette.Controller.extend({
        index: function() {
            app.home.show();
            app.breadcrumbs.setBreadcrumbs({name: '\u0413\u043B\u0430\u0432\u043D\u0430\u044F'}); //Главная
        },

        showGroups: function() {
            app.groups.show();
            app.breadcrumbs.setBreadcrumbs({name: '\u0413\u0440\u0443\u043F\u043F\u044B'}); //Группы
        },
        showGroupDetails: function(id) {
            app.groups.details.show(id);
            app.breadcrumbs.setBreadcrumbs(
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
        },
        showSBFromGroups: function(groupId, studentId) {
            app.students.recordBook.show(groupId, studentId);
            app.breadcrumbs.setBreadcrumbs(
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
        },

        //related to student
        showStudents: function() {
            app.students.show();
            app.breadcrumbs.setBreadcrumbs({name: '\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B'}); //Студенты
        },
        showStudentsBook: function(groupId, studentId) {
            app.students.recordBook.show(groupId, studentId);
            app.breadcrumbs.setBreadcrumbs(
                {
                    url: '#students',
                    name: '\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u044B'
                },
                {
                    mappingProp: 'students',
                    mappingIndex: studentId
                }
            );
        },

        //related to subject
        showSubjects: function() {
            app.subjects.show();
            app.breadcrumbs.setBreadcrumbs({name: '\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B'}); //Предметы
        },
        showSubjectDetails: function(id) {
            app.subjects.details.show(id);
            app.breadcrumbs.setBreadcrumbs(
                {
                    url: '#subjects',
                    name: '\u041F\u0440\u0435\u0434\u043C\u0435\u0442\u044B'
                },
                {
                    mappingProp: 'subjects',
                    mappingIndex: id
                }
            );
        },
        showListFromSubjects: function(groupId, subjectId) {
            app.subjects.list.show(groupId, subjectId);
            app.breadcrumbs.setBreadcrumbs(
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
        },

        //related to teacher
        showTeachers: function() {
            app.teachers.show();
            app.breadcrumbs.setBreadcrumbs({name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438'}); //Преподаватели
        },
        showTeacherDetails: function(id) {
            app.teachers.details.show(id);
            app.breadcrumbs.setBreadcrumbs(
                {
                    url: '#teachers',
                    name: '\u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438'
                },
                {
                    mappingProp: 'lectors',
                    mappingIndex: id
                }
            );
        },
        showList: function(teacherId, groupId, subjectId) {
            app.subjects.list.show(groupId, subjectId);
            app.breadcrumbs.setBreadcrumbs(
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

    mainRouter.controller = new Controller();

    mainRouter.router = new mainRouter.Router({
        controller: mainRouter.controller
    });

    //saving last callback to refresh widget in future
    mainRouter.router.on('route', function(callbackName) {
        mainRouter.currentCallbackName = callbackName;
    });
});