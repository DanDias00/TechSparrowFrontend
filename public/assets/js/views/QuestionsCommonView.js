// QuestionListView.js
var QuestionsCommonView = Backbone.View.extend({
    el: '#app', // Set the container element for the view

    events: {
        'submit .search-form': 'onSearchSubmit',
        'click #all-questions-btn': 'fetchAllQuestions',
        'click .modal .close': 'hideErrorModal' // Event handler for close button
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
            <!-- Bootstrap Modal for Error Messages -->
            <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="errorModalLabel">Error</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="errorModalBody">
                            <!-- Error message will be rendered here -->
                        </div>
                    </div>
                </div>
            </div>
                <div class="container mt-4">
                    <div class="row align-items-center">
                            <div class="question-header col-6 d-flex justify-content-center">
                                <button id="all-questions-btn" class="btn btn-warning">All Questions</button>
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
            reset: true,
            success: function(collection, response) {
                // Render the view with the fetched collection
                self.renderQuestionsView();
                self.undelegateEvents(); // Remove any existing event listeners
                
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
        // Check if the QuestionsView instance already exists
        if (this.questionsView) {
            // Update the collection of the existing QuestionsView instance
            this.questionsView.collection = this.collection;
            // Trigger a re-render of the QuestionsView
            this.questionsView.render();
        } else {
            // Create and render the new QuestionsView instance with the updated collection
            this.questionsView = new QuestionsView({ collection: this.collection });
            // Append the view to the container element
            this.$el.append(this.questionsView.render().el);
        }
    
        this.undelegateEvents(); // Remove any existing event listeners
    },
    
    renderNoResultsMessage: function() {
        errorMessage='No results found. Please try another search query.';
        this.showErrorModal(errorMessage);
        
        
    },

    showErrorModal: function(errorMessage) {
        // Update modal body with error message
        console.log("Error message: " + errorMessage);
        this.$('#errorModalBody').text(errorMessage);
        // Show the modal
        this.$('#errorModal').modal('show');
    },

    hideErrorModal: function() {
        // Hide the modal
        this.$('#errorModal').modal('hide');
    }
});

