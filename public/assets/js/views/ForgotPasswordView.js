// views/ForgotPasswordView.js
var ForgotPasswordView = Backbone.View.extend({
    el: '#app',

    template: _.template(`
        <div class="auth-wrapper">
        <!-- Bootstrap Modal for Error Messages -->
        <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="errorModalLabel">Error</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="errorModalBody">
                        <!-- Error message will be rendered here -->
                    </div>
                </div>
            </div>
        </div>
            <div class="auth-inner">
                <h2>Forgot password</h2>
                <p>Enter the email you signed up with to receive reset credentials</p>
                <form id="forgotPasswordForm">
                    <div class="form-group">
                        <input type="email" class="form-control" id="email" placeholder="Enter your Email" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>
    `),

    events: {
        'submit #forgotPasswordForm': 'submitForgotPassword',
        'click .modal .close': 'hideErrorModal' // Event handler for close button

    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    submitForgotPassword: function (e) {
        e.preventDefault();

        var email = this.$('#email').val().trim();
        if (!email) {
            alert('Please enter your email.');
            return;
        }

        // Submit email to the server for password reset processing
        this.requestPasswordReset(email);
    },

    requestPasswordReset: function (email) {
        var self = this;
        $.ajax({
            url: 'http://localhost/TechSparrow/api/auth/forgot_password',
            type: 'POST',
            data: { email: email },
            success: function (response) {

                self.clearForm();
                self.undelegateEvents();
                Backbone.history.navigate('email_success', { trigger: true });
            },
            error: function (jqXHR,response, error) {
                // Notify user of an error
                switch (jqXHR.status) {
                    case 400:
                        errorMessage = 'No valid account found with that email address.';
                        break;
                    case 500:
                        errorMessage = 'Something went wrong.';
                        break;
                    case 401:
                        errorMessage = 'Unauthorized access.';
                        break;
                    default:
                        errorMessage = 'An error occurred.';
                }
        
                self.showErrorModal(errorMessage);
            }
        });
    },
    clearForm: function () {
        this.$('#email').val('');

    },
    showErrorModal: function(errorMessage) {
        // Update modal body with error message
        this.$('#errorModalBody').text(errorMessage);
        // Show the modal
        this.$('#errorModal').modal('show');
    },

    hideErrorModal: function() {
        // Hide the modal
        this.$('#errorModal').modal('hide');
    }
});


