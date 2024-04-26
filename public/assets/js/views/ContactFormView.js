var ContactFormView = Backbone.View.extend({
    el: '#app',

    template: _.template(''), // Placeholder for template content

    events: {
        'submit form': 'handleSubmit',
        'click .modal .close': 'hideModal'
    },

    initialize: function() {
        this.model = new ContactFormModel();
        this.fetchTemplate(); // Fetch the template when initializing
    },

    fetchTemplate: function() {
        var self = this;
        // Load the template from external file
        $.get('assets/html/contact-form-template.html', function(templateContent) {
            self.template = _.template(templateContent); // Set the template content
            self.render(); // Render the view after template is loaded
        });
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    handleSubmit: function(event) {
        event.preventDefault();

       //check empty fields
        if (this.$('#name').val().trim() === '' || this.$('#email').val().trim() === '' || this.$('#message').val().trim() === '') {
            this.showModal('Error', 'One or more fields are empty.', '#errorModal');
            return;
        }
        this.model.set({
            name: this.$('#name').val(),
            email: this.$('#email').val(),
            message: this.$('#message').val()
        });

        this.showModal('Success', 'Email Sent!', '#successModal');


    },
    showModal: function(title, message, modalSelector) {
        // Update modal title and body with provided title and message
        this.$(modalSelector + 'Label').text(title);
        this.$(modalSelector + 'Body').text(message);
        // Show the modal
        this.$(modalSelector).modal('show');
    },

    hideModal: function() {
        // Hide the modal
        this.$('.modal').modal('hide');
    }
});
