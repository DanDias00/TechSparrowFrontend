// MyProfileView.js
var MyProfileView = Backbone.View.extend({
    el: '#app',
    
    events: {
        'click #logoutButton': 'logout',
        'click #deleteAccountButton': 'deleteAccount',
        'submit #resetPasswordForm': 'resetPassword' // Updated event binding
    },
    
    initialize: function() {
        this.model = new UserModel();
        var self = this;
        // Retrieve session data from local storage
        var sessionData = JSON.parse(localStorage.getItem('session'));
    
        if (sessionData && sessionData.loggedIn) {
            // If session exists and user is logged in, fetch user data from the server
            $.ajax({
                url: 'http://localhost/TechSparrow/index.php/profile',
                type: 'GET',
                success: function(response) {
                    // Set the user model with the retrieved data
                    self.model.set(response.message);
                    // Save the user data to local storage for future use
                    localStorage.setItem('session', JSON.stringify(response.message));
                    // Load user profile template
                    $.get('assets/html/user-profile-template.html', function(template) {
                        self.template = _.template(template);
                        // Render the view
                        self.render();
                    });
                },
                error: function(xhr, status, error) {
                    // Handle error if any
                    if (status === 401 || status === 403) {
                        console.error("Unauthorized access, redirecting...");
                        // Redirect to login page
                        Backbone.history.navigate('login', { trigger: true });
                    } else {
                        console.error("Something went wrong. Please try again later.");
                        // Redirect to home page
                        Backbone.history.navigate('', { trigger: true });
                    }
                }
            });
        } else {
            // If session doesn't exist or user is not logged in, redirect to home page
            console.error("User not logged in. Redirecting...");
            Backbone.history.navigate('login', { trigger: true });
        }
    },
     
    render: function() {
        if (this.template && this.model) {
            this.$el.html(this.template(this.model.toJSON()));
        } else {
            
        }
        return this;
    },
    
    logout: function() {
        $.ajax({
            url: 'http://localhost/TechSparrow/index.php/logout',
            type: 'GET',
            success: function(response) {
                console.log('Logout successful:', response);
                // Clear the user data from local storage
                localStorage.removeItem('session');
                // Redirect the user to the logout success page
                Backbone.history.navigate('', { trigger: true });
            },
            error: function(xhr, status, error) {
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
                alert(errorMessage);
            }
        });
    },
    
    deleteAccount: function() {
        var self = this;
        var userId = JSON.parse(localStorage.getItem('session')).user_id;
        console.log('Deleting account for user ID:', userId);
        $.ajax({
            url: 'http://localhost/TechSparrow/index.php/delete_account/' + userId,
            type: 'POST', 
            success: function(response) {
                // Remove the session data from local storage
                localStorage.removeItem('session');
                // Redirect the user to the delete success page
                Backbone.history.navigate('accountDelete', { trigger: true });
            },
            error: function(xhr, status, error) {
                // Handle error if any
                console.error('Error deleting account:', error);
                alert('An error occurred while deleting your account. Please try again later.');
            }
        });
    },
    
    resetPassword: function(event) {
        event.preventDefault();
        var newPasswordInput = this.$('#resetPasswordinput');
        var newPassword = newPasswordInput.val().trim(); // Trim whitespace from the password
        // Check if the password contains only alphanumeric characters and allowed special characters
        var passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/; // Adjust the allowed special characters as needed
        if (!passwordRegex.test(newPassword)) {
            // Password contains disallowed characters, show an error message and prevent further action
            alert('Password contains disallowed characters. Please use only alphanumeric characters and allowed special characters.');
            newPasswordInput.val(''); // Clear the password input field
            return;
        }
        var userId = JSON.parse(localStorage.getItem('session')).user_id;
        this.resetPasswordCall(newPassword, userId);
    },
    resetPasswordCall: function(newPassword, userId) {
     
        console.log('Submitting new password for user ID: ',userId);
        var self = this;
      
        $.ajax({
            url: 'http://localhost/TechSparrow/index.php/reset_password',
            type: 'POST',
            data: { user_id:userId, 
            password: newPassword },
            success: function(response) {
                self.clearForm();
                self.undelegateEvents();
                localStorage.removeItem('session');
                Backbone.history.navigate('success', { trigger: true });
            },
            error:function(xhr, status, error){
                if(status === 401 || status === 403){
                    console.error("Unauthorized access, redirecting...");
                    self.undelegateEvents();
                   
                } else {
                    alert("Something went wrong. Please try again later.");
                    self.undelegateEvents();
                   
                }
            }
        });
    },
    clearForm: function() {
        this.$('#password').val('');
     
       
    }


        
});
