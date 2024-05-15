// views/LoginView.js

var RegisterView = Backbone.View.extend({
    el: '#app',

    template: _.template(`
        <div class="register-auth-wrapper">
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
        <!-- Bootstrap Modal for Success Messages -->
        <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="successModalLabel">Success</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="successModalBody">
                        <!-- Success message will be rendered here -->
                    </div>
                   
                </div>
            </div>
        </div>
            <div class="register-auth-inner">
                <h2>Register</h2>
                <form id="registerForm">
                    <!-- Form content here -->
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" class="form-control" id="username" placeholder="Enter your username" required autocomplete="username">
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="text" class="form-control" id="email" placeholder="Enter your email" required autocomplete="email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" placeholder="Enter your password" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Confirm Password:</label>
                        <input type="password" class="form-control" id="confirm_password" placeholder="confirm your password" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block" id="registerButton">Sign up</button>
                    <p class="account mt-3 text-center">
                        Already have an account? <a href="#login">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    `),

    events: {
        'submit #registerForm': 'onFormSubmit',
        'click .modal .close': 'hideModal'
    },

    initialize: function() {
        this.user = new UserModel();
        this.render();
    },

    render: function() {
        $('#app').empty().html(this.template());
        return this;
    },

    onFormSubmit: function(event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Retrieve values from the form
        var username = this.$('#username').val().trim();
        var email = this.$('#email').val().trim();
        var password = this.$('#password').val();
        var confirmPassword = this.$('#confirm_password').val();

        // Validate the inputs
        if (!username || !email || !password || !confirmPassword) {
           
            this.showModal('Error', 'All fields are required.', '#errorModal');
            return false; 
        }

        if (!this.isValidEmail(email)) {
          
            this.showModal('Error', 'Please enter a valid email address.', '#errorModal');
            return false; // Stop further execution
        }

        if (password !== confirmPassword) {
           
            this.showModal('Error', 'Passwords do not match.', '#errorModal');
            return false; 
        }

        // If all validations pass, set the user model and call register
        this.user.set({
            username: username,
            password: password,
            email: email,
            
        });

        this.register();
    },

    isValidEmail: function(email) {
        // Regular expression for basic email validation
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    register: function() {
       $.ajax({
        
            url: 'http://localhost/TechSparrow/api/auth/register', 
            type: 'POST',
            data: this.user.toJSON(),
            success: function(response) {
            
                Backbone.history.navigate('login', { trigger: true });
               
            },
            error: function(jqXHR, textStatus, errorThrown) {
            
                var errorMessage;
            switch (jqXHR.status) {
                case 404:
                    errorMessage = 'URL not found.';
                    break;
                case 500:
                    errorMessage = 'something went wrong.';
                    break;
                case 401:
                    errorMessage = 'Unauthorized access.';
                    break;
                default:
                    errorMessage = 'An error occurred.';
            }
            this.showModal('Error', errorMessage, '#errorModal');
            }
            
        
        });
       
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
