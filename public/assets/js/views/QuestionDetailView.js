var QuestionDetailView = Backbone.View.extend({
    el: '#app',
    template: null, // This will be set after the template is loaded

    events: {
        "click .submit-comment": "submitComment",
        "click .submit-answer": "submitAnswer",
        "click .upvote": "upvoteAnswer",
        "click .downvote": "downvoteAnswer"
    },

    initialize: function(options) {
        console.log('QuestionDetailView initialized with options');
        this.model = new QuestionDetailModel({id: options.id});
       
        this.loadTemplate(this.renderView); 
        window.onpopstate = this.handleBackButtonEvent.bind(this);
    },
    handleBackButtonEvent: function(event) {
        console.log('User navigated to:', window.location.pathname);
        this.undelegateEvents(); // Remove any existing event listeners
    
        
    },
   
    loadTemplate: function(callback) {
        var self = this;
        // Load the external template file
        $.get('assets/html/question-detail-template.html', function(templateData) {
            self.template = _.template(templateData);
            // If there's a model id, fetch the model data
            if (self.model.id) {
                self.model.fetch({
                    success: function() {
                        console.log('Question details fetched:', self.model.toJSON());
                        console.log("model id",self.model.id);
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
        // Making sure the template is loaded before rendering
        if (this.template) {
            this.$el.empty();
           
            this.$el.html(this.template(this.model.toJSON()));
        }
        return this;
    },
    submitComment: function(e) {
        e.preventDefault();
        var $form = $(e.target).closest("form");
        var data = $form.serialize();
        var self = this;

         // Send the form data to the server asynchronously.
        $.post('http://localhost/TechSparrow/index.php/comment', data, function(response) {
            console.log("Comment submitted successfully.");
            self.refreshQuestion();
          
        }).fail(function() {
            console.error("Error submitting comment.");
        });
     
    },
    submitAnswer: function(e) {
        e.preventDefault();
        var $form = $(e.target).closest("form");
        var data = $form.serialize();
        var self = this;

         // Send the form data to the server asynchronously.
        $.post('http://localhost/TechSparrow/index.php/answer', data, function(response) {
            console.log("Answer submitted successfully.");
            self.refreshQuestion();
        }).fail(function() {
            console.error("Error submitting answer.");
        });
       
    },
     // Fetches the latest question details, including any new answers or comments.
    refreshQuestion: function() {
    
        this.model.fetch({
            success: function(model, response, options) {
                console.log('Question and answers refreshed:', model.toJSON());
                // Re-render the view to update list
                this.renderView();
            }.bind(this),
            error: function(model, response, options) {
                console.error("Error refreshing answers:", response);
            }
        });
    },

    upvoteAnswer: function(e) {
        e.preventDefault();
        console.log("upvote");
        var answerId = $(e.currentTarget).data('answer-id');
        this.vote(answerId, 'upvote');
    },
    downvoteAnswer: function(e) {
        e.preventDefault();
        console.log("downvote");
        var answerId = $(e.currentTarget).data('answer-id');
        this.vote(answerId, 'downvote');
    },
    vote: function(answerId, type) {
        var self = this;
        $.ajax({
            url: 'http://localhost/TechSparrow/index.php/answer/vote/' + type, // The endpoint for voting
            type: 'POST',
            data: { answer_id: answerId },
            success: function(response) {
                if (response.status === 'success') {
                    console.log(type + " success:", response);
                    self.refreshQuestion();
                } else {
                    console.error(type + " error:", response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error(type + " failure:", error);
            }
        });
    },
});
