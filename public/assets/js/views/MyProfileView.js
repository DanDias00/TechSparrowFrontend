// MyProfileView.js
var MyProfileView = Backbone.View.extend({
    el: '#app',
    
    events: {
        'click #logoutButton': 'logout',
        'click #deleteAccountButton': 'deleteAccount',
        'submit #resetPasswordForm': 'resetPassword', // Updated event binding
        'click .modal .close': 'hideModal'
    },
    
    initialize: function() {
        this.model = new UserModel();
        var self = this;
        // Retrieve session data from local storage
        var sessionData = JSON.parse(localStorage.getItem('session'));
        document.title = "Tech Sparrow - My Profile";
    
        if (sessionData && sessionData.loggedIn) {
            // If session exists and user is logged in, fetch user data from the server
            $.ajax({
                url: 'http://localhost/TechSparrow/profile',
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
                        self.showModal('Unauthorized Access', 'You are not authorized to view this page.', '#errorModal');
                    
                        // Redirect to login page
                        Backbone.history.navigate('login', { trigger: true });
                    } else {
                        console.error("Something went wrong. Please try again later.");
                        self.showModal('Error', 'An error occurred while fetching user data.', '#errorModal');
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
        var self = this;
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
                
                self.showModal('Error', errorMessage, '#errorModal');
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
                self.showModal('Success', 'Account deleted successfully.', '#successModal');
            },
            error: function(xhr, status, error) {
                // Handle error if any
                self.showModal('Error', 'An error occurred while deleting your account.', '#errorModal');
            }
        });
    },
    
    resetPassword: function(event) {
        event.preventDefault();
        var newPasswordInput = this.$('#resetPasswordinput');

        if (newPasswordInput.val().trim() === '') {
            // Show an error message if the password field is empty
            this.showModal('Error', 'Password cannot be empty.', '#errorModal');
            return;
        }
        var newPassword = newPasswordInput.val().trim(); // Trim whitespace from the password
        // Check if the password contains only alphanumeric characters and allowed special characters
        var passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/; // Adjust the allowed special characters as needed
        if (!passwordRegex.test(newPassword)) {
            // Password contains disallowed characters, show an error message and prevent further action
            self.showModal('Error', 'Password contains disallowed characters. Please use only alphanumeric characters and allowed special characters.', '#errorModal');
            
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
                
                    self.undelegateEvents();
                    self.showModal('Unauthorized Access', 'You are not authorized to view this page.', '#errorModal');
                   
                } else {
                    alert("Something went wrong. Please try again later.");
                    self.showModal('Error', 'Something went wrong. Please try again later..', '#errorModal');
                    self.undelegateEvents();
                   
                }
            }
        });
    },
    clearForm: function() {
        this.$('#password').val('');
     
       
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
