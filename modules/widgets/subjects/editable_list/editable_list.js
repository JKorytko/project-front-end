app.module('subjects.editableList', function(list, app) {
    'use strict';

    var Collection = Backbone.CustomCollection.extend({
        sortingProps: {
            sortKey: 'name_student',
            order: -1
        }
    });

    var collection = new Collection();

    var View = Marionette.CustomView.extend({
        template: 'modules/widgets/subjects/editable_list/editable_list.html',

        collection: collection,

        changedGradesArr: [],

        events: {
            'change .grades': 'setChangedGrade',
            'click .save_changes': 'saveChanges'
        },

        onClose: function() {
            this.changedGradesArr.length = 0;
        },

        setChangedGrade: function(e) {
            var $target = $(e.target),
                $accept = this.$el.find('.save_changes'),
                moduleID = $target.closest('select').data('module-id'),
                tempArr = _.where(this.changedGradesArr, {moduleID: moduleID}),
                tempObj = {
                    moduleID: moduleID,
                    studentID: $target.closest('tr').data('student-id'),
                    groupID: $target.closest('table').data('group-id'),
                    grade: $target.val()
                };

            $accept.removeClass('hidden');
            if(tempArr.length > 0) {
                this.changedGradesArr[this.changedGradesArr.indexOf(tempArr[0])] = tempObj;
            } else {
                this.changedGradesArr.push(tempObj);
            }
            console.log(tempArr, this.changedGradesArr)
        },

        saveChanges: function(e) {
            var currRoute = Backbone.history.fragment,
                data = {
                    grades: this.changedGradesArr
                };

            console.log(data)
            e.preventDefault();
            //TODO ajax doesn't work
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: app.mainUrl + '/supporting/updateGrade.php',
                data: JSON.stringify(data),
                success: function() {
                    console.log(228)
                    Backbone.history.navigate(currRoute.substr(0, currRoute.length - 5), true);
                },
                error: function(a, b, c) {
                    console.log(b, c);
                }
            });
        }
    });

    list.show = function(groupId, subjectId) {
        app.mainRegion.show(new View());
        collection.fetch({
            url: app.mainUrl + '/subjects/vedomost.php?subjectId=' + subjectId + '&groupId=' + groupId
        });
    }
});
