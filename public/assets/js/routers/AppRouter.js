// routers/AppRouter.js
var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'showLanding',         // Root URL
        'login': 'showLogin',      // #login
        'register': 'showRegister', // #register
        'questions': 'showQuestions', // #questions
        'questions/:id': 'showQuestionDetail', // #questions/:id
        'ask': 'showAskQuestion', // #ask
        'forgot': 'showForgotPassword', // #forgot
        'reset_password/:id': 'showResetPassword', // #reset_password
        'email_success': 'showEmailSuccess', // #email_success
        'success': 'showSuccess', // #success
        'myProfile': 'myProfile',// #myProfile
        'accountDelete': 'showAccountDeleteSuccess',
        'contact': 'showContact', // #accountDelete
        '*path': 'showNotFound' // Catch-all for 404 Not Found pages


    },

    showLanding: function () {
        new LandingView();
    },

    showLogin: function () {
        new LoginView();
    },

    showRegister: function () {
        new RegisterView();

    },

    showQuestions: function () {
        if (localStorage.getItem('session')) {
            new QuestionsView({ collection: new QuestionsCollection() });
        } else {
            Backbone.history.navigate('login', { trigger: true });
        }
    },
    showQuestionDetail: function (id) {
        new QuestionDetailView({ id: id });
    },
    showAskQuestion: function () {

        new AskQuestionView();
    },
    showForgotPassword: function () {

        new ForgotPasswordView();
    },
    showResetPassword: function (id) {

        new ResetPasswordView({ id: id });
    },
    showEmailSuccess: function () {

        new EmailSuccessView();
    },
    showSuccess: function () {

        new SuccessView();
    },

    myProfile: function () {

        new MyProfileView();

    },
    showAccountDeleteSuccess: function () {
        new AccountDeleteSuccessView();
    },
    showContact: function () {
        new ContactFormView();
    },
    showNotFound: function () {
        new NotFoundView();

    }
});
