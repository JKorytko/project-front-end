app.module('mainRouter', function(mainRouter) {
    'use strict';

    mainRouter.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'index',

            'groups': 'showGroups',
            'groups/:id': 'showGroupDetails',

            'students': 'showStudents',
            'students/:groupId/:studentId': 'showStudentsBook',

            'subjects': 'showSubjects',
            'subjects/:id': 'showSubjectDetails',

            'teachers': 'showTeachers',
            'teachers/:id': 'showTeacherDetails'
        }
    });
});