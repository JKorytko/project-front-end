app.module('mainRouter', function(mainRouter, app) {
    'use strict';

    var Controller = Marionette.Controller.extend({
        index: function() {
            app.home.show();
            app.breadcrumbs.indexBC();
        },

        showGroups: function() {
            app.groups.show();
            app.breadcrumbs.showGroupsBC();
        },
        showGroupsSearchResults: function(searchWord) {
            app.groups.show(searchWord);
            app.breadcrumbs.showGroupsBC();
        },
        showGroupDetails: function(id) {
            app.groups.details.show(id);
            app.breadcrumbs.showGroupDetailsBC(id);
        },
        showSBFromGroups: function(groupId, studentId) {
            app.students.recordBook.show(groupId, studentId);
            app.breadcrumbs.showSBFromGroupsBC(groupId, studentId);
        },

        //related to student
        showStudents: function() {
            app.students.show();
            app.breadcrumbs.showStudentsBC();
        },
        showStudentsSearchResults: function(searchWord) {
            app.students.show(searchWord);
            app.breadcrumbs.showStudentsBC();
        },
        showStudentsBook: function(groupId, studentId) {
            app.students.recordBook.show(groupId, studentId);
            app.breadcrumbs.showStudentsBookBC(studentId);
        },

        //related to subject
        showSubjects: function() {
            app.subjects.show();
            app.breadcrumbs.showSubjectsBC();
        },
        showSubjectsSearchResults: function(searchWord) {
            app.subjects.show(searchWord);
            app.breadcrumbs.showSubjectsBC();
        },
        showSubjectDetails: function(id) {
            app.subjects.details.show(id);
            app.breadcrumbs.showSubjectDetailsBC();
        },
        showListFromSubjects: function(groupId, subjectId) {
            app.subjects.list.show(groupId, subjectId);
            app.breadcrumbs.showListFromSubjectsBC(subjectId, groupId);
        },

        //related to teacher
        showTeachers: function() {
            app.teachers.show();
            app.breadcrumbs.showTeachersBC();
        },
        showTeachersSearchResults: function(searchWord) {
            app.teachers.show(searchWord);
            app.breadcrumbs.showTeachersBC();
        },
        showTeacherDetails: function(id) {
            app.teachers.details.show(id);
            app.breadcrumbs.showTeacherDetailsBC(id);
        },
        showList: function(teacherId, groupId, subjectId) {
            app.subjects.list.show(groupId, subjectId);
            app.breadcrumbs.showListBC(teacherId, subjectId, groupId);
        },
        showEditableList: function(teacherId, groupId, subjectId) {
            app.subjects.editableList.show(groupId, subjectId);
            app.breadcrumbs.showListBC(teacherId, subjectId, groupId);
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