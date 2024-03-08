// app.js
$(document).ready(function() {
    // Instantiate the router
    var router = new AppRouter();



    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
});
