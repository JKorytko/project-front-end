Marionette.CustomView = Marionette.ItemView.extend({

    constructor: function(){
        Marionette.View.prototype.constructor.apply(this, Array.prototype.slice.call(arguments));
    },

    onShow: function() {
        this.attachEvents();
    },
    onRender: function() {
        this.setSortingState();
    },

    onClose: function() {
        this.detachEvents();
    },

    collectionEvents: {
        'sync': 'mediator'
    },

    templateHelpers: {
        extraProps: {
            roleKey: 0
        }
    },

    mediator: function(coll, response) {
        this.templateHelpers.extraProps = response.extraProps;
        this.render();
    },

    attachEvents: function() {
        this.$el.on('click.sort', '.sorting', $.proxy(this.sortCall, this));   //TODO: investigate!!!
    },

    detachEvents: function() {
        this.$el.off('click.sort');
    },

    setSortingState: function() {
        var $sortingItems = this.$el.find('.sorting'),
            order,
            sortBy;

        if(this.collection.sortingProps) {
            order = this.collection.sortingProps.order;
            sortBy = this.collection.sortingProps.sortKey;
        }
        else {
            return;
        }
        $sortingItems.each(function() {
            var $this = $(this);

            $this.removeClass('asc desc');
            if($this.data('sort-key') !== sortBy) {
                return;
            }
            if (order === -1) {
                $this.addClass('asc');
            } else {
                $this.addClass('desc');
            }
        });
    },

    sortCall: function(e) {
        var $target = $(e.currentTarget),
            order = this.collection.sortingProps.order;

        this.collection.sortingProps.sortKey = $target.data('sort-key');
        this.collection.sortingProps.order = order * -1;
        this.collection.sort();
        this.render();
    }
});

Backbone.CustomCollection = Backbone.Collection.extend({
    comparator: function (left, right) {
        var sortKey = this.sortingProps.sortKey,
            order = this.sortingProps.order,
            l = left.get(sortKey) || '',
            r = right.get(sortKey) || '',
            t;

        if (order === 1) t = l, l = r, r = t;
        if (l === r) return 0;
        else if (l < r) return -1;
        return 1;
    }
});