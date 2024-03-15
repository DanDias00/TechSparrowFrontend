// views/ForgotPasswordView.js
var ForgotPasswordView = Backbone.View.extend({
    el: '#app',

    template: _.template(`
        <div class="auth-wrapper">
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
        'submit #forgotPasswordForm': 'submitForgotPassword'
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    submitForgotPassword: function(e) {
        e.preventDefault();

        var email = this.$('#email').val().trim();
        if (!email) {
            alert('Please enter your email.');
            return;
        }

     

        // Submit email to the server for password reset processing
        this.requestPasswordReset(email);
    },

    requestPasswordReset: function(email) {
        // Perform the API call to initiate the password reset process
        console.log('Requesting password reset for:', email);
        // Use $.ajax or another method to send the email to your backend
        var self = this;
        $.ajax({
            url: 'http://localhost/TechSparrow/index.php/forgot_password',
            type: 'POST',
            data: { email: email },
            success: function(response) {
                // Notify user of email sent
                alert('If there is an account associated with ' + email + ' you will receive an email with instructions to reset your password.');
                self.clearForm();
                self.undelegateEvents();
                Backbone.history.navigate('email_success', { trigger: true });
            },
            error: function() {
                // Notify user of an error
                alert('There was a problem processing your request. Please try again later.');
            }
        });
    },
    clearForm: function() {
        this.$('#email').val('');
       
    }
});


