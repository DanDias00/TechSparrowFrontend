// routers/AppRouter.js
var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'showLanding',         // Root URL
        'login': 'showLogin',      // #login
        'register': 'showRegister', // #register
        'questions': 'showQuestions' // #questions
    },

    showLanding: function() {
        new LandingView();
    },

    showLogin: function() {
        new LoginView();
    },

    showRegister: function() {
        // Registration logic would go here
        console.log("Registration view would be rendered here.");
    },

    showQuestions: function() {
        showQuestions1();
        
       
    }
});
