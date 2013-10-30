app.module('mainRouter', function(mainRouter, app) {
    'use strict';

    var Controller = Marionette.Controller.extend({
        index: function() {
            app.home.show();
        },

        showGroups: function() {
            app.groups.show();
        },
        showGroupDetails: function(id) {
            app.groups.details.show(id);
        },

        //related to student
        showStudents: function() {
            app.students.show();
        },
        showStudentsBook: function(groupId, studentId) {
            app.students.recordBook.show(groupId, studentId);
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
        },
        showList: function(groupId, subjectId) {
            app.subjects.list.show(groupId, subjectId);
        }
    });

    new mainRouter.Router({
        controller: new Controller()
    });
});