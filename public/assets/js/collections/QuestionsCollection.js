var QuestionsCollection = Backbone.Collection.extend({
    model: QuestionModel,
    url: 'http://localhost/TechSparrow/questions', // API endpoint for fetching questions

    search: function(query) {
        var self = this;
        this.url = 'http://localhost/TechSparrow/api/Questions/search?q=' + encodeURIComponent(query);
    
        // Fetching the results and reset the collection with them
        this.fetch({ 
            reset: true,
            error: function(collection, response) {
                // Handling error
                if(response.status === 404) {
                    self.trigger('noResultsFound');     
                }
            }
    
        });
    },
    
});
