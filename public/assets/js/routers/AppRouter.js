// routers/AppRouter.js
var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'showLanding',         // Root URL
        'login': 'showLogin',      // #login
        'register': 'showRegister', // #register
        'questions': 'showQuestions', // #questions
        'questions/:id': 'showQuestionDetail',
        'ask': 'showAskQuestion', // #ask
        'forgot': 'showForgotPassword', // #forgot
        'reset_password/:id': 'showResetPassword', // #reset_password
        'email_success': 'showEmailSuccess', // #email_sucess
        'success': 'showSuccess', // #success


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
    },
    showForgotPassword: function() {
        console.log("Forgot password view would be rendered here.");
        new ForgotPasswordView();
    },
    showResetPassword: function(id) {
        console.log("Reset password view would be rendered here.");
        new ResetPasswordView({id: id});
    },
    showEmailSuccess: function() {
        console.log("Email success view would be rendered here.");
        new EmailSuccessView();
    },
    showSuccess: function() {
        console.log("Success view would be rendered here.");
        new SuccessView();
    }

});
