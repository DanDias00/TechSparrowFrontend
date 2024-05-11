// views/ResetPasswordView.js
var ResetPasswordView = Backbone.View.extend({
    el: '#app',

    template: _.template(`
        <div class="reset-password-wrapper">
            <div class="reset-password-inner">
                <h2>Reset password</h2>
                <p>Enter the new password credentials</p>
                <form id="resetPasswordForm">
                    <div class="form-group">
                        <input type="password" class="form-control" id="password" placeholder="Enter your new password" required>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="confirmNewPassword" placeholder="Confirm new password" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>
    `),

    events: {
        'submit #resetPasswordForm': 'submitResetPassword'
    },
    initialize: function() {
        this.userId = this.getUserIdFromUrl();
        this.render();
    },
    getUserIdFromUrl: function() {
        // Extract the user ID from the URL.
        // You'll need to adjust this based on how the user ID is included in your URL.
        var urlFragment = Backbone.history.getFragment();
        var userIdMatch = urlFragment.match(/reset_password\/(\d+)/);
        return userIdMatch ? userIdMatch[1] : null;
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    submitResetPassword: function(e) {
        e.preventDefault();
        
        var newPassword = this.$('#password').val().trim();
        var confirmNewPassword = this.$('#confirmNewPassword').val().trim();
        
        if (!newPassword || !confirmNewPassword) {
            alert('Please enter and confirm your new password.');
            return;
        }
        
        if (newPassword !== confirmNewPassword) {
            alert('The passwords do not match.');
            return;
        }

        // Perform the API call to submit the new password
        console.log('Submitting new password');
        this.resetPassword(newPassword, this.userId);
       
    },
    resetPassword: function(newPassword) {
        // Perform the API call to submit the new password
        console.log('Submitting new password for user ID: ', this.userId);
        var self = this;
        //use ajax
        $.ajax({
            url: 'http://localhost/TechSparrow/reset_password',
            type: 'POST',
            data: { user_id: this.userId, // Include the user ID in the request
            password: newPassword },
            success: function(response) {
            
                self.clearForm();
             
                self.undelegateEvents();
                Backbone.history.navigate('success', { trigger: true });
            }
        });
    },
    clearForm: function() {
        this.$('#password').val('');
        this.$('#confirmNewPassword').val('');
       
    }
});



