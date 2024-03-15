// views/EmailSuccessView.js
var EmailSuccessView = Backbone.View.extend({
    el: '#app',

    template: _.template(`
        <div class="email-success-wrapper">
            <div class="email-success-inner">
                <h2>Email sent!</h2>
                <p>Don't forget to check your inbox and spam messages as well</p>
                <div class="email-success-icon">
                    <img src="assets/images/email_2.png" alt="Email Sent">
                </div>
                <a href="#login" class="btn btn-warning mt-3 ml-2 ">Back to Login</a>
            </div>
        </div>
    `),

    events: {
        'click #goHome': 'navigateHome'
    },
    initialize: function() {
       
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    navigateHome: function() {
        // Navigate to the home page or route
        Backbone.history.navigate('', { trigger: true });
    }
});


