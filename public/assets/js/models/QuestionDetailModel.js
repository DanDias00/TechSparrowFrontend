
var QuestionDetailModel = Backbone.Model.extend({
    urlRoot: 'http://localhost/TechSparrow/api/Questions/view_question/', 

    initialize: function(options) {
        this.id = options.id;
    },

    url: function() {
        // Construct the URL with the question ID
        return this.urlRoot + this.id;
    }
});
