var QuestionsCollection = Backbone.Collection.extend({
    model: QuestionModel,
    url: 'http://localhost/TechSparrow/index.php/questions_api/questions' // Your API endpoint for fetching questions
});

