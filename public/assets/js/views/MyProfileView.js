// MyProfileView.js
var MyProfileView = Backbone.View.extend({
    el: '#app',

    events: {
        'click #logoutButton': 'logout',
        'click #deleteAccountButton': 'deleteAccount',
        'submit #resetPasswordForm': 'resetPassword', // Updated event binding
        'click .modal .close': 'hideModal'
    },

    initialize: function () {
        this.model = new UserModel();
        var self = this;
        // Retrieve session data from local storage
        var sessionData = JSON.parse(localStorage.getItem('session'));
        document.title = "Tech Sparrow - My Profile";

        if (sessionData && sessionData.loggedIn) {
          
            // If session exists and user is logged in, fetch user data from the server
            $.ajax({
                url: 'http://localhost/TechSparrow/api/auth/profile',
                type: 'GET',
                success: function (response) {
                    // Set the user model with the retrieved data
                    self.model.set(response.message);
                    // Save the user data to local storage for future use
                    localStorage.setItem('session', JSON.stringify(response.message));
                    // Load user profile template
                    $.get('assets/html/user-profile-template.html', function (template) {
                        self.template = _.template(template);
                        self.fetchUserQuestions();
                        self.render();
                    });
                },
                error: function (xhr, status, error) {
                    
                    if (status === 401 || status === 403) {
                        self.showModal('Unauthorized Access', 'You are not authorized to view this page.', '#errorModal');

                        // Redirect to login page
                        Backbone.history.navigate('login', { trigger: true });
                    } else {
                        self.showModal('Error', 'An error occurred while fetching user data.', '#errorModal');
                        // Redirect to home page
                        Backbone.history.navigate('', { trigger: true });
                    }
                }
            });
        } else {
            // If session doesn't exist or user is not logged in, redirect to login page
            Backbone.history.navigate('login', { trigger: true });
        }
    },

    render: function () {
        if (this.template && this.model) {
            this.$el.html(this.template(this.model.toJSON()));
        } else {

        }
        return this;
    },

    logout: function () {
        var self = this;
        $.ajax({
            url: 'http://localhost/TechSparrow/api/auth/logout',
            type: 'GET',
            success: function (response) {

                // Clear the user data from local storage
                localStorage.removeItem('session');

                // Redirect the user to the home page
                Backbone.history.navigate('', { trigger: true });

            },
            error: function (xhr, status, error) {
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

    deleteAccount: function () {
        var self = this;
        var userId = JSON.parse(localStorage.getItem('session')).user_id;
    
        // Set up the confirmation message
        var confirmationMessage = "Are you sure you want to delete your account?";
        var confirmationBody = "This action cannot be undone.";
        $("#confirmModalBody").html("<p>" + confirmationMessage + "</p><p>" + confirmationBody + "</p>");
    
        // Show the confirmation modal
        $('#confirmModal').modal('show');

        $('#doNotDeleteButton').on('click', function() {
            $('#confirmModal').modal('hide');
        });
    
        $('#confirmDeleteButton').on('click', function() {
            $.ajax({
                url: 'http://localhost/TechSparrow/api/auth/delete_account/' + userId,
                type: 'POST',
                success: function (response) {
                    // Remove the session data from local storage
                    localStorage.removeItem('session');
                    // Redirect the user to the delete success page
                    Backbone.history.navigate('accountDelete', { trigger: true });
                    self.showModal('Success', 'Account deleted successfully.', '#successModal');
                    self.undelegateEvents();
                },
                error: function (xhr, status, error) {
                    self.showModal('Error', 'An error occurred while deleting your account.', '#errorModal');
                }
            });
    
            $('#confirmModal').modal('hide');
        });
    },
    

    resetPassword: function (event) {
        event.preventDefault();
        var newPasswordInput = this.$('#resetPasswordinput');

        if (newPasswordInput.val().trim() === '') {
            this.showModal('Error', 'Password cannot be empty.', '#errorModal');
            return;
        }
        var newPassword = newPasswordInput.val().trim(); // Trim whitespace from the password

        var passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        if (!passwordRegex.test(newPassword)) {
            self.showModal('Error', 'Password contains disallowed characters. Please use only alphanumeric characters and allowed special characters.', '#errorModal');

            newPasswordInput.val(''); // Clear the password input field
            return;
        }
        var userId = JSON.parse(localStorage.getItem('session')).user_id;
        this.resetPasswordCall(newPassword, userId);
    },
    resetPasswordCall: function (newPassword, userId) {
        var self = this;

        $.ajax({
            url: 'http://localhost/TechSparrow/api/auth/reset_password',
            type: 'POST',
            data: {
                user_id: userId,
                password: newPassword
            },
            success: function (response) {
                self.clearForm();
                self.undelegateEvents();
                localStorage.removeItem('session');
                Backbone.history.navigate('success', { trigger: true });
            },
            error: function (xhr, status, error) {
                if (status === 401 || status === 403) {

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
    clearForm: function () {
        this.$('#password').val('');


    },
    showModal: function (title, message, modalSelector) {
        // Update modal title and body with provided title and message
        this.$(modalSelector + 'Label').text(title);
        this.$(modalSelector + 'Body').text(message);
        // Show the modal
        this.$(modalSelector).modal('show');
    },

    hideModal: function () {
        // Hide the modal
        this.$('.modal').modal('hide');
    },
    fetchUserQuestions: function () {
        var self = this;
        var userId = JSON.parse(localStorage.getItem('session')).user_id;

        $.ajax({
            url: 'http://localhost/TechSparrow/api/questions/user/' + userId,
            type: 'GET',
            success: function (response) {
                self.renderUserQuestions(response);
            },
            error: function (xhr, status, error) {
                if(status === 401 || status === 403) {
                    self.showModal('Unauthorized Access', 'You are not authorized to view this page.', '#errorModal');
                } else if (status === 500) {
                    self.showModal('Error', 'An error occurred while fetching user questions.', '#errorModal');
                }
            }
        });
    },
    renderUserQuestions: function (questions) {
        var self = this;
        var $userQuestionsContainer = this.$('#userQuestions');
    
        // Clear existing questions in the container
        $userQuestionsContainer.empty();
    
        // Iterate over each question and append it to the container
        questions.forEach(function (question) {
            var $questionContainer = $('<div class="question">');
            var $title = $('<h3>').text(question.title);
            var $body = $('<p>').text(question.body);
            var $editButton = $('<button class="btn btn-primary edit-question">Edit</button>');
            var $deleteButton = $('<button class="btn btn-danger delete-question">Delete</button>');

            $questionContainer.attr('data-id', question.id);
    
            // Attach event listeners for edit and delete actions
            $editButton.on('click', function () {
                // Find the question container
                var $questionContainer = $(this).closest('.question');
            
                // Find the title and body elements
                var $title = $questionContainer.find('h3');
                var $body = $questionContainer.find('p');
            
                // Replace title and body with input fields
                var $titleInput = $('<input>').val($title.text());
                var $bodyInput = $('<textarea>').val($body.text());
            
                $title.replaceWith($titleInput);
                $body.replaceWith($bodyInput);
            
                // Create a save button
                var $saveButton = $('<button class="btn btn-success save-question">Save</button>');
            
                // Replace edit button with save button
                $(this).replaceWith($saveButton);
            
                // Attach click event to the save button
                $saveButton.on('click', function () {
                    // Get the updated title and body values
                    var updatedTitle = $titleInput.val();
                    var updatedBody = $bodyInput.val();

                    $.ajax({
                        url: 'http://localhost/TechSparrow/api/question/update/' + question.id,
                        type: 'PUT',
                        data: {
                            title: updatedTitle,
                            body: updatedBody
                        },
                        success: function (response) {
                           
                            // Update the UI with the new question data
                            $title.text(updatedTitle);
                            $body.text(updatedBody);
                            
                            // Replace input elements with h3 and p elements
                            $title.replaceWith($('<h3>').text(updatedTitle));
                            $body.replaceWith($('<p>').text(updatedBody));
                            self.fetchUserQuestions();
                            
                            // Replace save button with edit button
                            $saveButton.replaceWith($editButton);
                        }
                        ,
                        error: function (xhr, status, error) {
                            self.showModal('Error','Error updating question' , '#errorModal');
                        }
                    });
                });
            });
            
    
            $deleteButton.on('click', function () {
               
                    var questionId = $(this).closest('.question').data('id');

                    var confirmationMessage = "Are you sure you want to delete this question?";
                    var confirmationBody = "This action cannot be undone.";
                    $("#confirmModalBody").html("<p>" + confirmationMessage + "</p><p>" + confirmationBody + "</p>");

                    $('#confirmModal').modal('show');
               
                    $('#doNotDeleteButton').on('click', function() {
                        $('#confirmModal').modal('hide');
                    });
                  
                    $('#confirmDeleteButton').on('click', function() {
            
                    $.ajax({
                        url: 'http://localhost/TechSparrow/api/question/delete/' + questionId,
                        type: 'DELETE',
                        success: function (response) {
                            $questionContainer.remove();
                            $('#confirmModal').modal('hide');
                        },
                        error: function (xhr, status, error) {
                            self.showModal('Error', 'Error deleting question', '#errorModal');
                        }
                    });
                });
            
            });
            
            // Append elements to question container
            $questionContainer.append($title, $body, $editButton, $deleteButton);
            $userQuestionsContainer.append($questionContainer);
        });
    },
    
}
);
