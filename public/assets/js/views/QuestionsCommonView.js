// QuestionListView.js
var QuestionsCommonView = Backbone.View.extend({
    el: '#app', // Set the container element for the view

    events: {
        'submit .search-form': 'onSearchSubmit',
        'click #all-questions-btn': 'fetchAllQuestions' 
    },

    initialize: function () {
        this.collection = new QuestionsCollection();
        this.listenTo(this.collection, 'reset', this.renderQuestionsView);
         // Listen to the custom event 'noResultsFound' to handle no results scenario
        this.listenTo(this.collection, 'noResultsFound', this.renderNoResultsMessage);
    },

    render: function () {
        this.$el.html(`
            <div class="common-view">
                <div class="container mt-4">
                    <div class="row align-items-center">
                            <div class="question-header col-6 d-flex justify-content-center">
                                <button id="all-questions-btn" class="btn btn-link">All Questions</button>
                        </div>
                        <div class="ask-header col-6 d-flex justify-content-center">
                            <!-- Search form - updated to have class for event binding -->
                            <form class="search-form d-flex me-2" action="javascript:void(0);">
                                <input type="search" class="form-control search-input" placeholder="Search questions...">
                                <button type="submit" class="btn btn-outline-success ml-2">Search</button>
                            </form>
                            <a href="#ask" class="btn btn-warning">Ask a Question</a>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        return this;
    },

    onSearchSubmit: function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
        var query = this.$('.search-input').val().trim(); // Get the search input value
        if (query) {
            this.searchQuestions(query);
            this.$('.search-input').val(''); // Clear the search input
        }   
    },

    fetchAllQuestions: function() { 
        var self = this;
        // Fetch the collection again from the server to retrieve all questions
        this.collection.fetch({
            success: function(collection, response) {
                // Render the view with the fetched collection
                self.renderQuestionsView();
            },
            error: function(collection, response) {
                // Handle error
               // console.error("Failed to fetch all questions. Response:", response.responseText);
            }
        });
    },

    searchQuestions: function (query) {
        var self = this;
        this.collection.search(query) // Search the collection with the query
    },
    

    renderQuestionsView: function() {
        this.questionsView = new QuestionsView({ collection: this.collection });
        this.undelegateEvents(); // Remove any existing event listeners

    },
    renderNoResultsMessage: function() {
        console.log('inside renderNoResultsMessage')
        alert('No results found. Please try another search query.');
        
        
    }
});

