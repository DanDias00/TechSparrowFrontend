// views/AskQuestionView.js
var AskQuestionView = Backbone.View.extend({
    el: '#app',

    events: {
        'click #submit-question': 'submitQuestion',
        'click .modal .close': 'hideErrorModal'

    },

    initialize: function () {
        var self = this;
        // Fetch the template content from the HTML file
        $.get('assets/html/ask-question-template.html', function (templateHtml) {
            // Once fetched, set the template function
            self.template = _.template(templateHtml);
            // Render the view
            self.render();

        });
    },

    render: function () {
        // Use the compiled template to render the form
        this.$el.html(this.template());
        return this;
    },

    submitQuestion: function (e) {
        e.preventDefault(); // Prevent the form from submitting traditionally

        // Retrieve values from the form
        var title = this.$('#title').val();
        var body = this.$('#body').val();
        // Convert tags array to a comma-separated string
        var tags = this.$('#tags').val().split(',').map(function (tag) { return tag.trim(); }).join(',');

        // Check if any of the fields are empty
        if (title.trim() === '' || body.trim() === '' || tags.trim() === '') {
            // Show an error message or perform some other action to indicate that fields are empty
            this.showErrorModal('One or more fields are empty');
            return;
        }

        // Prepare the form data as an object
        var questionData = {
            title: title,
            body: body,
            tags: tags // Tags as a comma-separated string
        };

        var self = this;

        // API call to send the data to the backend using AJAX
        $.ajax({
            type: 'POST',
            url: 'http://localhost/TechSparrow/question',

            data: questionData,
            success: function (response) {
                console.log('Question successfully submitted');
                self.clearForm();
                self.undelegateEvents(); // Remove any existing event listeners
                Backbone.history.navigate('questions', { trigger: true });

            },
            error: function (xhr, status, error) {
                this.showErrorModal('Error submitting question');
            }
        });
    },
    clearForm: function () {
        this.$('#title').val('');
        this.$('#body').val('');
        this.$('#tags').val('');
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
