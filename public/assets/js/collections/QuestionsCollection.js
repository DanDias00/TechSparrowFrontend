var QuestionsCollection = Backbone.Collection.extend({
    model: QuestionModel,
    url: 'http://localhost/TechSparrow/index.php/questions_api/questions', // Your API endpoint for fetching questions

    search: function(query) {
        // Update the collection's URL with the search query
        this.url = 'http://localhost/TechSparrow/index.php/questions_api/search?q=' + encodeURIComponent(query);
    
        // Fetch the results and reset the collection with them
        this.fetch({ reset: true });
    },
    
});


