var QuestionsCollection = Backbone.Collection.extend({
    model: QuestionModel,
    url: 'http://localhost/TechSparrow/index.php/questions_api/questions', // API endpoint for fetching questions

    search: function(query) {
        var self = this;
        // Update the collection's URL with the search query
        this.url = 'http://localhost/TechSparrow/index.php/questions_api/search?q=' + encodeURIComponent(query);
    
        // Fetch the results and reset the collection with them
        this.fetch({ 
            reset: true,
            error: function(collection, response) {
                // Handle error
                if(response.status === 404) {
                    self.trigger('noResultsFound');     
                }
            }
    
        });
    },
    
});


