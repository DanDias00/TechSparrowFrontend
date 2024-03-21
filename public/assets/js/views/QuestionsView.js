var QuestionsView = Backbone.View.extend({
    el: '#app', 

    initialize: function(options) {
        this.collection = options.collection || new QuestionsCollection();
        console.log('QuestionsView initialized with collection:', this.collection);
        this.listenTo(this.collection, 'sync', this.render); // Listen to the sync event to render
        this.listenTo(this.collection, 'reset', this.render); // Listen to the collection's error event    
        this.listenTo(this.collection, 'error', this.handleError); // Listen to the collection's error event
        this.questionListView = new QuestionsCommonView(); // Create a new instance of the common view
        
        // Fetch the collection
        this.collection.fetch();
    },

    render: function() {
        this.$el.empty(); // Clear the container
        this.questionListView.render();
        this.$el.append(this.questionListView.el); // Append the common view
        this.collection.each(function(question) { // Render each question
            var questionEl = $('<div class="question-content"></div>').appendTo(this.$el);
            var questionView = new QuestionView({ model: question, el: questionEl });
            questionView.render();
       
        }, this);
        return this;
    },

    handleError: function(collection, response, options) {
        if(response.status === 401) {
     
            console.error("Unauthorized access, redirecting...");
            Backbone.history.navigate('login', { trigger: true });
        } else {
            console.error("Failed to fetch questions. Response:", response.responseText);
            
        }
    }
});

// function showQuestions1() {
//     new QuestionsView({ collection: new QuestionsCollection() });
// }

