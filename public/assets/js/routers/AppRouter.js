// routers/AppRouter.js
var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'showLanding',         // Root URL
        'login': 'showLogin',      // #login
        'register': 'showRegister', // #register
        'questions': 'showQuestions', // #questions
        'questions/:id': 'showQuestionDetail',
        'ask': 'showAskQuestion' // #ask

    },

    showLanding: function() {
        new LandingView();
    },

    showLogin: function() {
        new LoginView();
    },

    showRegister: function() {
       new RegisterView();
        console.log("Registration view would be rendered here.");
    },

    showQuestions: function() {
        showQuestions1();
        
       
    },
    showQuestionDetail: function(id) {
        new QuestionDetailView({id: id});
    },
    showAskQuestion: function() {
        console.log("Ask question view would be rendered here.");
        new AskQuestionView();
    }

});
