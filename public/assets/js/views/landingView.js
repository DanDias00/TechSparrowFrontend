// landingView.js
var LandingView = Backbone.View.extend({
    el: '#app', // This attaches to a DOM element with id="app"

    template: _.template($('#static-template').html()),


    events: {
        'click #loginBtn': 'onLoginClick',
        'click #registerBtn': 'onRegisterClick'
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    onLoginClick: function() {
        // Navigate to the login route
        Backbone.history.navigate('login', {trigger: true});
    },

    onRegisterClick: function() {
        // Navigate to the register route
        Backbone.history.navigate('register', {trigger: true});
    }
});

// // This will be called from the router or app initialization code
// function showLandingPage() {
//     new LandingView();
// }
