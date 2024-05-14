var LoginView = Backbone.View.extend({
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
                <h2>Login</h2>
                <form id="loginForm">
                    <!-- Form content here -->
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" class="form-control" id="username" placeholder="Enter your username" required autocomplete="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" placeholder="Enter your password" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block" id="loginButton">Log in</button>
                    <p class="forgot-password text-right mt-3">
                        Forgot <a href="#forgot">password</a>
                    </p>
                    <p class="account">
                        Don't have an account? <a href="#register">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    `),

    events: {
        'submit #loginForm': 'onFormSubmit', // Event handler for form submission
        'click .modal .close': 'hideErrorModal' // Event handler for close button
    },

    initialize: function() {
        this.user = new UserModel();
        this.session = new SessionModel();
        this.render();
        document.title = "Login";
    },

    render: function() {
        this.$el.empty().html(this.template());
        return this;
    },

    onFormSubmit: function(event) {
        event.preventDefault();
        this.user.set({
            username: this.$('#username').val(),
            password: this.$('#password').val()
        });

        this.login();
    },

    login: function() {
        var self = this;

        $.ajax({
            url: 'http://localhost/TechSparrow/api/auth/login',
            type: 'POST',
            data: this.user.toJSON(),
            success: function(response) {
                self.session.set({
                    loggedIn: true,
                    userId: response.message.user_id,
                    username: response.message.username
                });

                localStorage.setItem('session', JSON.stringify(self.session.toJSON()));

                self.session.trigger('change');

                Backbone.history.navigate('questions', { trigger: true });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var errorMessage;
                switch (jqXHR.status) {
                    case 404:
                        errorMessage = 'URL not found.';
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

                // Display error message in Bootstrap modal
                self.showErrorModal(errorMessage);
            }
        });
    },

    showErrorModal: function(errorMessage) {
        // Update modal body with error message
        console.log("Error message: " + errorMessage);
        this.$('#errorModalBody').text(errorMessage);
        // Show the modal
        this.$('#errorModal').modal('show');
    },

    hideErrorModal: function() {
        // Hide the modal
        this.$('#errorModal').modal('hide');
    }
});
