// views/SuccessView.js
var NotFoundView = Backbone.View.extend({
    el: '#app',

    template: _.template(`
      
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="text-center">
                <h1 class="display-3">404 Not Found</h1>
                <p class="lead">Sorry, the page you are looking for does not exist.</p>
                <button id="homeButton" class="btn btn-warning mt-3">Back to Home</button>
              </div>
            </div>
          </div> 
    `),

    events: {
        'click #homeButton': 'navigateHome'
    },
    initialize: function() {
        this.hideNavbarAndFooter();
      
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    navigateHome: function() {
        this.showNavbarAndFooter(); 
      
      
        Backbone.history.navigate('#', { trigger: true });
    },

    hideNavbarAndFooter: function() {
        // Hide navbar and footer
        $('#navbarContainer').hide(); 
        $('#footer-placeholder').hide(); 
    },

    showNavbarAndFooter: function() {
        // Show navbar and footer
        $('#navbarContainer').show(); 
        $('#footer-placeholder').show(); 
    }
});


