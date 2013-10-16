app.module('mainRouter', function(mainRouter) {
    'use strict';

    mainRouter.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'index',
            'groups': 'showGroups',

            'students': 'showStudents',
            'students/:id': 'showStudentsBook',

            'subjects': 'showSubjects',
            'subjects/:id': 'showSubjectDetails',

            'teachers': 'showTeachers',
            'teachers/:id': 'showTeacherDetails'
        }
    });
});