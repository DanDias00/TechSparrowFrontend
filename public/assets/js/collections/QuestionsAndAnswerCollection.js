
var QuestionsAndAnswersCollection = Backbone.Collection.extend({
    model: QuestionModel,
    url: 'http://localhost/TechSparrow/api/Questions/view_question/'
});


