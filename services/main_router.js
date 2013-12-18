app.module('mainRouter', function(mainRouter) {
    'use strict';

    mainRouter.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'index',

            'groups': 'showGroups',
            'groups/search/:searchWord': 'showGroupsSearchResults',
            'groups/:id': 'showGroupDetails',
            'groups/:groupId/:studentId': 'showSBFromGroups',

            'students': 'showStudents',
            'students/search/:searchWord': 'showStudentsSearchResults',
            'students/:groupId/:studentId': 'showStudentsBook',

            'subjects': 'showSubjects',
            'subjects/search/:searchWord': 'showSubjectsSearchResults',
            'subjects/:id': 'showSubjectDetails',
            'subjects/list/:groupId/:subjectId': 'showListFromSubjects',

            'teachers': 'showTeachers',
            'teachers/search/:searchWord': 'showTeachersSearchResults',
            'teachers/:id': 'showTeacherDetails',
            'teachers/:teacherId/list/:groupId/:subjectId': 'showList',
            'teachers/:teacherId/list/:groupId/:subjectId/edit': 'showEditableList'
        }
    });
});