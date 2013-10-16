app.module('mainRouter', function(mainRouter, app) {
    'use strict';

    var Controller = Marionette.Controller.extend({
        index: function() {
            app.home.show();
        },

        showGroups: function() {
            console.log('groups!');
        },

        //related to student
        showStudents: function() {
            app.students.show();
        },
        showStudentsBook: function(id) {
            app.students.recordBook.show(id);
        },

        //related to subject
        showSubjects: function() {
            app.subjects.show();
        },
        showSubjectDetails: function(id) {
            app.subjects.details.show(id);
        },

        //related to teacher
        showTeachers: function() {
            app.teachers.show();
        },
        showTeacherDetails: function(id) {
            app.teachers.details.show(id);
        }
    });

    new mainRouter.Router({
        controller: new Controller()
    });
});