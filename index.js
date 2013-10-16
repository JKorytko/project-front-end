var app = new Marionette.Application(),
    templates;

templates = [
    'modules/header/header.html',
    'modules/breadcrumbs/breadcrumbs.html',

    'modules/widgets/home/home.html',

    'modules/widgets/students/students.html',
    'modules/widgets/students/students_record_book/students_record_book.html',

    'modules/widgets/subjects/subjects.html',
    'modules/widgets/subjects/subject_details/subject_details.html',

    'modules/widgets/teachers/teachers.html',
    'modules/widgets/teachers/teacher_details/teacher_details.html'
];

app.addRegions({
    headerRegion: '#header',
    breadcrumbsRegion: '#breadcrumbs',
    mainRegion: '#main'
});

app.on('initialize:after', function() {
    Backbone.history.start();
});

window.onload = function() {
    var preLoading = Marionette.TemplateCache.preloadTemplates(templates);
    $.when(preLoading).done(function() {
        app.start();
    });
}