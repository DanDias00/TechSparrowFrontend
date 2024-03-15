

var QuestionDetailModel = Backbone.Model.extend({
    urlRoot: 'http://localhost/TechSparrow/index.php/questions_api/view_question/', // Assuming this is the correct URL to your endpoint

    initialize: function(options) {
        this.id = options.id;
    },

    url: function() {
        // Construct the URL with the question ID
        return this.urlRoot + this.id;
    }
});
