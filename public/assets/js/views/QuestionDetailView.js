var QuestionDetailView = Backbone.View.extend({
    el: '#app',
    template: null, // This will be set after the template is loaded

    events: {
        "click .submit-comment": "submitComment",
        "click .submit-answer": "submitAnswer"
    },

    initialize: function(options) {
        console.log('QuestionDetailView initialized with options');
        this.model = new QuestionDetailModel({id: options.id});
        this.loadTemplate(this.renderView); // Pass the renderView method as a callback
    },

    loadTemplate: function(callback) {
        var self = this;
        // Load the external template file
        $.get('assets/html/question-detail-template.html', function(templateHtml) {
            self.template = _.template(templateHtml);
            // If there's a model id, fetch the model data
            if (self.model.id) {
                self.model.fetch({
                    success: function() {
                        console.log('Question details fetched:', self.model.toJSON());
                        callback.call(self); // Render the view after template is loaded and data is fetched
                    },
                    error: function(model, response, options) {
                        console.error("Error fetching question details:", response);
                    }
                });
            }
        });
    },

    renderView: function() {
        // Make sure the template is loaded before rendering
        if (this.template) {
           
            this.$el.html(this.template(this.model.toJSON()));
        }
        return this;
    },
    submitComment: function(e) {
        e.preventDefault();
        var $form = $(e.target).closest("form");
        var data = $form.serialize();

        // Implement AJAX submission for the comment
        $.post('/index.php/submit_comment', data, function(response) {
            console.log("Comment submitted successfully.");
            // Optionally refresh comments list here
        }).fail(function() {
            console.error("Error submitting comment.");
        });
    },
    submitAnswer: function(e) {
        e.preventDefault();
        var $form = $(e.target).closest("form");
        var data = $form.serialize();

        // Implement AJAX submission for the answer
        $.post('http://localhost/TechSparrow/index.php/api/answer/submit', data, function(response) {
            console.log("Answer submitted successfully.");
            // Optionally refresh answers list here
        }).fail(function() {
            console.error("Error submitting answer.");
        });
    }
});
