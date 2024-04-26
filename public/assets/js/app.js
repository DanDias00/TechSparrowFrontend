// app.js
$(document).ready(function() {
    // Instantiate the router
    new AppRouter();
    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();
    console.log('Document ready');
    // Initialize navbar
    var sessionData = JSON.parse(localStorage.getItem('session')) || { loggedIn: false };
    var session = new SessionModel(sessionData);
    new NavbarView({ model: session });
    
}
);
