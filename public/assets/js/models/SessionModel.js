var SessionModel = Backbone.Model.extend({
    defaults: {
      loggedIn: false,
    },

    isLoggedIn: function() {
        return this.get('loggedIn');
      }
});