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
        // Here, send the login request to the backend
        console.log('Attempting to log in with:', this.user.get('username'), this.user.get('password'));
        
        $.ajax({
            url: 'http://localhost/TechSparrow/index.php/login', // Replace with your actual endpoint
            type: 'POST',
            data: this.user.toJSON(),
            success: function(response) {
                console.log('Login successful:', response);
                Backbone.history.navigate('questions', { trigger: true });
               
            },
            error: function(error) {
                console.error('Login failed:', error);
               
            }
        });
    }
});
