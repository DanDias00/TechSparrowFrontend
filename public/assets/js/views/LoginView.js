// views/LoginView.js

var LoginView = Backbone.View.extend({
    el: '#app',

    template: _.template(`
        <div class="auth-wrapper">
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
                    <button type="submit" class="btn btn-primary btn-block" id="loginButton">Log</button>
                    <!-- Additional links here -->
                </form>
            </div>
        </div>
    `),

    events: {
        'submit #loginForm': 'onFormSubmit'
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
        event.preventDefault();
        console.log('Form submitted');
        this.user.set({
            username: this.$('#username').val(),
            password: this.$('#password').val()
        });

        this.login();
    },

    login: function() {

        
       $.ajax({
            url: 'http://localhost/TechSparrow/index.php/login', 
            type: 'POST',
            data: this.user.toJSON(),
            success: function(response) {
                console.log('Login successful:', response);

                Backbone.history.navigate('questions', { trigger: true });
               
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
               // Display error message to the user
            console.error(errorMessage);
            }
            
        
        });
       
    }
});
