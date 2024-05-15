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
        Backbone.history.navigate('login', { trigger: true });
    },

    onRegisterClick: function () {
        Backbone.history.navigate('register', { trigger: true });
    }
});


