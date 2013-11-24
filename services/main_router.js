app.module('mainRouter', function(mainRouter) {
    'use strict';

    mainRouter.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'index',

            'groups': 'showGroups',
            'groups/:id': 'showGroupDetails',
            'groups/:groupId/:studentId': 'showSBFromGroups',

            'students': 'showStudents',
            'students/:groupId/:studentId': 'showStudentsBook',

            'subjects': 'showSubjects',
            'subjects/:id': 'showSubjectDetails',
            'subjects/list/:groupId/:subjectId': 'showListFromSubjects',

            'teachers': 'showTeachers',
            'teachers/:id': 'showTeacherDetails',
            'teachers/:teacherId/list/:groupId/:subjectId': 'showList'
        }
    });
});