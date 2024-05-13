// landingView.js
var LandingView = Backbone.View.extend({
    el: '#app',

    template: _.template($('#static-template').html()),


    events: {
        'click #loginBtn': 'onLoginClick',
        'click #registerBtn': 'onRegisterClick'
    },

    initialize: function () {
        document.title = "Tech Sparrow - Home";
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    onLoginClick: function () {
        // Navigate to the login route
        Backbone.history.navigate('login', { trigger: true });
    },

    onRegisterClick: function () {
        // Navigate to the register route
        Backbone.history.navigate('register', { trigger: true });
    }
});


