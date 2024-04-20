var SessionModel = Backbone.Model.extend({
    defaults: {
      loggedIn: false,
      // Other session attributes such as user data, authentication token, etc.
    },

    isLoggedIn: function() {
        return this.get('loggedIn');
      }
});