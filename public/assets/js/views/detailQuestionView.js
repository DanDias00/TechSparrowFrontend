var QuestionView = Backbone.View.extend({
    el: '#app', 

    initialize: function(options) {
        this.questionId = options.questionId;
        this.render();
    },

    render: function() {
     
        var template = _.template();
        this.$el.html(template);
    }
});
