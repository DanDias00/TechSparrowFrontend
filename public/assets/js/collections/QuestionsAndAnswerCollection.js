
var QuestionsAndAnswersCollection = Backbone.Collection.extend({
    model: QuestionModel,
    url: 'http://localhost/TechSparrow/questions_api/view_question/'
});


