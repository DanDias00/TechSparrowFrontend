// views/SuccessView.js
var AccountDeleteSuccessView = Backbone.View.extend({
    el: '#app',

    template: _.template(`
        <div class="success-wrapper">
            <div class="success-inner">
                <h2>Success</h2>
                <p>Your account has been deleted successfully!</p>
                <p>We're sorry to see you go. If you have any feedback, please let us know. Until next time!</p>
                <div class="success-icon">
                  
                    <img src="assets/images/correct.png" alt="Success">
                </div>
                <button id="homeButton" class="btn btn-warning mt-3">Back to login</button>
            </div>
        </div>
    `),

    events: {
        'click #homeButton': 'navigateHome'
    },
    initialize: function () {

        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    navigateHome: function () {
        Backbone.history.navigate('login', { trigger: true });
    }
});


