var QuestionsView = Backbone.View.extend({
    el: '#app', // Container for all questions

    initialize: function(options) {
        this.collection = options.collection; // Assign the passed collection to this.collection

        console.log("Questions View initialized. Collection:", this.collection);

        // Ensure that the collection is available before attempting to fetch
        if (this.collection) {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch({
                success: function (collection, response, options) {
                    console.log("Successfully fetched questions:", response);
                },
                error: function (collection, response, options) {
                    console.error("Failed to fetch questions. Response:", response);
                }
            });
        } else {
            console.error("Collection not provided to QuestionsView");
        }
    },

    render: function () {
        console.log("Rendering QuestionsView with collection size: ", this.collection.length);
        this.$el.empty(); // Clear the container
        this.collection.each(function (question) {
            // Create a new element for each question view to render into
            var questionEl = $('<div class="question-content"></div>').appendTo(this.$el);
            var questionView = new QuestionView({ model: question, el: questionEl });
            questionView.render();
        }, this);
        return this;
    }
});



// This will be called from the router or app initialization code

function showQuestions1() {
    var questionsCollection = new QuestionsCollection();

    questionsCollection.fetch({
        success: function () {
            console.log("Successfully fetched questions. Length:", questionsCollection.length);
            new QuestionsView({ collection: questionsCollection });
        },
        error: function () {
            console.error("Failed to fetch questions.");
        }
    });
}



 