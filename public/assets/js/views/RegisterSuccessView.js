// views/SuccessView.js
var RegisterSuccessView = Backbone.View.extend({
    el: '#app',

    template: _.template(`
        <div class="success-wrapper">
            <div class="success-inner">
                <h2>Success!</h2>
                <p>Your have been registered successfully!</p>
                <div class="success-icon">
                  
                    <img src="assets/images/correct.png" alt="Success">
                </div>
                <button id="homeButton" class="btn btn-warning mt-3">login</button>
            </div>
        </div>
    `),

    events: {
        'click #homeButton': 'navigateHome'
    },
    initialize: function() {
      
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    navigateHome: function() {
        Backbone.history.navigate('login', { trigger: true });
    }
});


