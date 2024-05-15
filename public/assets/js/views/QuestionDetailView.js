var QuestionDetailView = Backbone.View.extend({
    el: '#app',
    template: null,

    events: {
        "click .submit-comment": "submitComment",
        "click .submit-answer": "submitAnswer",
        "click .upvote": "upvoteAnswer",
        "click .downvote": "downvoteAnswer",
        'click .modal .close': 'hideErrorModal' // Event handler for close button
    },

    initialize: function (options) {
        console.log('QuestionDetailView initialized with options');
        this.model = new QuestionDetailModel({ id: options.id });

        this.loadTemplate(this.renderView);
        window.onpopstate = this.handleBackButtonEvent.bind(this);
    },
    handleBackButtonEvent: function (event) {
        console.log('User navigated to:', window.location.pathname);
        this.undelegateEvents(); // Remove any existing event listeners


    },

    loadTemplate: function (callback) {
        var self = this;
        // Load the external template file
        $.get('assets/html/question-detail-template.html', function (templateData) {
            self.template = _.template(templateData);
            // If there's a model id, fetch the model data
            if (self.model.id) {
                self.model.fetch({
                    success: function () {
                        console.log('Question details fetched:', self.model.toJSON());
                        console.log("model id", self.model.id);
                        callback.call(self); // Render the view after template is loaded and data is fetched
                    },
                    error: function (model, response, options) {
                        self.showErrorModal("An error occurred while fetching question details.");

                    }
                });
            }
        });
    },

    renderView: function () {
        // Making sure the template is loaded before rendering
        if (this.template) {
            this.$el.empty();

            this.$el.html(this.template(this.model.toJSON()));
        }
        return this;
    },
    submitComment: function (e) {
        e.preventDefault();
        var $form = $(e.target).closest("form");
        var data = $form.serialize();
        var self = this;

        //check if the comment is empty
        if ($form.find('textarea').val().trim() === '') {

            self.showErrorModal("Comment cannot be empty.");
            return;
        }

        $.post('http://localhost/TechSparrow/api/comment', data, function (response) {
            console.log("Comment submitted successfully.");
            self.refreshQuestion();

        }).fail(function () {
            self.showErrorModal("An error occurred while submitting your comment.");

        });

    },
    submitAnswer: function (e) {
        e.preventDefault();
        var $form = $(e.target).closest("form");
        var data = $form.serialize();
        var self = this;

        if ($form.find('textarea').val().trim() === '') {

            self.showErrorModal("Answer cannot be empty.");
            return;
        }

        $.post('http://localhost/TechSparrow/api/answer', data, function (response) {
            console.log("Answer submitted successfully.");
            self.refreshQuestion();
        }).fail(function () {
            self.showErrorModal("An error occurred while submitting your answer.");

        });

    },
    // Fetches the latest question details, including any new answers or comments.
    refreshQuestion: function () {

        this.model.fetch({
            success: function (model, response, options) {
                console.log('Question and answers refreshed:', model.toJSON());
                // Re-render the view to update list
                this.renderView();
            }.bind(this),
            error: function (model, response, options) {
                self.showErrorModal("An error occurred while refreshing the question.");

            }
        });
    },

    upvoteAnswer: function (e) {
        e.preventDefault();
        console.log("upvote");
        var answerId = $(e.currentTarget).data('answer-id');
        this.vote(answerId, 'upvote');
    },
    downvoteAnswer: function (e) {
        e.preventDefault();
        console.log("downvote");
        var answerId = $(e.currentTarget).data('answer-id');
        this.vote(answerId, 'downvote');
    },
    vote: function (answerId, type) {
        var self = this;
        var sessionData = JSON.parse(localStorage.getItem('session'));
        var $user_id = sessionData.user_id;

        $.ajax({
            url: 'http://localhost/TechSparrow/api/answer/vote/' + type, // The endpoint for voting
            type: 'POST',
            data: { answer_id: answerId,user_id: $user_id },
            success: function (response) {

                self.refreshQuestion();
            },
            error: function (xhr, status, error) {

                if (xhr.status === 400) {

                    self.showErrorModal("You have already voted on this answer.");
                }
                else if (xhr.status === 401) {
                    alert("You must be logged in to vote.");
                    self.showErrorModal("You must be logged in to vote.");
                }
                else if (xhr.status === 500) {
                    self.showErrorModal("An error occurred while voting.");

                }
            }
        });
    },
    showErrorModal: function (errorMessage) {
        // Update modal body with error message
        console.log("Error message: " + errorMessage);
        this.$('#errorModalBody').text(errorMessage);
        // Show the modal
        this.$('#errorModal').modal('show');
    },

    hideErrorModal: function () {
        // Hide the modal
        this.$('#errorModal').modal('hide');
    }
});
